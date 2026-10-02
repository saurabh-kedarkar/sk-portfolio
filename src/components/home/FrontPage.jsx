import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiZap,
  FiBriefcase,
  FiAward,
  FiCheckCircle,
  FiMapPin,
  FiCpu,
  FiSend,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { SiReact, SiWordpress, SiNodedotjs } from "react-icons/si";

import TechMarquee from "./TechMarquee";
import { portfolioInfo, socialLinks } from "../../data/portfolio";
import { sound } from "../../utils/sound";
import ScrambleText from "../common/ScrambleText";
import Interactive3DCard from "../common/Interactive3DCard";
import "./FrontPage.css";

// sk code
const FrontPage = ({ selectedColor }) => {
  // Roles Rotator
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    "Enterprise WordPress & Full-Stack Architect",
    "Jr. Web Developer @ Yudiz Solutions Ltd.",
    "React 18 & Modern Node.js Specialist",
    "40%+ Page Speed Acceleration Craftsman",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <div className="home-stage-wrapper">
      {/* =================================================================
          EXCLUSIVE CINEMATIC HOME HERO STAGE
          ================================================================= */}
      <section className="home-hero-stage" id="hero">
        <div className="home-stage-container">
          <div className="home-split-layout">
            {/* Left Column: Hero Manifesto & Telemetry */}
            <motion.div
              className="home-manifesto-column"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Telemetry Status Pill */}
              <div className="home-beacon-badge">
                <span className="beacon-ring">
                  <span className="beacon-core-dot" />
                </span>
                <span className="beacon-code">
                  <ScrambleText
                    text="SAURABH.SYS // READY FOR ENTERPRISE COMMISSIONS"
                    speed={30}
                  />
                </span>
              </div>

              {/* Master Display Typography */}
              <h1 className="home-headline">
                <ScrambleText
                  text="Saurabh Kedarkar"
                  speed={22}
                  className="home-name-scramble"
                />
                <span
                  className="home-title-accent"
                  style={{ color: selectedColor }}
                >
                  High-Impact Web Engineer & Architect
                </span>
              </h1>

              {/* Dynamic Role Rotator */}
              <div className="home-role-terminal">
                <span className="terminal-prefix">&gt; DISCIPLINE: </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    className="terminal-role-text"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.28 }}
                    style={{ color: selectedColor }}
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Editorial Bio Lead */}
              <p className="home-lead-manifesto">
                3+ years of production engineering at{" "}
                <strong>Yudiz Solutions Ltd.</strong> Architecting scalable
                WordPress ecosystems, custom Gutenberg integrations, React
                platforms, and cutting-edge web applications with 40%+ Core Web
                Vitals speed acceleration.
              </p>

              {/* 4 Compact Telemetry HUD Metric Pills */}
              <div className="home-telemetry-metrics-grid">
                <div
                  className="telemetry-hud-card interactive"
                  onMouseEnter={() => sound.playHover()}
                >
                  <div
                    className="hud-card-icon"
                    style={{ color: selectedColor }}
                  >
                    <FiBriefcase />
                  </div>
                  <div className="hud-card-info">
                    <span className="hud-metric-val">2+ YRS</span>
                    <span className="hud-metric-label">@ Yudiz Solutions</span>
                  </div>
                </div>

                <div
                  className="telemetry-hud-card interactive"
                  onMouseEnter={() => sound.playHover()}
                >
                  <div className="hud-card-icon" style={{ color: "#10b981" }}>
                    <FiZap />
                  </div>
                  <div className="hud-card-info">
                    <span className="hud-metric-val">+40%</span>
                    <span className="hud-metric-label">Speed Acceleration</span>
                  </div>
                </div>

                <div
                  className="telemetry-hud-card interactive"
                  onMouseEnter={() => sound.playHover()}
                >
                  <div className="hud-card-icon" style={{ color: "#8b5cf6" }}>
                    <FiCheckCircle />
                  </div>
                  <div className="hud-card-info">
                    <span className="hud-metric-val">15+</span>
                    <span className="hud-metric-label">Shipped Works</span>
                  </div>
                </div>

                <div
                  className="telemetry-hud-card interactive"
                  onMouseEnter={() => sound.playHover()}
                >
                  <div className="hud-card-icon" style={{ color: "#06b6d4" }}>
                    <FiAward />
                  </div>
                  <div className="hud-card-info">
                    <span className="hud-metric-val">MCA</span>
                    <span className="hud-metric-label">First Class Dist.</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Suite */}
              <div className="home-action-suite">
                <Link
                  to="/projects"
                  className="home-btn-primary interactive"
                  style={{
                    backgroundColor: selectedColor,
                    boxShadow: `0 12px 35px -8px ${selectedColor}77`,
                  }}
                  onClick={() => sound.playWarp()}
                  onMouseEnter={() => sound.playHover()}
                >
                  <span>Explore Selected Works</span>
                  <FiArrowRight />
                </Link>

                <Link
                  to="/skills"
                  className="home-btn-glass interactive"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                >
                  <FiCpu />
                  <span>Technical Arsenal</span>
                </Link>

                <a
                  href="https://wa.me/917038933292?text=Hi%20Saurabh,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-btn-whatsapp interactive"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                >
                  <FaWhatsapp />
                  <span>WhatsApp Direct</span>
                </a>

                <Link
                  to="/contact"
                  className="home-btn-outline interactive"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                >
                  <FiSend />
                  <span>Get in Touch</span>
                </Link>
              </div>

              {/* Direct Channels Bar */}
              <div className="home-channels-row">
                <span className="channels-label">DIRECT CHANNELS:</span>
                <div className="channels-pill-group">
                  {socialLinks.map((item, idx) => (
                    <motion.a
                      key={idx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="channel-orb-link interactive"
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() => sound.playHover()}
                      onClick={() => sound.playClick()}
                      title={item.name}
                    >
                      {item.icon}
                    </motion.a>
                  ))}
                  <Link
                    to="/about"
                    className="channel-text-link interactive"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                  >
                    <span>Read Biography</span>
                    <FiArrowUpRight />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right Column: 3D Holographic Identity Dossier */}
            <motion.div
              className="home-hologram-column"
              initial={{ opacity: 0, scale: 0.94, x: 25 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
            >
              <div className="hologram-stage-anchor">
                {/* Ambient Aura Halo */}
                <div
                  className="hologram-aura-glow"
                  style={{
                    background: `radial-gradient(circle, ${selectedColor}35 0%, transparent 70%)`,
                  }}
                />

                {/* Floating Orbit Tech Badges */}
                <motion.div
                  className="orbit-floating-badge orb-tr"
                  animate={{ y: [-6, 6, -6] }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <SiReact style={{ color: "#61dafb" }} />
                  <span>React 18</span>
                </motion.div>

                <motion.div
                  className="orbit-floating-badge orb-bl"
                  animate={{ y: [6, -6, 6] }}
                  transition={{
                    duration: 4.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
                  }}
                >
                  <SiWordpress style={{ color: "#21759b" }} />
                  <span>WordPress Core</span>
                </motion.div>

                <motion.div
                  className="orbit-floating-badge orb-br"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{
                    duration: 5.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.6,
                  }}
                >
                  <SiNodedotjs style={{ color: "#68a063" }} />
                  <span>Node.js</span>
                </motion.div>

                {/* Main 3D Card Container */}
                <Interactive3DCard
                  maxTilt={12}
                  glare={true}
                  className="identity-3d-tilt-wrap"
                >
                  <div className="identity-glass-card interactive">
                    {/* Cyber Frame Corner Brackets */}
                    <div
                      className="cyber-bracket top-left"
                      style={{ borderColor: selectedColor }}
                    />
                    <div
                      className="cyber-bracket top-right"
                      style={{ borderColor: selectedColor }}
                    />
                    <div
                      className="cyber-bracket bottom-left"
                      style={{ borderColor: selectedColor }}
                    />
                    <div
                      className="cyber-bracket bottom-right"
                      style={{ borderColor: selectedColor }}
                    />

                    {/* Image Box with Laser Scan Beam */}
                    <div className="identity-photo-box">
                      <img
                        src={portfolioInfo.avatar}
                        alt={portfolioInfo.username}
                        className="identity-photo"
                      />
                      <div className="photo-scan-beam" />
                      <div className="photo-vignette" />

                      {/* Floating Identity Status Tag */}
                      <div className="photo-live-status">
                        <span className="live-status-dot" />
                        <span>AVAILABLE FOR HIRE</span>
                      </div>
                    </div>

                    {/* Bottom Metadata & Equalizer */}
                    <div className="identity-meta-footer">
                      <div className="meta-name-row">
                        <div>
                          <h3 className="meta-username">
                            {portfolioInfo.username}
                          </h3>
                          <span className="meta-subrole">
                            Full-Stack Engineer & Architect
                          </span>
                        </div>
                        <div
                          className="meta-company-badge"
                          style={{ borderColor: `${selectedColor}40` }}
                        >
                          <span
                            className="comp-dot"
                            style={{ backgroundColor: selectedColor }}
                          />
                          <span>Yudiz Solutions Ltd.</span>
                        </div>
                      </div>

                      {/* Equalizer Frequency Bar & Location */}
                      <div className="meta-telemetry-subrow">
                        <div className="location-tag">
                          <FiMapPin className="pin-icon" />
                          <span>Amravati, Maharashtra • IST</span>
                        </div>
                        <div className="audio-eq-mini">
                          <span className="eq-bar eq1" />
                          <span className="eq-bar eq2" />
                          <span className="eq-bar eq3" />
                          <span className="eq-bar eq4" />
                          <span className="eq-text">SYS.FREQ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Interactive3DCard>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SUBTLE CONTINUOUS TECH RADAR MARQUEE
          ================================================================= */}
      <div className="home-marquee-section">
        <TechMarquee />
      </div>
    </div>
  );
};

export default FrontPage;
