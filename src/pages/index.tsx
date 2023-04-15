import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

const IndexPage: React.FC<PageProps> = () => {
  const [words, setWords] = React.useState<string[]>([]);
  const [input, setInput] = React.useState<string>("");

  const onClickCopyAll = () => {
    const result = words.join("\n");
    navigator.clipboard.writeText(result);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inp = e.target.value;

    setInput(inp);
    setWords(Array.from(new Set(inp.split("\n").filter((v) => !!v))).sort());
  };

  return (
    <div style={{ padding: "16px" }}>
      <div>
        <textarea
          style={{
            width: "100%",
            minHeight: "300px",
            resize: "vertical",
            boxSizing: "border-box",
          }}
          value={input}
          onChange={onChange}
        />
      </div>
      <div>
        <button
          onClick={onClickCopyAll}
          style={{ width: "100%", height: "40px" }}
        >
          Copy All
        </button>
      </div>
      <div>
        <ul>
          {words.map((word) => (
            <li>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>No duplicated words</title>;
