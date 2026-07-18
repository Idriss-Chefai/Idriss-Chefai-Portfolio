import * as matter from "gray-matter";
import type { BlogPost } from "./data-types";

// Eagerly import all markdown files from the content folder as raw strings using modern Vite syntax
const modules = import.meta.glob("../content/.blog/*.md", { 
  eager: true, 
  query: "?raw" 
}) as Record<string, string>;

export const MD_BLOGS: BlogPost[] = Object.entries(modules).map(([path, raw], i) => {
  // If Vite imports the file as an ES module object (e.g. { default: "raw markdown text" })
  // we extract the raw text safely, otherwise we use the raw string directly.
  const rawContent = typeof raw === "object" && raw !== null && "default" in raw 
    ? (raw as { default: string }).default 
    : (raw as unknown as string);

  // We use matter.default if compiled as a default import, fallback to matter as a function
  const parse = typeof matter === "function" ? matter : (matter as any).default;
  const { data, content } = parse(rawContent);

  return {
    id: data.id ?? i + 1000,
    date: data.date ?? data.dateString ?? "1970-01-01",
    title: data.title ?? `Post ${i + 1}`,
    snippet: data.snippet ?? (content.split("\n\n")[0] ?? ""),
    body: content,
  } as BlogPost;
}).sort((a, b) => (a.date < b.date ? 1 : -1));