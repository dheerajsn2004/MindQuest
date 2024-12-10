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
          <img
            src="/images/IEEE_Logo.jpg"
            alt="Logo"
            className="absolute top-10 left-20 w-40 h-40 rounded-full border-2 border-white"
          />
          <img src="/images/ieeelogo.png" alt="ieeelogo" className="absolute top-16 right-20 w-40 h-35 border-2 border-white"/>
          <h1 className="title">
            Welcome to <span className="brand-name">MindQuest</span>
          </h1>
          <p className="subtitle">
            Test your knowledge, unlock your potential!
          </p>
          <div className="button-container">
            {/* Navigate to Register Page on click */}
            <button className="register-btn" onClick={() => navigate("/login")}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
