import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import "../styles/Portfolio.css";
import "./vcard/VCardLayout.css";
import LeftProfileCard from "./vcard/LeftProfileCard";
import TopFloatingNav from "./vcard/TopFloatingNav";
import MobileTopBar from "./vcard/MobileTopBar";
import MobileBottomNav from "./vcard/MobileBottomNav";
import CommandPalette from "./vcard/CommandPalette";
import VCardHome from "./vcard/VCardHome";
import VCardResume from "./vcard/VCardResume";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import ContactUser from "./pages/ContactUser";
import NotFound from "./NotFound";
import BackgroundAtmosphere from "./common/BackgroundAtmosphere";
import CustomCursor from "./common/CustomCursor";

const hexToRgb = (hex) => {
  let c = hex.replace("#", "");
  if (c.length === 3) c = c.split("").map((x) => x + x).join("");
  const num = parseInt(c, 16);
  return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
};

const ScrollToTopOnRoute = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const container = document.querySelector(".portfolio-container");
    if (container) {
      container.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const themeColors = [
  { name: "Electric Cyan", hex: "#06b6d4" },
  { name: "Cyber Blue", hex: "#3b82f6" },
  { name: "Neon Emerald", hex: "#10b981" },
  { name: "Royal Violet", hex: "#8b5cf6" },
  { name: "Sunset Amber", hex: "#f59e0b" },
  { name: "Crimson Rose", hex: "#f43f5e" },
];

// Calculate automatic daily color based on day of year
const getDailyColor = () => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
  );
  return themeColors[dayOfYear % themeColors.length].hex;
};

const AppContent = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [colorMode, setColorModeState] = useState(() => {
    return localStorage.getItem("portfolio_color_mode") || "auto";
  });
  const [customColor, setCustomColorState] = useState(() => {
    return localStorage.getItem("portfolio_custom_color") || "#06b6d4";
  });
  const [cursorStyle, setCursorStyleState] = useState(() => {
    return localStorage.getItem("portfolio_cursor_style") || "glow-dot";
  });

  const [isQuickHireOpen, setIsQuickHireOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/about";

  // Dynamic color selection (Auto Daily vs Custom)
  const selectedColor = colorMode === "auto" ? getDailyColor() : customColor;

  const setSelectedColor = (hex) => {
    setCustomColorState(hex);
    localStorage.setItem("portfolio_custom_color", hex);
  };

  const setColorMode = (mode) => {
    setColorModeState(mode);
    localStorage.setItem("portfolio_color_mode", mode);
  };

  const setCursorStyle = (styleId) => {
    setCursorStyleState(styleId);
    localStorage.setItem("portfolio_cursor_style", styleId);
  };

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", selectedColor);
    document.documentElement.style.setProperty(
      "--primary-glow",
      `${selectedColor}40`
    );
    document.documentElement.style.setProperty(
      "--primary-rgb",
      hexToRgb(selectedColor)
    );
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [selectedColor, isDarkMode]);

  return (
    <div className={`portfolio-container ${isDarkMode ? "dark" : "light"}`}>
      <ScrollToTopOnRoute />

      {/* Cinematic Background Atmosphere & Particles (Richer & more dynamic) */}
      <BackgroundAtmosphere
        selectedColor={selectedColor}
        isDarkMode={isDarkMode}
      />

      {/* Modern Interactive Custom Cursor (5 selectable cursor options) */}
      <CustomCursor
        selectedColor={selectedColor}
        cursorStyle={cursorStyle}
      />

      {/* Mobile Dedicated Top Utility Bar */}
      <MobileTopBar
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        colorMode={colorMode}
        setColorMode={setColorMode}
        cursorStyle={cursorStyle}
        setCursorStyle={setCursorStyle}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        themeColors={themeColors}
        onOpenCommandPalette={() => setIsCommandOpen(true)}
      />

      {/* Bento vCard 2-Column Master Layout */}
      <div className={`vcard-layout-wrapper ${isHomePage ? "home-view" : "subpage-view"}`}>
        <div className="vcard-layout-container">
          {/* Left Column: Profile Card with Big Centered Photo */}
          <div className="vcard-left-col">
            <LeftProfileCard
              selectedColor={selectedColor}
              isQuickHireOpen={isQuickHireOpen}
              setIsQuickHireOpen={setIsQuickHireOpen}
            />
          </div>

          {/* Right Column: Floating Nav Tabs + Main Content Card */}
          <div className="vcard-right-col">
            {/* Desktop Top Floating Nav */}
            <TopFloatingNav
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              colorMode={colorMode}
              setColorMode={setColorMode}
              cursorStyle={cursorStyle}
              setCursorStyle={setCursorStyle}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              themeColors={themeColors}
              onOpenFastPitch={() => setIsQuickHireOpen(true)}
              onOpenCommandPalette={() => setIsCommandOpen(true)}
            />

            <main className="vcard-main-card">
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  {/* Home Tab */}
                  <Route
                    path="/"
                    element={<VCardHome selectedColor={selectedColor} />}
                  />
                  <Route
                    path="/about"
                    element={<VCardHome selectedColor={selectedColor} />}
                  />
                  {/* Experience Tab (/experience) */}
                  <Route
                    path="/experience"
                    element={<VCardResume selectedColor={selectedColor} />}
                  />
                  <Route
                    path="/resume"
                    element={<VCardResume selectedColor={selectedColor} />}
                  />
                  {/* Skills Tab (/skills) */}
                  <Route
                    path="/skills"
                    element={<Skills selectedColor={selectedColor} />}
                  />
                  {/* Projects Page (/projects - accessible via URL, hidden from main menu) */}
                  <Route
                    path="/projects"
                    element={<Projects selectedColor={selectedColor} />}
                  />
                  {/* Blog Tab */}
                  <Route
                    path="/blog"
                    element={<Blog selectedColor={selectedColor} />}
                  />
                  {/* Contact Tab */}
                  <Route
                    path="/contact"
                    element={<Contact selectedColor={selectedColor} />}
                  />
                  {/* Contact Submissions Inbox Subpage */}
                  <Route
                    path="/get-contact"
                    element={<ContactUser selectedColor={selectedColor} />}
                  />
                  <Route
                    path="/contact-user"
                    element={<ContactUser selectedColor={selectedColor} />}
                  />
                  {/* 404 Fallback */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Dedicated Bottom Navigation Dock */}
      <MobileBottomNav selectedColor={selectedColor} />

      {/* Global Command Palette Modal (Ctrl+K / ⌘K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        selectedColor={selectedColor}
      />
    </div>
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
