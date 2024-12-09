import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const HomePage = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  return (
    <div className="video-container">
      <video className="background-video" autoPlay loop muted playsInline>
        <source src="/images/video.mp4?bhubijjiou" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container">
        <div className="hero-section">
          <h1 className="title">
            Welcome to <span className="brand-name">MindQuest</span>
          </h1>
          <p className="subtitle">Test your knowledge, unlock your potential!</p>
          <div className="button-container">
            {/* Navigate to Register Page on click */}
            <button className="register-btn" onClick={() => navigate('/login')}>Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
