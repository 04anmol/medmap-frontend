import React from 'react';
import Navigation from '@/components/Navigation';
import { TrendingUp, Users, MapPin, Activity } from 'lucide-react';

const AnalyticsScreen = () => {
  const analyticsData = [
    {
      id: 1,
      title: 'Total Visits',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-primary/20 text-primary'
    },
    {
      id: 2,
      title: 'Active Users',
      value: '892',
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-secondary/20 text-secondary'
    },
    {
      id: 3,
      title: 'Locations',
      value: '15',
      change: '+2',
      changeType: 'positive',
      icon: MapPin,
      color: 'bg-accent/20 text-accent'
    },
    {
      id: 4,
      title: 'Emergency Calls',
      value: '3',
      change: '-67%',
      changeType: 'negative',
      icon: Activity,
      color: 'bg-destructive/20 text-destructive'
    }
  ];

  const recentActivity = [
    { time: '2 min ago', event: 'User accessed Building A' },
    { time: '5 min ago', event: 'Emergency alert resolved' },
    { time: '12 min ago', event: 'New user registered' },
    { time: '1 hour ago', event: 'System maintenance completed' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-primary-foreground/80 mt-1">System performance and usage statistics</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Analytics Cards */}
        <div className="grid grid-cols-2 gap-4">
          {analyticsData.map((item) => (
            <div key={item.id} className="card-medmap">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{item.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{item.value}</p>
                  <p className={`text-xs mt-1 ${
                    item.changeType === 'positive' ? 'text-secondary' : 'text-destructive'
                  }`}>
                    {item.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="card-medmap">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-b-0">
                <p className="text-foreground text-sm">{activity.event}</p>
                <p className="text-muted-foreground text-xs">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="card-medmap">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-muted-foreground text-sm">System Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-secondary">2.3s</p>
              <p className="text-muted-foreground text-sm">Avg Response Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default AnalyticsScreen;
