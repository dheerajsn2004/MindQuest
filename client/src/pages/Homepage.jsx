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

      <div className="container flex flex-col items-center justify-center text-center p-4 sm:p-8">
        <div className="hero-section relative w-full max-w-5xl">
          <img
            src="/images/IEEE_Logo.jpg"
            alt="Logo"
            className="absolute top-1 sm:top-1 left-3 sm:left-3 w-8 sm:w-16 h-8 sm:h-16 rounded-full border-2 border-white"
          />
          <img 
            src="/images/ieeelogo.png" 
            alt="ieeelogo" 
            className="absolute top-1 sm:top-1 right-3 sm:right-3 w-25 sm:w-25 h-16 sm:h-16 border-2 border-white"
          />
          <h1 className="relative  top-16 sm:top-16  title text-3xl sm:text-5xl font-bold text-white drop-shadow-lg">
            Welcome to <span className="brand-name text-yellow-400">Electronika'25</span>
          </h1>
          <p className="relative  top-16 sm:top-16 subtitle text-lg sm:text-2xl mt-2 text-gray-200">
            Test your knowledge, unlock your potential!
          </p>
          <div className="relative  top-16 sm:top-16 button-container mt-4">
            <button 
              className="register-btn bg-yellow-400 text-white px-6 py-3 rounded-full text-lg sm:text-xl font-semibold hover:bg-yellow-500 transition-transform transform hover:scale-105"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      <p className="footer">
  © {new Date().getFullYear()} Powered by{" "}
  <span className="brand-name text-yellow-400"></span>  AWS | V S Code |  All Rights Reserved to AR

</p>

    </div>
  );
};

export default HomePage;
