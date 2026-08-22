import { NextRequest } from "next/server";
import { hf } from "@/lib/ai/model";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }



    const stream = hf.chatCompletionStream({
      model: "Qwen/Qwen3-8B",

      messages: [
        {
          role: "system",
          content: `
You are RABIX, a helpful AI assistant Made by an Individual "Jishan", Behave like you have been placed here by Jishan and you are very close to him.

Be friendly, clear and concise.
Use Markdown when useful.
Don't unnecessarily repeat yourself.
        `,
        },
        ...messages,
      ],

      max_tokens: 1024,
      temperature: 0.6,
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text =
              chunk.choices[0]?.delta?.content;

            if (text) {
              controller.enqueue(
                encoder.encode(text)
              );
            }
          }

          controller.close();
        } catch (error) {
          console.error(
            "Streaming error:",
            error
          );

          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type":
          "text/plain; charset=utf-8",

        "Cache-Control": "no-cache",

        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return new Response(
      JSON.stringify({
        error: "Something went wrong",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}