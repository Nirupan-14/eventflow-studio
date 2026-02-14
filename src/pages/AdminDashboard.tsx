import React from 'react';
import { Users, Calendar, DollarSign, Clock, TrendingUp, BarChart3 } from 'lucide-react';
import StatCard from '@/components/StatCard';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your platform metrics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value="2,847" change="+12% from last month" changeType="up" icon={Users} />
        <StatCard title="Total Events" value={156} change="+8 this week" changeType="up" icon={Calendar} iconColor="bg-accent/10 text-accent" />
        <StatCard title="Revenue" value="$45,280" change="+18.2%" changeType="up" icon={DollarSign} iconColor="bg-warning/10 text-warning" />
        <StatCard title="Pending Approvals" value={14} change="5 urgent" changeType="neutral" icon={Clock} iconColor="bg-info/10 text-info" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card-glass p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> User Growth
          </h2>
          <div className="space-y-3">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => {
              const val = [45, 58, 72, 65, 80, 92][i];
              return (
                <div key={m} className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-8">{m}</span>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${val}%` }} />
                  </div>
                  <span className="text-sm text-foreground font-medium w-10 text-right">{val}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card-glass p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" /> Top Categories
          </h2>
          <div className="space-y-4">
            {[
              { name: 'Technology', events: 45, revenue: '$12,500' },
              { name: 'Entertainment', events: 32, revenue: '$9,800' },
              { name: 'Business', events: 28, revenue: '$8,200' },
              { name: 'Sports', events: 22, revenue: '$6,400' },
              { name: 'Art', events: 15, revenue: '$3,900' },
            ].map((c, i) => (
              <div key={c.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-5">{i + 1}.</span>
                  <span className="text-sm font-medium text-foreground">{c.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{c.events} events</span>
                  <span className="text-sm font-medium text-foreground">{c.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
