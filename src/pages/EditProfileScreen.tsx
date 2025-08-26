import React, { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const EditProfileScreen = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    bloodType: user?.bloodType || '',
    allergies: user?.allergies || '',
    medications: user?.medications || '',
    emergencyContact: user?.emergencyContact || '',
    emergencyPhone: user?.emergencyPhone || '',
    medicalConditions: user?.medicalConditions || '',
    insuranceProvider: user?.insuranceProvider || '',
    policyNumber: user?.policyNumber || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    toast({
      title: "Profile updated successfully!",
    });
    navigate('/profile');
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/profile')}
          className="text-medmap-gray hover:text-primary"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          className="btn-medmap"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Title */}
      <div className="px-6 mb-8">
        <h1 className="text-2xl font-bold text-gradient-medmap mb-2">
          Edit Profile
        </h1>
        <p className="text-medmap-gray">
          Update your medical and personal information
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="px-6 pb-8 space-y-6">
        {/* Personal Information */}
        <Card className="card-medmap">
          <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="bg-muted/50"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="bg-muted/50"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-muted/50"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-muted/50"
              />
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="bg-muted/50"
              />
            </div>
          </div>
        </Card>

        {/* Medical Information */}
        <Card className="card-medmap">
          <h3 className="text-lg font-semibold text-foreground mb-4">Medical Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="bloodType">Blood Type</Label>
              <Select value={formData.bloodType} onValueChange={(value) => handleSelectChange('bloodType', value)}>
                <SelectTrigger className="bg-muted/50">
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  {bloodTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea
                id="allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                className="bg-muted/50 min-h-[80px]"
              />
            </div>
            <div>
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                name="medications"
                value={formData.medications}
                onChange={handleInputChange}
                className="bg-muted/50 min-h-[80px]"
              />
            </div>
            <div>
              <Label htmlFor="medicalConditions">Medical Conditions</Label>
              <Textarea
                id="medicalConditions"
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleInputChange}
                className="bg-muted/50 min-h-[80px]"
              />
            </div>
          </div>
        </Card>

        {/* Emergency Contact */}
        <Card className="card-medmap">
          <h3 className="text-lg font-semibold text-foreground mb-4">Emergency Contact</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
              <Input
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className="bg-muted/50"
              />
            </div>
            <div>
              <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
              <Input
                id="emergencyPhone"
                name="emergencyPhone"
                type="tel"
                value={formData.emergencyPhone}
                onChange={handleInputChange}
                className="bg-muted/50"
              />
            </div>
          </div>
        </Card>

        {/* Insurance & Address */}
        <Card className="card-medmap">
          <h3 className="text-lg font-semibold text-foreground mb-4">Insurance & Address</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                <Input
                  id="insuranceProvider"
                  name="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={handleInputChange}
                  className="bg-muted/50"
                />
              </div>
              <div>
                <Label htmlFor="policyNumber">Policy Number</Label>
                <Input
                  id="policyNumber"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleInputChange}
                  className="bg-muted/50"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="bg-muted/50"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="bg-muted/50"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="bg-muted/50"
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="bg-muted/50"
                />
              </div>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default EditProfileScreen;