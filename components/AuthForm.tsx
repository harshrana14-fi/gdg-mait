'use client';

import { useState } from 'react';
import {
  Users, Mail, Lock, Eye, EyeOff,
  ArrowRight, LogIn, UserPlus,
  CheckCircle, AlertCircle
} from 'lucide-react';

type AuthType = 'login' | 'register';
type AuthRole = 'student' | 'society';

type Props = {
  type: AuthType;
  role: AuthRole;
};

export default function AuthForm({ type, role }: Props) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setMsg('');

    const endpoint = `/api/${role}/${type}`;
    const payload =
      type === 'login'
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.error || 'Something went wrong.');
        return;
      }

      setMsg('Success!');
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = `/${role}/dashboard`;
    } catch (err) {
      console.error('Auth error:', err);
      setMsg('Server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (
    name: string,
    type: string,
    placeholder: string,
    Icon: React.ElementType,
    showToggle?: boolean
  ) => (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
      <input
        name={name}
        type={showToggle ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        onChange={handleChange}
        className="w-full pl-12 pr-12 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
      />
      {showToggle && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-md">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4">
            {type === 'login' ? <LogIn className="w-8 h-8 text-white" /> : <UserPlus className="w-8 h-8 text-white" />}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {type === 'login' ? 'Welcome Back!' : 'Join Our Community'}
          </h2>
          <p className="text-white/80">
            {type === 'login' ? 'Sign in to your account' : `Create your ${role} account`}
          </p>
        </div>

        <div className="space-y-4">
          {type === 'register' && renderInput('name', 'text', 'Full Name', Users)}

          {renderInput('email', 'email', 'Email Address', Mail)}
          {renderInput('password', 'password', 'Password', Lock, true)}
        </div>

        {msg && (
          <div
            className={`mt-4 p-3 rounded-xl flex items-center gap-2 ${
              msg === 'Success!' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}
          >
            {msg === 'Success!' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="text-sm">{msg}</span>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-2xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>{type === 'register' ? 'Create Account' : 'Sign In'}</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
