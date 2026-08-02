import type { ReactNode } from "react";

type ContentBlock =
  | { type: "heading"; tone: "success" | "warning" | "info" | "danger"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; tone: "success" | "danger" | "neutral" | "point"; items: string[] }
  | { type: "divider" }
  | { type: "cta"; text: string };

function stripMarker(line: string) {
  return line
    .replace(/^[✅❌⚠️⚠📌✔👉]+\s*/, "")
    .replace(/^[-—–_]{3,}\s*/, "")
    .trim();
}

function isSeparator(line: string) {
  return /^[-—–_]{5,}$/.test(line.trim());
}

function isMarkerLine(line: string) {
  return (
    line.startsWith("✅") ||
    line.startsWith("❌") ||
    line.startsWith("⚠️") ||
    line.startsWith("⚠") ||
    line.startsWith("📌") ||
    line.startsWith("✔") ||
    line.startsWith("👉") ||
    isSeparator(line)
  );
}

function parseArticleContent(content: string): ContentBlock[] {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const blocks: ContentBlock[] = [];
  let bulletBuffer: Extract<ContentBlock, { type: "bullets" }> | null = null;

  function flushBullets() {
    if (bulletBuffer && bulletBuffer.items.length > 0) {
      blocks.push(bulletBuffer);
    }
    bulletBuffer = null;
  }

  function pushBullet(tone: Extract<ContentBlock, { type: "bullets" }>["tone"], text: string) {
    if (!bulletBuffer || bulletBuffer.tone !== tone) {
      flushBullets();
      bulletBuffer = { type: "bullets", tone, items: [] };
    }
    bulletBuffer.items.push(text);
  }

  function lastBlock() {
    return blocks[blocks.length - 1];
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const next = lines[index + 1];

    if (isSeparator(line)) {
      flushBullets();
      blocks.push({ type: "divider" });
      continue;
    }

    if (line.startsWith("✅")) {
      const text = stripMarker(line);
      const hasBody = Boolean(next && !isMarkerLine(next));
      if (hasBody) {
        flushBullets();
        blocks.push({ type: "heading", tone: "success", text });
      } else {
        pushBullet("success", text);
      }
      continue;
    }

    if (line.startsWith("⚠️") || line.startsWith("⚠")) {
      flushBullets();
      blocks.push({ type: "heading", tone: "warning", text: stripMarker(line) });
      continue;
    }

    if (line.startsWith("📌")) {
      flushBullets();
      blocks.push({ type: "heading", tone: "info", text: stripMarker(line) });
      continue;
    }

    if (line.startsWith("❌")) {
      pushBullet("danger", stripMarker(line));
      continue;
    }

    if (line.startsWith("✔")) {
      pushBullet("success", stripMarker(line));
      continue;
    }

    if (line.startsWith("👉")) {
      pushBullet("point", stripMarker(line));
      continue;
    }

    const previous = lastBlock();
    const underHeadingList =
      line.length < 140 &&
      !line.endsWith(":") &&
      (previous?.type === "heading" || bulletBuffer?.tone === "neutral");

    if (underHeadingList) {
      pushBullet("neutral", line);
      continue;
    }

    flushBullets();

    if (lastBlock()?.type === "divider") {
      blocks.push({ type: "cta", text: line });
      continue;
    }

    blocks.push({ type: "paragraph", text: line });
  }

  flushBullets();
  return blocks;
}

const headingStyles = {
  success: "border-emerald-500 bg-emerald-50 text-emerald-900",
  warning: "border-amber-500 bg-amber-50 text-amber-900",
  info: "border-sky-500 bg-sky-50 text-sky-900",
  danger: "border-rose-500 bg-rose-50 text-rose-900",
} as const;

const headingIcons = {
  success: "✅",
  warning: "⚠️",
  info: "📌",
  danger: "❌",
} as const;

const bulletStyles = {
  success: {
    wrap: "border-emerald-100 bg-emerald-50/60",
    mark: "text-emerald-600",
    icon: "✔",
  },
  danger: {
    wrap: "border-rose-100 bg-rose-50/70",
    mark: "text-rose-600",
    icon: "❌",
  },
  point: {
    wrap: "border-sky-100 bg-sky-50/60",
    mark: "text-sky-600",
    icon: "•",
  },
  neutral: {
    wrap: "border-slate-200 bg-slate-50",
    mark: "text-slate-500",
    icon: "•",
  },
} as const;

export function ArticleContent({ content }: { content: string }) {
  const blocks = parseArticleContent(content);

  if (blocks.length === 0) {
    return <p className="text-base leading-8 text-slate-800">{content}</p>;
  }

  const nodes: ReactNode[] = [];

  blocks.forEach((block, index) => {
    if (block.type === "heading") {
      nodes.push(
        <div
          key={`h-${index}`}
          className={`mt-8 rounded-r-lg border-l-4 px-4 py-3 first:mt-0 ${headingStyles[block.tone]}`}
        >
          <h2 className="flex items-start gap-2 text-lg font-semibold leading-snug">
            <span aria-hidden>{headingIcons[block.tone]}</span>
            <span>{block.text}</span>
          </h2>
        </div>,
      );
      return;
    }

    if (block.type === "paragraph") {
      nodes.push(
        <p key={`p-${index}`} className="mt-3 text-base leading-8 text-slate-700">
          {block.text}
        </p>,
      );
      return;
    }

    if (block.type === "bullets") {
      const style = bulletStyles[block.tone];
      nodes.push(
        <ul
          key={`b-${index}`}
          className={`mt-3 space-y-2 rounded-xl border px-4 py-3 ${style.wrap}`}
        >
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-base leading-7 text-slate-700">
              <span className={`mt-0.5 shrink-0 font-semibold ${style.mark}`} aria-hidden>
                {style.icon}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>,
      );
      return;
    }

    if (block.type === "divider") {
      nodes.push(<hr key={`d-${index}`} className="my-8 border-slate-200" />);
      return;
    }

    if (block.type === "cta") {
      nodes.push(
        <div
          key={`c-${index}`}
          className="rounded-xl border border-sky-100 bg-gradient-to-r from-sky-50 to-emerald-50 px-5 py-4 text-base font-medium leading-7 text-slate-800"
        >
          {block.text}
        </div>,
      );
    }
  });

  return <div className="article-body">{nodes}</div>;
}
