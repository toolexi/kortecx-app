import { useState, useEffect } from "react";

interface ContentAreaProps {
  module: "dashboard" | "notebook" | "assets" | "workflow" | "builder";
  item: string;
}

export default function ContentArea({ module, item }: ContentAreaProps) {
  const [notebookContent, setNotebookContent] = useState("");

  const storageKey = `${module}-${item}`;

  useEffect(() => {
    if (module === "notebook") {
      const saved = localStorage.getItem(storageKey);
      setNotebookContent(
        saved || `Content for ${item}...\n\nStart writing here.`,
      );
    }
  }, [module, item, storageKey]);

  useEffect(() => {
    if (module === "notebook") {
      localStorage.setItem(storageKey, notebookContent);
    }
  }, [notebookContent, module, storageKey]);

  if (module === "notebook") {
    return (
      <div>
        <h2 className="text-3xl font-semibold mb-6">{item}</h2>
        <textarea
          value={notebookContent}
          onChange={(e) => setNotebookContent(e.target.value)}
          className="w-full h-[70vh] p-6 border rounded-2xl font-mono text-sm resize-y focus:outline-none focus:ring-1 focus:ring-blue-200"
        />
        <div className="text-zinc-400 text-xs mt-3">
          Auto-saved to localStorage
        </div>
      </div>
    );
  }

  if (module === "workflow") {
    return (
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8">{item}</h2>
        <div className="bg-white border rounded-3xl p-12 flex flex-col items-center justify-center min-h-[400px]">
          <div className="text-7xl mb-6">⚡</div>
          <h3 className="text-2xl font-medium">Workflow Editor</h3>
          <p className="text-zinc-500 mt-2">
            Drag & drop nodes to build {item}
          </p>
          <button className="mt-10 px-8 py-4 bg-black text-white rounded-2xl font-medium">
            Open Visual Builder
          </button>
        </div>
      </div>
    );
  }

  if (module === "assets") {
    return (
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8">{item}</h2>
        <div className="bg-white border rounded-3xl p-12 flex flex-col items-center justify-center min-h-[400px]">
          <div className="text-7xl mb-6">⚡</div>
          <h3 className="text-2xl font-medium">Workflow Editor</h3>
          <p className="text-zinc-500 mt-2">
            Your datasets and assets are shown here
          </p>
          <button className="mt-10 px-8 py-4 bg-black text-white rounded-2xl font-medium">
            Open Visual Builder
          </button>
        </div>
      </div>
    );
  }

  if (module === "builder") {
    return (
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8">{item}</h2>
        <div className="bg-white border rounded-3xl p-12 flex flex-col items-center justify-center min-h-[400px]">
          <div className="text-7xl mb-6">⚡</div>
          <h3 className="text-2xl font-medium">Workflow Editor</h3>
          <p className="text-zinc-500 mt-2">
            Drag & drop nodes to build {item}
          </p>
          <button className="mt-10 px-8 py-4 bg-black text-white rounded-2xl font-medium">
            Open Visual Builder
          </button>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">{item}</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white border rounded-3xl p-8 col-span-2">
          <div className="text-sm text-zinc-500 mb-1">TOTAL REVENUE</div>
          <div className="text-5xl font-semibold">$124,892</div>
        </div>
        <div className="bg-white border rounded-3xl p-8">
          <div className="text-sm text-zinc-500 mb-1">ACTIVE USERS</div>
          <div className="text-5xl font-semibold">2,834</div>
        </div>
        {/* Add more widgets */}
      </div>
    </div>
  );
}
