import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, ArrowLeft, Mail, ShieldCheck } from 'lucide-react';

type Step = 'email' | 'otp' | 'reset' | 'done';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join('').length === 4) {
      setStep('reset');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    setStep('done');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground mb-4">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {step === 'done' ? 'Password Reset!' : 'Forgot Password'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {step === 'email' && 'Enter your email to receive a verification code'}
            {step === 'otp' && 'Enter the 4-digit code sent to your email'}
            {step === 'reset' && 'Create your new password'}
            {step === 'done' && 'Your password has been successfully reset'}
          </p>
        </div>

        <div className="card-glass p-8">
          {step === 'email' && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="label-field">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field pl-10" placeholder="you@example.com" required />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full">Send Verification Code</button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="flex justify-center gap-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    className="input-field w-14 h-14 text-center text-xl font-bold"
                  />
                ))}
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Verify Code
              </button>
            </form>
          )}

          {step === 'reset' && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label className="label-field">New Password</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="input-field" placeholder="••••••••" required />
              </div>
              <div>
                <label className="label-field">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="input-field" placeholder="••••••••" required />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button type="submit" className="btn-primary w-full">Reset Password</button>
            </form>
          )}

          {step === 'done' && (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mx-auto">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <p className="text-muted-foreground">You can now sign in with your new password.</p>
              <Link to="/login" className="btn-primary inline-block">Go to Login</Link>
            </div>
          )}

          {step !== 'done' && (
            <Link to="/login" className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground mt-6">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
