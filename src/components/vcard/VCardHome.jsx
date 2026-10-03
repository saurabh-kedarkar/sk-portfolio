import React from "react";
import { motion } from "framer-motion";
import {
  FiZap,
  FiCpu,
  FiBriefcase,
  FiCheckCircle,
  FiAward,
  FiMapPin,
  FiClock,
  FiShield,
} from "react-icons/fi";
import { SiWordpress, SiReact } from "react-icons/si";

import { HiSparkles } from "react-icons/hi2";
import { aboutInfo } from "../../data/about";
import { sound } from "../../utils/sound";
import ScrambleText from "../common/ScrambleText";
import Interactive3DCard from "../common/Interactive3DCard";
import "./VCardHome.css";

const whatIDoList = [
  {
    icon: <SiWordpress className="service-icon wp-color" />,
    title: "WordPress & WooCommerce Core",
    desc: "Custom Gutenberg block development, bespoke themes, hooks, filters, and high-converting e-commerce architectures with scalable PHP and REST APIs.",
  },
  {
    icon: <SiReact className="service-icon react-color" />,
    title: "React 18 & Full-Stack Apps",
    desc: "Modern, responsive, state-driven frontends paired with Node.js backends, modular components, clean architecture, and seamless third-party integrations.",
  },
  {
    icon: <FiZap className="service-icon zap-color" />,
    title: "Performance & Speed Tuning",
    desc: "Achieving 40%+ Core Web Vitals speedups through code-splitting, asset compression, database query caching, and edge server optimization.",
  },
  {
    icon: <FiCpu className="service-icon cpu-color" />,
    title: "Enterprise Architecture & APIs",
    desc: "Integrating payment gateways, webhook pipelines, automated workflows, and robust security practices for UK, Malaysia, and Indian businesses.",
  },
];

const VCardHome = ({ selectedColor }) => {
  return (
    <motion.div
      className="vcard-home-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Page Header (Matching Image 3 design) */}
      <div className="page-header-block">
        <div className="page-badge-pill">
          <HiSparkles />
          <span>01 // ABOUT ME</span>
        </div>
        <h1 className="page-title">
          <ScrambleText text="About Me" speed={30} />
        </h1>
        {/* <p className="page-subtitle">
          Passionate Full-Stack Developer & WordPress Specialist building scalable digital experiences.
        </p> */}
      </div>

      {/* Biography Paragraphs */}
      <div className="vcard-bio-block">
       <p className="bio-lead-text">Hello! I am <strong>Saurabh Kedarkar</strong>, a <strong>Web Developer & WordPress Specialist</strong> with <strong>3+ years of experience</strong> building scalable, high-performance digital experiences. I focus on creating modern, responsive, and business-driven web solutions that combine clean development with great user experiences.</p>

       <p className="bio-lead-text">I specialize in <strong>WordPress, PHP, React.js, Next.js, JavaScript, WooCommerce, and custom theme & plugin development</strong>. From custom WordPress platforms and e-commerce websites to modern React applications, I transform complex requirements into <strong>clean, fast, scalable, and user-friendly digital products.</strong></p>

      </div>

      {/* What I Do Section */}
      <div className="vcard-what-i-do-section">
        <h2 className="what-i-do-heading">What I Do!</h2>
        <div className="services-grid">
          {whatIDoList.map((item, idx) => (
            <Interactive3DCard
              key={idx}
              maxTilt={8}
              glare={true}
              className="service-card-3d-wrap"
            >
              <div
                className="service-box interactive"
                onMouseEnter={() => sound.playHover()}
              >
                <div
                  className="service-icon-box"
                  style={{ backgroundColor: `${selectedColor}12` }}
                >
                  {item.icon}
                </div>
                <div className="service-content">
                  <h3 className="service-title">{item.title}</h3>
                  <p className="service-desc">{item.desc}</p>
                </div>
              </div>
            </Interactive3DCard>
          ))}
        </div>
      </div>

      {/* Key Impact Metrics Row */}
      <div className="vcard-metrics-section">
        <h2 className="what-i-do-heading">Impact Highlights</h2>
        <div className="vcard-metrics-grid">
          <div
            className="vcard-metric-card interactive"
            onMouseEnter={() => sound.playHover()}
          >
            <div className="metric-icon" style={{ color: selectedColor }}>
              <FiBriefcase />
            </div>
            <div>
              <span className="metric-num">2+ YRS</span>
              <span className="metric-lbl">Industry Experience</span>
            </div>
          </div>

          <div
            className="vcard-metric-card interactive"
            onMouseEnter={() => sound.playHover()}
          >
            <div className="metric-icon" style={{ color: "#10b981" }}>
              <FiZap />
            </div>
            <div>
              <span className="metric-num">+40%</span>
              <span className="metric-lbl">Performance Speedup</span>
            </div>
          </div>

          <div
            className="vcard-metric-card interactive"
            onMouseEnter={() => sound.playHover()}
          >
            <div className="metric-icon" style={{ color: "#8b5cf6" }}>
              <FiCheckCircle />
            </div>
            <div>
              <span className="metric-num">15+</span>
              <span className="metric-lbl">Shipped Projects</span>
            </div>
          </div>

          <div
            className="vcard-metric-card interactive"
            onMouseEnter={() => sound.playHover()}
          >
            <div className="metric-icon" style={{ color: "#f59e0b" }}>
              <FiAward />
            </div>
            <div>
              <span className="metric-num">MCA</span>
              <span className="metric-lbl">First Class Distinction</span>
            </div>
          </div>
        </div>
      </div>

      {/* NEW FEATURE: Career Readiness & Availability Matrix */}
      <div className="vcard-availability-section">
        <h2 className="what-i-do-heading">Work Readiness & Telemetry</h2>
        <div className="availability-bento-grid">
          <div
            className="avail-card interactive"
            onMouseEnter={() => sound.playHover()}
          >
            <div className="avail-header">
              <span className="avail-pulse-beacon" />
              <span className="avail-tag">AVAILABILITY</span>
            </div>
            <h4 className="avail-val">Available for Full-Time Roles</h4>
            <p className="avail-sub">Open to challenging SWE / Full-Stack opportunities</p>
          </div>

          <div
            className="avail-card interactive"
            onMouseEnter={() => sound.playHover()}
          >
            <div className="avail-header">
              <FiMapPin className="avail-icon" style={{ color: "#f59e0b" }} />
              <span className="avail-tag">LOCATION PREFERENCE</span>
            </div>
            <h4 className="avail-val">Pune • Remote • Relocation</h4>
            <p className="avail-sub">Open to relocate to major tech hubs</p>
          </div>

          <div
            className="avail-card interactive"
            onMouseEnter={() => sound.playHover()}
          >
            <div className="avail-header">
              <FiClock className="avail-icon" style={{ color: "#06b6d4" }} />
              <span className="avail-tag">RESPONSE SLA</span>
            </div>
            <h4 className="avail-val">&lt; 2 Hours Turnaround</h4>
            <p className="avail-sub">Quick responses on WhatsApp & Email</p>
          </div>

          <div
            className="avail-card interactive"
            onMouseEnter={() => sound.playHover()}
          >
            <div className="avail-header">
              <FiShield className="avail-icon" style={{ color: "#10b981" }} />
              <span className="avail-tag">CODE INTEGRITY</span>
            </div>
            <h4 className="avail-val">Production Tested</h4>
            <p className="avail-sub">Strict linting, git hooks & zero regressions</p>
          </div>
        </div>
      </div>

      {/* Engineering Pillars & Delivery Standards */}
      <div className="vcard-pillars-section">
        <h2 className="what-i-do-heading">Engineering Standards</h2>
        <div className="pillars-grid">
          <div
            className="pillar-item interactive"
            onMouseEnter={() => sound.playHover()}
          >
            <div className="pillar-num-badge" style={{ color: selectedColor, borderColor: `${selectedColor}44`, background: `${selectedColor}12` }}>
              01
            </div>
            <div className="pillar-content">
              <h4 className="pillar-title">Sub-Second Core Web Vitals</h4>
              <p className="pillar-desc">
                Engineered for high Google PageSpeed scores, zero layout shifts,
                and lightning-fast first contentful paint.
              </p>
            </div>
          </div>

          <div
            className="pillar-item interactive"
            onMouseEnter={() => sound.playHover()}
          >
            <div className="pillar-num-badge" style={{ color: "#10b981", borderColor: "rgba(16, 185, 129, 0.4)", background: "rgba(16, 185, 129, 0.12)" }}>
              02
            </div>
            <div className="pillar-content">
              <h4 className="pillar-title">Production Stability & Zero Downtime</h4>
              <p className="pillar-desc">
                Thorough staging, automated rollbacks, robust database migrations,
                and enterprise reliability.
              </p>
            </div>
          </div>

          <div
            className="pillar-item interactive"
            onMouseEnter={() => sound.playHover()}
          >
            <div className="pillar-num-badge" style={{ color: "#8b5cf6", borderColor: "rgba(139, 92, 246, 0.4)", background: "rgba(139, 92, 246, 0.12)" }}>
              03
            </div>
            <div className="pillar-content">
              <h4 className="pillar-title">Clean, Scalable Architecture</h4>
              <p className="pillar-desc">
                Componentized architecture adhering to strict DRY principles,
                maintainable hooks, and clear git tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VCardHome;
