import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUp } from "react-icons/fi";
import { socialLinks } from "../../data/portfolio";
import { sound } from "../../utils/sound";
import "./LuxuryFooter.css";

const LuxuryFooter = ({ selectedColor }) => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="luxury-footer-root">
      <div className="luxury-footer-bound">
        {/* Top Pre-Footer Callout */}
        <div className="luxury-footer-callout">
          <div className="callout-left">
            <span className="callout-tag">WORK WITH SAURABH</span>
            <h2 className="callout-headline">
              Have an ambitious project in mind? Let's build something exceptional.
            </h2>
          </div>
          <div className="callout-right">
            <Link
              to="/contact"
              className="callout-cta-btn interactive"
              style={{
                backgroundColor: selectedColor,
                boxShadow: `0 8px 30px -4px ${selectedColor}66`,
              }}
              onClick={() => sound.playClick()}
            >
              <span>Start a Conversation</span>
            </Link>
          </div>
        </div>

        {/* Middle Columns */}
        <div className="luxury-footer-grid">
          <div className="footer-col brand-col">
            <div className="footer-brand-title">
              <span style={{ color: selectedColor }}>Saurabh</span> Kedarkar
            </div>
            <p className="footer-brand-desc">
              Full Stack Web Developer & WordPress Architect with 2+ years of professional experience delivering scalable, high-performance web systems and bespoke digital platforms.
            </p>
            <div className="footer-availability-chip">
              <span className="footer-dot-live" />
              <span>Available for Full-time Roles & Contracts</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/" onClick={() => sound.playClick()}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => sound.playClick()}>
                  About My Journey
                </Link>
              </li>
              <li>
                <Link to="/projects" onClick={() => sound.playClick()}>
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link to="/skills" onClick={() => sound.playClick()}>
                  Technical Arsenal
                </Link>
              </li>
              <li>
                <Link to="/blog" onClick={() => sound.playClick()}>
                  Articles & Insights
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => sound.playClick()}>
                  Get In Touch
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Direct Connect</h4>
            <ul className="footer-links-list">
              <li>
                <a
                  href="https://wa.me/917038933292"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                >
                  WhatsApp Instant
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/Saurabhk2812"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                >
                  Telegram Messenger
                </a>
              </li>
              <li>
                <a
                  href="mailto:saurabhk2812@gmail.com"
                  onClick={() => sound.playClick()}
                >
                  saurabhk2812@gmail.com
                </a>
              </li>
              <li>
                <span className="footer-plain-text">
                  Teosa, Amravati, MH, India
                </span>
              </li>
            </ul>
          </div>

          <div className="footer-col social-col">
            <h4 className="footer-col-title">Social Ecosystem</h4>
            <div className="footer-social-icons">
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon interactive"
                  title={item.name}
                  onClick={() => sound.playClick()}
                >
                  {item.icon}
                </a>
              ))}
            </div>
            <p className="footer-social-note">
              Based in India • Working with worldwide clients across UK, US, and Southeast Asia.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="luxury-footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} Saurabh Kedarkar. Engineered with clean architecture & modern web standards.
          </div>
          <button
            className="footer-back-to-top interactive"
            onClick={scrollToTop}
            title="Scroll to Top"
          >
            <span>Back to top</span>
            <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default LuxuryFooter;
