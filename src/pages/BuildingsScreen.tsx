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
    // Hospitals
    {
      id: 1,
      name: 'New York Presbyterian Hospital',
      type: 'hospital',
      distance: '0.8 miles',
      rating: 4.8,
      services: ['ICU', 'Emergency', 'Cardiology', 'Neurology', 'Pediatrics'],
      availability: { icu: 3, oxygen: 'Available', blood: 'O+, A+' },
      phone: '+1 (212) 555-0123',
      address: '525 E 68th St, New York, NY',
    },
    {
      id: 2,
      name: 'Mount Sinai Medical Center',
      type: 'hospital',
      distance: '1.1 miles',
      rating: 4.7,
      services: ['ICU', 'Emergency', 'Oncology', 'Transplant'],
      availability: { icu: 1, oxygen: 'Limited', blood: 'B+, AB+' },
      phone: '+1 (212) 555-0124',
      address: '1 Gustave L Levy Pl, New York, NY',
    },
    {
      id: 3,
      name: 'NYU Langone Health',
      type: 'hospital',
      distance: '1.3 miles',
      rating: 4.9,
      services: ['ICU', 'Emergency', 'Orthopedics', 'Rehabilitation'],
      availability: { icu: 5, oxygen: 'Available', blood: 'All types' },
      phone: '+1 (212) 555-0125',
      address: '550 1st Ave, New York, NY',
    },
    {
      id: 4,
      name: 'Bellevue Hospital Center',
      type: 'hospital',
      distance: '1.5 miles',
      rating: 4.5,
      services: ['ICU', 'Emergency', 'Psychiatry', 'Trauma'],
      availability: { icu: 2, oxygen: 'Available', blood: 'O-, A-' },
      phone: '+1 (212) 555-0126',
      address: '462 1st Ave, New York, NY',
    },
    {
      id: 5,
      name: 'Lenox Hill Hospital',
      type: 'hospital',
      distance: '1.7 miles',
      rating: 4.6,
      services: ['ICU', 'Emergency', 'Cardiology', 'Maternity'],
      availability: { icu: 4, oxygen: 'Available', blood: 'B-, AB-' },
      phone: '+1 (212) 555-0127',
      address: '100 E 77th St, New York, NY',
    },
    {
      id: 6,
      name: 'St. Luke\'s Roosevelt Hospital',
      type: 'hospital',
      distance: '2.0 miles',
      rating: 4.4,
      services: ['ICU', 'Emergency', 'Internal Medicine', 'Surgery'],
      availability: { icu: 0, oxygen: 'Limited', blood: 'O+, B+' },
      phone: '+1 (212) 555-0128',
      address: '1111 Amsterdam Ave, New York, NY',
    },
    {
      id: 7,
      name: 'Columbia University Medical Center',
      type: 'hospital',
      distance: '2.2 miles',
      rating: 4.8,
      services: ['ICU', 'Emergency', 'Research', 'Specialized Care'],
      availability: { icu: 6, oxygen: 'Available', blood: 'All types' },
      phone: '+1 (212) 555-0129',
      address: '630 W 168th St, New York, NY',
    },
    {
      id: 8,
      name: 'Weill Cornell Medical Center',
      type: 'hospital',
      distance: '2.4 miles',
      rating: 4.7,
      services: ['ICU', 'Emergency', 'Cancer Center', 'Cardiology'],
      availability: { icu: 3, oxygen: 'Available', blood: 'A+, AB+' },
      phone: '+1 (212) 555-0130',
      address: '525 E 68th St, New York, NY',
    },

    // Blood Banks
    {
      id: 9,
      name: 'Central Blood Bank',
      type: 'blood',
      distance: '1.2 miles',
      rating: 4.6,
      services: ['Blood Donation', 'Plasma', 'Platelets', 'Rare Types'],
      availability: { blood: 'All types available' },
      phone: '+1 (212) 555-0456',
      address: '123 Medical Center Dr, New York, NY',
    },
    {
      id: 10,
      name: 'American Red Cross Blood Center',
      type: 'blood',
      distance: '1.8 miles',
      rating: 4.5,
      services: ['Blood Donation', 'Emergency Supply', 'Mobile Units'],
      availability: { blood: 'O+, A+, B+ available' },
      phone: '+1 (212) 555-0457',
      address: '520 W 49th St, New York, NY',
    },
    {
      id: 11,
      name: 'New York Blood Center',
      type: 'blood',
      distance: '2.1 miles',
      rating: 4.7,
      services: ['Blood Donation', 'Cord Blood', 'Research'],
      availability: { blood: 'All types including rare' },
      phone: '+1 (212) 555-0458',
      address: '310 E 67th St, New York, NY',
    },
    {
      id: 12,
      name: 'Community Blood Bank',
      type: 'blood',
      distance: '2.5 miles',
      rating: 4.4,
      services: ['Blood Donation', 'Local Hospitals', 'Emergency'],
      availability: { blood: 'O-, A-, B- available' },
      phone: '+1 (212) 555-0459',
      address: '789 Health Plaza, New York, NY',
    },
    {
      id: 13,
      name: 'Manhattan Blood Services',
      type: 'blood',
      distance: '2.8 miles',
      rating: 4.6,
      services: ['Blood Donation', 'Plasma Collection', 'Testing'],
      availability: { blood: 'AB+, AB- available' },
      phone: '+1 (212) 555-0460',
      address: '456 Medical Ave, New York, NY',
    },

    // Oxygen Hubs
    {
      id: 14,
      name: 'Emergency Oxygen Supply Co.',
      type: 'oxygen',
      distance: '0.5 miles',
      rating: 4.9,
      services: ['Home Oxygen', 'Portable Tanks', '24/7 Delivery'],
      availability: { oxygen: 'In Stock' },
      phone: '+1 (212) 555-0789',
      address: '456 Healthcare Ave, New York, NY',
    },
    {
      id: 15,
      name: 'Metro Oxygen & Medical',
      type: 'oxygen',
      distance: '1.0 miles',
      rating: 4.7,
      services: ['Oxygen Tanks', 'Concentrators', 'Home Delivery'],
      availability: { oxygen: 'Available' },
      phone: '+1 (212) 555-0790',
      address: '789 Medical Blvd, New York, NY',
    },
    {
      id: 16,
      name: 'City Oxygen Hub',
      type: 'oxygen',
      distance: '1.4 miles',
      rating: 4.6,
      services: ['Emergency Oxygen', 'Bulk Supply', 'Hospital Grade'],
      availability: { oxygen: 'Limited Stock' },
      phone: '+1 (212) 555-0791',
      address: '321 Health St, New York, NY',
    },
    {
      id: 17,
      name: 'Quick Oxygen Express',
      type: 'oxygen',
      distance: '1.9 miles',
      rating: 4.8,
      services: ['Same Day Delivery', 'Portable Units', 'Refills'],
      availability: { oxygen: 'In Stock' },
      phone: '+1 (212) 555-0792',
      address: '654 Care Center Dr, New York, NY',
    },
    {
      id: 18,
      name: 'Premium Oxygen Solutions',
      type: 'oxygen',
      distance: '2.3 miles',
      rating: 4.5,
      services: ['High Flow Oxygen', 'Specialized Equipment', 'Consultation'],
      availability: { oxygen: 'Available' },
      phone: '+1 (212) 555-0793',
      address: '987 Medical Way, New York, NY',
    },
    {
      id: 19,
      name: '24/7 Oxygen Emergency',
      type: 'oxygen',
      distance: '2.7 miles',
      rating: 4.9,
      services: ['Emergency Response', 'Mobile Units', 'Hospital Supply'],
      availability: { oxygen: 'Emergency Stock' },
      phone: '+1 (212) 555-0794',
      address: '147 Emergency Lane, New York, NY',
    },
    {
      id: 20,
      name: 'Community Oxygen Network',
      type: 'oxygen',
      distance: '3.0 miles',
      rating: 4.4,
      services: ['Community Support', 'Affordable Rates', 'Local Delivery'],
      availability: { oxygen: 'Available' },
      phone: '+1 (212) 555-0795',
      address: '258 Community Health Rd, New York, NY',
    },
  ];

  const filteredFacilities = selectedCategory === 'all' 
    ? facilities 
    : facilities.filter(f => f.type === selectedCategory);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary mb-2">
          Medical Facilities
        </h1>
        <p className="text-muted-foreground">
          Find nearby hospitals, blood banks, and oxygen suppliers
        </p>
      </div>

      {/* Category Filter */}
      <div className="px-6 mb-6">
        <div className="bg-muted rounded-xl p-1 shadow-sm">
          <div className="grid grid-cols-4 gap-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-background'
                }`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="px-6 mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredFacilities.length} {selectedCategory === 'all' ? 'facilities' : selectedCategory === 'hospital' ? 'hospitals' : selectedCategory === 'blood' ? 'blood banks' : 'oxygen suppliers'}
        </p>
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
                    <div className="flex items-center text-muted-foreground text-sm">
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
                      <span className="text-muted-foreground">ICU Beds:</span>
                      <Badge variant={facility.availability.icu > 0 ? "default" : "destructive"}>
                        {facility.availability.icu} available
                      </Badge>
                    </div>
                  )}
                  {facility.availability.oxygen && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Oxygen:</span>
                      <Badge variant="default">{facility.availability.oxygen}</Badge>
                    </div>
                  )}
                  {facility.availability.blood && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Blood Types:</span>
                      <Badge variant="secondary">{facility.availability.blood}</Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="pt-2 border-t border-border">
                <p className="text-sm text-muted-foreground">{facility.address}</p>
                <div className="flex justify-between items-center mt-2">
                  <Button variant="outline" size="sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                  <Button size="sm" className="bg-primary text-primary-foreground">
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