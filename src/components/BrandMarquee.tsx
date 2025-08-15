import React from 'react';
import { motion } from 'framer-motion';

// Vite's glob import to dynamically get all logo URLs from the specified directory.
// The `eager: true` option loads them immediately, and `as: 'url'` ensures we get the URL string.
const logoModules: Record<string, string> = import.meta.glob(
  '/src/assets/images/Brand logos/*.{png,jpg,jpeg,svg,webp}', 
  { eager: true, as: 'url' }
);

const brands = Object.entries(logoModules).map(([path, logoUrl]) => {
  // Extract a user-friendly brand name from the file path.
  // e.g., '/src/assets/images/Brand logos/VIP_Industries.png' becomes 'VIP Industries'
  const fileName = path.split('/').pop() || '';
  const brandName = fileName.split('.')[0].replace(/_/g, ' ');
  
  return {
    name: brandName,
    logo: logoUrl,
  };
});

const BrandMarquee: React.FC = () => {
  // If no logos are found in the directory, render a placeholder message.
  if (brands.length === 0) {
    return (
      <div className="py-20 bg-white/30 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">Our Trusted Partners & Collaborators</h2>
            <p className="text-lg text-brand-light font-light max-w-3xl mx-auto">
              To display your partners, add logo images to the <code>src/assets/images/Brand logos/</code> directory.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Duplicate the array of brands to create a seamless, infinite scrolling effect.
  const extendedBrands = [...brands, ...brands];

  return (
    <div className="py-20 bg-white/30 backdrop-blur-lg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">Our Trusted Partners & Collaborators</h2>
          <p className="text-lg text-brand-light font-light max-w-3xl mx-auto">
            We are proud to collaborate with industry leaders to deliver exceptional services and support for a wide range of products.
          </p>
        </div>
      </div>
      
      <div className="relative group w-full overflow-hidden">
        {/* Gradient overlays for a seamless fade-out effect on the edges */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-brand-bg-end to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-brand-bg-end to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex"
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            duration: brands.length * 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="flex flex-shrink-0">
            {extendedBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center px-6"
                style={{ width: '180px' }}
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="max-h-16 w-auto object-contain transition-all duration-300 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 hover:!scale-110"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BrandMarquee;
