import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, UserPlus } from 'lucide-react';

const Signup: React.FC = () => {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', address: '', city: '', phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signup({ ...form, role: 'user' })) {
      navigate('/dashboard/user');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground mb-4">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Create account</h1>
          <p className="text-muted-foreground mt-1">Get started with your free account</p>
        </div>

        <div className="card-glass p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-field">First Name</label>
                <input value={form.firstName} onChange={e => update('firstName', e.target.value)} className="input-field" placeholder="John" required />
              </div>
              <div>
                <label className="label-field">Last Name</label>
                <input value={form.lastName} onChange={e => update('lastName', e.target.value)} className="input-field" placeholder="Doe" required />
              </div>
            </div>

            <div>
              <label className="label-field">Email</label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className="input-field" placeholder="you@example.com" required />
            </div>

            <div>
              <label className="label-field">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => update('password', e.target.value)} className="input-field pr-10" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="label-field">Phone</label>
              <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className="input-field" placeholder="+1 (555) 000-0000" required />
            </div>

            <div>
              <label className="label-field">Address</label>
              <input value={form.address} onChange={e => update('address', e.target.value)} className="input-field" placeholder="123 Main Street" required />
            </div>

            <div>
              <label className="label-field">City</label>
              <input value={form.city} onChange={e => update('city', e.target.value)} className="input-field" placeholder="New York" required />
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
              <UserPlus className="w-4 h-4" /> Create Account
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
