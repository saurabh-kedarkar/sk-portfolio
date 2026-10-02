import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiCommand } from "react-icons/fi";
import { sound } from "../../utils/sound";
import ScrambleText from "./ScrambleText";
import "./CinematicHUDHeader.css";

const CinematicHUDHeader = ({
  selectedColor,
  onOpenMenu,
  onOpenCommand,
  isMenuOpen,
}) => {
  const [currentTime, setCurrentTime] = useState("");
  const [ambientActive, setAmbientActive] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat([], options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleAmbient = () => {
    sound.playClick();
    const active = sound.toggleAmbient();
    setAmbientActive(active);
  };

  return (
    <header className="cinematic-hud-header" aria-label="HUD Telemetry">
      {/* Top Left: Cyber Telemetry Beacon */}
      <div className="hud-corner-left">
        <Link
          to="/"
          className="hud-identity interactive"
          onMouseEnter={() => sound.playHover()}
          onClick={() => sound.playWarp()}
        >
          <div className="hud-badge-monogram" style={{ borderColor: `${selectedColor}40` }}>
            <span style={{ color: selectedColor }}>SK</span>
          </div>
          <div className="hud-identity-meta">
            <div className="hud-title-row">
              <ScrambleText text="SAURABH.SYS" speed={40} className="hud-callsign" />
              <span className="hud-live-tag">
                <span className="hud-live-dot" />
                ACTIVE
              </span>
            </div>
            <div className="hud-coords-row">
              <span className="hud-stat">IST {currentTime || "16:30"}</span>
              <span className="hud-divider">/</span>
              <span className="hud-stat">MH • IN</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Top Right: Ambient Drone / Command / Fullscreen Index Trigger */}
      <div className="hud-corner-right">
        {/* Ambient Soundscape Controller */}
        <button
          className={`hud-action-pill interactive ${ambientActive ? "active-drone" : ""}`}
          onClick={handleToggleAmbient}
          onMouseEnter={() => sound.playHover()}
          title="Toggle Generative Ambient Soundscape"
          aria-label="Toggle Ambient Audio"
        >
          <div className="hud-sound-wave">
            <span className={`bar b1 ${ambientActive ? "animating" : ""}`} />
            <span className={`bar b2 ${ambientActive ? "animating" : ""}`} />
            <span className={`bar b3 ${ambientActive ? "animating" : ""}`} />
          </div>
          <span className="hud-btn-label">
            {ambientActive ? "DRONE [ON]" : "SOUNDSCAPE"}
          </span>
        </button>

        {/* Command Palette Trigger */}
        <button
          className="hud-action-pill interactive command-pill"
          onClick={() => {
            sound.playClick();
            onOpenCommand();
          }}
          onMouseEnter={() => sound.playHover()}
          title="Quick Command Terminal (Ctrl + K)"
        >
          <FiCommand className="cmd-icon" />
          <span className="hud-btn-label">CMD</span>
          <span className="cmd-kbd">⌘K</span>
        </button>

        {/* Master INDEX Trigger (Opens full-screen curtain menu) */}
        <button
          className={`hud-index-btn interactive ${isMenuOpen ? "open" : ""}`}
          onClick={() => {
            sound.playWarp();
            onOpenMenu(!isMenuOpen);
          }}
          onMouseEnter={() => sound.playHover()}
          aria-label="Toggle Fullscreen Navigation Index"
        >
          <span className="index-lines">
            <span className="iline top" style={{ backgroundColor: isMenuOpen ? selectedColor : undefined }} />
            <span className="iline mid" style={{ backgroundColor: isMenuOpen ? selectedColor : undefined }} />
            <span className="iline bot" style={{ backgroundColor: isMenuOpen ? selectedColor : undefined }} />
          </span>
          <span className="index-text" style={{ color: isMenuOpen ? selectedColor : undefined }}>
            {isMenuOpen ? "CLOSE" : "INDEX"}
          </span>
        </button>
      </div>
    </header>
  );
};

export default CinematicHUDHeader;
