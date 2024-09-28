import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import { clearTokens } from './services/tokenService';
import ArticleDetails from './components/ArticleDetails';
import AddArticle from './components/AddArticle';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    clearTokens();
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="app">
        <nav className="nav">
          {!isAuthenticated && <Link to="/login" className="nav-link">Login</Link>}
          {!isAuthenticated && <Link to="/register" className="nav-link">Register</Link>}
          {isAuthenticated && <button className="nav-link" onClick={logout}>Logout</button>}
        </nav>

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/register" element={<Register />} />
          
          {/* Private Route */}
          <Route
            path="/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/article/:id" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ArticleDetails />
            </PrivateRoute>
          } />
          <Route path="/add-article" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <AddArticle />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
