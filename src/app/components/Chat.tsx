"use client";

import { useState } from "react";
import Message from "./Message";
import ChatInput from "./ChatInput";

type MessageType = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [messages, setMessages] =
    useState<MessageType[]>([]);

  const [isStreaming, setIsStreaming] =
    useState(false);

  async function sendMessage(message: string) {
  if (!message.trim() || isStreaming) {
    return;
  }

  // Build the new message list explicitly first
  const userMessage: MessageType = { role: "user", content: message };
  const updatedMessages = [...messages, userMessage];

  // Add user message + empty assistant placeholder to the UI
  setMessages((previous) => [
    ...previous,
    userMessage,
    { role: "assistant", content: "" },
  ]);

  setIsStreaming(true);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: updatedMessages, // ← send the FULL history, not just one message
      }),
    });

    // ...rest stays exactly the same

      if (!response.ok) {
        throw new Error(
          "Failed to get response"
        );
      }

      if (!response.body) {
        throw new Error(
          "Response body is empty"
        );
      }

      const reader =
        response.body.getReader();

      const decoder =
        new TextDecoder();

      while (true) {
        const { value, done } =
          await reader.read();

        if (done) {
          break;
        }

        const chunk =
          decoder.decode(value, {
            stream: true,
          });

        setMessages((previous) => {
          const updated = [...previous];

          const last =
            updated[updated.length - 1];

          updated[updated.length - 1] = {
            ...last,
            content:
              last.content + chunk,
          };

          return updated;
        });
      }
    } catch (error) {
      console.error(error);

      setMessages((previous) => {
        const updated = [...previous];

        const last =
          updated[updated.length - 1];

        updated[updated.length - 1] = {
          ...last,
          content:
            "Sorry, something went wrong.",
        };

        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Header */}

      <header className="border-b px-6 py-4">
        <div className="mx-auto max-w-3xl flex flex-row justify-around">
          <h1 className="text-xl font-bold">
            RABIX
          </h1>
          <h4 className="font-semibold text-xl">
            by Jishan
          </h4>
        </div>
      </header>

      {/* Messages */}

      <section className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto max-w-3xl">
          {messages.map(
            (message, index) => (
              <Message
                key={index}
                message={message}
                isStreaming={
                  isStreaming &&
                  index ===
                    messages.length - 1
                }
              />
            )
          )}
        </div>
      </section>

      {/* Input */}

      <ChatInput
        onSend={sendMessage}
        disabled={isStreaming}
      />
    </main>
  );
}