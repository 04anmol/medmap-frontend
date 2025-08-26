import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Heart, Droplets, Wind, MapPin, Phone, Clock, Star } from 'lucide-react';
import Navigation from '@/components/Navigation';

const BuildingsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: Building },
    { id: 'hospital', label: 'Hospitals', icon: Heart },
    { id: 'blood', label: 'Blood Banks', icon: Droplets },
    { id: 'oxygen', label: 'Oxygen', icon: Wind },
  ];

  const facilities = [
    {
      id: 1,
      name: 'New York Presbyterian Hospital',
      type: 'hospital',
      distance: '0.8 miles',
      rating: 4.8,
      services: ['ICU', 'Emergency', 'Cardiology'],
      availability: { icu: 3, oxygen: 'Available', blood: 'O+, A+' },
      phone: '+1 (212) 555-0123',
      address: '525 E 68th St, New York, NY',
    },
    {
      id: 2,
      name: 'Central Blood Bank',
      type: 'blood',
      distance: '1.2 miles',
      rating: 4.6,
      services: ['Blood Donation', 'Plasma', 'Platelets'],
      availability: { blood: 'All types available' },
      phone: '+1 (212) 555-0456',
      address: '123 Medical Center Dr, New York, NY',
    },
    {
      id: 3,
      name: 'Emergency Oxygen Supply Co.',
      type: 'oxygen',
      distance: '0.5 miles',
      rating: 4.9,
      services: ['Home Oxygen', 'Portable Tanks', '24/7 Delivery'],
      availability: { oxygen: 'In Stock' },
      phone: '+1 (212) 555-0789',
      address: '456 Healthcare Ave, New York, NY',
    },
  ];

  const filteredFacilities = selectedCategory === 'all' 
    ? facilities 
    : facilities.filter(f => f.type === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-surface pb-24">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gradient-medmap mb-2">
          Medical Facilities
        </h1>
        <p className="text-medmap-gray">
          Find nearby hospitals, blood banks, and oxygen suppliers
        </p>
      </div>

      {/* Category Filter */}
      <div className="px-6 mb-6">
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`whitespace-nowrap ${
                selectedCategory === category.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted/50 text-foreground hover:bg-primary/10'
              }`}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Facilities List */}
      <div className="px-6 space-y-4">
        {filteredFacilities.map((facility) => (
          <Card key={facility.id} className="card-medmap">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg">{facility.name}</h3>
                  <div className="flex items-center mt-1 space-x-4">
                    <div className="flex items-center text-medmap-gray text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {facility.distance}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{facility.rating}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="ml-4">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>

              {/* Services */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Services:</p>
                <div className="flex flex-wrap gap-2">
                  {facility.services.map((service) => (
                    <Badge key={service} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Current Availability:</p>
                <div className="space-y-1">
                  {facility.availability.icu && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-medmap-gray">ICU Beds:</span>
                      <Badge variant={facility.availability.icu > 0 ? "default" : "destructive"}>
                        {facility.availability.icu} available
                      </Badge>
                    </div>
                  )}
                  {facility.availability.oxygen && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-medmap-gray">Oxygen:</span>
                      <Badge variant="default">{facility.availability.oxygen}</Badge>
                    </div>
                  )}
                  {facility.availability.blood && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-medmap-gray">Blood Types:</span>
                      <Badge variant="secondary">{facility.availability.blood}</Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="pt-2 border-t border-border">
                <p className="text-sm text-medmap-gray">{facility.address}</p>
                <div className="flex justify-between items-center mt-2">
                  <Button variant="outline" size="sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                  <Button size="sm" className="btn-medmap">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Navigation />
    </div>
  );
};

export default BuildingsScreen;