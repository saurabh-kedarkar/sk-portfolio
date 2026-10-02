import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiHome,
  FiFileText,
  FiFolder,
  FiEdit3,
  FiMail,
  FiZap,
  FiDownload,
  FiMoon,
  FiSun,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";
import { FaWhatsapp, FaGithub, FaLinkedinIn } from "react-icons/fa";

import { sound } from "../../utils/sound";
import { triggerConfetti } from "../../utils/confetti";
import "./CommandPalette.css";

const CommandPalette = ({
  isOpen,
  onClose,
  selectedColor,
  setSelectedColor,
  isDarkMode,
  setIsDarkMode,
  onOpenFastPitch,
  themeColors,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  const commandList = [
    {
      id: "home",
      icon: <FiHome />,
      title: "Go to Home / About Me",
      category: "Navigation",
      action: () => {
        navigate("/");
        onClose();
      },
    },
    {
      id: "experience",
      icon: <FiFileText />,
      title: "Go to Experience & Career Timeline",
      category: "Navigation",
      action: () => {
        navigate("/experience");
        onClose();
      },
    },
    {
      id: "skills",
      icon: <FiZap />,
      title: "Explore Skills & Tech Stack",
      category: "Navigation",
      action: () => {
        navigate("/skills");
        onClose();
      },
    },
    {
      id: "projects",
      icon: <FiFolder />,
      title: "Explore Featured Projects",
      category: "Navigation",
      action: () => {
        navigate("/projects");
        onClose();
      },
    },
    {
      id: "blog",
      icon: <FiEdit3 />,
      title: "Read Engineering Articles",
      category: "Navigation",
      action: () => {
        navigate("/blog");
        onClose();
      },
    },
    {
      id: "contact",
      icon: <FiMail />,
      title: "Contact & Send Inquiry",
      category: "Navigation",
      action: () => {
        navigate("/contact");
        onClose();
      },
    },
    {
      id: "fastpitch",
      icon: <FiZap style={{ color: "#f59e0b" }} />,
      title: "Launch Instant Fast Pitch Modal",
      category: "Direct Actions",
      action: () => {
        onClose();
        if (onOpenFastPitch) onOpenFastPitch();
      },
    },
    {
      id: "download_cv",
      icon: <FiDownload style={{ color: "#10b981" }} />,
      title: "Download Saurabh's Resume PDF",
      category: "Direct Actions",
      action: () => {
        triggerConfetti(0.5, 0.5);
        sound.playCelebration();
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Saurabh_Kedarkar_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onClose();
      },
    },
    {
      id: "whatsapp",
      icon: <FaWhatsapp style={{ color: "#25d366" }} />,
      title: "Chat directly on WhatsApp",
      category: "Connect",
      action: () => {
        window.open(
          "https://wa.me/917038933292?text=Hi%20Saurabh!%20I%20came%20across%20your%20portfolio.",
          "_blank"
        );
        onClose();
      },
    },
    {
      id: "github",
      icon: <FaGithub />,
      title: "View GitHub Profile & Repos",
      category: "Connect",
      action: () => {
        window.open("https://github.com/SaurabhKedarkar123", "_blank");
        onClose();
      },
    },
    {
      id: "linkedin",
      icon: <FaLinkedinIn style={{ color: "#0ea5e9" }} />,
      title: "View LinkedIn Professional Profile",
      category: "Connect",
      action: () => {
        window.open(
          "https://www.linkedin.com/in/saurabh-kedarkar-890288219/",
          "_blank"
        );
        onClose();
      },
    },
    {
      id: "theme_toggle",
      icon: isDarkMode ? <FiSun /> : <FiMoon />,
      title: isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode",
      category: "Preferences",
      action: () => {
        sound.playClick();
        setIsDarkMode(!isDarkMode);
        onClose();
      },
    },
    {
      id: "confetti",
      icon: <FiZap style={{ color: "#ec4899" }} />,
      title: "Trigger Confetti Celebration FX 🎉",
      category: "Fun & Effects",
      action: () => {
        triggerConfetti(0.5, 0.4);
        sound.playCelebration();
        onClose();
      },
    },
  ];

  const filteredCommands = commandList.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : 0
      );
      sound.playHover();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCommands.length - 1
      );
      sound.playHover();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        sound.playClick();
        filteredCommands[selectedIndex].action();
      }
    }
  };

  if (typeof document === "undefined") return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="palette-backdrop" onClick={onClose}>
          <motion.div
            className="palette-modal"
            initial={{ opacity: 0, scale: 0.94, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Search Input Bar */}
            <div className="palette-search-row">
              <FiSearch className="palette-search-icon" style={{ color: selectedColor }} />
              <input
                ref={inputRef}
                type="text"
                className="palette-input"
                placeholder="Type a command or jump to page... (or ↑↓ to navigate)"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
              />
              <span className="palette-esc-badge" onClick={onClose}>
                ESC
              </span>
            </div>

            {/* Color Accent Quick Picker Row */}
            <div className="palette-color-bar">
              <span className="palette-color-label">ACCENT COLOR</span>
              <div className="palette-color-bubbles">
                {themeColors?.map((c) => (
                  <button
                    key={c.hex}
                    className={`palette-color-dot ${
                      selectedColor === c.hex ? "active" : ""
                    }`}
                    style={{ backgroundColor: c.hex }}
                    onClick={() => {
                      sound.playClick();
                      setSelectedColor(c.hex);
                    }}
                    title={c.name}
                  >
                    {selectedColor === c.hex && <FiCheck className="color-active-check" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Results List */}
            <div className="palette-results-list">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => (
                  <div
                    key={cmd.id}
                    className={`palette-result-item interactive ${
                      selectedIndex === idx ? "active" : ""
                    }`}
                    onMouseEnter={() => {
                      setSelectedIndex(idx);
                      sound.playHover();
                    }}
                    onClick={() => {
                      sound.playClick();
                      cmd.action();
                    }}
                  >
                    <div
                      className="cmd-icon-wrap"
                      style={{
                        color: selectedIndex === idx ? selectedColor : undefined,
                      }}
                    >
                      {cmd.icon}
                    </div>
                    <div className="cmd-texts">
                      <span className="cmd-title">{cmd.title}</span>
                      <span className="cmd-category">{cmd.category}</span>
                    </div>
                    <div className="cmd-action-hint">
                      <FiArrowRight />
                    </div>
                  </div>
                ))
              ) : (
                <div className="palette-empty-state">
                  <span>No matching commands found for "{query}"</span>
                </div>
              )}
            </div>

            {/* Keyboard Footer Tip */}
            <div className="palette-footer-hud">
              <div className="hud-keys">
                <span><kbd>↑</kbd> <kbd>↓</kbd> navigate</span>
                <span><kbd>↵</kbd> select</span>
                <span><kbd>esc</kbd> close</span>
              </div>
              <span className="hud-brand">SAURABH KEDARKAR • PORTFOLIO HUD</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CommandPalette;
