import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Search, Filter, MoreVertical, FileText, Clock, CheckCircle, Users, LogOut, User, AlertTriangle, TrendingUp
} from 'lucide-react';
import FuturisticBackground from './FuturisticBackground';

const EmployeeDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Claims', value: '2,847', icon: FileText },
    { label: 'Pending Review', value: '142', icon: Clock },
    { label: 'Approved Today', value: '67', icon: CheckCircle },
    { label: 'Active Customers', value: '1,923', icon: Users }
  ];

  const recentClaims = [
    { id: 'WC-2025-001', customer: 'John Doe', product: 'Samsung Galaxy S24', status: 'pending', priority: 'high' },
    { id: 'WC-2025-002', customer: 'Sarah Wilson', product: 'JBL Headphones', status: 'approved', priority: 'medium' },
    { id: 'WC-2025-003', customer: 'Mike Johnson', product: 'Nike Air Max', status: 'review', priority: 'low' },
    { id: 'WC-2025-004', customer: 'Emily Brown', product: 'Apple iPhone 15', status: 'rejected', priority: 'medium' },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending': return { text: 'Pending', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
      case 'approved': return { text: 'Approved', color: 'text-green-500', bg: 'bg-green-500/10' };
      case 'rejected': return { text: 'Rejected', color: 'text-red-500', bg: 'bg-red-500/10' };
      case 'review': return { text: 'In Review', color: 'text-blue-500', bg: 'bg-blue-500/10' };
      default: return { text: status, color: 'text-gray-500', bg: 'bg-gray-500/10' };
    }
  };
  
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low': return <TrendingUp className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="relative min-h-screen font-sans text-brand-dark">
      <FuturisticBackground />

      <header className="sticky top-0 z-20 bg-brand-glass backdrop-blur-lg border-b border-brand-glass-border">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-light text-brand-dark">Claimmly</h1>
              <span className="text-brand-dark/50 font-light">Employee Dashboard</span>
            </div>
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-dark/40" />
                <input
                  type="text"
                  placeholder="Search claims, customers..."
                  className="w-full pl-12 pr-4 py-3 bg-brand-glass border border-brand-glass-border rounded-full focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-brand-dark/60 hover:text-brand-dark">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-brand-background"></span>
              </button>
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-brand-glass">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-gray-600" /></div>
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white/80 backdrop-blur-lg rounded-lg shadow-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                  <div className="p-2">
                    <button onClick={() => navigate('/employee/login')} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 rounded-md hover:bg-red-500/10">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-brand-glass backdrop-blur-xl rounded-2xl p-6 border border-brand-glass-border shadow-lg shadow-black/5">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-brand-dark/70">{stat.label}</p>
                  <Icon className="w-6 h-6 text-brand-dark/40" />
                </div>
                <p className="text-4xl font-semibold text-brand-dark mt-4">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-brand-glass backdrop-blur-xl rounded-2xl shadow-xl shadow-black/5 border border-brand-glass-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-brand-dark">Recent Claims</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/50 border border-brand-glass-border rounded-full text-sm hover:bg-white/80 transition">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
          <div className="space-y-4">
            {recentClaims.map((claim, index) => (
              <motion.div key={claim.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}
                className="grid grid-cols-10 gap-4 items-center p-4 bg-white/50 rounded-lg border border-brand-glass-border hover:bg-white/80 transition-colors cursor-pointer">
                <div className="col-span-2 font-semibold text-brand-blue">{claim.id}</div>
                <div className="col-span-2 text-brand-dark/90">{claim.customer}</div>
                <div className="col-span-3 text-brand-dark/70">{claim.product}</div>
                <div className="col-span-1 flex items-center gap-2">
                  {getPriorityIcon(claim.priority)}
                </div>
                <div className="col-span-1">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusInfo(claim.status).bg} ${getStatusInfo(claim.status).color}`}>
                    {getStatusInfo(claim.status).text}
                  </span>
                </div>
                <div className="col-span-1 flex justify-end">
                  <button className="p-2 text-brand-dark/50 hover:text-brand-dark"><MoreVertical className="w-5 h-5" /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
