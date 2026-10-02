import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiBriefcase,
  FiCpu,
  FiBookOpen,
  FiMail,
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
import "./TopFloatingNav.css";

const TopFloatingNav = ({
  selectedColor,
  setSelectedColor,
  colorMode = "auto",
  setColorMode,
  cursorStyle = "glow-dot",
  setCursorStyle,
  isDarkMode,
  setIsDarkMode,
  themeColors,
  onOpenFastPitch,
  onOpenCommandPalette,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Home", icon: <FiHome /> },
    { to: "/experience", label: "Experience", icon: <FiBriefcase /> },
    { to: "/skills", label: "Skills", icon: <FiCpu /> },
    { to: "/blog", label: "Blogs", icon: <FiBookOpen /> },
    { to: "/contact", label: "Contact", icon: <FiMail /> },
  ];

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
    <header className="vcard-top-nav-wrapper" aria-label="Main Navigation">
      {/* Floating System Controls (Top Right Corner) */}
      <div className="vcard-system-controls">
        {/* Command Palette Quick Trigger */}
        <button
          className="system-circle-btn cmd-palette-trigger interactive"
          onClick={() => {
            sound.playClick();
            if (onOpenCommandPalette) onOpenCommandPalette();
          }}
          onMouseEnter={() => sound.playHover()}
          title="Open Command Palette (Ctrl+K / ⌘K)"
          aria-label="Open Command Palette"
        >
          <span className="cmd-symbol">⌘K</span>
        </button>

        {/* Sound Toggle */}
        <button
          className="system-circle-btn interactive"
          onClick={toggleSound}
          onMouseEnter={() => sound.playHover()}
          title={soundEnabled ? "Mute Sound FX" : "Enable Sound FX"}
          aria-label="Toggle Sound"
        >
          {soundEnabled ? (
            <FiVolume2 style={{ color: selectedColor }} />
          ) : (
            <FiVolumeX />
          )}
        </button>

        {/* Combined Theme Color & Cursor Settings Orb */}
        <div className="palette-orb-anchor">
          <button
            className="system-circle-btn interactive"
            onClick={() => {
              sound.playClick();
              setIsSettingsOpen(!isSettingsOpen);
            }}
            onMouseEnter={() => sound.playHover()}
            title="Theme Color & Cursor Options"
            aria-label="Theme & Cursor Options"
          >
            <span
              className="color-dot"
              style={{
                backgroundColor: selectedColor,
                boxShadow: `0 0 8px ${selectedColor}`,
              }}
            />
          </button>

          {/* Settings Popover */}
          <AnimatePresence>
            {isSettingsOpen && (
              <motion.div
                className="palette-popup-card"
                initial={{ opacity: 0, y: 8, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.92 }}
                transition={{ duration: 0.2 }}
              >
                {/* 1. Theme Accent Color Section */}
                <div className="popover-section-header">
                  <span>Theme Accent</span>
                  <button
                    className={`auto-daily-badge ${colorMode === "auto" ? "active" : ""}`}
                    onClick={() => {
                      sound.playClick();
                      if (setColorMode) setColorMode("auto");
                    }}
                    title="Automatically rotate signature accent color daily"
                  >
                    <HiSparkles />
                    <span>{colorMode === "auto" ? "Daily Auto (Active)" : "Auto Daily"}</span>
                  </button>
                </div>

                <div className="palette-grid">
                  {themeColors?.map((c) => (
                    <button
                      key={c.hex}
                      className={`palette-chip interactive ${
                        colorMode === "custom" && selectedColor === c.hex
                          ? "active-chip"
                          : ""
                      }`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => {
                        sound.playClick();
                        if (setSelectedColor) setSelectedColor(c.hex);
                        if (setColorMode) setColorMode("custom");
                      }}
                      onMouseEnter={() => sound.playHover()}
                      title={c.name}
                    />
                  ))}
                </div>

                <div className="popover-divider" />

                {/* 2. Cursor Style Section */}
                <div className="popover-section-header">
                  <span>Cursor Options</span>
                </div>

                <div className="cursor-options-grid">
                  {cursorOptions.map((opt) => (
                    <button
                      key={opt.id}
                      className={`cursor-option-btn interactive ${
                        cursorStyle === opt.id ? "active" : ""
                      }`}
                      onClick={() => {
                        sound.playClick();
                        if (setCursorStyle) setCursorStyle(opt.id);
                      }}
                      onMouseEnter={() => sound.playHover()}
                      title={`Switch to ${opt.name} cursor`}
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

        {/* Dark/Light Mode Circular Button */}
        <button
          className="system-circle-btn theme-toggle-btn interactive"
          onClick={toggleTheme}
          onMouseEnter={() => sound.playHover()}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle Dark/Light Mode"
        >
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>

      {/* Floating Main Tabs Bar */}
      <nav className="vcard-tabs-bar">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || (item.to === "/" && location.pathname === "/about");

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`vcard-tab-item interactive ${isActive ? "active" : ""}`}
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  className="active-tab-indicator"
                  style={{ backgroundColor: selectedColor }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {isActive && (
                <div
                  className="active-tab-top-glow"
                  style={{ backgroundColor: selectedColor, color: selectedColor }}
                />
              )}
              <span className="tab-icon">
                {item.icon}
              </span>
              <span className="tab-label">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
};

export default TopFloatingNav;
