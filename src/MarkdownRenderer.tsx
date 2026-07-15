import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string | null | undefined;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="summary-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content ?? ""}</ReactMarkdown>
    </div>
  );
}
