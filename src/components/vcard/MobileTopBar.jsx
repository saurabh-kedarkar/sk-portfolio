import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMoon,
  FiSun,
  FiVolume2,
  FiVolumeX,
  FiMousePointer,
  FiCrosshair,
  FiDisc,
  FiStar,
  FiArrowUpLeft,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { sound } from "../../utils/sound";
import "./MobileTopBar.css";

const MobileTopBar = ({
  selectedColor,
  setSelectedColor,
  colorMode = "auto",
  setColorMode,
  cursorStyle = "glow-dot",
  setCursorStyle,
  isDarkMode,
  setIsDarkMode,
  themeColors,
  onOpenCommandPalette,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const cursorOptions = [
    { id: "glow-dot", name: "Glow Dot", icon: <FiMousePointer /> },
    { id: "cyber-crosshair", name: "Crosshair", icon: <FiCrosshair /> },
    { id: "magnet-ring", name: "Aura Ring", icon: <FiDisc /> },
    { id: "trail-sparkle", name: "Sparkle", icon: <FiStar /> },
    { id: "classic-arrow", name: "Default", icon: <FiArrowUpLeft /> },
  ];

  const toggleSound = () => {
    const next = sound.toggle();
    setSoundEnabled(next);
  };

  const toggleTheme = () => {
    sound.playClick();
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="mobile-top-header" aria-label="Mobile Navigation Controls">
      {/* Brand Monogram */}
      <div
        className="mobile-brand-identity interactive"
        onClick={() => {
          sound.playClick();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        title="Scroll to Top"
      >
        <div
          className="brand-monogram-box"
          style={{
            borderColor: `${selectedColor}66`,
            color: selectedColor,
            boxShadow: `0 0 12px ${selectedColor}33`,
          }}
        >
          <span>SK</span>
          <span className="brand-pulse-pip" />
        </div>
      </div>

      {/* System Action Controls */}
      <div className="mobile-system-actions">
        {/* ⌘K Command Palette Trigger */}
        <button
          className="mobile-control-btn interactive"
          onClick={() => {
            sound.playClick();
            if (onOpenCommandPalette) onOpenCommandPalette();
          }}
          title="Command Palette (⌘K)"
          aria-label="Command Palette"
        >
          <span className="mobile-cmd-txt">⌘K</span>
        </button>

        {/* Sound Toggle */}
        <button
          className="mobile-control-btn interactive"
          onClick={toggleSound}
          title={soundEnabled ? "Mute Sound" : "Enable Sound"}
          aria-label="Toggle Sound"
        >
          {soundEnabled ? (
            <FiVolume2 style={{ color: selectedColor }} />
          ) : (
            <FiVolumeX />
          )}
        </button>

        {/* Color & Settings Palette */}
        <div className="mobile-palette-anchor">
          <button
            className="mobile-control-btn interactive"
            onClick={() => {
              sound.playClick();
              setIsPaletteOpen(!isPaletteOpen);
            }}
            title="Theme Palette"
            aria-label="Change Color"
          >
            <span
              className="mobile-color-dot"
              style={{
                backgroundColor: selectedColor,
                boxShadow: `0 0 8px ${selectedColor}`,
              }}
            />
          </button>

          {/* Color & Cursor Popover */}
          <AnimatePresence>
            {isPaletteOpen && (
              <motion.div
                className="mobile-palette-pop"
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ duration: 0.18 }}
              >
                {/* 1. Accent Color */}
                <div className="popover-section-header">
                  <span>Theme Accent</span>
                  <button
                    className={`auto-daily-badge ${colorMode === "auto" ? "active" : ""}`}
                    onClick={() => {
                      sound.playClick();
                      if (setColorMode) setColorMode("auto");
                    }}
                  >
                    <HiSparkles />
                    <span>{colorMode === "auto" ? "Daily Auto" : "Auto Daily"}</span>
                  </button>
                </div>

                <div className="mobile-palette-row">
                  {themeColors?.map((c) => (
                    <button
                      key={c.hex}
                      className={`mobile-palette-chip ${
                        colorMode === "custom" && selectedColor === c.hex ? "active" : ""
                      }`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => {
                        sound.playClick();
                        if (setSelectedColor) setSelectedColor(c.hex);
                        if (setColorMode) setColorMode("custom");
                      }}
                      title={c.name}
                    />
                  ))}
                </div>

                <div className="popover-divider" />

                {/* 2. Cursor Style */}
                <div className="popover-section-header">
                  <span>Cursor Style</span>
                </div>

                <div className="cursor-options-grid">
                  {cursorOptions.map((opt) => (
                    <button
                      key={opt.id}
                      className={`cursor-option-btn ${
                        cursorStyle === opt.id ? "active" : ""
                      }`}
                      onClick={() => {
                        sound.playClick();
                        if (setCursorStyle) setCursorStyle(opt.id);
                      }}
                    >
                      {opt.icon}
                      <span>{opt.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Toggle */}
        <button
          className="mobile-control-btn interactive"
          onClick={toggleTheme}
          title={isDarkMode ? "Light Mode" : "Dark Mode"}
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </header>
  );
};

export default MobileTopBar;
