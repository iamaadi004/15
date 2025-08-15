import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, Clock, Shield, Zap } from 'lucide-react';

const SupportSection: React.FC = () => {
  const supportOptions = [
    {
      icon: MessageCircle,
      title: '24/7 AI Chat Support',
      description: 'Get instant answers to your warranty questions',
      action: 'Start Chat',
      color: 'bg-gray-800'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our warranty specialists',
      action: 'Call Now',
      color: 'bg-gray-700'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us detailed questions and documentation',
      action: 'Send Email',
      color: 'bg-gray-600'
    }
  ];

  const features = [
    {
      icon: Clock,
      title: 'Fast Processing',
      description: 'Most claims processed within 24-48 hours'
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Your data is protected with enterprise-grade security'
    },
    {
      icon: Zap,
      title: 'AI-Powered',
      description: 'Smart automation for faster claim resolution'
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Support Options */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-light text-gray-900 mb-4">Need Help?</h2>
          <p className="text-lg text-gray-600 mb-12 font-light">
            Our support team is here to assist you with your warranty claims
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all"
                >
                  <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">{option.title}</h3>
                  <p className="text-gray-600 mb-6 font-light">{option.description}</p>
                  <button className="w-full py-3 px-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium">
                    {option.action}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Features */}
        <div className="border-t border-gray-200 pt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-lg text-gray-600 font-light">
              We've streamlined the warranty process to save you time and hassle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 font-light">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="border-t border-gray-200 pt-20 mt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="text-lg font-medium text-gray-900 mb-3">How long does claim processing take?</h4>
                <p className="text-gray-600 font-light">Most claims are processed within 24-48 hours. Complex cases may take 3-5 business days.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="text-lg font-medium text-gray-900 mb-3">What documents do I need?</h4>
                <p className="text-gray-600 font-light">You'll need your purchase receipt, photos of the defective product, and any previous repair documentation.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="text-lg font-medium text-gray-900 mb-3">Is my data secure?</h4>
                <p className="text-gray-600 font-light">Yes, we use enterprise-grade encryption and comply with GDPR and CCPA regulations to protect your data.</p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="text-lg font-medium text-gray-900 mb-3">Can I track my claim status?</h4>
                <p className="text-gray-600 font-light">Yes, you'll receive real-time updates and can track your claim progress through our dashboard.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="text-lg font-medium text-gray-900 mb-3">What if my claim is denied?</h4>
                <p className="text-gray-600 font-light">You can appeal the decision or contact our support team for a review of your case.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="text-lg font-medium text-gray-900 mb-3">Do you support international claims?</h4>
                <p className="text-gray-600 font-light">Yes, we support claims globally with multi-language assistance and local compliance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;
