import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiCheck,
  FiCopy,
  FiBriefcase,
  FiZap,
  FiClock,
  FiX,
  FiSend,
} from "react-icons/fi";
import {
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
  FaTelegramPlane,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { portfolioInfo } from "../../data/portfolio";
import { sound } from "../../utils/sound";
import { triggerConfetti } from "../../utils/confetti";
import ScrambleText from "../common/ScrambleText";
import Interactive3DCard from "../common/Interactive3DCard";
import "./LeftProfileCard.css";

const coreTechBadges = [
  "⚛️ React 18",
  "🟢 Node.js",
  "🔷 TypeScript",
  "🌐 WordPress",
  "⚡ Next.js",
  "🎨 Tailwind CSS",
  "🍃 MongoDB",
  "📦 Redux Toolkit",
  "🚀 REST APIs",
  "🐙 Git / GitHub",
];

const LeftProfileCard = ({
  selectedColor,
  isQuickHireOpen: externalIsOpen,
  setIsQuickHireOpen: setExternalIsOpen,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isQuickHireOpen =
    externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsQuickHireOpen = setExternalIsOpen || setInternalIsOpen;

  const [copiedField, setCopiedField] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [ambientActive, setAmbientActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(
    "💼 Full-time Web Engineering Role"
  );

  // Live India Time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat([], options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll listener for pinned "fixed jaisa" floating state
  useEffect(() => {
    const getScrollTop = () => {
      const container = document.querySelector(".portfolio-container");
      return container ? container.scrollTop : window.scrollY;
    };

    const handleScroll = () => {
      setIsScrolled(getScrollTop() > 40);
    };

    const container = document.querySelector(".portfolio-container");
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCopy = (text, field) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.info(`Copied to clipboard: ${text}`, {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
    });
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleToggleAmbient = () => {
    sound.playClick();
    const active = sound.toggleAmbient();
    setAmbientActive(active);
  };

  const handlePrimaryAction = () => {
    sound.playCelebration();
    triggerConfetti(0.4, 0.5);
    setIsQuickHireOpen(true);
  };

  const handleSendWhatsAppInquiry = () => {
    sound.playCelebration();
    triggerConfetti(0.5, 0.5);
    const text = encodeURIComponent(
      `Hi Saurabh! I saw your portfolio and I would like to discuss: ${selectedInquiry}`
    );
    window.open(`https://wa.me/917038933292?text=${text}`, "_blank");
    setIsQuickHireOpen(false);
  };

  const handleSendEmailInquiry = () => {
    sound.playCelebration();
    triggerConfetti(0.5, 0.5);
    const subject = encodeURIComponent(`Inquiry: ${selectedInquiry}`);
    const body = encodeURIComponent(
      `Hi Saurabh,\n\nI was impressed by your work and would like to connect regarding:\n${selectedInquiry}\n\nBest regards,`
    );
    window.location.href = `mailto:saurabhk2812@gmail.com?subject=${subject}&body=${body}`;
    setIsQuickHireOpen(false);
  };

  return (
    <aside className="left-profile-sidebar" aria-label="Personal Profile Card">
      <ToastContainer theme="dark" />

      {/* Main Sticky Card with Floating Levitation Animation & Pinned State */}
      <motion.div
        className={`profile-card-container ${isScrolled ? "is-pinned" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Subtle Ambient Glow Border & Laser Edge */}
        <div
          className="profile-card-aura"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${selectedColor}26, transparent 65%)`,
          }}
        />

        {/* Dynamic Pinned Fixed Badge when scrolled */}
        <div className={`pinned-status-badge ${isScrolled ? "visible" : ""}`}>
          <span className="pinned-dot" style={{ backgroundColor: selectedColor }} />
          <span>PINNED HUD</span>
        </div>

        {/* Protruding Avatar Image Frame with 3D Tilt */}
        <div className="profile-avatar-protrude">
          <Interactive3DCard maxTilt={12} glare={true} className="avatar-3d-box">
            <div
              className="avatar-photo-wrapper"
              style={{
                borderColor: `${selectedColor}45`,
                boxShadow: `0 16px 36px -8px ${selectedColor}55`,
              }}
            >
              <img
                src={portfolioInfo.avatar}
                alt={portfolioInfo.username}
                className="profile-face-image"
              />
              <div className="avatar-laser-edge" />
            </div>
          </Interactive3DCard>

          {/* Live Status Pip */}
          <div className="profile-live-beacon">
            <span className="live-dot" />
            <span>AVAILABLE FOR HIRE</span>
          </div>
        </div>

        {/* Name and Designation */}
        <div className="profile-header-info">
          <h2 className="profile-name">
            <ScrambleText
              text={portfolioInfo.username}
              speed={25}
              className="profile-name-text"
            />
          </h2>
          <span
            className="profile-company-tag"
            style={{ color: selectedColor }}
          >
            <FiBriefcase className="tag-icon" />
            <span>Web Developer</span>
          </span>
        </div>

        {/* Social Action Pills Row */}
        <div className="profile-social-row">
          <a
            href="https://github.com/saurabh-kedarkar"
            target="_blank"
            rel="noopener noreferrer"
            className="social-pill-btn interactive"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            title="GitHub Profile"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/saurabh-kedarkar"
            target="_blank"
            rel="noopener noreferrer"
            className="social-pill-btn interactive"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            title="LinkedIn Profile"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>

          <a
            href="https://wa.me/917038933292?text=Hi%20Saurabh,%20I%20saw%20your%20portfolio!"
            target="_blank"
            rel="noopener noreferrer"
            className="social-pill-btn whatsapp-pill interactive"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            title="WhatsApp Direct"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>

          <a
            href="https://t.me/Saurabhk2812"
            target="_blank"
            rel="noopener noreferrer"
            className="social-pill-btn interactive"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            title="Telegram"
            aria-label="Telegram"
          >
            <FaTelegramPlane />
          </a>

          <a
            href="mailto:saurabhk2812@gmail.com"
            className="social-pill-btn interactive"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            title="Send Email"
            aria-label="Email"
          >
            <FiMail />
          </a>
        </div>

        {/* Infinite Tech Stack Kinetic Marquee (Moved 1 step down below social icons) */}
        <div className="profile-tech-marquee-wrapper" title="Key Engineering Stack">
          <div className="marquee-track">
            {coreTechBadges.concat(coreTechBadges).map((item, idx) => (
              <span key={idx} className="marquee-pill">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Info Contact List Container */}
        <div className="profile-info-block">
          {/* Phone */}
          <div
            className="info-item-row interactive"
            onClick={() => handleCopy("+917038933292", "phone")}
            onMouseEnter={() => sound.playHover()}
            title="Click to copy phone number"
          >
            <div
              className="info-icon-box"
              style={{ color: selectedColor, backgroundColor: `${selectedColor}15` }}
            >
              <FiPhone />
            </div>
            <div className="info-texts">
              <span className="info-label">PHONE</span>
              <span className="info-val">+91 7038933292</span>
            </div>
            <button className="info-copy-btn" aria-label="Copy Phone">
              {copiedField === "phone" ? (
                <FiCheck className="copied-check" />
              ) : (
                <FiCopy />
              )}
            </button>
          </div>

          {/* Email */}
          <div
            className="info-item-row interactive"
            onClick={() => handleCopy("saurabhk2812@gmail.com", "email")}
            onMouseEnter={() => sound.playHover()}
            title="Click to copy email"
          >
            <div
              className="info-icon-box"
              style={{ color: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.12)" }}
            >
              <FiMail />
            </div>
            <div className="info-texts">
              <span className="info-label">EMAIL</span>
              <span className="info-val email-text">saurabhk2812@gmail.com</span>
            </div>
            <button className="info-copy-btn" aria-label="Copy Email">
              {copiedField === "email" ? (
                <FiCheck className="copied-check" />
              ) : (
                <FiCopy />
              )}
            </button>
          </div>

          {/* Location */}
          <div className="info-item-row">
            <div
              className="info-icon-box"
              style={{ color: "#f59e0b", backgroundColor: "rgba(245, 158, 11, 0.12)" }}
            >
              <FiMapPin />
            </div>
            <div className="info-texts">
              <span className="info-label">LOCATION</span>
              <span className="info-val">Pune, Maharashtra, India</span>
            </div>
          </div>
        </div>

        {/* Live IST Telemetry Ticker & Ambient Soundwave */}
        <div className="profile-telemetry-badge">
          <div className="telemetry-time-row">
            <FiClock className="tel-icon" />
            <span className="tel-time">{currentTime || "Loading IST..."}</span>
            <span className="tel-tz">IST (MH, IN)</span>
          </div>
          <button
            className={`ambient-audio-toggle interactive ${ambientActive ? "active" : ""}`}
            onClick={handleToggleAmbient}
            onMouseEnter={() => sound.playHover()}
            title="Toggle Generative Ambient Soundscape"
          >
            <div className="audio-wave-bars">
              <span className={`w-bar wb1 ${ambientActive ? "animating" : ""}`} />
              <span className={`w-bar wb2 ${ambientActive ? "animating" : ""}`} />
              <span className={`w-bar wb3 ${ambientActive ? "animating" : ""}`} />
            </div>
            <span>{ambientActive ? "DRONE ON" : "SOUNDSCAPE"}</span>
          </button>
        </div>

        {/* Action Buttons: Download CV + Fast Connect */}
        <div className="profile-action-footer">
          <button
            className="primary-action-btn interactive"
            style={{
              backgroundColor: selectedColor,
              boxShadow: `0 10px 25px -6px ${selectedColor}66`,
            }}
            onClick={handlePrimaryAction}
            onMouseEnter={() => sound.playHover()}
          >
            <HiSparkles className="dl-icon" />
            <span>Let's Build Together</span>
          </button>
        </div>
      </motion.div>

      {/* =================================================================
          FAST CONNECT / QUICK HIRE MODAL (Portaled to Body for Full Viewport Safety)
          ================================================================= */}
      {typeof document !== "undefined" &&
        ReactDOM.createPortal(
          <AnimatePresence>
            {isQuickHireOpen && (
              <div className="hire-modal-backdrop" onClick={() => setIsQuickHireOpen(false)}>
                <motion.div
                  className="hire-modal-card"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Top Bar */}
                  <div className="hire-modal-top">
                    <div className="hire-tag">
                      <FiZap style={{ color: selectedColor }} />
                      <span>FAST INQUIRY PROTOCOL</span>
                    </div>
                    <button
                      className="hire-close-btn"
                      onClick={() => setIsQuickHireOpen(false)}
                    >
                      <FiX />
                    </button>
                  </div>

                  <h3 className="hire-modal-title">What are you looking to build?</h3>
                  <p className="hire-modal-sub">
                    Select your requirement to send a direct pre-formatted inquiry to Saurabh Kedarkar:
                  </p>

                  {/* Inquiry Options Radio Grid */}
                  <div className="inquiry-options-list">
                    {[
                      "💼 Full-time Software Engineer Position",
                      "⚡ Custom WordPress / WooCommerce Platform",
                      "🚀 Modern React 18 & Node.js Application",
                      "🏎️ 40%+ Page Speed / Core Web Vitals Optimization",
                      "☕ Casual Tech Discussion / Advisory",
                    ].map((option, idx) => {
                      const isSelected = selectedInquiry === option;
                      return (
                        <div
                          key={idx}
                          className={`inquiry-chip interactive ${isSelected ? "selected" : ""}`}
                          onClick={() => {
                            sound.playHover();
                            setSelectedInquiry(option);
                          }}
                        >
                          <div
                            className={`inquiry-custom-radio ${isSelected ? "active" : ""}`}
                            style={{
                              borderColor: isSelected ? selectedColor : undefined,
                              boxShadow: isSelected ? `0 0 10px ${selectedColor}66` : undefined,
                            }}
                          >
                            {isSelected && (
                              <span
                                className="inquiry-radio-pip"
                                style={{ backgroundColor: selectedColor }}
                              />
                            )}
                          </div>
                          <span className="inquiry-chip-label">{option}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* 1-Click Dispatch Channels */}
                  <div className="hire-dispatch-actions">
                    <button
                      className="hire-btn whatsapp interactive"
                      onClick={handleSendWhatsAppInquiry}
                    >
                      <FaWhatsapp />
                      <span>Send via WhatsApp</span>
                    </button>

                    <button
                      className="hire-btn email interactive"
                      style={{ backgroundColor: selectedColor }}
                      onClick={handleSendEmailInquiry}
                    >
                      <FiSend />
                      <span>Send via Email</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </aside>
  );
};

export default LeftProfileCard;
