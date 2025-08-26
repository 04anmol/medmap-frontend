import React from 'react';
import Navigation from '@/components/Navigation';
import { Clock, Calendar, FileText } from 'lucide-react';

const HistoryScreen = () => {
  const historyItems = [
    {
      id: 1,
      title: 'Building Access',
      description: 'Accessed Main Building - Floor 3',
      time: '2 hours ago',
      icon: Clock,
      type: 'access'
    },
    {
      id: 2,
      title: 'Emergency Alert',
      description: 'SOS activated in Building B',
      time: '1 day ago',
      icon: Calendar,
      type: 'emergency'
    },
    {
      id: 3,
      title: 'Profile Update',
      description: 'Updated medical information',
      time: '3 days ago',
      icon: FileText,
      type: 'profile'
    },
    {
      id: 4,
      title: 'Location Check-in',
      description: 'Checked in at Emergency Room',
      time: '1 week ago',
      icon: Clock,
      type: 'location'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <h1 className="text-2xl font-bold">History</h1>
        <p className="text-primary-foreground/80 mt-1">Your recent activities and events</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {historyItems.map((item) => (
          <div key={item.id} className="card-medmap">
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-full ${
                item.type === 'emergency' ? 'bg-destructive/20 text-destructive' :
                item.type === 'access' ? 'bg-secondary/20 text-secondary' :
                'bg-primary/20 text-primary'
              }`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                <p className="text-muted-foreground text-xs mt-2">{item.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default HistoryScreen;
