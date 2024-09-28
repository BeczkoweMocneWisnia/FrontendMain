import React from 'react';
import './Home.css';
import Feed from './Feed';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div className="home-container">
        <h1>Welcome to the Home Page</h1>
        <p>This page is only accessible when you're logged in!</p>
      </div>
      <Link to="/add-article" className="add-article-link">Add New Article</Link>
      <Feed />
    </>
  );
}

export default Home;
