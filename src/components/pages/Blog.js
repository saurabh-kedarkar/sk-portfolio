import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NewsDetailModal from "./NewsDetailModal";
import SkeletonCard from "./SkeletonCard"; // Import the skeleton component
import "../../styles/pages/Blog.css";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const API_KEY = "0a553c4f7bb6414ba8e037c0e2b5705f";
  const BASE_URL = "https://newsapi.org/v2";
  //  blog page useEffect used
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        let endpoint = "top-headlines?language=en";
        if (activeCategory === "technology") {
          endpoint = "top-headlines?category=technology";
        } else if (activeCategory === "ai") {
          endpoint = "everything?q=artificial%20intelligence&language=en";
        } else if (activeCategory === "sports") {
          console.log("india");
          endpoint = "top-headlines?category=sports";
        }

        const response = await fetch(
          `${BASE_URL}/${endpoint}&apiKey=${API_KEY}`
        );
        const data = await response.json();
        setArticles(data.articles || []);
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
    <div className={`blog-page`}>
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
          <button
            onClick={() => setActiveCategory("all")}
            className={`category-button ${
              activeCategory === "all" ? "active" : ""
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveCategory("technology")}
            className={`category-button ${
              activeCategory === "technology" ? "active" : ""
            }`}
          >
            Technology
          </button>
          <button
            onClick={() => setActiveCategory("ai")}
            className={`category-button ${
              activeCategory === "ai" ? "active" : ""
            }`}
          >
            AI
          </button>
          <button
            onClick={() => setActiveCategory("sports")}
            className={`category-button ${
              activeCategory === "sports" ? "active" : ""
            }`}
          >
            Sports
          </button>
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
                  src={article.urlToImage ?? "https://placehold.co/600x400"}
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
