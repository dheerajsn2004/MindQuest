import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" autoPlay loop muted playsInline>
        <source src="/images/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <img
        src="/images/IEEE_Logo.png"
        alt="Logo"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 w-10 sm:w-12 md:w-16 lg:w-20"
      />
      <img
        src="/images/ieeelogo.png"
        alt="ieeelogo"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 sm:w-16 md:w-16 lg:w-20"
      />

      <div className="flex flex-col items-center justify-center text-center h-full px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-md">
          Welcome to <span className="text-yellow-400">Quartic</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mt-4">
          Test your knowledge, unlock your potential!
        </p>
        <button
          className="mt-6 bg-yellow-400 text-white px-6 py-3 rounded-full text-lg sm:text-xl font-semibold hover:bg-yellow-500 transition-transform transform hover:scale-105"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </div>

      <footer className="absolute bottom-2 left-0 w-full text-center text-gray-300 text-xs sm:text-sm md:text-base">
        © {new Date().getFullYear()} Powered by <span className="text-yellow-400">AWS ,VS code</span> All Rights Reserved
      </footer>
    </div>
  );
};

export default HomePage;
