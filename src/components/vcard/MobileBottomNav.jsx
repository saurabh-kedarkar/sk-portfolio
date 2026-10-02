import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHome,
  FiBriefcase,
  FiCpu,
  FiBookOpen,
  FiMail,
} from "react-icons/fi";
import { sound } from "../../utils/sound";
import "./MobileBottomNav.css";

const navItems = [
  { to: "/", label: "Home", icon: <FiHome /> },
  { to: "/experience", label: "Experience", icon: <FiBriefcase /> },
  { to: "/skills", label: "Skills", icon: <FiCpu /> },
  { to: "/blog", label: "Blogs", icon: <FiBookOpen /> },
  { to: "/contact", label: "Contact", icon: <FiMail /> },
];

const MobileBottomNav = ({ selectedColor }) => {
  const location = useLocation();

  const handleTabClick = () => {
    sound.playClick();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <nav className="mobile-bottom-nav-dock" aria-label="Mobile Bottom Navigation">
      <div className="mobile-bottom-nav-container">
        {navItems.map((item) => {
          const isActive =
            item.to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`mobile-dock-item ${isActive ? "active" : ""}`}
              onClick={() => handleTabClick(item.to)}
            >
              {/* Active Spring Background Capsule */}
              {isActive && (
                <motion.div
                  layoutId="mobileActiveDockBg"
                  className="mobile-dock-active-bg"
                  style={{
                    backgroundColor: selectedColor,
                    boxShadow: `0 4px 20px ${selectedColor}66`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 32,
                  }}
                />
              )}

              <span className="mobile-dock-icon">{item.icon}</span>
              <span className="mobile-dock-label">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
