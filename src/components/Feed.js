// src/components/Feed.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../services/apiService';
import './Feed.css';

function Feed() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    
    const fetchArticles = async () => {
      try {
        const response = await apiRequest('http://localhost:8000/article/search/',
          {
            method: 'GET',
          });
        if (response.ok) {
          const data = await response.json();
          setArticles(data.results);
        } else {
          console.log('Failed to fetch articles');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="feed-container">
      {articles.map(article => (
        <div className="article-card" key={article.public_id}>
          <Link to={`/article/${article.public_id}`} state={{ article }}>
            <img src={article.image} alt={article.title} className="article-image" />
            <h3 className="article-title">{article.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Feed;
