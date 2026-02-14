import React from 'react';
import { Check, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for getting started',
    features: ['Up to 5 events', 'Basic analytics', 'Email support', 'Standard templates', '1 GB storage'],
    cta: 'Current Plan',
    current: true,
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '$29',
    period: '/month',
    description: 'For power users and teams',
    features: ['Unlimited events', 'Advanced analytics', 'Priority support', 'Custom templates', '50 GB storage', 'Custom branding', 'API access', 'Team collaboration'],
    cta: 'Upgrade Now',
    current: false,
    highlighted: true,
  },
];

const UserSubscription: React.FC = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground">Subscription Plans</h1>
        <p className="text-muted-foreground mt-2">Choose the plan that fits your needs. Upgrade anytime.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {plans.map(plan => (
          <div key={plan.name} className={`card-glass p-8 relative ${plan.highlighted ? 'ring-2 ring-primary' : ''}`}>
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Popular
                </span>
              </div>
            )}
            <h2 className="text-xl font-bold text-foreground">{plan.name}</h2>
            <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-bold text-foreground">{plan.price}</span>
              <span className="text-muted-foreground">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button className={`w-full ${plan.current ? 'btn-secondary' : 'btn-primary'}`} disabled={plan.current}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSubscription;
