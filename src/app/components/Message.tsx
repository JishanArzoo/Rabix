type MessageProps = {
  message: {
    role: "user" | "assistant";
    content: string;
  };

  isStreaming: boolean;
};

export default function Message({
  message,
  isStreaming,
}: MessageProps) {
  const isUser =
    message.role === "user";

  return (
    <div
      className={`mb-6 flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-black text-white"
            : "bg-gray-100 text-black"
        }`}
      >
        <div className="whitespace-pre-wrap">
          {message.content}

          {isStreaming && (
            <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-current" />
          )}
        </div>
      </div>
    </div>
  );
}