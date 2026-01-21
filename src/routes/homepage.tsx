import { useState } from "react";

import "../App.css";
import axios from "axios";
import { createFileRoute } from "@tanstack/react-router";
import Notebook from "@/components/Notebook";
import Workflow from "@/components/Workflow";
import Dashboard from "@/components/Dashboard";

type Module = "dashboard" | "notebook" | "workflow";

const moduleActions: Record<Module, string[]> = {
  dashboard: ["Refresh Data", "Add Widget", "Export Report"],
  notebook: ["New Section", "Insert Image", "Bold", "Italic", "Export PDF"],
  workflow: [
    "Add Trigger",
    "Add Action",
    "Add Condition",
    "Run Workflow",
    "Deploy",
  ],
};

const ModuleComponents: Record<Module, React.ComponentType> = {
  dashboard: Dashboard,
  notebook: Notebook,
  workflow: Workflow,
};

export const Route = createFileRoute("/homepage")({
  component: HomePage,
});

function HomePage() {
  const [currentModule, setCurrentModule] = useState<Module>("dashboard");

  const CurrentComponent = ModuleComponents[currentModule];

  // const [count, setCount] = useState(0)

  // const [resp, setResp] = useState<any>(null);

  // const fetchKortecx = () => {
  //   axios.get('/kortecx')
  //     .then(response => {
  //       setResp(response); // Access the actual data here
  //       // Handle success, update state, etc.
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //       // Handle errors (network issues, 404, etc.)
  //     });
  // };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top Navbar */}
      <nav className="h-14 bg-white border-b flex items-center px-6 justify-between">
        <div className="flex items-center gap-x-8">
          {(["dashboard", "notebook", "workflow"] as Module[]).map((mod) => (
            <button
              key={mod}
              onClick={() => setCurrentModule(mod)}
              className={`px-5 py-2 text-sm font-medium transition-colors relative
                ${
                  currentModule === mod
                    ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-600"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
            >
              {mod.charAt(0).toUpperCase() + mod.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-x-4">
          <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
            New Page
          </button>
          <div className="w-8 h-8 bg-zinc-200 rounded-full" />
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Navbar - Dynamic Buttons */}
        <aside className="w-64 bg-white border-r overflow-y-auto">
          <div className="p-4">
            <div className="uppercase text-[10px] font-semibold tracking-widest text-zinc-500 mb-3 px-3">
              {currentModule.toUpperCase()} ACTIONS
            </div>

            <div className="space-y-0.5">
              {moduleActions[currentModule].map((action) => (
                <button
                  key={action}
                  className="w-full text-left px-3 py-2.5 text-sm hover:bg-zinc-100 rounded-lg transition-colors flex items-center gap-3"
                >
                  <span className="text-zinc-400">•</span>
                  {action}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Middle Content Area */}
        <main className="flex-1 overflow-auto bg-zinc-50">
          <CurrentComponent />
        </main>
      </div>
    </div>
  );
}

export default HomePage;
