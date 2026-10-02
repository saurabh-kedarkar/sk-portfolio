import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiFolder,
  FiCpu,
  FiBriefcase,
  FiMail,
  FiMoon,
  FiSun,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";
import { sound } from "../../utils/sound";
import "./MinimalIslandNav.css";

const MinimalIslandNav = ({
  selectedColor,
  setSelectedColor,
  isDarkMode,
  setIsDarkMode,
  themeColors,
}) => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: "hero", label: "Home", icon: <FiHome />, href: "/#hero" },
    { id: "projects", label: "Work", icon: <FiFolder />, href: "/#projects" },
    { id: "skills", label: "Skills", icon: <FiCpu />, href: "/#skills" },
    { id: "experience", label: "Journey", icon: <FiBriefcase />, href: "/#experience" },
    { id: "contact", label: "Contact", icon: <FiMail />, href: "/#contact" },
  ];

  // Scroll spy to highlight active section on the front page
  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const sections = ["hero", "projects", "skills", "experience", "contact"];
      const scrollPos = window.scrollY + 250;

      for (const sId of sections) {
        const el = document.getElementById(sId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleNavClick = (item) => {
    sound.playClick();
    setActiveSection(item.id);

    if (location.pathname === "/") {
      const el = document.getElementById(item.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const toggleTheme = () => {
    sound.playClick();
    setIsDarkMode(!isDarkMode);
  };

  const toggleSound = () => {
    const newState = sound.toggle();
    setSoundActive(newState);
  };

  const handleColorSelect = (hex) => {
    sound.playClick();
    setSelectedColor(hex);
    setIsPaletteOpen(false);
  };

  return (
    <nav className="minimal-island-wrapper" aria-label="Dynamic Navigation Island">
      <div className="minimal-island-container">
        {/* Brand SK Initials Pill */}
        <Link
          to="/#hero"
          className="island-brand-pill interactive"
          onClick={() => handleNavClick(navItems[0])}
        >
          <span className="island-brand-text" style={{ color: selectedColor }}>
            SK
          </span>
          <span className="island-live-dot" />
        </Link>

        <div className="island-divider" />

        {/* Section Links */}
        <div className="island-links-row">
          {navItems.map((item) => {
            const isActive =
              location.pathname === "/"
                ? activeSection === item.id
                : location.pathname === `/${item.id}`;

            return (
              <a
                key={item.id}
                href={item.href}
                className={`island-nav-link interactive ${isActive ? "active" : ""}`}
                onClick={(e) => {
                  if (location.pathname === "/") {
                    e.preventDefault();
                    handleNavClick(item);
                  }
                }}
                onMouseEnter={() => sound.playHover()}
              >
                <span className="island-link-icon">{item.icon}</span>
                <span className="island-link-label">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="islandActiveGlow"
                    className="island-active-indicator"
                    style={{ backgroundColor: selectedColor }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="island-divider" />

        {/* Controls Pill: Sound, Theme, Color */}
        <div className="island-controls-group">
          {/* Sound Toggle */}
          <button
            className={`island-control-btn interactive ${soundActive ? "active" : ""}`}
            onClick={toggleSound}
            title={soundActive ? "Mute Sound Effects" : "Enable Sound Effects"}
            aria-label="Toggle Sound"
          >
            {soundActive ? <FiVolume2 /> : <FiVolumeX />}
          </button>

          {/* Theme Toggle */}
          <button
            className="island-control-btn interactive"
            onClick={toggleTheme}
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>

          {/* Color Switcher */}
          <div className="island-palette-anchor">
            <button
              className="island-control-btn interactive"
              onClick={() => {
                sound.playClick();
                setIsPaletteOpen(!isPaletteOpen);
              }}
              title="Change Theme Accent"
              aria-label="Change Theme Accent"
            >
              <span
                className="island-color-dot"
                style={{ backgroundColor: selectedColor }}
              />
            </button>

            {/* Color Palette Popover */}
            <AnimatePresence>
              {isPaletteOpen && (
                <motion.div
                  className="island-palette-popover"
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="island-palette-grid">
                    {themeColors.map((c) => (
                      <button
                        key={c.hex}
                        className={`island-swatch interactive ${
                          c.hex === selectedColor ? "selected" : ""
                        }`}
                        style={{ backgroundColor: c.hex }}
                        onClick={() => handleColorSelect(c.hex)}
                        title={c.name}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MinimalIslandNav;
