import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NewsDetailModal from "./NewsDetailModal";
import SkeletonCard from "./SkeletonCard";
import "../../styles/pages/Blog.css";

// If you have an env var use it; otherwise keep it null to avoid using a secret/hardcoded key.
const API_KEY = process.env.REACT_APP_BLOG_API_KEY || null;
const BASE_URL = "https://gnews.io/api/v4";

// Dummy fallback articles shown when there's no API key or fetching fails
const DUMMY_ARTICLES = [
  {
    title: "Local developer community hosts hands-on React workshop",
    description:
      "More than 100 developers attended a hands-on React workshop focused on hooks and state management.",
    image: "https://placehold.co/600x400?text=React+Workshop",
    url: "https://example.com/react-workshop",
    publishedAt: "2025-11-01T08:00:00Z",
    source: { name: "Example News" },
  },
  {
    title: "New AI tool speeds up prototyping for startups",
    description:
      "A new AI-assisted prototyping tool claims to cut early-stage prototyping time in half.",
    image: "https://placehold.co/600x400?text=AI+Tool",
    url: "https://example.com/ai-prototype",
    publishedAt: "2025-10-28T10:30:00Z",
    source: { name: "Example Tech" },
  },
  {
    title: "City marathon draws record crowds",
    description:
      "The annual city marathon saw record participation this year, with improved safety and logistics.",
    image: "https://placehold.co/600x400?text=Marathon",
    url: "https://example.com/marathon",
    publishedAt: "2025-10-20T06:45:00Z",
    source: { name: "Local Sports" },
  },
  // add more dummy items as needed
];

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    // If there's no API key, show dummy articles and skip network fetch.
    if (!API_KEY) {
      setArticles(DUMMY_ARTICLES);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const fetchNews = async () => {
      setLoading(true);
      try {
        let endpoint = "";

        if (activeCategory === "technology") {
          endpoint = `${BASE_URL}/top-headlines?category=technology&lang=en&token=${API_KEY}`;
        } else if (activeCategory === "ai") {
          endpoint = `${BASE_URL}/search?q=artificial+intelligence&lang=en&token=${API_KEY}`;
        } else if (activeCategory === "sports") {
          endpoint = `${BASE_URL}/top-headlines?category=sports&lang=en&token=${API_KEY}`;
        } else if (activeCategory === "india") {
          endpoint = `${BASE_URL}/search?q=India&lang=en&token=${API_KEY}`;
        } else {
          endpoint = `${BASE_URL}/top-headlines?lang=en&token=${API_KEY}`;
        }

        const response = await fetch(endpoint, { signal: controller.signal });

        if (!response.ok) {
          // HTTP error — fallback to dummy articles
          console.error("Network response was not ok:", response.statusText);
          setArticles(DUMMY_ARTICLES);
          return;
        }

        const data = await response.json();

        if (data?.errors || !data?.articles) {
          setArticles(DUMMY_ARTICLES);
        } else {
          // Some APIs return slightly different shapes; normalize if necessary
          setArticles(data.articles || []);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          // fetch aborted — ignore
        } else {
          console.error("Error fetching news:", error);
          setArticles(DUMMY_ARTICLES);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    return () => {
      controller.abort();
    };
  }, [activeCategory]); // API_KEY is top-level and stable — no missing-deps warning

  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory]);

  const filteredArticles = articles.filter((article) =>
    (article.title || "")
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const visibleArticles = filteredArticles.slice(0, visibleCount);

  return (
    <div className="blog-page">
      <header className="header">
        <h1>News Portal</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="category-buttons">
          {["all", "india", "technology", "ai", "sports"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`category-button ${
                activeCategory === cat ? "active" : ""
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <main className="news-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : visibleArticles.map((article, index) => (
              <div
                key={article.url || `${article.title}-${index}`}
                className="news-card"
                onClick={() => setSelectedArticle(article)}
              >
                <img
                  src={
                    article.image
                      ? article.image
                      : "https://placehold.co/600x400"
                  }
                  alt={article.title}
                />
                <h3>
                  {(article.title || "").split(" ").slice(0, 6).join(" ")}
                </h3>
                <p>{article.description}</p>
              </div>
            ))}
      </main>

      {!loading && visibleCount < filteredArticles.length && (
        <div className="load-more-container">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setVisibleCount((c) => c + 6)}
            className={"load-more-button"}
          >
            Load More
          </motion.button>
        </div>
      )}

      <NewsDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
};

export default Blog;
