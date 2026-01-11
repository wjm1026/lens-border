import React from "react";
import { Layout, Box, Type, Palette, Download, Crop } from "lucide-react";

export type TabId = "layout" | "crop" | "frame" | "bg" | "info" | "export";

export const TABS = [
  { id: "layout", icon: Layout, label: "布局" },
  { id: "crop", icon: Crop, label: "裁切" },
  { id: "frame", icon: Box, label: "边框" },
  { id: "bg", icon: Palette, label: "背景" },
  { id: "info", icon: Type, label: "信息" },
  { id: "export", icon: Download, label: "导出" },
] as const;

interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const activeIndex = TABS.findIndex((t) => t.id === activeTab);

  return (
    <div className="relative flex border-b border-neutral-800 isolate bg-neutral-900/50 backdrop-blur-sm z-50">
      {/* Sliding Background Tab */}
      <div
        className="absolute inset-y-0 z-0 bg-white/5 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{
          width: `${100 / TABS.length}%`,
          left: `${(activeIndex / TABS.length) * 100}%`,
        }}
      />
      {/* Sliding Bottom Indicator */}
      <div
        className="absolute bottom-0 z-20 h-0.5 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{
          width: `${100 / TABS.length}%`,
          left: `${(activeIndex / TABS.length) * 100}%`,
        }}
      >
        <div className="mx-auto w-8 h-full bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
      </div>

      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as TabId)}
          className={`relative z-10 flex-1 py-4 flex flex-col items-center gap-1.5 transition-all duration-300 group outline-none
            ${
              activeTab === tab.id
                ? "text-blue-400"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
        >
          <tab.icon
            className={`w-5 h-5 transition-transform duration-300 ${
              activeTab === tab.id ? "scale-110" : "group-hover:scale-105"
            }`}
          />
          <span className="text-[9px] uppercase tracking-[0.15em] font-bold">
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};
