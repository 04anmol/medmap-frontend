import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Building, AlertTriangle } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      icon: Home, 
      label: 'Home', 
      path: '/home',
      active: location.pathname === '/home'
    },
    { 
      icon: Building, 
      label: 'Buildings', 
      path: '/buildings',
      active: location.pathname === '/buildings'
    },
    { 
      icon: AlertTriangle, 
      label: 'SOS', 
      path: '/sos',
      active: location.pathname === '/sos'
    },
  ];

  const activeIndex = navItems.findIndex(item => item.active);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-nav-bg rounded-full p-2 shadow-nav">
      <div className="relative flex items-center">
        {/* Dynamic bubble highlight */}
        <div 
          className="absolute top-0 h-12 w-12 bg-accent rounded-full transition-all duration-300 ease-out shadow-lg"
          style={{
            transform: `translateX(${activeIndex * 56 + 4}px)`,
          }}
        />
        
        {navItems.map((item, index) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 mx-1"
          >
            <item.icon 
              className={`w-5 h-5 transition-all duration-200 ${
                item.active 
                  ? 'text-accent-foreground' 
                  : 'text-nav-inactive hover:text-nav-hover'
              }`} 
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;