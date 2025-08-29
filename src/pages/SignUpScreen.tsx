import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SignUpScreen = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Create basic user data
    const userData = {
      id: Date.now().toString(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: '',
      dateOfBirth: '',
      bloodType: '',
      allergies: '',
      medications: '',
      emergencyContact: '',
      emergencyPhone: '',
      medicalConditions: '',
      insuranceProvider: '',
      policyNumber: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    };

    // Navigate to form filling
    navigate('/user-form', { state: { userData } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/demo')}
          className="text-medmap-gray hover:text-primary"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-8">
        <div className="max-w-md mx-auto">
          {/* Title */}
          <div className="text-center mb-8 animate-slide-up">
            <h1 className="text-3xl font-bold text-gradient-medmap mb-2">
              Join MedMap
            </h1>
            <p className="text-medmap-gray">
              Create your emergency medical profile
            </p>
          </div>

          {/* Sign Up Form */}
          <Card className="card-medmap animate-fade-in-delayed" style={{
            background: '#5B21B6'
          }}>
            <form onSubmit={handleSignUp} className="space-y-6">
              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white font-medium mb-3 block">
                  First Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white" />
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="pl-10 bg-white/20 text-white placeholder:text-white/70 border-white/30 focus:border-white/50"
                    placeholder="Enter your first name"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white font-medium mb-3 block">
                  Last Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white" />
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="pl-10 bg-white/20 text-white placeholder:text-white/70 border-white/30 focus:border-white/50"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium mb-3 block">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-white/20 text-white placeholder:text-white/70 border-white/30 focus:border-white/50"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium mb-3 block">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 bg-white/20 text-white placeholder:text-white/70 border-white/30 focus:border-white/50"
                    placeholder="Create a password"
                  />
                </div>
              </div>

            </form>

            {/* Sign Up Button */}
            <Button 
              type="submit" 
              className="w-full bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50 font-semibold py-3 px-6 rounded-xl transition-all duration-300 mt-8"
              onClick={handleSignUp}
            >
              Continue to Profile Setup
            </Button>
          </Card>

          {/* Footer Text */}
          <p className="text-center text-xs text-gray-600 mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;