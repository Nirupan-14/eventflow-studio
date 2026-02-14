import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType = 'neutral', icon: Icon, iconColor = 'bg-primary/10 text-primary' }) => {
  return (
    <div className="card-stat">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${changeType === 'up' ? 'text-accent' : changeType === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}>
              {changeType === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
              {changeType === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
