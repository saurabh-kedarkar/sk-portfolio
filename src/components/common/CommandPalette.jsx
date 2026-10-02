import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiHome,
  FiUser,
  FiLayers,
  FiCpu,
  FiBookOpen,
  FiSend,
  FiVolume2,
  FiSliders,
  FiSun,
  FiMoon,
  FiFileText,
  FiCopy,
  FiCornerDownLeft,
} from "react-icons/fi";
import { sound } from "../../utils/sound";
import "./CommandPalette.css";

const CommandPalette = ({
  isOpen,
  onClose,
  selectedColor,
  setSelectedColor,
  isDarkMode,
  setIsDarkMode,
  themeColors,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const commands = [
    {
      id: "home",
      title: "Teleport: Home Core",
      subtitle: "Return to the main cyber terminal",
      icon: <FiHome />,
      category: "Navigation",
      action: () => {
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
    {
      id: "projects",
      title: "Teleport: Selected Works",
      subtitle: "View enterprise WordPress & React showcases",
      icon: <FiLayers />,
      category: "Navigation",
      action: () => {
        navigate("/projects");
      },
    },
    {
      id: "skills",
      title: "Teleport: Technical Arsenal",
      subtitle: "Explore frontend, backend & CMS mastery radar",
      icon: <FiCpu />,
      category: "Navigation",
      action: () => {
        navigate("/skills");
      },
    },
    {
      id: "about",
      title: "Teleport: Origin & Biography",
      subtitle: "Read Saurabh's career journey & credentials",
      icon: <FiUser />,
      category: "Navigation",
      action: () => {
        navigate("/about");
      },
    },
    {
      id: "blog",
      title: "Teleport: Tech Dispatches",
      subtitle: "Latest thoughts on web engineering & AI",
      icon: <FiBookOpen />,
      category: "Navigation",
      action: () => {
        navigate("/blog");
      },
    },
    {
      id: "contact",
      title: "Teleport: Direct Transmission",
      subtitle: "Reach out via terminal form, email or WhatsApp",
      icon: <FiSend />,
      category: "Navigation",
      action: () => {
        navigate("/contact");
      },
    },
    {
      id: "toggle-sound",
      title: "Toggle: Web Audio Sound FX",
      subtitle: "Mute or unmute procedural micro-clicks",
      icon: <FiVolume2 />,
      category: "Audio",
      action: () => {
        sound.toggle();
      },
    },
    {
      id: "toggle-ambient",
      title: "Toggle: Generative Ambient Soundscape",
      subtitle: "Engage cosmic drone frequency",
      icon: <FiSliders />,
      category: "Audio",
      action: () => {
        sound.toggleAmbient();
      },
    },
    {
      id: "toggle-theme",
      title: isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode",
      subtitle: "Invert luminance protocol",
      icon: isDarkMode ? <FiSun /> : <FiMoon />,
      category: "Interface",
      action: () => {
        setIsDarkMode(!isDarkMode);
      },
    },
    {
      id: "copy-email",
      title: "Copy Email: saurabhk2812@gmail.com",
      subtitle: "Instant 1-click clipboard transfer",
      icon: <FiCopy />,
      category: "Communication",
      action: () => {
        navigator.clipboard.writeText("saurabhk2812@gmail.com");
      },
    },
    {
      id: "download-cv",
      title: "Download Resume / Curriculum Vitae",
      subtitle: "PDF format • Updated 2026",
      icon: <FiFileText />,
      category: "Credentials",
      action: () => {
        window.open("/resume.pdf", "_blank");
      },
    },
  ];

  // Filter commands
  const filtered = commands.filter((cmd) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      setSelectedIndex(0);
      setQuery("");
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K and arrows)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else sound.playClick();
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        sound.playClick();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        sound.playHover();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        sound.playHover();
        setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          sound.playWarp();
          filtered[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="cmd-backdrop" onClick={onClose}>
          <motion.div
            className="cmd-modal"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Bar */}
            <div className="cmd-search-bar">
              <FiSearch className="cmd-search-icon" style={{ color: selectedColor }} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or jump to page..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="cmd-input"
              />
              <span className="cmd-esc-tag">ESC</span>
            </div>

            {/* Results List */}
            <div className="cmd-results-list">
              {filtered.length === 0 ? (
                <div className="cmd-empty-state">
                  <span>No matching commands found for "{query}"</span>
                </div>
              ) : (
                filtered.map((cmd, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <div
                      key={cmd.id}
                      className={`cmd-item interactive ${isSelected ? "selected" : ""}`}
                      onMouseEnter={() => {
                        sound.playHover();
                        setSelectedIndex(idx);
                      }}
                      onClick={() => {
                        sound.playWarp();
                        cmd.action();
                        onClose();
                      }}
                    >
                      <div
                        className="cmd-item-icon"
                        style={{ color: isSelected ? selectedColor : undefined }}
                      >
                        {cmd.icon}
                      </div>
                      <div className="cmd-item-info">
                        <span className="cmd-item-title">{cmd.title}</span>
                        <span className="cmd-item-sub">{cmd.subtitle}</span>
                      </div>
                      <span className="cmd-item-cat">{cmd.category}</span>
                      {isSelected && (
                        <div className="cmd-enter-hint">
                          <span>EXECUTE</span>
                          <FiCornerDownLeft />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Keyboard Guide */}
            <div className="cmd-footer-guide">
              <div className="cmd-guide-item">
                <kbd>↑</kbd> <kbd>↓</kbd> <span>Navigate</span>
              </div>
              <div className="cmd-guide-item">
                <kbd>↵</kbd> <span>Select</span>
              </div>
              <div className="cmd-guide-item">
                <kbd>ESC</kbd> <span>Dismiss</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
