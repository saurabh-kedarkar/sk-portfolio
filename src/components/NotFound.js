import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiAlertTriangle } from "react-icons/fi";
import "../styles/NotFound.css";
import { sound } from "../utils/sound";

const NotFound = () => (
  <div className="not-found-viewport">
    <div className="not-found-card">
      <div className="not-found-icon">
        <FiAlertTriangle />
      </div>
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-title">Page Lost in Space</h2>
      <p className="not-found-desc">
        The coordinates you entered do not exist or have drifted into deep cosmic space.
      </p>
      <Link
        to="/"
        className="not-found-home-btn interactive"
        onClick={() => sound.playClick()}
      >
        <FiHome />
        <span>Return to Base Orbit</span>
      </Link>
    </div>
  </div>
);

export default NotFound;
