import { useState, useEffect } from "react";

export default function Notebook() {
  const [content, setContent] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("notebook-content");
    if (saved) setContent(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("notebook-content", content);
  }, [content]);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Notebook</h1>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-[70vh] p-5 border rounded-xl resize-y font-mono text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
        placeholder="Start writing your notes here..."
      />
      <div className="text-xs text-zinc-400 mt-2">Content is auto-saved</div>
    </div>
  );
}
