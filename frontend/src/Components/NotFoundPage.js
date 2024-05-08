import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const currentPath = document.location.pathname;

  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404 Not Found</h1>
      <p className="not-found-message">The page at {currentPath} was not found.</p>
      <p className="not-found-message">Please go back <Link to="/">home</Link>.</p>
    </div>
  );
};

export default NotFound;
