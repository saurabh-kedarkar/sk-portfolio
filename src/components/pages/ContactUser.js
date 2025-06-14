import React, { useEffect, useState } from "react";
import "../../styles/pages/ContactUser.css";
import axios from "axios";

function ContactUser() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        // Try to get URL from environment variable, fallback to direct URL if not available
        const baseUrl =
          "https://clever-bublanina.netlify.app/.netlify/functions/api/users/ContactGet";

        const response = await axios.get(baseUrl);
        if (response.data && response.data.users) {
          setUsers(response.data.users);
        } else {
          throw new Error("Invalid response format from server");
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
        setError(error.message);
      }
    }

    fetchUsers();
  }, [setUsers]);

  if (error) {
    return (
      <div className="users-container">
        <h1 className="page-title">Contact Members</h1>
        <div className="error-message">Error loading contacts: {error}</div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <h1 className="page-title">Contact Members</h1>
      <div className="users-grid">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div key={index} className="user-card">
              <div className="user-header">
                <div
                  className="user-avatar"
                  style={{ backgroundColor: `hsl(${index * 90}, 70%, 50%)` }}
                >
                  {user?.name?.charAt(0) || "?"}
                </div>
                <div className="user-title">
                  <h2>{user?.name || "Unknown"}</h2>
                </div>
              </div>

              <div className="user-info">
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{user?.email || "N/A"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{user?.phone || "N/A"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Subject</span>
                  <span className="info-value">{user?.subject || "N/A"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Message</span>
                  <span className="info-value">{user?.message || "N/A"}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data-message">No contacts found</div>
        )}
      </div>
    </div>
  );
}

export default ContactUser;
