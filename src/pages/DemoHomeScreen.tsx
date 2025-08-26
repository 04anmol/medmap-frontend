import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Ambulance, Heart, Droplets, Wind, MapPin, Phone } from 'lucide-react';

const DemoHomeScreen = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isFirstTime } = useUser();

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/home');
    } else {
      navigate('/signup');
    }
  };

  const quickAccessCards = [
    { icon: Ambulance, label: 'Ambulance', color: 'bg-destructive/10 border-destructive/20' },
    { icon: Heart, label: 'ICU Beds', color: 'bg-primary/10 border-primary/20' },
    { icon: Droplets, label: 'Blood Units', color: 'bg-secondary/10 border-secondary/20' },
    { icon: Wind, label: 'Oxygen', color: 'bg-medmap-teal/10 border-medmap-teal/20' },
  ];

  const categories = [
    { icon: Heart, label: 'Cardiology' },
    { icon: Phone, label: 'Emergency' },
    { icon: MapPin, label: 'Nearby' },
    { icon: Droplets, label: 'Pharmacy' },
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
                  <card.icon className="w-8 h-8 mb-2 text-primary" />
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
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2 border border-primary/20">
                  <category.icon className="w-6 h-6 text-primary" />
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
        <div className="bg-medmap-lavender/90 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
          <span className="text-xs text-primary">Tap any option to continue</span>
        </div>
      </div>
    </div>
  );
};

export default DemoHomeScreen;