import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.css";

const NotFound = () => (
  <div className="not-found">
    <h1>404</h1>
    <p>Page Not Found</p>
    <Link to="/">Go Back Home</Link>
  </div>
);

export default NotFound;
