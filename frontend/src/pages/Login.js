import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login({ email: formData.email, password: formData.password });
        toast.success('Login successful!');
      } else {
        await register(formData);
        toast.success('Registration successful!');
      }
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="login-page" className="min-h-screen bg-stone-100 flex items-center justify-center py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full bg-white p-12 shadow-sm"
      >
        <div className="text-center mb-8">
          <h1
            data-testid="auth-heading"
            className="text-3xl font-playfair font-bold text-slate-900 mb-2"
          >
            {isLogin ? 'Welcome Back' : 'Join HTY REALTY'}
          </h1>
          <p className="text-stone-600">
            {isLogin ? 'Login to your account' : 'Create your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                required
                data-testid="register-name-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-stone-200 focus:border-slate-900 focus:outline-none transition-colors"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                data-testid="register-phone-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-stone-200 focus:border-slate-900 focus:outline-none transition-colors"
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email Address"
            required
            data-testid="auth-email-input"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 focus:border-slate-900 focus:outline-none transition-colors"
          />

          <input
            type="password"
            placeholder="Password"
            required
            data-testid="auth-password-input"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-3 border border-stone-200 focus:border-slate-900 focus:outline-none transition-colors"
          />

          <button
            type="submit"
            disabled={loading}
            data-testid="auth-submit-button"
            className="w-full bg-slate-900 text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            data-testid="toggle-auth-mode"
            className="text-sm text-stone-600 hover:text-yellow-600 transition-colors"
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            data-testid="back-home-link"
            className="text-xs text-stone-500 hover:text-yellow-600 transition-colors uppercase tracking-wider"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
