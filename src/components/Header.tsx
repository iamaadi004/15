import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full px-5 sm:px-10 py-5 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20"
    >
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <a href="/" className="text-xl md:text-2xl font-bold text-brand-primary">
          Claimmly™
        </a>
        <nav className="hidden md:flex items-center space-x-6">
          {/* Skip Sign In - Navigates to Quick Register */}
          <button 
            onClick={() => navigate('/register')}
            className="text-brand-primary font-medium hover:text-brand-accent transition-colors px-4 py-2"
          >
            Skip Sign In
          </button>
          
          {/* LogIn - Styled button */}
          <button className="bg-white/20 text-brand-primary font-semibold px-5 py-2 rounded-full border border-brand-primary/30 hover:bg-white/30 transition-all shadow-sm">
            LogIn
          </button>
          
          {/* SignUp - Styled button */}
          <button className="bg-brand-primary text-white font-semibold px-5 py-2 rounded-full hover:bg-opacity-90 transition-all shadow-md">
            SignUp
          </button>
          
          {/* Employee Access - No boundaries */}
          <button 
            onClick={() => navigate('/employee')} 
            className="text-brand-primary font-medium hover:text-brand-accent transition-colors px-4 py-2"
          >
            Are You an Employee?
          </button>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
