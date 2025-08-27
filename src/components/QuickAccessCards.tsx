import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Ambulance, Heart, Droplets, Wind, Building, Phone, MapPin, Users } from 'lucide-react';

const QuickAccessCards = () => {
  const navigate = useNavigate();

  const quickAccessCards = [
    { 
      icon: Ambulance, 
      label: 'Emergency', 
      description: 'Request ambulance',
      color: 'bg-destructive/10 border-destructive/20 hover:bg-destructive/15',
      path: '/sos'
    },
    { 
      icon: Heart, 
      label: 'ICU Beds', 
      description: 'Find available beds',
      color: 'bg-primary/10 border-primary/20 hover:bg-primary/15',
      path: '/buildings'
    },
    { 
      icon: Droplets, 
      label: 'Blood Units', 
      description: 'Blood availability',
      color: 'bg-secondary/10 border-secondary/20 hover:bg-secondary/15',
      path: '/buildings'
    },
    { 
      icon: Wind, 
      label: 'Oxygen', 
      description: 'Oxygen suppliers',
      color: 'bg-secondary/10 border-secondary/20 hover:bg-secondary/15',
      path: '/buildings'
    },
  ];

  const categories = [
    { icon: Heart, label: 'Cardiology' },
    { icon: Phone, label: 'Emergency' },
    { icon: MapPin, label: 'Nearby' },
    { icon: Building, label: 'Hospitals' },
    { icon: Users, label: 'Specialists' },
    { icon: Wind, label: 'Pharmacy' },
  ];

  return (
    <div className="space-y-8">
      {/* Quick Access Cards */}
      <div className="animate-fade-in-delayed">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Access</h2>
        <div className="space-y-3">
          {quickAccessCards.map((card, index) => (
            <Card 
              key={card.label} 
              className="bg-medmap-lavender border border-medmap-purple/20 cursor-pointer transition-all hover:scale-[1.02] rounded-2xl overflow-hidden"
              onClick={() => navigate(card.path)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="grid grid-cols-2 h-20">
                {/* Left section - Icon and Label */}
                <div className="flex items-center justify-center bg-white/50 border-r border-medmap-purple/10">
                  <div className="flex flex-col items-center">
                    <card.icon className="w-6 h-6 mb-1 text-medmap-purple" />
                    <span className="text-xs font-medium text-medmap-dark">{card.label}</span>
                  </div>
                </div>
                
                {/* Right section - Description and Status */}
                <div className="flex items-center justify-between px-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-medmap-gray mb-1">{card.description}</span>
                    <span className="text-sm font-semibold text-medmap-dark">Available</span>
                  </div>
                  <div className="bg-medmap-teal text-white px-3 py-1 rounded-full text-xs font-medium">
                    Active
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="animate-fade-in-delayed" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-lg font-semibold text-foreground mb-4">Categories</h2>
        <div className="grid grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <div 
              key={category.label} 
              className="flex flex-col items-center p-4 cursor-pointer transition-all hover:scale-105"
              onClick={() => navigate('/buildings')}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2 border border-primary/20 hover:bg-primary/15 transition-colors">
                <category.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-medium text-center text-foreground">{category.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickAccessCards;