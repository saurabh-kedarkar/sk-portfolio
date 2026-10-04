import React from "react";
import { motion } from "framer-motion";
import {
  FiBookOpen,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { aboutInfo } from "../../data/about";
import { sound } from "../../utils/sound";
import ScrambleText from "../common/ScrambleText";
import "./VCardResume.css";

const VCardResume = ({ selectedColor }) => {
  return (
    <motion.div
      className="vcard-resume-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Page Header */}
      <div className="page-header-block">
        <div className="page-badge-pill">
          <HiSparkles />
          <span>02 // CAREER TIMELINE</span>
        </div>
        <h1 className="page-title">
          <ScrambleText text="Experience" speed={30} />
        </h1>
        <p className="page-subtitle">
          Professional milestone timeline across enterprise web engineering and academic foundation.
        </p>
      </div>

      {/* Dual Column: Experience & Education */}
      <div className="resume-timelines-grid">
        {/* Experience Column */}
        <div className="timeline-col">
          <div className="timeline-col-header">
            <div
              className="col-header-icon"
              style={{ color: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.15)" }}
            >
              <FiBriefcase />
            </div>
            <h2 className="col-header-title">
              <ScrambleText text="Experience" speed={30} />
            </h2>
          </div>

          <div className="timeline-cards-list">
            {aboutInfo.experience?.experienceItems?.map((exp, idx) => (
              <div
                key={idx}
                className="resume-timeline-card interactive"
                onMouseEnter={() => sound.playHover()}
              >
                <div className="card-period-row">
                  <span className="card-period-pill">
                    <FiCalendar className="cal-icon" />
                    <span>{exp.period || exp.duration}</span>
                  </span>
                  <span className="card-grade-badge" style={{ color: "#10b981" }}>
                    {exp.type}
                  </span>
                </div>
                <h3 className="card-title">{exp.title}</h3>
                <span className="card-subtitle" style={{ color: selectedColor }}>
                  {exp.company}
                </span>
                <ul className="resume-bullets">
                  {exp.description?.slice(0, 3).map((b, bIdx) => (
                    <li key={bIdx} className="resume-bullet">
                      <FiCheckCircle className="b-icon" style={{ color: selectedColor }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education Column */}
        <div className="timeline-col">
          <div className="timeline-col-header">
            <div
              className="col-header-icon"
              style={{ color: selectedColor, backgroundColor: `${selectedColor}15` }}
            >
              <FiBookOpen />
            </div>
            <h2 className="col-header-title">
              <ScrambleText text="Education" speed={30} />
            </h2>
          </div>

          <div className="timeline-cards-list">
            {aboutInfo.education?.educationItems?.map((edu, idx) => (
              <div
                key={idx}
                className="resume-timeline-card interactive"
                onMouseEnter={() => sound.playHover()}
              >
                <div className="card-period-row">
                  <span className="card-period-pill">
                    <FiCalendar className="cal-icon" />
                    <span>{edu.duration}</span>
                  </span>
                  <span className="card-grade-badge" style={{ color: selectedColor }}>
                    {edu.grade}
                  </span>
                </div>
                <h3 className="card-title">{edu.degree}</h3>
                <span className="card-subtitle">{edu.school}</span>
                <p className="card-desc">{edu.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interests Section */}
      <div className="vcard-interests-section">
        <h2 className="what-i-do-heading">
          <ScrambleText text={aboutInfo.interests?.title || "Interests"} speed={30} />
        </h2>
        <div className="vcard-interests-grid">
          {aboutInfo.interests?.interests?.map((item, idx) => (
            <div
              key={idx}
              className="interest-card-pill interactive"
              onMouseEnter={() => sound.playHover()}
            >
              <span className="interest-emoji">{item.emoji}</span>
              <span className="interest-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default VCardResume;
