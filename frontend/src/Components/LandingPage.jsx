import React from 'react';
import './LandingPage.css'; // Styling for the landing page
import {useNavigate} from 'react-router-dom'
const LandingPage = () => {
  const navigate = useNavigate()
  const handleClick = () =>{
    navigate('/fileUpload')
  }

  return (
    <div className="landing-page">
      <div className="landing-header">
        <h1>Welcome to Lognalysis</h1>
        <p>Your solution for analyzing web server log files</p>
        <p>Upload your nginx access files and get insights from it under a minute</p>
      </div>
      <div className="landing-content">
        <div className="feature-card">
          <div className="card">
            <h2>Powerful Analytics</h2>
            <p>Gain valuable insights into your web server's performance with advanced analytics tools.</p>
          </div>
        </div>
        <div className="feature-card">
          <div className="card">
            <h2>Easy to Use</h2>
            <p>Lognalysis offers a user-friendly interface, making it easy for you to navigate and analyze log files.</p>
          </div>
        </div>
        <div className="feature-card">
          <div className="card">
            <h2>Real-Time Monitoring</h2>
            <p>Monitor your web server's activity in real-time and stay informed about any potential issues.</p>
          </div>
        </div>
      </div>
      <div className="cta">
        <h2>Get Started Today</h2>
        <p>Start analyzing your web server log files now with Lognalysis.</p>
        <button className="cta-btn" onClick={handleClick}>Sign Up</button>
      </div>
      <div className="footer">
        <p>&copy; 2024 Lognalysis. All rights reserved.</p>
      </div>
    </div>
  );
}

export default LandingPage;
