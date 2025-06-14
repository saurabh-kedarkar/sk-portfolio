import React from 'react';
import '../../styles/pages/About.css';
import { aboutInfo } from '../../data/about';

const About = () => {
  console.log("aboutInfo", aboutInfo);

  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-header">
          <h1>{aboutInfo?.title}</h1>
          <p className="subtitle">{aboutInfo?.subtitle}</p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <h3>{aboutInfo?.aboutme?.title}</h3>
            <p>{aboutInfo?.aboutme?.description}</p>
          </div>

          <div className="about-card">
            <h3>{aboutInfo?.experience?.title}</h3>
            {
              aboutInfo?.experience?.experienceItems?.map((item, index) => (
                <div key={index} className="experience-item">
                  <h4>{item.title}</h4>
                  <p>{item.company} • {item.duration}</p>
                  <ul>
                    {item.description.map((desc, descIndex) => (
                      <li key={descIndex}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))
            }
          </div>

          <div className="about-card">
            <h3>{aboutInfo?.education?.title}</h3>
            {
              aboutInfo?.education?.educationItems?.map((item, index) => (
                <div key={index} className="education-item">
                  <h4>{item.degree}</h4>
                  <p>{item.school} • {item.duration}</p>
                </div>
              ))
            }
          </div>

          <div className="about-card">
            <h3>{aboutInfo?.interests?.title}</h3>
            <div className="interests-grid">
              {
                aboutInfo?.interests?.interests?.map((interest, index) => (
                  <span key={index}>{interest}</span>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
