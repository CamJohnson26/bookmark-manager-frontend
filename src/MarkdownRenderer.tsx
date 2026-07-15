import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string | null | undefined;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="summary-markdown">
      <ReactMarkdown>{content ?? ""}</ReactMarkdown>
    </div>
  );
}
