import React, { useState } from 'react';
import { Home, Building, AlertTriangle } from 'lucide-react';

const NavigationDemo = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { icon: Home, label: 'Home' },
    { icon: Building, label: 'Buildings' },
    { icon: AlertTriangle, label: 'SOS' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex flex-col items-center justify-center p-8">
      <h1 className="text-white text-3xl font-bold mb-8">Navigation Bar Demo</h1>
      
      <div className="space-y-8">
        {/* Demo 1: Home Active */}
        <div className="flex flex-col items-center">
          <h2 className="text-white text-lg mb-4">Home Active</h2>
          <div className="bg-nav-bg rounded-full p-2 shadow-nav">
            <div className="relative flex items-center">
              <div className="absolute top-0 h-12 w-12 bg-accent rounded-full shadow-lg" style={{ transform: 'translateX(4px)' }} />
              {navItems.map((item, index) => (
                <button
                  key={index}
                  className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full mx-1"
                >
                  <item.icon 
                    className={`w-5 h-5 ${
                      index === 0 ? 'text-accent-foreground' : 'text-nav-inactive'
                    }`} 
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Demo 2: Buildings Active */}
        <div className="flex flex-col items-center">
          <h2 className="text-white text-lg mb-4">Buildings Active</h2>
          <div className="bg-nav-bg rounded-full p-2 shadow-nav">
            <div className="relative flex items-center">
              <div className="absolute top-0 h-12 w-12 bg-accent rounded-full shadow-lg" style={{ transform: 'translateX(60px)' }} />
              {navItems.map((item, index) => (
                <button
                  key={index}
                  className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full mx-1"
                >
                  <item.icon 
                    className={`w-5 h-5 ${
                      index === 1 ? 'text-accent-foreground' : 'text-nav-inactive'
                    }`} 
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Demo 3: SOS Active */}
        <div className="flex flex-col items-center">
          <h2 className="text-white text-lg mb-4">SOS Active</h2>
          <div className="bg-nav-bg rounded-full p-2 shadow-nav">
            <div className="relative flex items-center">
              <div className="absolute top-0 h-12 w-12 bg-accent rounded-full shadow-lg" style={{ transform: 'translateX(116px)' }} />
              {navItems.map((item, index) => (
                <button
                  key={index}
                  className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full mx-1"
                >
                  <item.icon 
                    className={`w-5 h-5 ${
                      index === 2 ? 'text-accent-foreground' : 'text-nav-inactive'
                    }`} 
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-white text-center">
        <p className="mb-4">Interactive Demo:</p>
        <div className="flex space-x-4">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeIndex === index 
                  ? 'bg-accent text-accent-foreground' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Navigation Bar */}
      <div className="mt-8">
        <div className="bg-nav-bg rounded-full p-2 shadow-nav">
          <div className="relative flex items-center">
            <div 
              className="absolute top-0 h-12 w-12 bg-accent rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{
                transform: `translateX(${activeIndex * 56 + 4}px)`,
              }}
            />
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 mx-1"
              >
                <item.icon 
                  className={`w-5 h-5 transition-all duration-200 ${
                    index === activeIndex 
                      ? 'text-accent-foreground' 
                      : 'text-nav-inactive hover:text-nav-hover'
                  }`} 
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationDemo;
