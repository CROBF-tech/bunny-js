
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

export const CodeBlock = ({
  code,
  language = "javascript",
  title,
  className,
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("rounded-lg overflow-hidden my-4", className)}>
      {title && (
        <div className="bg-bunny-black/80 px-4 py-2 text-bunny-yellow-light text-sm font-mono flex items-center justify-between">
          <span>{title}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 text-xs text-bunny-yellow hover:text-bunny-yellow/90 hover:bg-bunny-black/50"
          >
            {copied ? "¡Copiado!" : "Copiar"}
          </Button>
        </div>
      )}
      <pre className="bg-bunny-black p-4 overflow-x-auto">
        <code className="text-bunny-yellow-light font-mono text-sm">
          {code}
        </code>
      </pre>
    </div>
  );
};
