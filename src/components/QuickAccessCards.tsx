import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Ambulance, Heart, Droplets, Wind, Building, Phone, MapPin, Users } from 'lucide-react';

const QuickAccessCards = () => {
  const navigate = useNavigate();
  const [clickedCards, setClickedCards] = useState<Set<string>>(new Set());

  const quickAccessCards = [
    { 
      icon: Ambulance, 
      label: 'Emergency', 
      description: 'Request ambulance',
      color: 'border-2 border-rose-500/70 bg-gradient-to-br from-rose-500 to-rose-600',
      path: '/sos'
    },
    { 
      icon: Heart, 
      label: 'ICU Beds', 
      description: 'Find available beds',
      color: 'border-2 border-violet-600/70 bg-gradient-to-br from-violet-500 to-violet-600',
      path: '/buildings'
    },
    { 
      icon: Wind, 
      label: 'Oxygen', 
      description: 'Oxygen suppliers',
      color: 'border-2 border-cyan-600/70 bg-gradient-to-br from-cyan-500 to-cyan-600',
      path: '/buildings'
    },
    { 
      icon: Droplets, 
      label: 'Blood Units', 
      description: 'Blood availability',
      color: 'border-2 border-red-500/70 bg-gradient-to-br from-red-500 to-red-600',
      path: '/buildings'
    },
  ];

  const categories = [
    { icon: Phone, label: 'Emergency', bg: 'bg-gradient-to-br from-orange-500 to-orange-600', fg: 'text-white' },
    { icon: MapPin, label: 'Nearby', bg: 'bg-gradient-to-br from-cyan-500 to-cyan-600', fg: 'text-white' },
    { icon: Building, label: 'Hospitals', bg: 'bg-gradient-to-br from-purple-500 to-purple-600', fg: 'text-white' },
    { icon: Wind, label: 'Oxygen', bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600', fg: 'text-white' },
  ];

  const handleCardClick = (card: any) => {
    // For heart, oxygen, and blood cards, toggle the clicked state
    if (['ICU Beds', 'Oxygen', 'Blood Units'].includes(card.label)) {
      setClickedCards(prev => {
        const newSet = new Set(prev);
        if (newSet.has(card.label)) {
          newSet.delete(card.label);
        } else {
          newSet.add(card.label);
        }
        return newSet;
      });
    } else {
      // For emergency card, navigate normally
      navigate(card.path);
    }
  };

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
              onClick={() => handleCardClick(card)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {clickedCards.has(card.label) && ['ICU Beds', 'Oxygen', 'Blood Units'].includes(card.label) ? (
                // Show only circled icon when clicked
                <div className="flex items-center justify-center h-20">
                  <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center border-2 border-white/50">
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              ) : (
                // Show normal card layout
                <div className="grid grid-cols-2 h-20">
                  {/* Left section - Icon and Label */}
                  <div className="flex items-center justify-center bg-white/20 border-r border-white/20">
                    <div className="flex flex-col items-center">
                      {/* Icon colors per card vibe */}
                      {card.label === 'Emergency' && (
                        <card.icon className="w-6 h-6 mb-1 text-white" />
                      )}
                      {card.label === 'ICU Beds' && (
                        <card.icon className="w-6 h-6 mb-1 text-white" />
                      )}
                      {card.label === 'Blood Units' && (
                        <card.icon className="w-6 h-6 mb-1 text-white" />
                      )}
                      {card.label === 'Oxygen' && (
                        <card.icon className="w-6 h-6 mb-1 text-white" />
                      )}
                      <span className="text-xs font-medium text-white">{card.label}</span>
                    </div>
                  </div>
                  
                  {/* Right section - Description and Status */}
                  <div className="flex items-center justify-between px-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-white/80 mb-1">{card.description}</span>
                      <span className="text-sm font-semibold text-white">Available</span>
                    </div>
                    <div className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Active
                    </div>
                  </div>
                </div>
              )}
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