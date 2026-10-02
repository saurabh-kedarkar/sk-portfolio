import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import {
  FiMail,
  FiPhone,
  FiTrash2,
  FiSearch,
  FiRefreshCw,
  FiEye,
  FiCheckCircle,
  FiDownload,
  FiUpload,
  FiX,
  FiInbox,
  FiClock,
  FiFileText,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import "../../styles/pages/ContactUser.css";
import { sound } from "../../utils/sound";
import {
  fetchSubmissionsFromCsv,
  saveSubmissionsToCsv,
  downloadCsvFile,
  getRawCsvString,
  parseCsvStringToEntries,
} from "../../utils/csvStorage";

function ContactUser({ selectedColor }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "unread" | "read"
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [csvCopied, setCsvCopied] = useState(false);
  const fileInputRef = useRef(null);

  // Load submissions from CSV storage + optional remote Netlify API sync
  const loadSubmissions = async () => {
    setLoading(true);
    // 1. Fetch primary data from CSV file storage
    let csvData = fetchSubmissionsFromCsv();

    // 2. Fetch remote API if reachable and merge new unique submissions
    try {
      const baseUrl =
        "https://clever-bublanina.netlify.app/.netlify/functions/api/users/ContactGet";
      const response = await axios.get(baseUrl, { timeout: 4000 });
      if (response.data && response.data.users) {
        const apiData = response.data.users.map((u, idx) => ({
          id: u._id || `api_${idx}`,
          name: u.name || u.fullName || "Anonymous",
          email: u.email || "N/A",
          phone: u.phone || u.mobile || "N/A",
          subject: u.subject || "General Contact Enquiry",
          message: u.message || "",
          submittedAt: u.createdAt || u.date || new Date().toISOString(),
          status: "read",
        }));

        let hasNew = false;
        const merged = [...csvData];
        apiData.forEach((apiItem) => {
          if (!merged.some((m) => m.email === apiItem.email && m.message === apiItem.message)) {
            merged.push(apiItem);
            hasNew = true;
          }
        });

        if (hasNew) {
          saveSubmissionsToCsv(merged);
          csvData = merged;
        }
      }
    } catch (err) {
      // Offline or Netlify timeout - CSV local storage remains source of truth
    }

    setSubmissions(csvData);
    setLoading(false);
  };

  useEffect(() => {
    loadSubmissions();

    // Listen for submissions added from the /contact page in real-time
    const handleStorageChange = (e) => {
      if (e?.detail) {
        setSubmissions(e.detail);
      } else {
        const current = fetchSubmissionsFromCsv();
        setSubmissions(current);
      }
    };

    window.addEventListener("contact_submissions_updated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("contact_submissions_updated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleDelete = (id, e) => {
    if (e) e.stopPropagation();
    sound.playClick();
    const updated = submissions.filter((s) => s.id !== id);
    saveSubmissionsToCsv(updated);
    setSubmissions(updated);
    if (selectedItem?.id === id) setSelectedItem(null);
  };

  const handleToggleRead = (id, e) => {
    if (e) e.stopPropagation();
    sound.playClick();
    const updated = submissions.map((s) => {
      if (s.id === id) {
        return { ...s, status: s.status === "unread" ? "read" : "unread" };
      }
      return s;
    });
    saveSubmissionsToCsv(updated);
    setSubmissions(updated);
  };

  const handleClearAll = () => {
    sound.playClick();
    if (window.confirm("Are you sure you want to clear all submissions from CSV storage?")) {
      saveSubmissionsToCsv([]);
      setSubmissions([]);
      setSelectedItem(null);
    }
  };

  const handleExportCSV = () => {
    sound.playClick();
    downloadCsvFile(submissions);
  };

  const handleCopyRawCsv = () => {
    sound.playClick();
    const raw = getRawCsvString();
    navigator.clipboard.writeText(raw);
    setCsvCopied(true);
    setTimeout(() => setCsvCopied(false), 2000);
  };

  const handleImportCsvClick = () => {
    sound.playClick();
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        if (text) {
          const importedEntries = parseCsvStringToEntries(text);
          if (importedEntries.length > 0) {
            // Merge with existing
            const current = [...submissions];
            importedEntries.forEach((item) => {
              if (!current.some((c) => c.id === item.id || (c.email === item.email && c.message === item.message))) {
                current.unshift(item);
              }
            });
            saveSubmissionsToCsv(current);
            setSubmissions(current);
            alert(`Successfully imported ${importedEntries.length} entries from CSV file!`);
          } else {
            alert("No valid CSV rows found in the selected file.");
          }
        }
      } catch (err) {
        alert("Error parsing CSV file: " + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const filtered = submissions.filter((s) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      (s.name || "").toLowerCase().includes(q) ||
      (s.email || "").toLowerCase().includes(q) ||
      (s.subject || "").toLowerCase().includes(q) ||
      (s.message || "").toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (statusFilter === "unread") return s.status === "unread";
    if (statusFilter === "read") return s.status === "read";
    return true;
  });

  const unreadCount = submissions.filter((s) => s.status === "unread").length;

  return (
    <div className="contact-user-viewport">
      <div className="contact-user-container">
        {/* Hidden File Input for CSV Import */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />

        {/* Header Block */}
        <div className="page-header-block">
          <div className="page-badge-pill">
            <HiSparkles />
            <span>06 // CSV INBOX & DATA RECORDS</span>
          </div>
          <h1 className="page-title">Contact Submissions</h1>
          <p className="page-subtitle">
            Every contact form submission on <code>/contact</code> is automatically appended to your CSV data records and synchronized in real-time.
          </p>
        </div>

        {/* Toolbar & Filter Bar */}
        <div className="inbox-toolbar">
          <div className="inbox-stats-pills">
            <div className="inbox-stat-chip">
              <FiInbox />
              <span>Total Messages: <strong>{submissions.length}</strong></span>
            </div>
            {unreadCount > 0 && (
              <div className="inbox-stat-chip unread-chip">
                <FiClock />
                <span>Unread: <strong>{unreadCount} New</strong></span>
              </div>
            )}
            <div className="inbox-stat-chip">
              <FiFileText />
              <span>Format: <strong>RFC-4180 CSV</strong></span>
            </div>
          </div>

          <div className="inbox-actions-row">
            {/* Search Input */}
            <div className="inbox-search-input-wrap">
              <FiSearch />
              <input
                type="text"
                className="inbox-search-input"
                placeholder="Search name, email, subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Toggle Buttons */}
            <div className="inbox-filter-btn-group">
              <button
                className={`inbox-filter-pill ${statusFilter === "all" ? "active" : ""}`}
                onClick={() => setStatusFilter("all")}
              >
                All
              </button>
              <button
                className={`inbox-filter-pill ${statusFilter === "unread" ? "active" : ""}`}
                onClick={() => setStatusFilter("unread")}
              >
                Unread
              </button>
              <button
                className={`inbox-filter-pill ${statusFilter === "read" ? "active" : ""}`}
                onClick={() => setStatusFilter("read")}
              >
                Read
              </button>
            </div>

            {/* Refresh */}
            <button
              className="inbox-btn-action interactive"
              onClick={loadSubmissions}
              title="Refresh submissions"
            >
              <FiRefreshCw className={loading ? "spin" : ""} />
              <span>Refresh</span>
            </button>

            {/* View CSV Data */}
            <button
              className="inbox-btn-action interactive"
              onClick={() => {
                sound.playClick();
                setIsCsvModalOpen(true);
              }}
              title="View Raw CSV Data"
            >
              <FiFileText />
              <span>View CSV</span>
            </button>

            {/* Download CSV File */}
            <button
              className="inbox-btn-action interactive"
              onClick={handleExportCSV}
              title="Download contact_submissions.csv file"
            >
              <FiDownload />
              <span>Download CSV</span>
            </button>

            {/* Import CSV File */}
            <button
              className="inbox-btn-action interactive"
              onClick={handleImportCsvClick}
              title="Import an existing .csv file"
            >
              <FiUpload />
              <span>Import CSV</span>
            </button>

            {/* Clear All */}
            {submissions.length > 0 && (
              <button
                className="inbox-btn-action clear-btn interactive"
                onClick={handleClearAll}
                title="Clear all CSV entries"
              >
                <FiTrash2 />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Submissions Cards Grid */}
        <div className="inbox-cards-grid">
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const isUnread = item.status === "unread";
              const formattedDate = item.submittedAt
                ? new Date(item.submittedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Recent";

              return (
                <div
                  key={item.id}
                  className={`inbox-submission-card interactive ${isUnread ? "unread" : ""}`}
                  onClick={() => {
                    sound.playClick();
                    setSelectedItem(item);
                  }}
                >
                  {/* Top Sender Header */}
                  <div className="card-top-row">
                    <div className="sender-identity">
                      <div className="sender-avatar">
                        {(item.name || "A").charAt(0).toUpperCase()}
                      </div>
                      <div className="sender-meta">
                        <span className="sender-name">{item.name}</span>
                        <span className="submission-date">{formattedDate}</span>
                      </div>
                    </div>
                    <span className={`status-badge ${isUnread ? "new" : "read"}`}>
                      {isUnread ? "NEW" : "READ"}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="card-details-list">
                    <div className="detail-row">
                      <FiMail />
                      <a
                        href={`mailto:${item.email}`}
                        className="detail-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.email}
                      </a>
                    </div>
                    {item.phone && item.phone !== "N/A" && (
                      <div className="detail-row">
                        <FiPhone />
                        <span className="detail-link">{item.phone}</span>
                      </div>
                    )}
                    <div className="subject-badge">{item.subject}</div>
                    <div className="message-preview-box">
                      {item.message || "No message content provided."}
                    </div>
                  </div>

                  {/* Footer Action Buttons */}
                  <div className="card-footer-actions">
                    <button
                      className="card-action-btn interactive"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                      }}
                    >
                      <FiEye />
                      <span>View</span>
                    </button>

                    <button
                      className="card-action-btn interactive"
                      onClick={(e) => handleToggleRead(item.id, e)}
                    >
                      <FiCheckCircle />
                      <span>{isUnread ? "Mark Read" : "Mark Unread"}</span>
                    </button>

                    <button
                      className="card-action-btn delete interactive"
                      onClick={(e) => handleDelete(item.id, e)}
                      title="Delete entry from CSV"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="inbox-empty-card">
              <div className="empty-icon-wrap">
                <FiInbox />
              </div>
              <h3 className="empty-title">No Submissions Found</h3>
              <p className="empty-desc">
                When visitors submit the form on <code>/contact</code>, their information is immediately saved to the CSV file and will display here in real-time.
              </p>
            </div>
          )}
        </div>

        {/* Modal: View Message Details */}
        <AnimatePresence>
          {selectedItem && (
            <ModalPortal>
              <div
                className="modal-backdrop"
                onClick={() => setSelectedItem(null)}
                aria-modal="true"
              >
                <motion.div
                  className="inbox-modal-card"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 350 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="inbox-modal-header">
                    <div className="sender-identity">
                      <div className="sender-avatar">
                        {(selectedItem.name || "A").charAt(0).toUpperCase()}
                      </div>
                      <div className="sender-meta">
                        <span className="sender-name">{selectedItem.name}</span>
                        <span className="submission-date">
                          {new Date(selectedItem.submittedAt).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      className="modal-close-btn interactive"
                      onClick={() => setSelectedItem(null)}
                    >
                      <FiX />
                    </button>
                  </div>

                  <div className="card-details-list">
                    <div className="detail-row">
                      <FiMail />
                      <a href={`mailto:${selectedItem.email}`} className="detail-link">
                        {selectedItem.email}
                      </a>
                    </div>
                    {selectedItem.phone && selectedItem.phone !== "N/A" && (
                      <div className="detail-row">
                        <FiPhone />
                        <span className="detail-link">{selectedItem.phone}</span>
                      </div>
                    )}
                    <div className="subject-badge">{selectedItem.subject}</div>
                  </div>

                  <div className="modal-message-content">
                    {selectedItem.message || "No message body provided."}
                  </div>

                  <div className="card-footer-actions">
                    <a
                      href={`mailto:${selectedItem.email}?subject=Re: ${encodeURIComponent(selectedItem.subject)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glow-primary interactive"
                      style={{ padding: "0.55rem 1.1rem", fontSize: "0.86rem" }}
                    >
                      <FiMail />
                      <span>Reply via Email</span>
                    </a>

                    {selectedItem.phone && selectedItem.phone !== "N/A" && (
                      <a
                        href={`https://wa.me/${selectedItem.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-glass-secondary interactive"
                        style={{ padding: "0.55rem 1.1rem", fontSize: "0.86rem" }}
                      >
                        <FaWhatsapp style={{ color: "#25d366" }} />
                        <span>Reply on WhatsApp</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </ModalPortal>
          )}
        </AnimatePresence>

        {/* Modal: View Raw CSV Data */}
        <AnimatePresence>
          {isCsvModalOpen && (
            <ModalPortal>
              <div
                className="modal-backdrop"
                onClick={() => setIsCsvModalOpen(false)}
                aria-modal="true"
              >
                <motion.div
                  className="inbox-modal-card csv-modal"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 350 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="inbox-modal-header">
                    <div>
                      <h3 style={{ margin: "0 0 0.35rem 0", color: "#fff", fontSize: "1.25rem" }}>
                        Raw CSV Data File
                      </h3>
                      <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                        RFC 4180 Compliant • {submissions.length} Total Records
                      </span>
                    </div>

                    <button
                      className="modal-close-btn interactive"
                      onClick={() => setIsCsvModalOpen(false)}
                    >
                      <FiX />
                    </button>
                  </div>

                  <div className="raw-csv-code-box">
                    <pre>{getRawCsvString()}</pre>
                  </div>

                  <div className="card-footer-actions">
                    <button
                      className="inbox-btn-action interactive"
                      onClick={handleCopyRawCsv}
                    >
                      {csvCopied ? <FiCheck style={{ color: "#10b981" }} /> : <FiCopy />}
                      <span>{csvCopied ? "Copied!" : "Copy CSV Text"}</span>
                    </button>

                    <button
                      className="btn-glow-primary interactive"
                      onClick={handleExportCSV}
                      style={{ padding: "0.55rem 1.1rem", fontSize: "0.86rem" }}
                    >
                      <FiDownload />
                      <span>Download .CSV File</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            </ModalPortal>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Modal Portal Component to guarantee rendering on document.body
const ModalPortal = ({ children }) => {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
};

export default ContactUser;
