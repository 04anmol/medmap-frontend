import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, LogOut, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import QuickAccessCards from '@/components/QuickAccessCards';
import medmapLogo from '@/assets/medmap-logo.png';

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

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        {/* Logo and User Initial */}
        <div className="flex items-center space-x-3">
          <img 
            src={medmapLogo} 
            alt="MedMap Logo" 
            className="w-8 h-8 object-contain"
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
        <Card className="card-medmap bg-primary text-primary-foreground mb-8 animate-fade-in-delayed">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="w-6 h-6 mr-3" />
              <div>
                <h3 className="font-semibold">Current Location</h3>
                <p className="text-sm opacity-90">{user?.city || 'New York'}, {user?.state || 'NY'}</p>
              </div>
            </div>
            <div className="w-3 h-3 bg-secondary rounded-full animate-pulse-gentle"></div>
          </div>
        </Card>

        {/* Quick Access */}
        <QuickAccessCards />
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default HomeScreen;