import React, { useEffect, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, LogOut, Edit, CirclePlus, Ambulance, Wind, Droplets, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import QuickAccessCards from '@/components/QuickAccessCards';
// Logo served from public folder

const HomeScreen = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/demo');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  // Hero carousel slides
  const heroSlides = [
    { value: '12k+', label: 'People assisted', color: 'bg-emerald-500', border: 'border-emerald-500', text: 'text-emerald-600', Icon: Ambulance },
    { value: '2.4k', label: 'Ambulances dispatched', color: 'bg-cyan-600', border: 'border-cyan-600', text: 'text-cyan-600', Icon: Wind },
    { value: '310+', label: 'Hospitals connected', color: 'bg-red-500', border: 'border-red-500', text: 'text-red-500', Icon: Building },
    { value: '95%', label: 'Satisfaction', color: 'bg-amber-500', border: 'border-amber-500', text: 'text-amber-500', Icon: Droplets },
  ];

  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        {/* Logo and User Initial */}
        <div className="flex items-center space-x-3">
          <img 
            src={"/Untitled_design-removebg-preview.png"}
            alt="MedMap Logo" 
            className="w-14 h-14 object-contain"
          />
          <Button
            variant="ghost"
            onClick={handleProfile}
            className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg p-0 shadow-lg"
          >
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </Button>
        </div>

        {/* Profile/Logout */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-muted-foreground hover:text-destructive transition-colors"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Main Content */}
      <div className="px-6">
        {/* Greeting */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-muted-foreground">
            Stay safe and connected
          </p>
        </div>

        {/* Current Location */}
        <Card className="card-medmap bg-primary text-primary-foreground mb-4 animate-fade-in-delayed">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="w-6 h-6 mr-3" />
              <div>
                <h3 className="font-semibold">Current Location</h3>
                <p className="text-sm opacity-90">{user?.city || 'New York'}, {user?.state || 'NY'}</p>
              </div>
            </div>
            <div className="w-3 h-3 glow-location"></div>
          </div>
        </Card>

        {/* MedMap Full-width Banner styled like Current Location */}
        <div className="mb-6">
          <Card className="card-medmap bg-primary text-primary-foreground">
            <div className="px-4 sm:px-6 py-4 h-24 sm:h-28 md:h-32 flex items-stretch gap-3">
              {/* Carousel content within the bar */}
              <div className="flex-1 relative">
                {heroSlides.map((s, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 flex items-center gap-4 transition-all duration-500 ${i === slideIndex ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                  >
                    <div className="flex flex-col">
                      <span className="text-3xl font-extrabold leading-none">{s.value}</span>
                      <span className="text-base opacity-90">{s.label}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Icon inside the same panel */}
              <div className="flex items-center">
                {heroSlides.map((s, i) => (
                  <div key={i} className={`${i === slideIndex ? 'block' : 'hidden'}`}>
                    <div className={`h-full aspect-square rounded-full bg-white flex items-center justify-center shadow-2xl border-2 ${s.border} ${s.text}`}>
                      <s.Icon className="w-10 h-10 sm:w-12 sm:h-12" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Access */}
        <QuickAccessCards />
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default HomeScreen;