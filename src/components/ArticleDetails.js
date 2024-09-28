import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './ArticleDetails.css';
import QRCode from "react-qr-code";

function ArticleDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { article } = location.state || {};

  if (!article) {
    navigate('/');
    return null;
  }

  return (
    <div className="article-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>

      <h1>{article.title}</h1>
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "10%", width: "10%" }}
        value={article.public_id}
        viewBox={`0 0 256 256`}
      />
      <img src={article.image} alt={article.title} className="article-details-image" />
      <ReactMarkdown>{article.description}</ReactMarkdown>
    </div>
  );
}

export default ArticleDetails;
