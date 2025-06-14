import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
export const portfolioInfo = {
  title: "Get To Know Me",
  username: "Saurabh Kedarkar",
  designation: "Web Developer",
  description:
    "I am a passionate web developer from India, dedicated to transforming ideas into impactful digital experiences. With a keen eye for emerging trends and a commitment to delivering excellence, I turn visions into reality, focusing on rapid iteration and seamless execution.",
  button: {
    hireMe: {
      text: "Hire Me",
      link: "https://www.fiverr.com/share/qb8D02",
    },
    aboutMe: {
      text: "About Me",
      link: "/about",
    },
  },
};

export const socialLinks = [
  {
    url: "https://www.instagram.com/100rabh2812/",
    icon: <FaInstagram size={20} />,
  },
  {
    url: "https://www.linkedin.com/in/saurabhk2812/",
    icon: <FaLinkedinIn size={20} />,
  },
  {
    url: "https://www.facebook.com/saurabh.kedarkar.56",
    icon: <FaFacebookF size={20} />,
  },
  {
    url: "https://x.com/SaurabhKedarkar?t=OEUt2d",
    icon: <FaTwitter size={20} />,
  },
  {
    url: "https://github.com/saurabh-kedarkar",
    icon: <FaGithub size={20} />,
  },
];
