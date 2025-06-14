import React from 'react';
import '../../styles/pages/Projects.css';
import { projectsInfo } from '../../data/projects';
const Projects = () => {
  return (
    <div className="projects-container">
      <div className="projects-content">
        <div className="projects-header">
          <h1>{projectsInfo?.title}</h1>
          <p className="subtitle">{projectsInfo?.subtitle}</p>
        </div>

        <div className="projects-grid">
          {projectsInfo?.projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-links">
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live Demo</a>
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
