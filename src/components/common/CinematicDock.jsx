import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiUser,
  FiLayers,
  FiCpu,
  FiBookOpen,
  FiSend,
  FiVolume2,
  FiVolumeX,
  FiMoon,
  FiSun,
  FiCommand,
} from "react-icons/fi";
import { sound } from "../../utils/sound";
import "./CinematicDock.css";

const CinematicDock = ({
  selectedColor,
  setSelectedColor,
  isDarkMode,
  setIsDarkMode,
  themeColors,
  onOpenCommand,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const location = useLocation();

  // Scroll spy on homepage
  useEffect(() => {
    if (location.pathname !== "/") {
      if (location.pathname.startsWith("/about")) setActiveTab("story");
      else if (location.pathname.startsWith("/projects")) setActiveTab("showcase");
      else if (location.pathname.startsWith("/skills")) setActiveTab("arsenal");
      else if (location.pathname.startsWith("/blog")) setActiveTab("blog");
      else if (location.pathname.startsWith("/contact")) setActiveTab("contact");
      return;
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY + 350;
      const sections = [
        { id: "hero", tab: "home" },
        { id: "story", tab: "story" },
        { id: "showcase", tab: "showcase" },
        { id: "skills", tab: "arsenal" },
        { id: "contact", tab: "contact" },
      ];

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(sec.tab);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleNav = (tab, hash, route) => {
    sound.playClick();
    setActiveTab(tab);

    if (location.pathname === "/" && hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const toggleSound = () => {
    const next = sound.toggle();
    setSoundEnabled(next);
  };

  const toggleTheme = () => {
    sound.playClick();
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="cinematic-dock-wrapper" aria-label="VisionOS Cyber Dock">
      <div className="cinematic-dock-container">
        {/* Main Navigation Items */}
        <div className="dock-nav-group">
          {/* Home */}
          <Link
            to="/#hero"
            className={`dock-btn interactive ${activeTab === "home" ? "active" : ""}`}
            onClick={() => handleNav("home", "#hero", "/")}
            onMouseEnter={() => sound.playHover()}
            data-tooltip="Home Core"
          >
            <FiHome className="dock-icon" />
            {activeTab === "home" && (
              <motion.span
                layoutId="activeDockPip"
                className="dock-active-pip"
                style={{ backgroundColor: selectedColor }}
              />
            )}
          </Link>

          {/* Story / About */}
          <Link
            to={location.pathname === "/" ? "/#story" : "/about"}
            className={`dock-btn interactive ${activeTab === "story" ? "active" : ""}`}
            onClick={() => handleNav("story", "#story", "/about")}
            onMouseEnter={() => sound.playHover()}
            data-tooltip="Origin & Story"
          >
            <FiUser className="dock-icon" />
            {activeTab === "story" && (
              <motion.span
                layoutId="activeDockPip"
                className="dock-active-pip"
                style={{ backgroundColor: selectedColor }}
              />
            )}
          </Link>

          {/* Showcase / Projects */}
          <Link
            to={location.pathname === "/" ? "/#showcase" : "/projects"}
            className={`dock-btn interactive ${activeTab === "showcase" ? "active" : ""}`}
            onClick={() => handleNav("showcase", "#showcase", "/projects")}
            onMouseEnter={() => sound.playHover()}
            data-tooltip="Selected Works"
          >
            <FiLayers className="dock-icon" />
            {activeTab === "showcase" && (
              <motion.span
                layoutId="activeDockPip"
                className="dock-active-pip"
                style={{ backgroundColor: selectedColor }}
              />
            )}
          </Link>

          {/* Arsenal / Skills */}
          <Link
            to={location.pathname === "/" ? "/#skills" : "/skills"}
            className={`dock-btn interactive ${activeTab === "arsenal" ? "active" : ""}`}
            onClick={() => handleNav("arsenal", "#skills", "/skills")}
            onMouseEnter={() => sound.playHover()}
            data-tooltip="Tech Arsenal"
          >
            <FiCpu className="dock-icon" />
            {activeTab === "arsenal" && (
              <motion.span
                layoutId="activeDockPip"
                className="dock-active-pip"
                style={{ backgroundColor: selectedColor }}
              />
            )}
          </Link>

          {/* Dispatches / Blog */}
          <Link
            to="/blog"
            className={`dock-btn interactive ${activeTab === "blog" ? "active" : ""}`}
            onClick={() => handleNav("blog", null, "/blog")}
            onMouseEnter={() => sound.playHover()}
            data-tooltip="Tech Journal"
          >
            <FiBookOpen className="dock-icon" />
            {activeTab === "blog" && (
              <motion.span
                layoutId="activeDockPip"
                className="dock-active-pip"
                style={{ backgroundColor: selectedColor }}
              />
            )}
          </Link>

          {/* Transmission / Contact */}
          <Link
            to={location.pathname === "/" ? "/#contact" : "/contact"}
            className={`dock-btn interactive ${activeTab === "contact" ? "active" : ""}`}
            onClick={() => handleNav("contact", "#contact", "/contact")}
            onMouseEnter={() => sound.playHover()}
            data-tooltip="Transmission"
          >
            <FiSend className="dock-icon" />
            {activeTab === "contact" && (
              <motion.span
                layoutId="activeDockPip"
                className="dock-active-pip"
                style={{ backgroundColor: selectedColor }}
              />
            )}
          </Link>
        </div>

        {/* Separator */}
        <div className="dock-separator" />

        {/* System Controls */}
        <div className="dock-controls-group">
          {/* SFX Toggle */}
          <button
            className={`dock-btn interactive ${soundEnabled ? "sfx-on" : ""}`}
            onClick={toggleSound}
            onMouseEnter={() => sound.playHover()}
            data-tooltip={soundEnabled ? "Sound FX [Active]" : "Enable Sound FX"}
            aria-label="Toggle Sound Effects"
          >
            {soundEnabled ? (
              <FiVolume2 className="dock-icon" style={{ color: selectedColor }} />
            ) : (
              <FiVolumeX className="dock-icon" />
            )}
          </button>

          {/* Chromatic Palette Trigger */}
          <div className="dock-palette-anchor">
            <button
              className={`dock-btn interactive ${isPaletteOpen ? "palette-active" : ""}`}
              onClick={() => {
                sound.playClick();
                setIsPaletteOpen(!isPaletteOpen);
              }}
              onMouseEnter={() => sound.playHover()}
              data-tooltip="Color Accents"
              aria-label="Open Color Accents"
            >
              <div
                className="dock-palette-dot"
                style={{
                  backgroundColor: selectedColor,
                  boxShadow: `0 0 10px ${selectedColor}`,
                }}
              />
            </button>

            {/* Popup Palette */}
            <AnimatePresence>
              {isPaletteOpen && (
                <motion.div
                  className="dock-palette-popup"
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="palette-popup-title">SPECTRUM ACCENTS</span>
                  <div className="palette-colors-row">
                    {themeColors?.map((c) => (
                      <button
                        key={c.hex}
                        className={`dock-color-orb interactive ${
                          selectedColor === c.hex ? "selected" : ""
                        }`}
                        style={{ backgroundColor: c.hex }}
                        onClick={() => {
                          sound.playClick();
                          setSelectedColor(c.hex);
                          setIsPaletteOpen(false);
                        }}
                        onMouseEnter={() => sound.playHover()}
                        title={c.name}
                        aria-label={`Select ${c.name}`}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark / Light Toggle */}
          <button
            className="dock-btn interactive"
            onClick={toggleTheme}
            onMouseEnter={() => sound.playHover()}
            data-tooltip={isDarkMode ? "Light Mode" : "Dark Mode"}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <FiSun className="dock-icon" />
            ) : (
              <FiMoon className="dock-icon" />
            )}
          </button>

          {/* Quick Command Palette */}
          <button
            className="dock-btn interactive cmd-dock-btn"
            onClick={() => {
              sound.playClick();
              onOpenCommand();
            }}
            onMouseEnter={() => sound.playHover()}
            data-tooltip="Command Terminal (Ctrl+K)"
            aria-label="Command Terminal"
          >
            <FiCommand className="dock-icon" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default CinematicDock;
