import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiExternalLink,
  FiGithub,
  FiArrowUpRight,
  FiX,
  FiEye,
  FiCheckCircle,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import "../../styles/pages/Projects.css";
import { projectsInfo } from "../../data/projects";
import { sound } from "../../utils/sound";
import ScrambleText from "../common/ScrambleText";

const Projects = ({ selectedColor }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = projectsInfo.categories || [
    { id: "all", name: "All Works (10)" },
    { id: "wordpress", name: "WordPress & CMS" },
    { id: "enterprise", name: "Enterprise & Corporate" },
    { id: "ecommerce", name: "E-Commerce & Luxury" },
    { id: "ai", name: "AI & Modern Tech" },
  ];

  const filteredProjects = projectsInfo.projects.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category === activeCategory;
  });

  const handleCategoryChange = (id) => {
    sound.playClick();
    setActiveCategory(id);
  };

  const openModal = (proj) => {
    sound.playClick();
    setSelectedProject(proj);
  };

  const closeModal = () => {
    sound.playClick();
    setSelectedProject(null);
  };

  return (
    <div className="projects-viewport">
      <div className="projects-container">
        {/* Page Header */}
        <div className="page-header-block">
          <div className="page-badge-pill">
            <HiSparkles />
            <span>{projectsInfo.badge || "03 // SELECTED PORTFOLIO"}</span>
          </div>
          <h1 className="page-title">
            <ScrambleText text={projectsInfo.title || "Selected Works"} speed={30} />
          </h1>
          <p className="page-subtitle">{projectsInfo.subtitle}</p>
        </div>

        {/* Filter Categories Bar */}
        <div className="projects-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-pill-btn interactive ${
                activeCategory === cat.id ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(cat.id)}
              onMouseEnter={() => sound.playHover()}
            >
              <span>{cat.name}</span>
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeFilterPill"
                  className="active-filter-glow"
                  style={{ backgroundColor: selectedColor }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <motion.div layout className="projects-card-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id || project.title}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="project-card interactive"
                onMouseEnter={() => sound.playHover()}
              >
                {/* Thumbnail Frame */}
                <div className="project-image-box">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-thumbnail"
                    loading="lazy"
                  />
                  <div className="project-image-overlay" />

                  {/* Top Badge */}
                  <span className="project-category-badge">
                    {project.categoryLabel || "Web Platform"}
                  </span>

                  {/* Hover Quick Action Overlay */}
                  <div className="project-hover-actions">
                    <button
                      className="quick-view-btn interactive"
                      onClick={() => openModal(project)}
                      title="Quick Preview"
                    >
                      <FiEye />
                      <span>Details</span>
                    </button>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="live-launch-btn interactive"
                        title="Visit Live Website"
                        onClick={() => sound.playClick()}
                      >
                        <FiExternalLink />
                        <span>Live Site</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Details */}
                <div className="project-body">
                  <div className="project-header-row">
                    <h3 className="project-title-text">{project.title}</h3>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-arrow-link"
                        title="Open Live"
                        onClick={() => sound.playClick()}
                        style={{ color: selectedColor }}
                      >
                        <FiArrowUpRight />
                      </a>
                    )}
                  </div>

                  <p className="project-desc-text">{project.description}</p>

                  {/* Tech Tags */}
                  <div className="project-tags-cloud">
                    {project.tags?.map((tag, tIdx) => (
                      <span key={tIdx} className="project-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="project-card-footer">
                    <button
                      className="footer-preview-link"
                      onClick={() => openModal(project)}
                    >
                      <span>View Case Details</span>
                    </button>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-live-anchor"
                        style={{ color: selectedColor }}
                      >
                        <span>Visit Site</span>
                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Detail Modal */}
        {selectedProject &&
          createPortal(
            <AnimatePresence>
              <div className="modal-backdrop" onClick={closeModal}>
                <motion.div
                  key="project-modal"
                  className="modal-content-card"
                  initial={{ opacity: 0, scale: 0.94, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 15 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="modal-close-btn interactive"
                    onClick={closeModal}
                    aria-label="Close Modal"
                  >
                    <FiX />
                  </button>

                  <div className="modal-image-wrap">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="modal-img"
                    />
                    <div className="modal-img-gradient" />
                    <span className="modal-category-tag">
                      {selectedProject.categoryLabel}
                    </span>
                  </div>

                  <div className="modal-body-content">
                    <h2 className="modal-title">{selectedProject.title}</h2>
                    {selectedProject.highlight && (
                      <span className="modal-highlight-badge">
                        <FiCheckCircle style={{ color: selectedColor }} />
                        <span>{selectedProject.highlight}</span>
                      </span>
                    )}
                    <p className="modal-desc">{selectedProject.description}</p>

                    <div className="modal-tech-section">
                      <h4>Technologies & Architecture</h4>
                      <div className="modal-tags-row">
                        {selectedProject.tags?.map((tag, i) => (
                          <span key={i} className="modal-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="modal-actions-bar">
                      {selectedProject.liveLink && (
                        <a
                          href={selectedProject.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="modal-primary-btn interactive"
                          style={{
                            backgroundColor: selectedColor,
                            boxShadow: `0 8px 20px -4px ${selectedColor}66`,
                          }}
                          onClick={() => sound.playClick()}
                        >
                          <span>Launch Live Website</span>
                          <FiExternalLink />
                        </a>
                      )}
                      {selectedProject.githubLink && (
                        <a
                          href={selectedProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="modal-secondary-btn interactive"
                          onClick={() => sound.playClick()}
                        >
                          <FiGithub />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatePresence>,
            document.body
          )}
      </div>
    </div>
  );
};

export default Projects;
