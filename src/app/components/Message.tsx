import ReactMarkdown from "react-markdown";

interface MessageProps {
  message: {
    role: "user" | "assistant";
    content: string;
  };
  isStreaming: boolean;
}

export default function Message({ message, isStreaming }: MessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`mb-6 flex min-w-0 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`min-w-0 max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-black text-white"
            : "bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white"
        }`}
      >
        <div className="min-w-0 max-w-full break-words [overflow-wrap:anywhere]">
  <ReactMarkdown
    components={{
      p: ({ children }) => (
        <p className="whitespace-normal break-words [overflow-wrap:anywhere] mb-2 last:mb-0">
          {children}
        </p>
      ),
      code: ({ children }) => (
        <code className="break-words [overflow-wrap:anywhere]">{children}</code>
      ),
      pre: ({ children }) => (
        <pre className="max-w-full overflow-x-auto whitespace-pre rounded-md bg-black/30 p-3 my-2">
          {children}
        </pre>
      ),
    }}
  >
    {message.content.trim()}
  </ReactMarkdown>

  {isStreaming && (
    <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-current" />
  )}
</div>
      </div>
    </div>
  );
}