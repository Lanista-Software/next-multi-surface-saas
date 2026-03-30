type Token =
  | { type: "heading"; depth: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; lines: string[] };

function tokenize(markdown: string): Token[] {
  const lines = markdown.split("\n");
  const tokens: Token[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trimEnd();

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      tokens.push({ type: "code", lines: code });
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      tokens.push({ type: "heading", depth: 3, text: line.slice(4) });
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      tokens.push({ type: "heading", depth: 2, text: line.slice(3) });
      index += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      tokens.push({ type: "heading", depth: 1, text: line.slice(2) });
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].trimStart().startsWith("- ")) {
        items.push(lines[index].trimStart().slice(2));
        index += 1;
      }
      tokens.push({ type: "list", items });
      continue;
    }

    const paragraph: string[] = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim() && !/^(#|-|```)/.test(lines[index].trimStart())) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    tokens.push({ type: "paragraph", text: paragraph.join(" ") });
  }

  return tokens;
}

export function RenderContent({ markdown }: { markdown: string }) {
  return (
    <div className="markdown-flow">
      {tokenize(markdown).map((token, index) => {
        switch (token.type) {
          case "heading":
            if (token.depth === 1) return <h1 key={index}>{token.text}</h1>;
            if (token.depth === 2) return <h2 key={index}>{token.text}</h2>;
            return <h3 key={index}>{token.text}</h3>;
          case "list":
            return (
              <ul key={index} className="bullet-list">
                {token.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre key={index} className="code-block">
                <code>{token.lines.join("\n")}</code>
              </pre>
            );
          default:
            return <p key={index}>{token.text}</p>;
        }
      })}
    </div>
  );
}
