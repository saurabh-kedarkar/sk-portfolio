import React from "react";
import {
  SiReact,
  SiWordpress,
  SiNodedotjs,
  SiJavascript,
  SiNextdotjs,
  SiPhp,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiTailwindcss,
  SiGit,
  SiPostman,
  SiWoo,
  SiHtml5,
} from "react-icons/si";
import "./TechMarquee.css";

const techItems = [
  { name: "React.js", icon: <SiReact style={{ color: "#61dafb" }} /> },
  { name: "WordPress", icon: <SiWordpress style={{ color: "#21759b" }} /> },
  { name: "Next.js", icon: <SiNextdotjs style={{ color: "#ffffff" }} /> },
  { name: "Node.js", icon: <SiNodedotjs style={{ color: "#68a063" }} /> },
  { name: "PHP", icon: <SiPhp style={{ color: "#777bb4" }} /> },
  { name: "WooCommerce", icon: <SiWoo style={{ color: "#96588a" }} /> },
  { name: "JavaScript", icon: <SiJavascript style={{ color: "#f7df1e" }} /> },
  { name: "MySQL", icon: <SiMysql style={{ color: "#4479a1" }} /> },
  { name: "Docker", icon: <SiDocker style={{ color: "#2496ed" }} /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss style={{ color: "#38bdf8" }} /> },
  { name: "MongoDB", icon: <SiMongodb style={{ color: "#47a248" }} /> },
  { name: "Git & GitHub", icon: <SiGit style={{ color: "#f05032" }} /> },
  { name: "Postman", icon: <SiPostman style={{ color: "#ff6c37" }} /> },
  { name: "HTML5 & SCSS", icon: <SiHtml5 style={{ color: "#e34f26" }} /> },
];

const TechMarquee = () => {
  return (
    <div className="marquee-wrapper" aria-label="Technologies Marquee">
      <div className="marquee-fade-left" />
      <div className="marquee-track">
        {/* Double the list for infinite seamless loop */}
        {[...techItems, ...techItems].map((item, index) => (
          <div key={index} className="marquee-item">
            <span className="marquee-icon">{item.icon}</span>
            <span className="marquee-text">{item.name}</span>
          </div>
        ))}
      </div>
      <div className="marquee-fade-right" />
    </div>
  );
};

export default TechMarquee;
