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
      color: 'border-2 border-rose-500/70 bg-gradient-to-r from-rose-50 to-rose-100',
      path: '/sos'
    },
    { 
      icon: Heart, 
      label: 'ICU Beds', 
      description: 'Find available beds',
      color: 'border-2 border-violet-600/70 bg-gradient-to-r from-violet-50 to-violet-100',
      path: '/buildings'
    },
    { 
      icon: Wind, 
      label: 'Oxygen', 
      description: 'Oxygen suppliers',
      color: 'border-2 border-cyan-600/70 bg-gradient-to-r from-cyan-50 to-cyan-100',
      path: '/buildings'
    },
    { 
      icon: Droplets, 
      label: 'Blood Units', 
      description: 'Blood availability',
      color: 'border-2 border-red-500/70 bg-gradient-to-r from-red-50 to-red-100',
      path: '/buildings'
    },
  ];

  const categories = [
    { icon: Phone, label: 'Emergency', bg: 'bg-orange-500', fg: 'text-white' },
    { icon: MapPin, label: 'Nearby', bg: 'bg-cyan-600', fg: 'text-white' },
    { icon: Building, label: 'Hospitals', bg: 'bg-indigo-500', fg: 'text-white' },
    { icon: Wind, label: 'Oxygen', bg: 'bg-emerald-500', fg: 'text-white' },
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
              className={`cursor-pointer transition-all hover:scale-[1.02] rounded-2xl overflow-hidden ${card.color}`}
              onClick={() => navigate(card.path)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="grid grid-cols-2 h-20">
                {/* Left section - Icon and Label */}
                <div className="flex items-center justify-center bg-white/50 border-r border-medmap-purple/10">
                  <div className="flex flex-col items-center">
                    {/* Icon colors per card vibe */}
                    {card.label === 'Emergency' && (
                      <card.icon className="w-6 h-6 mb-1 text-destructive" />
                    )}
                    {card.label === 'ICU Beds' && (
                      <card.icon className="w-6 h-6 mb-1 text-primary" />
                    )}
                    {card.label === 'Blood Units' && (
                      <card.icon className="w-6 h-6 mb-1 text-red-500" />
                    )}
                    {card.label === 'Oxygen' && (
                      <card.icon className="w-6 h-6 mb-1 text-cyan-600" />
                    )}
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

      {/* Categories - Windows logo layout (2x2) */}
      <div className="animate-fade-in-delayed" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-lg font-semibold text-foreground mb-4">Categories</h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <button
              key={category.label}
              onClick={() => navigate('/buildings')}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98] ${category.bg}`}
            >
              <category.icon className={`w-7 h-7 ${category.fg}`} />
              <span className={`text-xs font-medium ${category.fg}`}>{category.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickAccessCards;