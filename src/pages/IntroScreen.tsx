import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import medmapLogo from '@/assets/medmap-logo.png';

const IntroScreen = () => {
  const navigate = useNavigate();
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show logo with animation
    const logoTimer = setTimeout(() => setShowLogo(true), 500);
    
    // Show text after logo
    const textTimer = setTimeout(() => setShowText(true), 1500);
    
    // Navigate to demo screen after intro
    const navigateTimer = setTimeout(() => {
      navigate('/demo');
    }, 4000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-surface flex flex-col items-center justify-center p-6">
      {/* Logo Container */}
      <div className="mb-8 relative">
        <div 
          className={`transition-all duration-1000 transform ${
            showLogo ? 'opacity-100 scale-100 animate-pulse-gentle' : 'opacity-0 scale-50'
          }`}
        >
          <img 
            src={medmapLogo} 
            alt="MedMap Logo" 
            className="w-32 h-32 md:w-40 md:h-40 object-contain"
            style={{
              animation: showLogo ? 'chainFloat 3s ease-in-out infinite' : 'none'
            }}
          />
        </div>
        
        {/* Floating animation overlay */}
        {showLogo && (
          <div className="absolute inset-0 bg-gradient-medmap opacity-20 rounded-full blur-lg animate-pulse-gentle"></div>
        )}
      </div>

      {/* App Name */}
      <div 
        className={`transition-all duration-800 transform ${
          showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gradient-medmap text-center mb-2">
          MedMap
        </h1>
        <p className="text-medmap-gray text-center text-lg">
          Your Emergency Medical Companion
        </p>
      </div>

      {/* Loading indicator */}
      <div className="mt-12">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;