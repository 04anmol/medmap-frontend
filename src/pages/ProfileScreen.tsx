import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, User, Phone, Calendar, Droplets, Heart, Shield, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const profileSections = [
    {
      title: 'Personal Information',
      icon: User,
      fields: [
        { label: 'Name', value: `${user.firstName} ${user.lastName}` },
        { label: 'Email', value: user.email },
        { label: 'Phone', value: user.phone || 'Not provided' },
        { label: 'Date of Birth', value: user.dateOfBirth || 'Not provided' },
      ],
    },
    {
      title: 'Medical Information',
      icon: Heart,
      fields: [
        { label: 'Blood Type', value: user.bloodType || 'Not provided' },
        { label: 'Allergies', value: user.allergies || 'None reported' },
        { label: 'Current Medications', value: user.medications || 'None reported' },
        { label: 'Medical Conditions', value: user.medicalConditions || 'None reported' },
      ],
    },
    {
      title: 'Emergency Contact',
      icon: Phone,
      fields: [
        { label: 'Contact Name', value: user.emergencyContact || 'Not provided' },
        { label: 'Contact Phone', value: user.emergencyPhone || 'Not provided' },
      ],
    },
    {
      title: 'Insurance & Address',
      icon: Shield,
      fields: [
        { label: 'Insurance Provider', value: user.insuranceProvider || 'Not provided' },
        { label: 'Policy Number', value: user.policyNumber || 'Not provided' },
        { label: 'Address', value: user.address || 'Not provided' },
        { label: 'City, State ZIP', value: `${user.city || ''} ${user.state || ''} ${user.zipCode || ''}`.trim() || 'Not provided' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/home')}
          className="text-medmap-gray hover:text-primary"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => navigate('/edit-profile')}
          className="btn-medmap"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Header */}
      <div className="px-6 mb-8">
        <div className="text-center animate-slide-up">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-3xl mx-auto mb-4">
            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-medmap-gray">{user.email}</p>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="px-6 pb-8 space-y-6">
        {profileSections.map((section, index) => (
          <Card 
            key={section.title} 
            className="card-medmap animate-fade-in-delayed"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center mb-4">
              <section.icon className="w-5 h-5 text-primary mr-3" />
              <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
            </div>
            
            <div className="space-y-3">
              {section.fields.map((field) => (
                <div key={field.label} className="flex justify-between items-start">
                  <span className="text-medmap-gray text-sm font-medium">{field.label}:</span>
                  <span className="text-foreground text-sm text-right flex-1 ml-4">
                    {field.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfileScreen;