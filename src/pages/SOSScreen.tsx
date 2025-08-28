import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Ambulance, MapPin, Phone, Clock, User, Droplets, Wind } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { toast } from '@/hooks/use-toast';

const SOSScreen = () => {
  const [emergencyStep, setEmergencyStep] = useState<'initial' | 'details' | 'tracking'>('initial');
  const [emergencyData, setEmergencyData] = useState({
    location: 'current',
    customAddress: '',
    forSomeoneElse: false,
    patientName: '',
    patientAge: '',
    bloodType: '',
    needsOxygen: false,
    needsBlood: false,
    emergencyType: '',
    additionalInfo: '',
  });

  const nearbyAmbulances = [
    { id: 1, distance: '2.3 miles', eta: '8 mins', driver: 'John Martinez', phone: '+1 (555) 0123' },
    { id: 2, distance: '3.1 miles', eta: '12 mins', driver: 'Sarah Johnson', phone: '+1 (555) 0456' },
    { id: 3, distance: '4.0 miles', eta: '15 mins', driver: 'Mike Chen', phone: '+1 (555) 0789' },
  ];

  const hospitals = [
    { name: 'New York Presbyterian', distance: '1.2 miles', specialties: ['Cardiology', 'Emergency'] },
    { name: 'Mount Sinai Hospital', distance: '2.1 miles', specialties: ['Trauma', 'ICU'] },
  ];

  const handleEmergencyRequest = () => {
    if (emergencyData.location === 'custom' && !emergencyData.customAddress) {
      toast({
        title: "Please provide address",
        variant: "destructive",
      });
      return;
    }
    setEmergencyStep('details');
  };

  const handleSubmitDetails = () => {
    setEmergencyStep('tracking');
    toast({
      title: "Emergency request sent!",
      description: "Ambulance is on the way",
    });
  };

  if (emergencyStep === 'tracking') {
    return (
      <div className="min-h-screen bg-gradient-surface pb-24">
        {/* Header */}
        <div className="p-6 bg-destructive/10 border-b border-destructive/20">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-destructive rounded-full animate-pulse mr-3"></div>
            <div>
              <h1 className="text-xl font-bold text-destructive">Emergency Active</h1>
              <p className="text-sm text-destructive/80">Ambulance dispatched</p>
            </div>
          </div>
        </div>

        {/* Ambulance Info */}
        <div className="p-6">
          <Card className="card-medmap card-emergency mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Ambulance className="w-8 h-8 text-destructive mr-3" />
                <div>
                  <h3 className="font-semibold text-foreground">Ambulance #001</h3>
                  <p className="text-sm text-medmap-gray">Driver: {nearbyAmbulances[0].driver}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-destructive/30">
                <Phone className="w-4 h-4 mr-2" />
                Call Driver
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-medmap-gray">ETA:</span>
                <span className="ml-2 font-semibold text-destructive">{nearbyAmbulances[0].eta}</span>
              </div>
              <div>
                <span className="text-medmap-gray">Distance:</span>
                <span className="ml-2 font-semibold">{nearbyAmbulances[0].distance}</span>
              </div>
            </div>
          </Card>

          {/* Map Placeholder */}
          <Card className="card-medmap mb-6">
            <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                <p className="text-medmap-gray">Live tracking map</p>
                <p className="text-sm text-medmap-gray">Ambulance en route to your location</p>
              </div>
            </div>
          </Card>

          {/* Hospital Destination */}
          <Card className="card-medmap">
            <h3 className="font-semibold text-foreground mb-3">Destination Hospital</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{hospitals[0].name}</h4>
                  <p className="text-sm text-medmap-gray">{hospitals[0].distance} away</p>
                </div>
                <Button size="sm" variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  Directions
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {hospitals[0].specialties.map((specialty) => (
                  <span key={specialty} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <Navigation />
      </div>
    );
  }

  if (emergencyStep === 'details') {
    return (
      <div className="min-h-screen bg-gradient-surface pb-24">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-destructive mb-2">Emergency Details</h1>
          <p className="text-medmap-gray mb-6">Please provide additional information</p>

          <div className="space-y-6">
            {/* Patient Information */}
            <Card className="card-medmap">
              <h3 className="font-semibold text-foreground mb-4">Patient Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={emergencyData.forSomeoneElse}
                    onCheckedChange={(checked) => 
                      setEmergencyData(prev => ({ ...prev, forSomeoneElse: checked }))
                    }
                  />
                  <Label>This emergency is for someone else</Label>
                </div>

                {emergencyData.forSomeoneElse && (
                  <>
                    <div>
                      <Label htmlFor="patientName">Patient Name</Label>
                      <Input
                        id="patientName"
                        value={emergencyData.patientName}
                        onChange={(e) => setEmergencyData(prev => ({ ...prev, patientName: e.target.value }))}
                        placeholder="Enter patient name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientAge">Age</Label>
                      <Input
                        id="patientAge"
                        type="number"
                        value={emergencyData.patientAge}
                        onChange={(e) => setEmergencyData(prev => ({ ...prev, patientAge: e.target.value }))}
                        placeholder="Enter age"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Select onValueChange={(value) => setEmergencyData(prev => ({ ...prev, bloodType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Medical Requirements */}
            <Card className="card-medmap">
              <h3 className="font-semibold text-foreground mb-4">Medical Requirements</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={emergencyData.needsOxygen}
                    onCheckedChange={(checked) => 
                      setEmergencyData(prev => ({ ...prev, needsOxygen: checked }))
                    }
                  />
                  <Wind className="w-4 h-4" />
                  <Label>Oxygen support needed</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={emergencyData.needsBlood}
                    onCheckedChange={(checked) => 
                      setEmergencyData(prev => ({ ...prev, needsBlood: checked }))
                    }
                  />
                  <Droplets className="w-4 h-4" />
                  <Label>Blood transfusion may be needed</Label>
                </div>
              </div>
            </Card>

            <Button onClick={handleSubmitDetails} className="w-full btn-emergency">
              <Ambulance className="w-5 h-5 mr-2" />
              Confirm Emergency Request
            </Button>
          </div>
        </div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface pb-24">
      {/* Emergency Header */}
      <div className="p-6 pb-4 pt-12">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-t-lg border-4 border-red-500 p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Emergency SOS</h1>
          <p className="text-red-700 text-sm">Request immediate medical assistance</p>
        </div>
      </div>

      {/* Location Selection */}
      <div className="px-6 pt-0">
        <Card className="card-medmap mb-6 rounded-t-none">
          <h3 className="font-semibold text-foreground mb-4">Emergency Location</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Location</Label>
              <Select 
                value={emergencyData.location}
                onValueChange={(value) => setEmergencyData(prev => ({ ...prev, location: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Use Current Location</SelectItem>
                  <SelectItem value="custom">Enter Custom Address</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {emergencyData.location === 'custom' && (
              <div>
                <Label htmlFor="customAddress">Custom Address</Label>
                <Input
                  id="customAddress"
                  value={emergencyData.customAddress}
                  onChange={(e) => setEmergencyData(prev => ({ ...prev, customAddress: e.target.value }))}
                  placeholder="Enter emergency location address"
                />
              </div>
            )}
          </div>
        </Card>

        {/* Available Ambulances */}
        <Card className="card-medmap mb-6">
          <h3 className="font-semibold text-foreground mb-4">Nearby Ambulances</h3>
          
          <div className="space-y-3">
            {nearbyAmbulances.map((ambulance) => (
              <div key={ambulance.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center">
                  <Ambulance className="w-5 h-5 text-destructive mr-3" />
                  <div>
                    <p className="font-medium text-sm">Driver: {ambulance.driver}</p>
                    <p className="text-xs text-medmap-gray">{ambulance.distance} • ETA {ambulance.eta}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-1 text-medmap-gray" />
                  <span className="font-semibold text-destructive">{ambulance.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Emergency Request Button */}
        <Button 
          onClick={handleEmergencyRequest}
          className="w-full btn-emergency text-lg py-6"
        >
          <Ambulance className="w-6 h-6 mr-3" />
          Request Emergency Ambulance
        </Button>
      </div>

      <Navigation />
    </div>
  );
};

export default SOSScreen;