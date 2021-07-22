import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Components } from "react-markdown/src/ast-to-react";

const components: Components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={okaidia}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

interface MarkdownProps {
  children: string;
}

export default function Markdown(props: MarkdownProps) {
  return (
    <ReactMarkdown
      className={"MarkdownRenderer"}
      plugins={[gfm]}
      components={components}
    >
      {props.children}
    </ReactMarkdown>
  );
}
