import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaWhatsapp,
  FaTelegramPlane,
} from "react-icons/fa";

export const portfolioInfo = {
  title: "Full Stack & WordPress Developer",
  username: "Saurabh Kedarkar",
  designation: "Full Stack & WordPress Developer",
  roles: [
    "Full Stack Web Developer",
    "WordPress & WooCommerce Specialist",
    "React.js & Node.js Engineer",
    "Speed & Performance Optimizer",
  ],
  status: "Available for New Opportunities",
  availabilityText: "Open to full-time roles & high-impact freelance projects",
  location: "Amravati, Maharashtra, India",
  description:
    "Passionate Web Developer with 2+ years of professional experience building high-performance web applications, custom WordPress ecosystems, and intuitive digital experiences. Dedicated to clean code, robust architecture, and 40%+ performance gains.",
  avatar:
    "https://res.cloudinary.com/dqlvyzz4i/image/upload/f_auto,q_auto,w_500/v1762356770/WhatsApp_Image_2025-11-05_at_15.31.51_cf9d4bb9_aho1lg.jpg",
  cvLink: "#",
  stats: [
    {
      value: "3+",
      label: "Years Experience",
      detail: "Full Stack & CMS Development",
    },
    {
      value: "15+",
      label: "Delivered Projects",
      detail: "Global & Enterprise Clients",
    },
    {
      value: "40%",
      label: "Speed Optimization",
      detail: "Average Performance Boost",
    },
    {
      value: "8+",
      label: "Enterprise Apps",
      detail: "Scalable Production Systems",
    },
  ],
  button: {
    hireMe: {
      text: "Let's Talk",
      link: "/contact",
    },
    aboutMe: {
      text: "About Me",
      link: "/about",
    },
    viewWork: {
      text: "Explore Work",
      link: "/projects",
    },
  },
};

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/saurabh-kedarkar",
    icon: <FaGithub size={18} />,
    color: "#333",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/saurabh-kedarkar/",
    icon: <FaLinkedinIn size={18} />,
    color: "#0a66c2",
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/917038933292",
    icon: <FaWhatsapp size={18} />,
    color: "#25d366",
  },
  {
    name: "Twitter / X",
    url: "https://x.com/SaurabhKedarkar?t=OEUt2d",
    icon: <FaTwitter size={18} />,
    color: "#1da1f2",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/100rabh2812/",
    icon: <FaInstagram size={18} />,
    color: "#e4405f",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/saurabh.kedarkar.56",
    icon: <FaFacebookF size={18} />,
    color: "#1877f2",
  },
];
