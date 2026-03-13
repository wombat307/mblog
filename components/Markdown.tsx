"use client";

import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {
  return (
    <div className="prose-md">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
