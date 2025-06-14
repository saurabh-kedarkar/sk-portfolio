import React from 'react';
import '../../styles/pages/Skills.css';
import { skillsInfo } from '../../data/skills';

const Skills = () => {
  return (
    <div className="skills-container">
      <div className="skills-content">
        <div className="skills-header">
          <h1>{skillsInfo?.title}</h1>
          <p className="subtitle">{skillsInfo?.subtitle}</p>
        </div>

        <div className="skills-grid">
          {skillsInfo?.skillsTech?.map((category, index) => (
            <div key={index} className="skill-category">
              <h2>{category.name}</h2>
              <div className="skills-list">
                {category.roles.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
