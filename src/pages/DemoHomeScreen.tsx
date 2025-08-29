import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Ambulance, Heart, Droplets, Wind, MapPin, Phone, User } from 'lucide-react';

const DemoHomeScreen = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isFirstTime } = useUser();
  const [showUserTypeModal, setShowUserTypeModal] = useState(false);

  const handleGetStarted = () => {
    setShowUserTypeModal(true);
  };

  const handleUserTypeSelect = (userType: 'ambulance' | 'user') => {
    setShowUserTypeModal(false);
    if (userType === 'user') {
      if (isLoggedIn) {
        navigate('/home');
      } else {
        navigate('/signup');
      }
    } else if (userType === 'ambulance') {
      // TODO: Navigate to ambulance captain interface
      console.log('Ambulance Captain selected');
    }
  };

  const quickAccessCards = [
    { icon: Ambulance, label: 'Ambulance', color: 'border-2 border-rose-500/70 bg-gradient-to-r from-rose-50 to-rose-100' },
    { icon: Heart, label: 'ICU Beds', color: 'border-2 border-violet-600/70 bg-gradient-to-r from-violet-50 to-violet-100' },
    { icon: Wind, label: 'Oxygen', color: 'border-2 border-cyan-600/70 bg-gradient-to-r from-cyan-50 to-cyan-100' },
    { icon: Droplets, label: 'Blood Units', color: 'border-2 border-red-500/70 bg-gradient-to-r from-red-50 to-red-100' },
  ];

  const categories = [
    { icon: Heart, label: 'Cardiology', bg: 'bg-rose-500', fg: 'text-white' },
    { icon: Phone, label: 'Emergency', bg: 'bg-orange-500', fg: 'text-white' },
    { icon: MapPin, label: 'Nearby', bg: 'bg-cyan-600', fg: 'text-white' },
    { icon: Droplets, label: 'Pharmacy', bg: 'bg-emerald-500', fg: 'text-white' },
  ];

  return (
    <div className="min-h-screen bg-gradient-surface relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-6 right-6 z-10">
        <Button 
          onClick={handleGetStarted}
          className="btn-medmap text-sm px-4 py-2"
        >
          Get Started
        </Button>
      </div>

      {/* Demo Badge */}
      <div className="absolute top-6 left-6 z-10">
        <div className="bg-medmap-lavender/80 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/20">
          <span className="text-xs font-medium text-primary">DEMO MODE</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-24 px-6">
        {/* Greeting */}
        <div className="text-center mb-8 animate-slide-up">
          <img 
            src="/Untitled_design-removebg-preview.png"
            alt="MedMap Logo" 
            className="w-32 h-32 mx-auto mb-4 object-contain animate-wiggle"
          />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Welcome to MedMap
          </h1>
          <p className="text-medmap-gray">
            Your emergency medical companion
          </p>
        </div>

        {/* Quick Access Cards */}
        <div className="mb-8 animate-fade-in-delayed">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickAccessCards.map((card, index) => (
              <Card 
                key={card.label} 
                className={`card-medmap p-4 cursor-pointer transition-all hover:scale-105 ${card.color}`}
                onClick={handleGetStarted}
              >
                <div className="flex flex-col items-center text-center">
                  {card.label === 'Ambulance' && (
                    <card.icon className="w-8 h-8 mb-2 text-destructive" />
                  )}
                  {card.label === 'ICU Beds' && (
                    <card.icon className="w-8 h-8 mb-2 text-primary" />
                  )}
                  {card.label === 'Blood Units' && (
                    <card.icon className="w-8 h-8 mb-2 text-red-500" />
                  )}
                  {card.label === 'Oxygen' && (
                    <card.icon className="w-8 h-8 mb-2 text-cyan-600" />
                  )}
                  <span className="text-sm font-medium text-foreground">{card.label}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="animate-fade-in-delayed" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-lg font-semibold text-foreground mb-4">Categories</h2>
          <div className="grid grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div 
                key={category.label} 
                className="flex flex-col items-center p-4 cursor-pointer transition-all hover:scale-105"
                onClick={handleGetStarted}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 border border-black/5 ${category.bg}`}>
                  <category.icon className={`w-6 h-6 ${category.fg}`} />
                </div>
                <span className="text-xs font-medium text-center text-foreground">{category.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Location Card */}
        <div className="mt-8 animate-fade-in-delayed" style={{ animationDelay: '0.9s' }}>
          <Card className="card-medmap bg-gradient-medmap text-white">
            <div className="flex items-center">
              <MapPin className="w-6 h-6 mr-3" />
              <div>
                <h3 className="font-semibold">Current Location</h3>
                <p className="text-sm opacity-90">New York, NY (Demo)</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Demo Navigation Hint */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-medmap-lavender/90 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/20 w-80 flex items-center justify-center">
          <span className="text-sm font-bold text-primary">Tap any option to continue</span>
        </div>
      </div>

      {/* User Type Selection Modal */}
      {showUserTypeModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowUserTypeModal(false)}
        >
                      <div 
              className="bg-white rounded-3xl p-8 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
            <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
              Choose Your Role
            </h2>
            <div className="flex flex-col gap-6">
              {/* Captain with Ambulance Icon */}
              <div 
                className="bg-red-500 rounded-full px-8 py-4 cursor-pointer transition-all hover:scale-105 flex items-center justify-center w-full relative overflow-hidden"
                onClick={() => handleUserTypeSelect('ambulance')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine-left-to-right"></div>
                <div className="flex items-center space-x-4">
                  <Ambulance className="w-8 h-8 text-white" />
                  <span className="text-white font-semibold text-xl">Captain</span>
                </div>
              </div>
              
              {/* User with User Icon */}
              <div 
                className="bg-blue-500 rounded-full px-8 py-4 cursor-pointer transition-all hover:scale-105 flex items-center justify-center w-full relative overflow-hidden"
                onClick={() => handleUserTypeSelect('user')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine-right-to-left"></div>
                <div className="flex items-center space-x-4">
                  <span className="text-white font-semibold text-xl">User</span>
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoHomeScreen;