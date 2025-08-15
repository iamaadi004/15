import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Mail } from 'lucide-react';
import FuturisticBackground from './FuturisticBackground';

const EmployeeLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/employee/dashboard');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 font-sans">
      <FuturisticBackground />
      
      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-brand-dark/70 hover:text-brand-dark transition-all z-10"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Claimmly</span>
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        className="w-full max-w-md bg-brand-glass backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/10 border border-brand-glass-border p-8"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light text-brand-dark">Employee Access</h1>
          <p className="text-brand-dark/60 mt-2">Welcome back. Please sign in.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-brand-dark/80 mb-2">Username</label>
            <input
              type="text"
              required
              className="w-full bg-white/50 border-b-2 border-brand-dark/20 focus:border-brand-blue p-3 text-brand-dark focus:outline-none transition-all duration-300 rounded-t-lg"
              placeholder="Enter your username"
            />
          </div>
          
          <div className="relative">
            <label className="block text-sm font-medium text-brand-dark/80 mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="w-full bg-white/50 border-b-2 border-brand-dark/20 focus:border-brand-blue p-3 text-brand-dark focus:outline-none transition-all duration-300 pr-10 rounded-t-lg"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-brand-dark/50 hover:text-brand-dark"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue" />
              <label htmlFor="remember" className="text-brand-dark/80">Remember me</label>
            </div>
            <a href="#" className="font-medium text-brand-blue hover:underline">Forgot password?</a>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-brand-dark text-white py-3 rounded-lg font-semibold hover:bg-black transition-colors shadow-lg"
          >
            Sign In
          </motion.button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-brand-dark/20"></div>
          <span className="flex-shrink mx-4 text-brand-dark/60 text-sm">OR</span>
          <div className="flex-grow border-t border-brand-dark/20"></div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-brand-dark text-white py-3 rounded-lg font-semibold hover:bg-black transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          <Mail className="w-5 h-5" />
          Log In with email
        </motion.button>
      </motion.div>
    </div>
  );
};

export default EmployeeLogin;
