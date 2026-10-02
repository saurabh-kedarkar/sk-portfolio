import React from "react";
import {
  FiBriefcase,
  FiZap,
  FiCheckCircle,
  FiGlobe,
} from "react-icons/fi";
import { sound } from "../../utils/sound";
import Interactive3DCard from "../common/Interactive3DCard";
import ScrambleText from "../common/ScrambleText";
import "./BentoStats.css";

const BentoStats = ({ selectedColor }) => {
  return (
    <section className="bento-section" id="overview">
      <div className="bento-grid-container">
        {/* Card 1: Experience & Company */}
        <Interactive3DCard
          className="bento-card-wrap bento-card-large"
          maxTilt={8}
          glare={true}
        >
          <div
            className="bento-card interactive"
            onMouseEnter={() => sound.playHover()}
          >
            <div
              className="bento-card-bg-glow"
              style={{
                background: `radial-gradient(circle at top right, ${selectedColor}22, transparent 70%)`,
              }}
            />
            <div
              className="bento-icon-badge"
              style={{
                backgroundColor: `${selectedColor}18`,
                color: selectedColor,
              }}
            >
              <FiBriefcase />
            </div>
            <div className="bento-meta-tag">
              <ScrambleText text="CURRENT ENGAGEMENT" speed={35} />
            </div>
            <h3 className="bento-main-heading">
              Jr. Web Developer @{" "}
              <span style={{ color: selectedColor }}>Yudiz Solutions Ltd.</span>
            </h3>
            <p className="bento-description">
              Engineering high-scale web platforms, custom WordPress themes,
              and robust RESTful API pipelines with 2+ years of production
              experience.
            </p>
            <div className="bento-tags-row">
              <span className="bento-pill">2023 - Present</span>
              <span className="bento-pill">Full-Time</span>
              <span className="bento-pill">Enterprise Projects</span>
            </div>
          </div>
        </Interactive3DCard>

        {/* Card 2: Performance Boost */}
        <Interactive3DCard
          className="bento-card-wrap bento-card-stat"
          maxTilt={10}
          glare={true}
        >
          <div
            className="bento-card interactive"
            onMouseEnter={() => sound.playHover()}
          >
            <div
              className="bento-card-bg-glow"
              style={{
                background: `radial-gradient(circle at bottom left, #10b98122, transparent 70%)`,
              }}
            />
            <div
              className="bento-icon-badge"
              style={{ backgroundColor: "#10b98118", color: "#10b981" }}
            >
              <FiZap />
            </div>
            <div className="bento-stat-number" style={{ color: selectedColor }}>
              <ScrambleText text="+40%" speed={25} />
            </div>
            <h4 className="bento-stat-title">Core Web Vitals Boost</h4>
            <p className="bento-stat-detail">
              Average speed improvement delivered across client websites via
              code splitting, database query optimization, and asset pipelines.
            </p>
          </div>
        </Interactive3DCard>

        {/* Card 3: Delivered Projects */}
        <Interactive3DCard
          className="bento-card-wrap bento-card-stat"
          maxTilt={10}
          glare={true}
        >
          <div
            className="bento-card interactive"
            onMouseEnter={() => sound.playHover()}
          >
            <div
              className="bento-card-bg-glow"
              style={{
                background: `radial-gradient(circle at top left, #8b5cf622, transparent 70%)`,
              }}
            />
            <div
              className="bento-icon-badge"
              style={{ backgroundColor: "#8b5cf618", color: "#8b5cf6" }}
            >
              <FiCheckCircle />
            </div>
            <div className="bento-stat-number" style={{ color: selectedColor }}>
              <ScrambleText text="15+" speed={25} />
            </div>
            <h4 className="bento-stat-title">Shipped Projects</h4>
            <p className="bento-stat-detail">
              Delivering robust web apps for UK, Malaysia, and Indian businesses
              across automotive, real estate, and finance domains.
            </p>
          </div>
        </Interactive3DCard>

        {/* Card 4: Global Availability */}
        <Interactive3DCard
          className="bento-card-wrap bento-card-wide"
          maxTilt={6}
          glare={true}
        >
          <div
            className="bento-card interactive"
            onMouseEnter={() => sound.playHover()}
          >
            <div
              className="bento-card-bg-glow"
              style={{
                background: `radial-gradient(circle at bottom right, ${selectedColor}20, transparent 70%)`,
              }}
            />
            <div className="bento-wide-content">
              <div
                className="bento-icon-badge"
                style={{
                  backgroundColor: `${selectedColor}18`,
                  color: selectedColor,
                }}
              >
                <FiGlobe />
              </div>
              <div>
                <div className="bento-status-pill">
                  <span className="bento-dot-pulse" />
                  <span>Open for Worldwide Remote & Hybrid Roles</span>
                </div>
                <h3 className="bento-wide-title">
                  Ready to Engineer High-Impact Software Solutions
                </h3>
                <p className="bento-description">
                  Available for full-time senior engineering opportunities,
                  enterprise architecture consulting, and selective high-velocity
                  commissions.
                </p>
              </div>
            </div>
          </div>
        </Interactive3DCard>
      </div>
    </section>
  );
};

export default BentoStats;
