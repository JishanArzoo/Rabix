"use client";

import {
  FormEvent,
  useState,
} from "react";

type ChatInputProps = {
  onSend: (message: string) => void;
  disabled: boolean;
};

export default function ChatInput({
  onSend,
  disabled,
}: ChatInputProps) {
  const [input, setInput] =
    useState("");

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      !input.trim() ||
      disabled
    ) {
      return;
    }

    onSend(input);

    setInput("");
  }

  return (
    <div className="border-t bg-white p-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-3xl gap-2"
      >
        <input
          value={input}
          onChange={(event) =>
            setInput(event.target.value)
          }
          disabled={disabled}
          placeholder="Message RABIX..."
          className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />

        <button
          type="submit"
          disabled={
            disabled ||
            !input.trim()
          }
          className="rounded-xl bg-black px-5 py-3 text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}