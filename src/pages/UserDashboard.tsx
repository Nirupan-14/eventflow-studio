import React from 'react';
import { Calendar, MapPin, Users, DollarSign, TrendingUp, BarChart3 } from 'lucide-react';
import StatCard from '@/components/StatCard';

const UserDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="My Events" value={12} change="+3 this month" changeType="up" icon={Calendar} />
        <StatCard title="Upcoming" value={5} change="Next: Jun 15" changeType="neutral" icon={MapPin} iconColor="bg-accent/10 text-accent" />
        <StatCard title="Attendees" value="1,240" change="+12%" changeType="up" icon={Users} iconColor="bg-warning/10 text-warning" />
        <StatCard title="Revenue" value="$8,450" change="+8.2%" changeType="up" icon={DollarSign} iconColor="bg-info/10 text-info" />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card-glass p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              { text: 'Tech Conference 2024 approved', time: '2 hours ago', color: 'bg-accent' },
              { text: 'New attendee registered for Music Festival', time: '5 hours ago', color: 'bg-primary' },
              { text: 'Food & Wine Expo pending review', time: '1 day ago', color: 'bg-warning' },
              { text: 'Marathon 2024 updated', time: '2 days ago', color: 'bg-info' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${item.color}`} />
                <div>
                  <p className="text-sm text-foreground">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-glass p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" /> Quick Stats
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Technology', value: 45, color: 'bg-primary' },
              { label: 'Entertainment', value: 30, color: 'bg-accent' },
              { label: 'Business', value: 15, color: 'bg-warning' },
              { label: 'Sports', value: 10, color: 'bg-info' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{item.label}</span>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color} transition-all duration-500`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
