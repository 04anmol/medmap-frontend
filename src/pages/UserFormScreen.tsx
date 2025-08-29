import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, User, Phone, Calendar, Droplets, AlertTriangle, Pill, Heart, FileText, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LocationState {
  userData: any;
}

const UserFormScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();
  const { userData } = (location.state as LocationState) || {};

  const [formData, setFormData] = useState({
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
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userData) {
      toast({
        title: "Missing user data",
        description: "Please return to sign up",
        variant: "destructive",
      });
      navigate('/signup');
      return;
    }

    const completeUserData = {
      ...userData,
      ...formData,
    };

    login(completeUserData);
    
    toast({
      title: "Profile created successfully!",
      description: "Welcome to MedMap",
    });

    navigate('/home');
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/signup')}
          className="text-medmap-gray hover:text-primary"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-8">
        <div className="max-w-md mx-auto">
          {/* Title */}
          <div className="text-center mb-8 animate-slide-up">
            <h1 className="text-2xl font-bold text-gradient-medmap mb-2">
              Complete Your Profile
            </h1>
            <p className="text-medmap-gray">
              This information helps us provide better emergency care
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <Card className="card-medmap animate-fade-in-delayed" style={{
              background: '#5B21B6'
            }}>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-white" />
                Personal Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone" className="mb-3 block text-white">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="bg-white/20 text-white placeholder:text-white/70"
                  />
                </div>

                <div>
                  <Label htmlFor="dateOfBirth" className="mb-3 block text-white">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="bg-white/20 text-white [&::-webkit-calendar-picker-indicator]:filter-invert [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:ml-2"
                  />
                </div>

                <div>
                  <Label htmlFor="bloodType" className="mb-3 block text-white">Blood Type</Label>
                  <Select onValueChange={(value) => handleSelectChange('bloodType', value)}>
                    <SelectTrigger className="bg-white/20 text-white">
                      <SelectValue placeholder="Select blood type" className="text-white placeholder:text-white/70" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Medical Information */}
            <Card className="card-medmap" style={{
              background: '#5B21B6'
            }}>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-white" />
                Medical Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="allergies" className="mb-3 block text-white">Allergies</Label>
                  <Textarea
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    placeholder="List any allergies (medications, food, etc.)"
                    className="bg-white/20 text-white placeholder:text-white/70 min-h-[80px]"
                  />
                </div>

                <div>
                  <Label htmlFor="medications" className="mb-3 block text-white">Current Medications</Label>
                  <Textarea
                    id="medications"
                    name="medications"
                    value={formData.medications}
                    onChange={handleInputChange}
                    placeholder="List current medications and dosages"
                    className="bg-white/20 text-white placeholder:text-white/70 min-h-[80px]"
                  />
                </div>

                <div>
                  <Label htmlFor="medicalConditions" className="mb-3 block text-white">Medical Conditions</Label>
                  <Textarea
                    id="medicalConditions"
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleInputChange}
                    placeholder="List any chronic conditions or medical history"
                    className="bg-white/20 text-white placeholder:text-white/70 min-h-[80px]"
                  />
                </div>
              </div>
            </Card>

            {/* Emergency Contact */}
            <Card className="card-medmap" style={{
              background: '#5B21B6'
            }}>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-white" />
                Emergency Contact
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="emergencyContact" className="mb-3 block text-white">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="Full name of emergency contact"
                    className="bg-white/20 text-white placeholder:text-white/70"
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyPhone" className="mb-3 block text-white">Emergency Contact Phone</Label>
                  <Input
                    id="emergencyPhone"
                    name="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="bg-white/20 text-white placeholder:text-white/70"
                  />
                </div>
              </div>
            </Card>

            {/* Insurance & Address */}
            <Card className="card-medmap" style={{
              background: '#5B21B6'
            }}>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-white" />
                Insurance & Address
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="insuranceProvider" className="mb-3 block text-white">Insurance Provider</Label>
                    <Input
                      id="insuranceProvider"
                      name="insuranceProvider"
                      value={formData.insuranceProvider}
                      onChange={handleInputChange}
                      placeholder="Insurance company"
                      className="bg-white/20 text-white placeholder:text-white/70"
                    />
                  </div>
                  <div>
                    <Label htmlFor="policyNumber" className="mb-3 block text-white">Policy Number</Label>
                    <Input
                      id="policyNumber"
                      name="policyNumber"
                      value={formData.policyNumber}
                      onChange={handleInputChange}
                      placeholder="Policy number"
                      className="bg-white/20 text-white placeholder:text-white/70"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address" className="mb-3 block text-white">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street address"
                    className="bg-white/20 text-white placeholder:text-white/70"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="mb-3 block text-white">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="bg-white/20 text-white placeholder:text-white/70"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="mb-3 block text-white">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="State"
                      className="bg-white/20 text-white placeholder:text-white/70"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode" className="mb-3 block text-white">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="ZIP"
                      className="bg-white/20 text-white placeholder:text-white/70"
                    />
                  </div>
                </div>
              </div>
            </Card>

          </form>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50 font-semibold py-3 px-6 rounded-xl transition-all duration-300 mt-8"
            onClick={handleSubmit}
          >
            Complete Profile & Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserFormScreen;