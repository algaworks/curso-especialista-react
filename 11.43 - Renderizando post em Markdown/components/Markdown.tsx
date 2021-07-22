import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export default function Markdown(props: MarkdownProps) {
  return (
    <ReactMarkdown className={"MarkdownRenderer"}>
      {props.children}
    </ReactMarkdown>
  );
}
