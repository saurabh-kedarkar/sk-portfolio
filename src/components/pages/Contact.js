import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import {
  FiMail,
  FiMapPin,
  FiSend,
  FiCopy,
  FiCheck,
  FiClock,
  FiMessageSquare,
  FiExternalLink,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import "../../styles/pages/Contact.css";
import { contactInfo } from "../../data/contact";
import { socialLinks } from "../../data/portfolio";
import { sound } from "../../utils/sound";
import { appendSubmissionToCsv } from "../../utils/csvStorage";

const Contact = ({ selectedColor }) => {
  const [copiedKey, setCopiedKey] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Live India Time clock
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setCurrentTime(formatter.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text, key) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.info(`Copied to clipboard: ${text}`, {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
    });
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    sound.playClick();

    const newEntry = {
      id: "sub_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      name: data.name || data.fullName || "Anonymous",
      email: data.email || "No email provided",
      phone: data.phone || data.mobile || data.whatsapp || "N/A",
      subject: data.subject || "General Project Enquiry",
      message: data.message || "",
      submittedAt: new Date().toISOString(),
      status: "unread",
    };

    // Append entry to CSV storage file immediately
    try {
      appendSubmissionToCsv(newEntry);
    } catch (err) {
      console.error("Failed to append submission to CSV:", err);
    }

    try {
      const url =
        "https://clever-bublanina.netlify.app/.netlify/functions/api/users/ContactSignup";
      await axios.post(url, data);
      toast.success("Thank you! Your message has been sent successfully.", {
        position: "top-right",
        autoClose: 4000,
        theme: "dark",
      });
      reset();
    } catch (error) {
      console.log("Contact error:", error);
      toast.success("Message recorded! Saurabh will get back to you shortly.", {
        position: "top-right",
        autoClose: 4000,
        theme: "dark",
      });
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-viewport">
      <ToastContainer theme="dark" />
      <div className="contact-container">
        {/* Header Block */}
        <div className="page-header-block">
          <div className="page-badge-pill">
            <HiSparkles />
            <span>{contactInfo.badge || "05 // REACH OUT"}</span>
          </div>
          <h1 className="page-title">{contactInfo.title}</h1>
          <p className="page-subtitle">{contactInfo.subtitle}</p>
        </div>

        {/* Main Grid */}
        <div className="contact-grid-main">
          {/* Left: Contact Info & Channels */}
          <div className="contact-info-panel">
            {/* Status / Timezone Card */}
            <div className="availability-card interactive">
              <div className="card-top-pill">
                <span className="live-dot" />
                <span>Active Status</span>
              </div>
              <h3 className="avail-title">Available for Projects & Roles</h3>
              <p className="avail-desc">
                Based in Maharashtra, India. Open to remote contracts, full-time
                positions, and high-impact freelance consulting.
              </p>

              <div className="time-display-box">
                <FiClock className="time-icon" style={{ color: selectedColor }} />
                <div className="time-text">
                  <span className="time-label">Local Time (IST):</span>
                  <span className="time-val">{currentTime || "Loading..."}</span>
                </div>
              </div>
            </div>

            {/* Direct Channel Cards */}
            <div className="channels-column">
              {/* Email */}
              <div className="channel-card interactive">
                <div className="channel-icon-wrap">
                  <FiMail />
                </div>
                <div className="channel-info">
                  <span className="channel-label">Direct Email</span>
                  <span className="channel-val">saurabhk2812@gmail.com</span>
                </div>
                <div className="channel-actions">
                  <button
                    className="copy-btn interactive"
                    onClick={() => handleCopy("saurabhk2812@gmail.com", "email")}
                    title="Copy Email"
                  >
                    {copiedKey === "email" ? (
                      <FiCheck style={{ color: "#10b981" }} />
                    ) : (
                      <FiCopy />
                    )}
                  </button>
                  <a
                    href="mailto:saurabhk2812@gmail.com"
                    className="direct-link interactive"
                    title="Open Mail Client"
                    onClick={() => sound.playClick()}
                  >
                    <FiExternalLink />
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="channel-card interactive">
                <div className="channel-icon-wrap whatsapp">
                  <FaWhatsapp />
                </div>
                <div className="channel-info">
                  <span className="channel-label">Instant WhatsApp</span>
                  <span className="channel-val">+91 7038933292</span>
                </div>
                <div className="channel-actions">
                  <button
                    className="copy-btn interactive"
                    onClick={() => handleCopy("+917038933292", "phone")}
                    title="Copy Phone"
                  >
                    {copiedKey === "phone" ? (
                      <FiCheck style={{ color: "#10b981" }} />
                    ) : (
                      <FiCopy />
                    )}
                  </button>
                  <a
                    href="https://wa.me/917038933292?text=Hi%20Saurabh,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="direct-link interactive"
                    title="Chat on WhatsApp"
                    onClick={() => sound.playClick()}
                  >
                    <FiExternalLink />
                  </a>
                </div>
              </div>

              {/* Telegram */}
              <div className="channel-card interactive">
                <div className="channel-icon-wrap telegram">
                  <FaTelegramPlane />
                </div>
                <div className="channel-info">
                  <span className="channel-label">Telegram</span>
                  <span className="channel-val">@Saurabhk2812</span>
                </div>
                <div className="channel-actions">
                  <a
                    href="https://t.me/Saurabhk2812"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="direct-link interactive"
                    title="Open Telegram"
                    onClick={() => sound.playClick()}
                  >
                    <FiExternalLink />
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="channel-card interactive">
                <div className="channel-icon-wrap location">
                  <FiMapPin />
                </div>
                <div className="channel-info">
                  <span className="channel-label">Location</span>
                  <span className="channel-val">
                    Teosa, Amravati, Maharashtra, India
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="contact-social-footer">
              <span className="social-heading">Follow & Connect</span>
              <div className="social-pills-row">
                {socialLinks.map((s, idx) => (
                  <motion.a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-pill interactive"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => sound.playHover()}
                    onClick={() => sound.playClick()}
                    title={s.name}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Glassmorphic Contact Form */}
          <div className="contact-form-panel">
            <div className="form-card-container">
              <div className="form-card-header">
                <div className="form-icon-pill">
                  <FiMessageSquare style={{ color: selectedColor }} />
                </div>
                <div>
                  <h3 className="form-title">Send a Direct Message</h3>
                  <span className="form-subtitle">
                    Fill out the form below and I'll respond within 24 hours.
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="cinematic-form">
                <div className="form-row-dual">
                  {/* Name Field */}
                  <div className="form-input-group">
                    <label className="input-label">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      className={`form-input interactive ${
                        errors.name ? "has-error" : ""
                      }`}
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                    />
                    {errors.name && (
                      <span className="input-error-msg">{errors.name.message}</span>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="form-input-group">
                    <label className="input-label">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className={`form-input interactive ${
                        errors.email ? "has-error" : ""
                      }`}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <span className="input-error-msg">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-row-dual">
                  {/* Subject Field */}
                  <div className="form-input-group">
                    <label className="input-label">Subject / Purpose</label>
                    <input
                      type="text"
                      placeholder="e.g. New Project Inquiry"
                      className={`form-input interactive ${
                        errors.subject ? "has-error" : ""
                      }`}
                      {...register("subject", {
                        required: "Subject is required",
                        minLength: {
                          value: 4,
                          message: "Subject must be at least 4 characters",
                        },
                      })}
                    />
                    {errors.subject && (
                      <span className="input-error-msg">
                        {errors.subject.message}
                      </span>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="form-input-group">
                    <label className="input-label">Phone / WhatsApp (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="form-input interactive"
                      {...register("phone")}
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="form-input-group">
                  <label className="input-label">Your Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project, timeline, and goals..."
                    className={`form-textarea interactive ${
                      errors.message ? "has-error" : ""
                    }`}
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    })}
                  />
                  {errors.message && (
                    <span className="input-error-msg">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="form-submit-btn interactive"
                  style={{
                    backgroundColor: selectedColor,
                    boxShadow: `0 8px 25px -4px ${selectedColor}66`,
                  }}
                  onMouseEnter={() => sound.playHover()}
                >
                  {isSubmitting ? (
                    <span>Sending Transmission...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FiSend className="send-btn-icon" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
