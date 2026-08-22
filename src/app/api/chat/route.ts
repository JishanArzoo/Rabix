import { NextRequest } from "next/server";
import { hf } from "@/lib/ai/model";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json(); // ← was `message`, now `messages`

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
          content: `You are RABIX, a helpful Momin AI assistant developed by "Jishan". Be friendly, Halal and concise. Use Markdown when useful. Don't unnecessarily repeat yourself.`,
        },
        ...messages, // ← spread in the ENTIRE conversation history
      ],
      max_tokens: 1024,
      temperature: 0.55,
    });

    // ... rest of the streaming code stays exactly the same
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