import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { socialLinks } from "../../data/portfolio";
import { contactInfo } from "../../data/contact";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/pages/Contact.css";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const url =
        "https://clever-bublanina.netlify.app/.netlify/functions/api/users/ContactSignup";
      const response = await axios.post(url, data);
      if (response.status === 201) {
        // Show success toast
        toast.success(`Your Message sent successfully!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.log("Error sending message:", error);
    }
    // Reset form
    reset();
  };

  return (
    <div className="contact-container">
      <ToastContainer theme="dark" />
      <div className="contact-content">
        <div className="contact-header">
          <h1>{contactInfo?.title}</h1>
          <p className="subtitle">{contactInfo?.subtitle}</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            {contactInfo?.contactAddress?.map((item, index) => (
              <div key={index} className="info-card">
                <div className="card-header">
                  <div className="info-icon">{item.titleIcon}</div>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.subtitle}</p>
                {item.title === "Phone" && (
                  <div className="contact-actions">
                    <motion.a
                      href={`https://wa.me/${item.subtitle.replace(
                        /[^0-9]/g,
                        ""
                      )}`}
                      whileHover={{ scale: 1.1 }}
                      className="contact-action-btn whatsapp"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Chat on WhatsApp"
                    >
                      <div className="action-content">
                        <i className="fab fa-whatsapp"></i>
                        <span>WhatsApp</span>
                      </div>
                    </motion.a>
                    <motion.a
                      href={`https://t.me/Saurabhk2812`}
                      whileHover={{ scale: 1.1 }}
                      className="contact-action-btn telegram"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Chat on Telegram"
                    >
                      <div className="action-content">
                        <i className="fab fa-telegram"></i>
                        <span>Telegram</span>
                      </div>
                    </motion.a>
                  </div>
                )}
              </div>
            ))}
            <div className="social-links">
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
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className={errors.name ? "error" : ""}
                />
                {errors.name && (
                  <span className="error-message">{errors.name.message}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Subject"
                  {...register("subject", {
                    required: "Subject is required",
                    minLength: {
                      value: 4,
                      message: "Subject must be at least 4 characters",
                    },
                  })}
                  className={errors.subject ? "error" : ""}
                />
                {errors.subject && (
                  <span className="error-message">
                    {errors.subject.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <input
                  type="number"
                  placeholder="Phone"
                  {...register("phone", {
                    required: "Phone No. is required",
                    minLength: {
                      value: 10,
                      message: "Phone Number must be at least 10 characters",
                    },
                  })}
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone.message}</span>
                )}
              </div>

              <div className="form-group">
                <textarea
                  placeholder="Your Message"
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                  className={errors.message ? "error" : ""}
                ></textarea>
                {errors.message && (
                  <span className="error-message">
                    {errors.message.message}
                  </span>
                )}
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
