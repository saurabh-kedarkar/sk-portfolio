import React from "react";
import { motion } from "framer-motion";
import { FiCpu, FiZap } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import {
  SiReact,
  SiJavascript,
  SiNextdotjs,
  SiHtml5,
  SiTailwindcss,
  SiWordpress,
  SiWoo,
  SiPhp,
  SiNodedotjs,
  SiMysql,
  SiMongodb,
  SiGit,
  SiDocker,
  SiPostman,
} from "react-icons/si";

import "../../styles/pages/Skills.css";
import { skillsInfo } from "../../data/skills";
import { sound } from "../../utils/sound";
import ScrambleText from "../common/ScrambleText";

// Map tech names to icons
const getSkillIcon = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes("react")) return <SiReact className="skill-logo react-c" />;
  if (lower.includes("javascript")) return <SiJavascript className="skill-logo js-c" />;
  if (lower.includes("next")) return <SiNextdotjs className="skill-logo next-c" />;
  if (lower.includes("html") || lower.includes("css")) return <SiHtml5 className="skill-logo html-c" />;
  if (lower.includes("tailwind")) return <SiTailwindcss className="skill-logo tw-c" />;
  if (lower.includes("woo")) return <SiWoo className="skill-logo woo-c" />;
  if (lower.includes("wordpress") || lower.includes("gutenberg"))
    return <SiWordpress className="skill-logo wp-c" />;
  if (lower.includes("php")) return <SiPhp className="skill-logo php-c" />;
  if (lower.includes("node")) return <SiNodedotjs className="skill-logo node-c" />;
  if (lower.includes("mysql") || lower.includes("sql"))
    return <SiMysql className="skill-logo sql-c" />;
  if (lower.includes("mongo")) return <SiMongodb className="skill-logo mongo-c" />;
  if (lower.includes("git")) return <SiGit className="skill-logo git-c" />;
  if (lower.includes("docker")) return <SiDocker className="skill-logo docker-c" />;
  if (lower.includes("postman")) return <SiPostman className="skill-logo postman-c" />;
  return <FiCpu className="skill-logo default-c" />;
};

const Skills = ({ selectedColor }) => {
  // Flatten all skills into a single list (no category splits or filtering buttons)
  const allSkills = (skillsInfo.skillsTech || []).flatMap((group) => group.roles || []);

  return (
    <div className="skills-viewport">
      <div className="skills-container">
        {/* Header Block */}
        <div className="page-header-block">
          <div className="page-badge-pill">
            <HiSparkles />
            <span>{skillsInfo.badge || "03 // TECHNICAL EXPERTISE"}</span>
          </div>
          <h1 className="page-title">
            <ScrambleText text={skillsInfo.title || "Skills & Arsenal"} speed={30} />
          </h1>
          <p className="page-subtitle">
            {skillsInfo.subtitle || "Technologies, Frameworks & Tooling in My Daily Stack"}
          </p>
        </div>

        {/* Unified Skills Card Grid (No Category Dividing Header, No Tabs) */}
        <div className="skills-card-grid">
          {allSkills.map((skill, sIdx) => (
            <motion.div
              key={sIdx}
              className="skill-card interactive"
              whileHover={{ y: -4, scale: 1.01 }}
              onMouseEnter={() => sound.playHover()}
              transition={{ duration: 0.2 }}
            >
              <div className="skill-top-bar">
                <div className="skill-title-group">
                  <div className="skill-icon-holder">
                    {getSkillIcon(skill.name)}
                  </div>
                  <div>
                    <h3 className="skill-name">{skill.name}</h3>
                    <span className="skill-desc">{skill.desc}</span>
                  </div>
                </div>
                <div
                  className="skill-level-pill"
                  style={{
                    borderColor: `${selectedColor}44`,
                    color: selectedColor,
                  }}
                >
                  <span>{skill.tag || `${skill.level}%`}</span>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="skill-progress-track">
                <motion.div
                  className="skill-progress-bar"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{
                    duration: 0.8,
                    delay: sIdx * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    background: `linear-gradient(90deg, ${selectedColor}99, ${selectedColor})`,
                    boxShadow: `0 0 10px ${selectedColor}66`,
                  }}
                />
              </div>
              <div className="skill-percentage-row">
                <span className="proficiency-label">Proficiency</span>
                <span className="percent-val">{skill.level}%</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architecture & Engineering Standards Highlights */}
        <div className="skills-pillars-section">
          <div className="pillars-header">
            <FiZap className="pillar-header-icon" style={{ color: selectedColor }} />
            <div>
              <h2 className="pillars-title">
                <ScrambleText text="Engineering Standards & Best Practices" speed={30} />
              </h2>
              <span className="pillars-subtitle">
                Core values integrated into every line of production code
              </span>
            </div>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card interactive" onMouseEnter={() => sound.playHover()}>
              <div className="pillar-icon-box">⚡</div>
              <h3>40%+ Speedup & Web Vitals</h3>
              <p>
                Advanced code splitting, image pipeline optimization, caching architectures, and sub-second load times.
              </p>
            </div>

            <div className="pillar-card interactive" onMouseEnter={() => sound.playHover()}>
              <div className="pillar-icon-box">🧩</div>
              <h3>Custom Block & Theme Engineering</h3>
              <p>
                Bespoke WordPress architectures, ACF Pro content matrices, Gutenberg blocks, and React.js ecosystems.
              </p>
            </div>

            <div className="pillar-card interactive" onMouseEnter={() => sound.playHover()}>
              <div className="pillar-icon-box">🛡️</div>
              <h3>Security & Responsive Design</h3>
              <p>
                Data sanitization, CSRF protection, prepared SQL statements, mobile-first fluid layouts, and accessibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
