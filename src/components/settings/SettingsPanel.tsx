import React from "react";
import { DEFAULT_SETTINGS, type FrameSettings } from "../../types";
import { TabNavigation, type TabId } from "../ui/TabNavigation";
import { LayoutTab } from "./tabs/LayoutTab";
import { CropTab } from "./tabs/CropTab";
import { FrameTab } from "./tabs/FrameTab";
import { BackgroundTab } from "./tabs/BackgroundTab";
import { InfoTab } from "./tabs/InfoTab";
import { ExportTab } from "./tabs/ExportTab";
import { Trash2 } from "lucide-react";

interface SettingsPanelProps {
  settings: FrameSettings;
  setSettings: React.Dispatch<React.SetStateAction<FrameSettings>>;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  onSaveEdit: () => void;
  zoom: number;
  setZoom: (val: number) => void;
  rotation: number;
  setRotation: (val: number) => void;
  flip: { horizontal: boolean; vertical: boolean };
  setFlip: (val: { horizontal: boolean; vertical: boolean }) => void;
  aspect: number | undefined;
  setAspect: (val: number | undefined) => void;
  exifCamera?: string;
  onRemoveImage: () => void;
}

export default function SettingsPanel({
  settings,
  setSettings,
  isEditing,
  setIsEditing,
  onSaveEdit,
  zoom,
  setZoom,
  rotation,
  setRotation,
  flip,
  setFlip,
  aspect,
  setAspect,
  exifCamera,
  onRemoveImage,
}: SettingsPanelProps) {
  const [activeTab, setActiveTab] = React.useState<TabId>("layout");
  const saveTimerRef = React.useRef<number | null>(null);

  const update = <K extends keyof FrameSettings>(
    key: K,
    value: FrameSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetInfo = () => {
    setSettings((prev) => ({
      ...prev,
      showExif: DEFAULT_SETTINGS.showExif,
      infoLayout: DEFAULT_SETTINGS.infoLayout,
      infoPadding: DEFAULT_SETTINGS.infoPadding,
      infoGap: DEFAULT_SETTINGS.infoGap,
      selectedCameraPresetId: null,
      customExif: {},
      line1Style: { ...DEFAULT_SETTINGS.line1Style },
      line2Style: { ...DEFAULT_SETTINGS.line2Style },
    }));
  };

  React.useEffect(
    () => () => {
      if (saveTimerRef.current !== null) {
        window.clearTimeout(saveTimerRef.current);
      }
    },
    []
  );

  const handleTabChange = (id: TabId) => {
    // If leaving crop tab while editing, save the edit
    if (isEditing && activeTab === "crop" && id !== "crop") {
      setActiveTab(id);
      // Defer saving to ensure state updates and allow tab animation to start smoothly
      // Using 350ms to let the UI settle before the heavy image processing kicks in
      if (saveTimerRef.current !== null) {
        window.clearTimeout(saveTimerRef.current);
      }
      saveTimerRef.current = window.setTimeout(() => onSaveEdit(), 350);
      return;
    }
    setActiveTab(id);
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      onSaveEdit();
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="w-full lg:w-80 flex flex-col bg-neutral-900 rounded-xl border border-neutral-800 h-[650px] overflow-hidden shadow-xl">
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-neutral-700">
        <div key={activeTab} className="h-full">
          {activeTab === "layout" && (
            <LayoutTab settings={settings} update={update} />
          )}

          {activeTab === "crop" && (
            <CropTab
              settings={settings}
              isEditing={isEditing}
              onToggleEdit={handleToggleEdit}
              aspect={aspect}
              setAspect={setAspect}
              rotation={rotation}
              setRotation={setRotation}
              zoom={zoom}
              setZoom={setZoom}
              flip={flip}
              setFlip={setFlip}
            />
          )}

          {activeTab === "frame" && (
            <FrameTab settings={settings} update={update} />
          )}

          {activeTab === "bg" && (
            <BackgroundTab settings={settings} update={update} />
          )}

          {activeTab === "info" && (
            <InfoTab
              settings={settings}
              update={update}
              setSettings={setSettings}
              exifCamera={exifCamera}
              resetInfo={resetInfo}
            />
          )}

          {activeTab === "export" && (
            <ExportTab settings={settings} update={update} />
          )}
        </div>
      </div>

      <div className="p-4 border-t border-neutral-800 bg-neutral-900/50 backdrop-blur-sm z-50">
        <button
          onClick={onRemoveImage}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition-all group active:scale-95"
        >
          <Trash2 className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span className="text-xs font-bold uppercase tracking-widest">
            移除照片
          </span>
        </button>
      </div>
    </div>
  );
}
