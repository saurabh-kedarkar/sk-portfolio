import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar,
  FiExternalLink,
  FiX,
  FiArrowRight,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import "../../styles/pages/Blog.css";
import { sound } from "../../utils/sound";

// Free Public Tech News API (DEV.to API - 100% Free, No Key Required, No CORS, Vercel Ready)
const DEV_TO_API_URL = "https://dev.to/api/articles";

const DUMMY_ARTICLES = [
  {
    title: "Nvidia’s Reign Invites Disruption and an Open-Source Future",
    description:
      "The tech narrative often dictates market reality, and the sheer velocity of Nvidia’s ascent is both dazzling and deeply precarious.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    url: "https://dev.to/t/technology",
    publishedAt: new Date().toISOString(),
    source: { name: "Tech Dispatch" },
    category: "technology",
  },
  {
    title: "Red Hat’s Evolution: How a Subsidiary Became an AI Powerhouse",
    description:
      "Red Hat has become a foundational player in enterprise AI by combining open-source infrastructure with hybrid cloud flexibility.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop",
    url: "https://dev.to/t/ai",
    publishedAt: new Date().toISOString(),
    source: { name: "Enterprise AI" },
    category: "ai",
  },
  {
    title: "Next.js & React Server Components: A Paradigm Shift for Web Apps",
    description:
      "How streaming architecture, server components, and modern caching strategies are drastically cutting bundle sizes and elevating Core Web Vitals.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    url: "https://react.dev/blog",
    publishedAt: new Date().toISOString(),
    source: { name: "Web Engineering" },
    category: "technology",
  },
  {
    title: "Scaling Headless WordPress & WooCommerce for High Traffic",
    description:
      "Architectural patterns for leveraging WordPress as a headless content engine paired with React/Next.js frontends and edge CDN deployments.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    url: "https://developer.wordpress.org/",
    publishedAt: new Date().toISOString(),
    source: { name: "WP Dev Hub" },
    category: "technology",
  },
];

const Blog = ({ selectedColor }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchNews = async () => {
      setLoading(true);
      try {
        let tagParam = "";
        if (activeCategory === "technology") tagParam = "tag=technology";
        else if (activeCategory === "ai") tagParam = "tag=ai";
        else if (activeCategory === "webdev") tagParam = "tag=webdev";
        else if (activeCategory === "programming") tagParam = "tag=programming";
        else tagParam = "per_page=16";

        const endpoint = tagParam
          ? `${DEV_TO_API_URL}?${tagParam}&per_page=16`
          : `${DEV_TO_API_URL}?per_page=16`;

        const response = await fetch(endpoint, { signal: controller.signal });
        if (!response.ok) {
          setArticles(DUMMY_ARTICLES);
          return;
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item) => ({
            title: item.title,
            description: item.description || item.readable_publish_date,
            image:
              item.cover_image ||
              item.social_image ||
              "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800",
            url: item.url,
            publishedAt: item.published_at || new Date().toISOString(),
            source: { name: item.user?.name ? `${item.user.name}` : "DEV Community" },
            category: activeCategory,
          }));
          setArticles(formatted);
        } else {
          setArticles(DUMMY_ARTICLES);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setArticles(DUMMY_ARTICLES);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    return () => controller.abort();
  }, [activeCategory]);

  const handleCategoryChange = (cat) => {
    sound.playClick();
    setActiveCategory(cat);
    setVisibleCount(6);
  };

  const filteredArticles = articles.filter((a) => {
    const titleMatch = (a.title || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const descMatch = (a.description || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return titleMatch || descMatch;
  });

  const visibleArticles = filteredArticles.slice(0, visibleCount);

  return (
    <div className="blog-viewport">
      <div className="blog-container">
        {/* Header Block */}
        <div className="page-header-block">
          <div className="page-badge-pill">
            <HiSparkles />
            <span>04 // KNOWLEDGE & INSIGHTS</span>
          </div>
          <h1 className="page-title">Articles & Insights</h1>
          <p className="page-subtitle">
            Real-time web development articles, engineering insights, and daily technology trends.
          </p>
        </div>

        {/* Toolbar: Category Filters */}
        <div className="blog-toolbar">
          <div className="blog-category-chips">
            {[
              { id: "all", label: "All Insights" },
              { id: "technology", label: "Technology" },
              { id: "ai", label: "Artificial Intelligence" },
              { id: "webdev", label: "Web Dev" },
              { id: "programming", label: "Programming" },
            ].map((cat) => (
              <button
                key={cat.id}
                className={`category-chip interactive ${
                  activeCategory === cat.id ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(cat.id)}
                onMouseEnter={() => sound.playHover()}
              >
                <span>{cat.label}</span>
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeBlogChipGlow"
                    className="active-chip-glow"
                    style={{ backgroundColor: selectedColor }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="articles-card-grid">
          {loading ? (
            <div className="article-loading-pill">Loading insights...</div>
          ) : (
            visibleArticles.map((article, index) => (
            <motion.article
              key={article.url || index}
              className="article-card interactive"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              onClick={() => {
                sound.playClick();
                setSelectedArticle(article);
              }}
              onMouseEnter={() => sound.playHover()}
            >
              <div className="article-image-wrap">
                <img
                  src={article.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800"}
                  alt={article.title}
                  className="article-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800";
                  }}
                />
                <div className="article-img-overlay" />
                <span className="article-source-tag">
                  {article.source?.name || "Tech"}
                </span>
              </div>

              <div className="article-card-body">
                <div className="article-meta-row">
                  <span className="article-date">
                    <FiCalendar className="date-icon" />
                    <span>
                      {new Date(
                        article.publishedAt || Date.now()
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </span>
                </div>

                <h3 className="article-title-heading">{article.title}</h3>
                <p className="article-snippet">{article.description}</p>

                <div className="article-card-footer">
                  <span className="read-more-link" style={{ color: selectedColor }}>
                    <span>Read Article</span>
                    <FiArrowRight />
                  </span>
                </div>
              </div>
            </motion.article>
          )))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredArticles.length && (
          <div className="load-more-section">
            <button
              className="load-more-btn interactive"
              onClick={() => {
                sound.playClick();
                setVisibleCount((c) => c + 6);
              }}
            >
              <span>Load More Insights</span>
            </button>
          </div>
        )}

        {/* Article Reader Modal */}
        {selectedArticle &&
          createPortal(
            <AnimatePresence>
              <div
                className="modal-backdrop"
                onClick={() => {
                  sound.playClick();
                  setSelectedArticle(null);
                }}
              >
                <motion.div
                  key="blog-modal"
                  className="modal-content-card"
                  initial={{ opacity: 0, scale: 0.94, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 15 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="modal-close-btn interactive"
                    onClick={() => {
                      sound.playClick();
                      setSelectedArticle(null);
                    }}
                    aria-label="Close"
                  >
                    <FiX />
                  </button>

                  <div className="modal-image-wrap">
                    <img
                      src={selectedArticle.image}
                      alt={selectedArticle.title}
                      className="modal-img"
                    />
                    <div className="modal-img-gradient" />
                    <span className="modal-category-tag">
                      {selectedArticle.source?.name || "Insight"}
                    </span>
                  </div>

                  <div className="modal-body-content">
                    <h2 className="modal-title">{selectedArticle.title}</h2>
                    <p className="modal-desc">{selectedArticle.description}</p>

                    <div className="modal-actions-bar">
                      {selectedArticle.url && (
                        <a
                          href={selectedArticle.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="modal-primary-btn interactive"
                          style={{
                            backgroundColor: selectedColor,
                            boxShadow: `0 8px 20px -4px ${selectedColor}66`,
                          }}
                          onClick={() => sound.playClick()}
                        >
                          <span>Read Full Publication</span>
                          <FiExternalLink />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatePresence>,
            document.body
          )}
      </div>
    </div>
  );
};

export default Blog;
