import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowUpRight,
  FiFileText,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiX,
} from "react-icons/fi";
import { sound } from "../../utils/sound";
import "./FullscreenMenuPortal.css";

const menuItems = [
  {
    index: "01",
    label: "ORIGIN & BIOGRAPHY",
    desc: "2+ Years Software Craftsmanship, Yudiz Solutions & MCA Distinction",
    route: "/about",
    hash: "#story",
    tag: "IDENTITY",
  },
  {
    index: "02",
    label: "SELECTED SHOWCASE",
    desc: "Enterprise WordPress, React Platforms & Custom Web Architectures",
    route: "/projects",
    hash: "#showcase",
    tag: "WORKS",
  },
  {
    index: "03",
    label: "TECHNICAL ARSENAL",
    desc: "React, Node, WordPress Core, PHP, MySQL, Docker & Performance Tuning",
    route: "/skills",
    hash: "#skills",
    tag: "STACK",
  },
  {
    index: "04",
    label: "RESEARCH & DISPATCHES",
    desc: "Modern Web Engineering, AI Integrations & Architecture Insights",
    route: "/blog",
    hash: "#blog",
    tag: "JOURNAL",
  },
  {
    index: "05",
    label: "DIRECT TRANSMISSION",
    desc: "Open for Global Contracts, Enterprise Roles & Creative Collaborations",
    route: "/contact",
    hash: "#contact",
    tag: "CONNECT",
  },
];

const FullscreenMenuPortal = ({
  isOpen,
  onClose,
  selectedColor,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const location = useLocation();

  const handleLinkClick = (item) => {
    sound.playWarp();
    onClose();
    if (location.pathname === "/" && item.hash) {
      const el = document.querySelector(item.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fullscreen-menu-portal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Cyber Grid & Vignette Overlay */}
          <div className="portal-backdrop-grid" />
          <div className="portal-ambient-glow" style={{ background: `radial-gradient(circle at 70% 30%, ${selectedColor}15, transparent 65%)` }} />

          {/* Main Portal Container */}
          <div className="portal-inner">
            {/* Top Bar inside portal */}
            <div className="portal-top-bar">
              <div className="portal-header-tag">
                <span className="p-dot" style={{ backgroundColor: selectedColor }} />
                <span>INDEX DIRECTORY // NAVIGATION PORTAL</span>
              </div>
              <button
                className="portal-close-btn interactive"
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                onMouseEnter={() => sound.playHover()}
                aria-label="Close Portal"
              >
                <FiX />
                <span>ESC / CLOSE</span>
              </button>
            </div>

            {/* Navigation Rows */}
            <div className="portal-nav-list">
              {menuItems.map((item, idx) => {
                const isHovered = hoveredIdx === idx;
                return (
                  <Link
                    key={item.index}
                    to={location.pathname === "/" && item.hash ? item.hash : item.route}
                    className="portal-nav-row interactive"
                    onMouseEnter={() => {
                      sound.playHover();
                      setHoveredIdx(idx);
                    }}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onClick={() => handleLinkClick(item)}
                  >
                    <div className="nav-row-main">
                      <span className="row-num" style={{ color: isHovered ? selectedColor : undefined }}>
                        {item.index}
                      </span>
                      <h2 className="row-title">
                        {item.label}
                      </h2>
                      <span className="row-badge" style={{ borderColor: isHovered ? selectedColor : undefined, color: isHovered ? selectedColor : undefined }}>
                        {item.tag}
                      </span>
                    </div>

                    <div className="nav-row-aside">
                      <p className="row-desc">{item.desc}</p>
                      <div className="row-arrow" style={{ color: isHovered ? selectedColor : undefined }}>
                        <FiArrowUpRight />
                      </div>
                    </div>

                    {/* Animated hover highlight border */}
                    {isHovered && (
                      <motion.div
                        layoutId="portalRowGlow"
                        className="portal-row-glow"
                        style={{ background: `linear-gradient(90deg, ${selectedColor}18, transparent)` }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Bottom Meta & Social Bar */}
            <div className="portal-bottom-bar">
              <div className="portal-meta-block">
                <span className="meta-label">COORDINATES</span>
                <span className="meta-value">Maharashtra, India (IST)</span>
              </div>

              <div className="portal-meta-block">
                <span className="meta-label">CURRENT AFFILIATION</span>
                <span className="meta-value">Jr. Web Developer @ Yudiz Solutions Ltd.</span>
              </div>

              <div className="portal-social-links">
                <a
                  href="https://github.com/SaurabhKedarkar123"
                  target="_blank"
                  rel="noreferrer"
                  className="p-social-btn interactive"
                  onMouseEnter={() => sound.playHover()}
                >
                  <FiGithub />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/saurabh-kedarkar-890288219/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-social-btn interactive"
                  onMouseEnter={() => sound.playHover()}
                >
                  <FiLinkedin />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="mailto:saurabhk2812@gmail.com"
                  className="p-social-btn interactive"
                  onMouseEnter={() => sound.playHover()}
                >
                  <FiMail />
                  <span>Email</span>
                </a>
                <a
                  href="/resume.pdf"
                  download="Saurabh_Kedarkar_Resume.pdf"
                  className="p-social-btn resume-btn interactive"
                  style={{ borderColor: `${selectedColor}40`, color: selectedColor }}
                  onMouseEnter={() => sound.playHover()}
                >
                  <FiFileText />
                  <span>Download CV</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullscreenMenuPortal;
