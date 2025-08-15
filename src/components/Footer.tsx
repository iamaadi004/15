import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'Integrations', 'API Docs']
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Press', 'Contact']
    },
    {
      title: 'Resources',
      links: ['Help Center', 'Blog', 'Case Studies', 'Webinars']
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR']
    }
  ];

  const socialIcons = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'X (Twitter)', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' }
  ];

  return (
    <footer className="w-full bg-brand-primary text-white">
      <div className="max-w-screen-xl mx-auto px-5 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Product, Company, Resources, Legal Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-white mb-4 text-lg">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-white transition-colors text-sm font-light"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Contact Section */}
          <div>
            <h3 className="font-bold text-white mb-4 text-lg">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <Phone className="w-4 h-4" />
                <a href="tel:831-821-8395" className="hover:text-white transition-colors">
                  831-821-8395
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <Mail className="w-4 h-4" />
                <a href="mailto:iamaadi.004@gmail.com" className="hover:text-white transition-colors">
                  iamaadi.004@gmail.com
                </a>
              </li>
              <li className="mt-4">
                <p className="text-gray-300 text-sm mb-2">Social:</p>
                <div className="flex gap-3">
                  {socialIcons.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                      aria-label={label}
                    >
                      <Icon className="w-4 h-4 text-gray-300" />
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright & Tagline */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2025 Claimmly™. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Transforming warranty management with AI.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
