import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/Layout.css";

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [accentColor, setAccentColor] = useState("#0066ff");
  const location = useLocation();

  const navLinks = [
    { to: "/", icon: "fas fa-home" },
    { to: "/about", icon: "fas fa-user" },
    { to: "/skills", icon: "fas fa-code" },
    { to: "/projects", icon: "fas fa-project-diagram" },
    { to: "/contact", icon: "fas fa-envelope" },
    { to: "/blog", icon: "fas fa-envelope" },
  ];

  const colorOptions = [
    "#0066ff",
    "#9400d3",
    "#ff8c00",
    "#00c853",
    "#ff4081",
    "#00bcd4",
  ];

  useEffect(() => {
    document.documentElement.style.setProperty("--accent-color", accentColor);
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode, accentColor]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isSettingsOpen) setIsSettingsOpen(false);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <div className={`layout ${isDarkMode ? "dark" : "light"}`}>
      {/* Mobile Menu Toggle */}
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>

      {/* Settings Toggle */}
      <button
        className="settings-toggle"
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
      >
        <i className="fas fa-cog"></i>
      </button>

      {/* Side Menu */}
      <nav className={`side-menu ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="profile-section">
          <img
            src="/profile-image.jpg"
            alt="Profile"
            className="profile-image"
          />
        </div>
        <div className="nav-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className={link.icon}></i>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Settings Panel */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            className="settings-panel"
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="settings-content">
              <h3>
                <i className="fas fa-cog"></i>
                Settings
              </h3>

              <div className="settings-section">
                <h4>
                  <i className="fas fa-moon"></i>
                  Theme Mode
                </h4>
                <div className="theme-options">
                  <button
                    className={`theme-option ${!isDarkMode ? "active" : ""}`}
                    onClick={() => setIsDarkMode(false)}
                  >
                    <i className="fas fa-sun"></i>
                    Light
                  </button>
                  <button
                    className={`theme-option ${isDarkMode ? "active" : ""}`}
                    onClick={() => setIsDarkMode(true)}
                  >
                    <i className="fas fa-moon"></i>
                    Dark
                  </button>
                </div>
              </div>

              <div className="settings-section">
                <h4>
                  <i className="fas fa-palette"></i>
                  Accent Color
                </h4>
                <div className="color-options">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      className={`color-option ${
                        accentColor === color ? "active" : ""
                      }`}
                      style={{ background: color }}
                      onClick={() => setAccentColor(color)}
                      aria-label={`Set accent color to ${color}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
