import React from "react";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiAward,
  FiMapPin,
  FiMail,
  FiCheckCircle,
  FiCalendar,
  FiBookOpen,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import "../../styles/pages/About.css";
import { aboutInfo } from "../../data/about";
import { sound } from "../../utils/sound";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const About = ({ selectedColor }) => {
  return (
    <div className="about-viewport">
      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Page Header */}
        <motion.div className="page-header-block" variants={itemVariants}>
          <div className="page-badge-pill">
            <HiSparkles />
            <span>{aboutInfo.badge || "01 // ABOUT ME"}</span>
          </div>
          <h1 className="page-title">{aboutInfo.title}</h1>
          <p className="page-subtitle">{aboutInfo.subtitle}</p>
        </motion.div>

        {/* Section 1: Story & Key Principles */}
        <div className="about-hero-grid">
          {/* Main Story Card */}
          <motion.div
            className="about-card story-card interactive"
            variants={itemVariants}
          >
            <div className="card-header-row">
              <span className="card-badge">Biography</span>
              <div className="status-live-mini">
                <span className="dot" />
                <span>{aboutInfo.aboutme.availability}</span>
              </div>
            </div>

            <h2 className="story-greeting">{aboutInfo.aboutme.greeting}</h2>
            <p className="story-para">{aboutInfo.aboutme.description}</p>
            <p className="story-para secondary">
              {aboutInfo.aboutme.secondaryDescription}
            </p>

            <div className="bio-meta-row">
              <div className="meta-item">
                <FiMapPin className="meta-icon" />
                <span>{aboutInfo.aboutme.location}</span>
              </div>
              <div className="meta-item">
                <FiMail className="meta-icon" />
                <span>{aboutInfo.aboutme.email}</span>
              </div>
            </div>
          </motion.div>

          {/* Highlights & Principles 2x2 */}
          <motion.div className="highlights-grid" variants={itemVariants}>
            {aboutInfo.highlights?.map((h, idx) => (
              <div
                key={idx}
                className="highlight-card interactive"
                onMouseEnter={() => sound.playHover()}
              >
                <div className="highlight-icon-wrap">{h.icon}</div>
                <h3 className="highlight-title">{h.title}</h3>
                <p className="highlight-desc">{h.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Section 2: Experience Timeline */}
        <motion.div className="section-block" variants={itemVariants}>
          <div className="section-header-row">
            <div className="section-icon-box">
              <FiBriefcase />
            </div>
            <div>
              <h2 className="section-title">
                {aboutInfo.experience?.title || "Professional Experience"}
              </h2>
              <span className="section-desc">
                Real-world impact across enterprise & client projects
              </span>
            </div>
          </div>

          <div className="experience-timeline">
            {aboutInfo.experience?.experienceItems?.map((exp, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-connector">
                  <div
                    className="timeline-marker"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <div className="timeline-line" />
                </div>

                <div className="timeline-content-card">
                  <div className="timeline-header-bar">
                    <div>
                      <h3 className="role-title">{exp.title}</h3>
                      <h4 className="company-title">{exp.company}</h4>
                    </div>
                    <div className="period-pill">
                      <FiCalendar className="period-icon" />
                      <span>{exp.period || exp.duration}</span>
                    </div>
                  </div>

                  <ul className="timeline-bullets">
                    {exp.description?.map((bullet, bIdx) => (
                      <li key={bIdx} className="bullet-item">
                        <FiCheckCircle
                          className="bullet-icon"
                          style={{ color: selectedColor }}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.technologies && (
                    <div className="timeline-tech-tags">
                      {exp.technologies.map((tech, tIdx) => (
                        <span key={tIdx} className="tech-pill">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section 3: Education & Academics */}
        <motion.div className="section-block" variants={itemVariants}>
          <div className="section-header-row">
            <div className="section-icon-box">
              <FiAward />
            </div>
            <div>
              <h2 className="section-title">
                {aboutInfo.education?.title || "Education & Credentials"}
              </h2>
              <span className="section-desc">
                Academic foundations in Computer Applications & Software
                Engineering
              </span>
            </div>
          </div>

          <div className="education-grid">
            {aboutInfo.education?.educationItems?.map((edu, idx) => (
              <div
                key={idx}
                className="education-card interactive"
                onMouseEnter={() => sound.playHover()}
              >
                <div className="edu-top-row">
                  <FiBookOpen className="edu-icon" />
                  <span className="edu-duration">{edu.duration}</span>
                </div>
                <h3 className="edu-degree">{edu.degree}</h3>
                <h4 className="edu-school">{edu.school}</h4>
                {edu.grade && (
                  <div className="edu-grade-pill">
                    <span>{edu.grade}</span>
                  </div>
                )}
                {edu.details && <p className="edu-details">{edu.details}</p>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section 4: Passions & Personal Interests */}
        <motion.div className="section-block" variants={itemVariants}>
          <div className="section-header-row">
            <div className="section-icon-box">
              <HiSparkles />
            </div>
            <div>
              <h2 className="section-title">
                {aboutInfo.interests?.title || "Passions & Interests"}
              </h2>
              <span className="section-desc">What fuels my energy and curiosity</span>
            </div>
          </div>

          <div className="interests-pill-cloud">
            {aboutInfo.interests?.interests?.map((item, idx) => {
              const label = typeof item === "string" ? item : item.label;
              const emoji = typeof item === "string" ? "" : item.emoji;
              return (
                <motion.div
                  key={idx}
                  className="interest-pill interactive"
                  whileHover={{ scale: 1.08, y: -2 }}
                  onMouseEnter={() => sound.playHover()}
                >
                  {emoji && <span className="interest-emoji">{emoji}</span>}
                  <span className="interest-label">{label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
