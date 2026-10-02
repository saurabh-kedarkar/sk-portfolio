/**
 * CSV Storage & Parsing Utility
 * Implements RFC 4180 compliant CSV storage, appending, fetching, and exporting
 * for portfolio contact form submissions.
 */

const CSV_STORAGE_KEY = "portfolio_contact_submissions_csv";
const JSON_STORAGE_KEY = "portfolio_contact_submissions";

export const CSV_HEADERS = [
  "ID",
  "Name",
  "Email",
  "Phone",
  "Subject",
  "Message",
  "SubmittedAt",
  "Status",
];

const DEFAULT_CSV_DATA = [
  {
    id: "sub_demo_1",
    name: "Alex Morgan",
    email: "alex.morgan@devpulse.io",
    phone: "+1 (555) 382-9102",
    subject: "Gutenberg Core & Next.js Architecture Role",
    message: "Hi Saurabh! We reviewed your portfolio and were really impressed by your Gutenberg block performance optimization. We would love to discuss a remote contract for our enterprise web platform.",
    submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: "unread",
  },
  {
    id: "sub_demo_2",
    name: "Priya Sharma",
    email: "priya.sharma@techverse.in",
    phone: "+91 98230 44120",
    subject: "WooCommerce Speed & Core Web Vitals Audit",
    message: "Hello Saurabh, we need a specialist to audit our WooCommerce store speed and optimize Core Web Vitals to achieve 90+ Mobile score on PageSpeed Insights. Please share your availability.",
    submittedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: "read",
  },
  {
    id: "sub_demo_3",
    name: "Marcus Vance",
    email: "m.vance@vancemedia.co.uk",
    phone: "+44 20 7946 0912",
    subject: "Headless WordPress Platform Lead",
    message: "Hi Saurabh, we are building a bespoke headless WordPress ecosystem paired with React/Next.js frontend. Looking for an experienced developer to join our UK-based team.",
    submittedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: "read",
  },
];

/**
 * Escapes a single field value for RFC 4180 CSV standard
 */
export const escapeCsvField = (val) => {
  if (val === null || val === undefined) return '""';
  const str = String(val);
  // If field contains comma, quote, or newline, escape quotes and wrap in quotes
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
};

/**
 * Converts a structured submission object into a CSV row
 */
export const entryToCsvRow = (entry) => {
  return [
    escapeCsvField(entry.id || `sub_${Date.now()}`),
    escapeCsvField(entry.name || "Anonymous"),
    escapeCsvField(entry.email || "N/A"),
    escapeCsvField(entry.phone || "N/A"),
    escapeCsvField(entry.subject || "General Enquiry"),
    escapeCsvField(entry.message || ""),
    escapeCsvField(entry.submittedAt || new Date().toISOString()),
    escapeCsvField(entry.status || "unread"),
  ].join(",");
};

/**
 * Converts an array of entries into a complete CSV string with headers
 */
export const entriesToCsvString = (entries) => {
  const headerRow = CSV_HEADERS.join(",");
  const rows = (entries || []).map((e) => entryToCsvRow(e));
  return [headerRow, ...rows].join("\n");
};

/**
 * RFC 4180 compliant CSV parser that correctly handles quoted fields with commas and newlines
 */
export const parseCsvStringToEntries = (csvText) => {
  if (!csvText || typeof csvText !== "string") return [];

  const rows = [];
  let currentRow = [];
  let currentField = "";
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (insideQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++; // skip next escaped quote
      } else if (char === '"') {
        insideQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        insideQuotes = true;
      } else if (char === ",") {
        currentRow.push(currentField);
        currentField = "";
      } else if (char === "\r" && nextChar === "\n") {
        currentRow.push(currentField);
        rows.push(currentRow);
        currentRow = [];
        currentField = "";
        i++; // skip \n
      } else if (char === "\n" || char === "\r") {
        currentRow.push(currentField);
        rows.push(currentRow);
        currentRow = [];
        currentField = "";
      } else {
        currentField += char;
      }
    }
  }

  // Push trailing field/row
  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  if (rows.length < 2) return [];

  // Parse header and data rows
  const entries = [];
  for (let r = 1; r < rows.length; r++) {
    const cols = rows[r];
    if (cols.length < 2 || !cols.some((c) => c.trim().length > 0)) continue;

    entries.push({
      id: cols[0]?.trim() || `sub_${Date.now()}_${r}`,
      name: cols[1]?.trim() || "Anonymous",
      email: cols[2]?.trim() || "N/A",
      phone: cols[3]?.trim() || "N/A",
      subject: cols[4]?.trim() || "General Enquiry",
      message: cols[5]?.trim() || "",
      submittedAt: cols[6]?.trim() || new Date().toISOString(),
      status: cols[7]?.trim() || "unread",
    });
  }

  return entries;
};

/**
 * Appends a new contact submission to the CSV file / storage
 */
export const appendSubmissionToCsv = (newEntry) => {
  try {
    let existingEntries = fetchSubmissionsFromCsv();
    // Add new entry at top
    const updatedEntries = [newEntry, ...existingEntries.filter((e) => e.id !== newEntry.id)];
    
    // Save to CSV storage
    const csvContent = entriesToCsvString(updatedEntries);
    localStorage.setItem(CSV_STORAGE_KEY, csvContent);
    localStorage.setItem(JSON_STORAGE_KEY, JSON.stringify(updatedEntries));

    // Dispatch real-time event
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("contact_submissions_updated", { detail: updatedEntries }));
    }

    return updatedEntries;
  } catch (error) {
    console.error("Failed to append submission to CSV:", error);
    return [];
  }
};

/**
 * Fetches all submissions from the CSV storage layer
 */
export const fetchSubmissionsFromCsv = () => {
  try {
    const storedCsv = localStorage.getItem(CSV_STORAGE_KEY);
    if (storedCsv && storedCsv.trim().length > 0) {
      const parsed = parseCsvStringToEntries(storedCsv);
      if (parsed.length > 0) {
        return parsed;
      }
    }

    // Check JSON fallback if CSV not yet created
    const storedJson = localStorage.getItem(JSON_STORAGE_KEY);
    if (storedJson) {
      const parsedJson = JSON.parse(storedJson);
      if (Array.isArray(parsedJson) && parsedJson.length > 0) {
        // Initialize CSV from JSON
        const csvContent = entriesToCsvString(parsedJson);
        localStorage.setItem(CSV_STORAGE_KEY, csvContent);
        return parsedJson;
      }
    }

    // Initialize with default demo entries
    const initialCsv = entriesToCsvString(DEFAULT_CSV_DATA);
    localStorage.setItem(CSV_STORAGE_KEY, initialCsv);
    localStorage.setItem(JSON_STORAGE_KEY, JSON.stringify(DEFAULT_CSV_DATA));
    return DEFAULT_CSV_DATA;
  } catch (error) {
    console.error("Error fetching submissions from CSV:", error);
    return DEFAULT_CSV_DATA;
  }
};

/**
 * Overwrites submissions in the CSV storage
 */
export const saveSubmissionsToCsv = (entries) => {
  try {
    const csvContent = entriesToCsvString(entries);
    localStorage.setItem(CSV_STORAGE_KEY, csvContent);
    localStorage.setItem(JSON_STORAGE_KEY, JSON.stringify(entries));

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("contact_submissions_updated", { detail: entries }));
    }
  } catch (error) {
    console.error("Error saving submissions to CSV:", error);
  }
};

/**
 * Downloads the current submissions as a real .csv file
 */
export const downloadCsvFile = (entries) => {
  const currentEntries = entries || fetchSubmissionsFromCsv();
  const csvContent = entriesToCsvString(currentEntries);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `contact_submissions_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Retrieves the raw CSV text from storage
 */
export const getRawCsvString = () => {
  const stored = localStorage.getItem(CSV_STORAGE_KEY);
  if (stored) return stored;
  const entries = fetchSubmissionsFromCsv();
  return entriesToCsvString(entries);
};
