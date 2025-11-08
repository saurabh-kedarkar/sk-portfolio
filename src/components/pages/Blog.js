import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NewsDetailModal from "./NewsDetailModal";
import SkeletonCard from "./SkeletonCard";
import "../../styles/pages/Blog.css";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const API_KEY = process.env.REACT_APP_BLOG_API_KEY
    ? process.env.REACT_APP_BLOG_API_KEY
    : "d88c50a23daef389c3b3e44909233479";
  const BASE_URL = "https://gnews.io/api/v4";

  useEffect(() => {
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
          // all news (default)
          endpoint = `${BASE_URL}/top-headlines?lang=en&token=${API_KEY}`;
        }

        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.errors) {
          setArticles([]);
        } else {
          setArticles(data.articles || []);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [activeCategory]);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory]);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
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
                key={index}
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
                <h3>{article.title.split(" ").slice(0, 4).join(" ")}</h3>
                <p>{article.description}</p>
              </div>
            ))}
      </main>

      {!loading && visibleCount < filteredArticles.length && (
        <div className="load-more-container">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setVisibleCount(visibleCount + 6)}
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
