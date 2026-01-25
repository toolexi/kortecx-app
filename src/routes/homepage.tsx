import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios"; // if still needed
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LayoutDashboard,
  NotebookText,
  WorkflowIcon,
  BlocksIcon,
  FolderTree,
  PocketKnife,
} from "lucide-react";
import kortecx_logo from "../assets/kortecx_icon.png";

import Notebook from "@/components/Notebook";
import Workflow from "@/components/Workflow";
import Dashboard from "@/components/Dashboard";
import ContentArea from "@/components/ContentArea";

export const Route = createFileRoute("/homepage")({
  component: HomePage,
});

type Module = "dashboard" | "notebook" | "assets" | "mcp" | "workflow" | "builder";

const moduleItems: Record<Module, string[]> = {
  dashboard: [
    "Sales Overview",
    "User Analytics",
    "Marketing KPI",
    "Revenue Trend",
  ],
  notebook: ["Meeting Notes", "Project Ideas", "Research Paper", "Q1 Planning"],
  workflow: [
    "Onboarding Flow",
    "Payment Processing",
    "Email Campaign",
    "Support Ticket",
  ],
  builder: ["Builder page", "xyflow"],
  assets: ["tokenize", "upload files", "generate embeddings"],
  mcp: ["servers", "tools"]
};

const moduleActions: Record<Module, string[]> = {
  dashboard: ["Refresh Data", "Add Widget", "Export Report", "Share"],
  notebook: ["New Section", "Insert Image", "Bold", "Italic", "Export PDF"],
  assets: ["vector space", "synthesize datasets"],
  workflow: ["Add Trigger", "Add Action", "Add Condition", "Run", "Deploy"],
  builder: ["add workflow", "create pipeline"],
  mcp: ["add tool", "create server"]
};

export default function HomePage() {
  const [currentModule, setCurrentModule] = useState<Module>("notebook");
  const [currentItem, setCurrentItem] = useState<string>(
    moduleItems.notebook[0],
  );
  const [items, setItems] = useState<Record<Module, string[]>>(moduleItems);

  const [isExpanded, setIsExpanded] = useState(true); // Desktop collapse
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile overlay

  useEffect(() => {
    if (items[currentModule].length > 0) {
      setCurrentItem(items[currentModule][0]);
    }
  }, [currentModule, items]);

  const handleModuleChange = (mod: Module) => {
    setCurrentModule(mod);
    if (window.innerWidth < 1024) setIsMobileOpen(false); // auto-close on mobile
  };

  const addNewItem = () => {
    const newItemName = `New ${currentModule === "notebook" ? "Notebook" : currentModule === "workflow" ? "Workflow" : currentModule === "assets" ? "Assets" : currentModule === "builder" ? "Builder"  : currentModule === "mcp" ? "MCP" : "Dashboard"} ${items[currentModule].length + 1}`;
    setItems((prev) => ({
      ...prev,
      [currentModule]: [...prev[currentModule], newItemName],
    }));
    setCurrentItem(newItemName);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50">
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-white border-r
          transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          w-72 lg:w-auto
          ${isExpanded ? "lg:w-64" : "lg:w-16"}
        `}
      >
        {/* Top Bar with Toggle */}
        <div className="h-14 border-b flex items-center px-5">
          <div className="flex-1 flex items-center gap-3">
            {/* Logo / App Name (visible when expanded or on mobile) */}
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <span className="text-white font-bold">
                <Link to="/">
                  <img src={kortecx_logo} alt="Kortecx Logo" />
                  {/* <span className="text-base md:text-lg">Kortecx</span> */}
                </Link>
              </span>
            </div>
            {(isExpanded || isMobileOpen) && (
              <span className="font-semibold text-lg tracking-tight">
                Kortecx
              </span>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden lg:block p-2 hover:bg-zinc-100 rounded-xl text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            {isExpanded ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 text-zinc-600 hover:text-zinc-900"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modules Section */}
        <div className="p-6 flex-1 overflow-auto">
          <div className="uppercase text-[10px] font-semibold tracking-widest text-zinc-500 mb-4">
            MODULES
          </div>
          <div className="space-y-1">
            {(
              [
                "dashboard",
                "notebook",
                "assets",
                "mcp",
                "workflow",
                "builder",
              ] as Module[]
            ).map((mod) => (
              <button
                key={mod}
                onClick={() => handleModuleChange(mod)}
                title={
                  !isExpanded
                    ? mod.charAt(0).toUpperCase() + mod.slice(1)
                    : undefined
                }
                className={`
                  w-full flex items-center rounded-xl text-sm font-medium py-3 transition-all
                  ${
                    isExpanded || isMobileOpen
                      ? "px-4 gap-3 text-left"
                      : "lg:px-3 lg:justify-center"
                  }
                  ${
                    currentModule === mod
                      ? "bg-blue-50 text-blue-700 shadow-sm"
                      : "hover:bg-zinc-100 text-zinc-700"
                  }
                `}
              >
                {/* <span className="text-2xl flex-shrink-0">
                  {mod === "dashboard"
                    ? "📊"
                    : mod === "notebook"
                      ? "📝"
                      : "⚡"}
                </span> */}
                <span className="text-2xl flex-shrink-0">
                  {mod === "dashboard" ? (
                    <LayoutDashboard size={28} />
                  ) : mod === "notebook" ? (
                    <NotebookText size={28} />
                  ) : mod === "mcp" ? (
                    <PocketKnife size={28} />
                  ) : mod === "assets" ? (
                    <FolderTree size={28} />
                  ) : mod === "workflow" ? (
                    <WorkflowIcon size={28} />
                  ) : (
                    <BlocksIcon size={28} />
                  )}
                </span>
                {(isExpanded || isMobileOpen) && (
                  <span className="font-medium whitespace-nowrap">
                    {mod.charAt(0).toUpperCase() + mod.slice(1)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t mx-6 ${!isExpanded && "lg:hidden"}`} />

        {/* Actions Section - Hidden when collapsed on desktop */}
        <div
          className={`p-6 flex-1 overflow-auto ${!isExpanded && "lg:hidden"}`}
        >
          <div className="uppercase text-[10px] font-semibold tracking-widest text-zinc-500 mb-4 px-1">
            {currentModule.toUpperCase()} ACTIONS
          </div>
          <div className="space-y-0.5">
            {moduleActions[currentModule].map((action) => (
              <button
                key={action}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-zinc-100 rounded-lg transition-colors flex items-center gap-3"
              >
                <span className="text-zinc-400">•</span>
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="h-14 border-b bg-white flex items-center px-6 gap-4">
          {/* Mobile: Hamburger + Module Name */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-1.5 -ml-1.5 text-zinc-700"
            >
              <Menu size={24} />
            </button>
            <div className="font-semibold text-zinc-800 capitalize">
              {currentModule}
            </div>
          </div>

          {/* Items / Tabs */}
          <div className="flex-1 flex items-center gap-1 overflow-x-auto scrollbar-hide min-w-0">
            {items[currentModule].map((item) => (
              <button
                key={item}
                onClick={() => setCurrentItem(item)}
                className={`px-5 py-2 text-sm whitespace-nowrap border-b-2 transition-colors font-medium
                  ${
                    currentItem === item
                      ? "border-blue-600 text-blue-700"
                      : "border-transparent text-zinc-600 hover:text-zinc-900 hover:border-zinc-200"
                  }`}
              >
                {item}
              </button>
            ))}

            <button
              onClick={addNewItem}
              className="ml-3 px-4 py-1.5 text-xs font-medium border border-dashed border-zinc-300 rounded-lg hover:border-zinc-400 flex items-center gap-1 text-zinc-600 hover:text-zinc-800 flex-shrink-0"
            >
              <span>+</span>
              <span>New</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <ContentArea module={currentModule} item={currentItem} />
        </div>
      </div>
    </div>
  );
}
