import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Building, AlertTriangle, HelpCircle } from 'lucide-react';

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
      icon: HelpCircle, 
      label: 'Health Info', 
      path: '/health-info',
      active: location.pathname === '/health-info'
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
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-neutral-900 rounded-full p-3 shadow-lg border border-neutral-800 z-50">
      <div className="relative flex items-center">
        {/* Dynamic bubble highlight */}
        <div 
          className="absolute top-0 h-14 w-14 bg-purple-500 rounded-full transition-all duration-400 ease-out shadow-lg"
          style={{
            transform: `translateX(${activeIndex * 64 + 2}px)`,
          }}
        />
        
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-full p-0 leading-none transition-all duration-300 ease-out mx-1 hover:scale-110 active:scale-95"
          >
            <item.icon 
              className={`w-6 h-6 transition-all duration-300 ease-out align-middle block -translate-x-[2px] ${
                item.active 
                  ? 'text-white' 
                  : item.label === 'SOS'
                    ? 'text-red-400 animate-pulse'
                    : 'text-neutral-400 hover:text-neutral-200'
              }`} 
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;