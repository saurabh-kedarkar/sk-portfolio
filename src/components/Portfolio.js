import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/Portfolio.css";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import { socialLinks, portfolioInfo } from "../data/portfolio";
import ContactUser from "./pages/ContactUser";
import Blog from "./pages/Blog";
import NotFound from "./NotFound";

const pageVariants = {
  initial: {
    opacity: 0,
    x: -200,
    scale: 0.9,
  },
  enter: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    opacity: 0,
    x: 200,
    scale: 0.9,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

const MainContent = ({ selectedColor }) => {
  console.log("../");
  return (
    <motion.div
      className="portfolio-content"
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
    >
      <div className="content-wrapper">
        <motion.div
          className="profile-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.div
            className="profile-image"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* <img src="https://mavi.avstechnolabs.com/static/media/simple.9340dbb8700266806d00.jpg" alt="Profile" /> */}
            <img
              src="https://res.cloudinary.com/dqlvyzz4i/image/upload/v1734109435/hlnprouoif2nfziinxdj.jpg"
              alt="Profile"
            />
          </motion.div>
          <div className="profile-info">
            <motion.div
              className="subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {portfolioInfo?.title}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {portfolioInfo?.username}
            </motion.h1>
            <motion.h2
              style={{ color: selectedColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {portfolioInfo?.designation}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {portfolioInfo?.description}
            </motion.p>
            <div className="social-links-portfolio">
              {socialLinks?.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  whileHover={{ scale: 1.1 }}
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            <motion.div
              className="action-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                style={{ backgroundColor: selectedColor }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {portfolioInfo?.button?.hireMe?.text}
              </motion.button>
              <Link to={portfolioInfo?.button?.aboutMe?.link}>
                <motion.button
                  style={{ borderColor: selectedColor, color: selectedColor }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {portfolioInfo?.button?.aboutMe?.text}
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const AppContent = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#0047b3");
  const location = useLocation();

  const colors = [
    "#0047b3", // Blue
    "#34d399", // Green
    "#f87171", // Red
    "#fbbf24", // Yellow
    "#a78bfa", // Purple
    "#ffdc73",
  ];

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-color",
      selectedColor
    );
    const container = document.querySelector(".portfolio-container");
    if (container) {
      container.style.background = `linear-gradient(135deg, ${selectedColor} 24.9%, ${
        isDarkMode ? "#111827" : "#f8fafc"
      } 25%)`;
    }
  }, [selectedColor, isDarkMode]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`portfolio-container ${isDarkMode ? "dark" : "light"}`}>
      <motion.button
        className={`theme-toggle-btn ${isSettingsOpen ? "open" : ""}`}
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="toggle-icon"
          animate={{ rotate: isSettingsOpen ? 180 : 0 }}
        >
          <span></span>
          <span></span>
          <span></span>
        </motion.div>
      </motion.button>

      <motion.div
        className={`settings-panel ${isSettingsOpen ? "open" : ""}`}
        initial={false}
        animate={{
          x: isSettingsOpen ? 0 : "-100%",
          transition: { type: "spring", stiffness: 300, damping: 30 },
        }}
      >
        <div className="settings-content">
          <motion.div
            className="theme-switch"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              className="mode-toggle"
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="mode-icon"
                animate={{ rotate: isDarkMode ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {isDarkMode ? "⚡" : "🌙"}
              </motion.span>
              <span className="mode-label">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </motion.button>
          </motion.div>

          <motion.div
            className="color-options"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="color-label">Theme Colors</span>
            <div className="color-grid">
              {colors.map((color, index) => (
                <motion.button
                  key={color}
                  className={`color-option ${
                    color === selectedColor ? "active" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Navigation />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={<MainContent selectedColor={selectedColor} />}
          />
          <Route
            path="/about"
            element={
              <motion.div
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
              >
                <About />
              </motion.div>
            }
          />
          <Route
            path="/skills"
            element={
              <motion.div
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
              >
                <Skills />
              </motion.div>
            }
          />
          <Route
            path="/projects"
            element={
              <motion.div
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
              >
                <Projects />
              </motion.div>
            }
          />
          <Route
            path="/contact"
            element={
              <motion.div
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
              >
                <Contact />
              </motion.div>
            }
          />
          <Route
            path="/blog"
            element={
              <motion.div
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
              >
                <Blog />
              </motion.div>
            }
          />
          <Route
            path="/get-contact"
            element={
              <motion.div
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
              >
                <ContactUser />
              </motion.div>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

const Navigation = () => {
  return (
    <motion.nav
      className="side-nav"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-items">
        {[
          { path: "/", icon: "🏠", text: "Home" },
          { path: "/about", icon: "👤", text: "About" },
          { path: "/skills", icon: "💻", text: "Skills" },
          // { path: "/projects", icon: "🎯", text: "Projects" },
          { path: "/contact", icon: "✉️", text: "Contact" },
          { path: "/blog", icon: "📡", text: "Blog" },
        ].map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              end={item.path === "/"}
            >
              <motion.div
                className="nav-icon"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {item.icon}
              </motion.div>
              <span className="nav-text">{item.text}</span>
              <span className="nav-tooltip">{item.text}</span>
            </NavLink>
          </motion.div>
        ))}
      </div>
    </motion.nav>
  );
};

const Portfolio = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default Portfolio;
