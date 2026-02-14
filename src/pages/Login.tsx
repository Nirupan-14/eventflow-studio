import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/types';
import { Eye, EyeOff, LogIn, ChevronDown } from 'lucide-react';

const Login: React.FC = () => {
  const [role, setRole] = useState<Role>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password, role)) {
      navigate(role === 'admin' ? '/dashboard/admin' : '/dashboard/user');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground mb-4">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="text-muted-foreground mt-1">Sign in to your account</p>
        </div>

        <div className="card-glass p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="label-field">Role</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setRoleOpen(!roleOpen)}
                  className="input-field flex items-center justify-between cursor-pointer"
                >
                  <span className="capitalize">{role}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${roleOpen ? 'rotate-180' : ''}`} />
                </button>
                {roleOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden animate-slide-down">
                    {(['user', 'admin'] as Role[]).map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => { setRole(r); setRoleOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm capitalize transition-colors ${r === role ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-muted'}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="label-field">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-field"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="label-field">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" /> Sign In
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
