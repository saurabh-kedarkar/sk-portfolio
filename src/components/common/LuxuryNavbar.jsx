import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSun,
  FiMoon,
  FiVolume2,
  FiVolumeX,
  FiMenu,
  FiX,
  FiArrowUpRight,
} from "react-icons/fi";
import { sound } from "../../utils/sound";
import "./LuxuryNavbar.css";

const LuxuryNavbar = ({
  selectedColor,
  setSelectedColor,
  isDarkMode,
  setIsDarkMode,
  themeColors,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/skills", label: "Skills" },
    { to: "/blog", label: "Articles" },
    { to: "/contact", label: "Contact" },
  ];

  const toggleTheme = () => {
    sound.playClick();
    setIsDarkMode(!isDarkMode);
  };

  const toggleSound = () => {
    const newState = sound.toggle();
    setSoundActive(newState);
  };

  const handleColorChange = (hex) => {
    sound.playClick();
    setSelectedColor(hex);
    setIsPaletteOpen(false);
  };

  const closeMobile = () => {
    sound.playClick();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="luxury-navbar-wrapper">
      <div className="luxury-navbar-container">
        {/* Brand Monogram */}
        <Link
          to="/"
          className="luxury-brand interactive"
          onClick={() => sound.playClick()}
        >
          <div
            className="luxury-brand-badge"
            style={{ borderColor: `${selectedColor}66` }}
          >
            <span className="brand-letters" style={{ color: selectedColor }}>
              SK
            </span>
            <span className="brand-dot-beacon" />
          </div>
          <div className="luxury-brand-info">
            <span className="luxury-brand-name">Saurabh Kedarkar</span>
            <span className="luxury-brand-tag">Web Developer</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="luxury-desktop-nav" aria-label="Main Navigation">
          {navLinks.map((item) => {
            const isActive =
              item.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={`luxury-nav-item interactive ${
                  isActive ? "active" : ""
                }`}
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="luxuryNavPillGlow"
                    className="luxury-nav-pill"
                    style={{ backgroundColor: selectedColor }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="luxury-actions-cluster">
          {/* Sound Toggle */}
          <button
            className={`luxury-action-btn interactive ${
              soundActive ? "active" : ""
            }`}
            onClick={toggleSound}
            title={soundActive ? "Disable Sound FX" : "Enable Sound FX"}
            aria-label="Toggle Sound"
          >
            {soundActive ? <FiVolume2 /> : <FiVolumeX />}
          </button>

          {/* Theme Toggle */}
          <button
            className="luxury-action-btn interactive"
            onClick={toggleTheme}
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>

          {/* Color Palette Popover */}
          <div className="luxury-palette-wrap">
            <button
              className="luxury-action-btn interactive"
              onClick={() => {
                sound.playClick();
                setIsPaletteOpen(!isPaletteOpen);
              }}
              title="Change Accent Color"
              aria-label="Accent Color"
            >
              <span
                className="luxury-color-swatch-circle"
                style={{ backgroundColor: selectedColor }}
              />
            </button>

            <AnimatePresence>
              {isPaletteOpen && (
                <motion.div
                  className="luxury-palette-menu"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="palette-menu-title">Luxury Palettes</div>
                  <div className="palette-swatches-grid">
                    {themeColors.map((col) => (
                      <button
                        key={col.hex}
                        className={`palette-swatch-btn interactive ${
                          col.hex === selectedColor ? "selected" : ""
                        }`}
                        style={{ backgroundColor: col.hex }}
                        onClick={() => handleColorChange(col.hex)}
                        title={col.name}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hire Me CTA Button */}
          <Link
            to="/contact"
            className="luxury-hire-cta interactive"
            style={{
              borderColor: `${selectedColor}66`,
              color: selectedColor,
            }}
            onClick={() => sound.playClick()}
          >
            <span>Let's Talk</span>
            <FiArrowUpRight className="hire-cta-arrow" />
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            className="luxury-hamburger-btn interactive"
            onClick={() => {
              sound.playClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            aria-label="Open Navigation Menu"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="luxury-mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mobile-drawer-links">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className="mobile-drawer-item interactive"
                  onClick={closeMobile}
                >
                  <span>{item.label}</span>
                  <FiArrowUpRight />
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="mobile-drawer-cta interactive"
                style={{ backgroundColor: selectedColor }}
                onClick={closeMobile}
              >
                <span>Book a Consultation</span>
                <FiArrowUpRight />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default LuxuryNavbar;
