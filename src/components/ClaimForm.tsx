import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Calendar, Package, User, Phone, Mail, MapPin } from 'lucide-react';

interface FormData {
  productName: string;
  modelNumber: string;
  serialNumber: string;
  purchaseDate: string;
  retailer: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  issueDescription: string;
}

const ClaimForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    modelNumber: '',
    serialNumber: '',
    purchaseDate: '',
    retailer: '',
    customerName: '',
    email: '',
    phone: '',
    address: '',
    issueDescription: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const steps = [
    { number: 1, title: 'Product Information', icon: Package },
    { number: 2, title: 'Purchase Details', icon: Calendar },
    { number: 3, title: 'Contact Information', icon: User },
    { number: 4, title: 'Supporting Documents', icon: Upload }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  currentStep >= step.number 
                    ? 'bg-gray-900 border-gray-900 text-white' 
                    : 'border-gray-300 text-gray-400 bg-white'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium transition-colors ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    Step {step.number}
                  </p>
                  <p className={`text-sm transition-colors ${
                    currentStep >= step.number ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 mx-4 h-0.5 transition-colors ${
                    currentStep > step.number ? 'bg-gray-900' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
      >
        {/* Step 1: Product Information */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-light text-gray-900 mb-8">Product Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="e.g., Samsung Galaxy S24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Model Number *
                </label>
                <input
                  type="text"
                  name="modelNumber"
                  value={formData.modelNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="e.g., SM-S924U"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Serial Number *
                </label>
                <input
                  type="text"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="Usually found on device or packaging"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Issue Description *
                </label>
                <textarea
                  name="issueDescription"
                  value={formData.issueDescription}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="Describe the issue you're experiencing"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Purchase Details */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-light text-gray-900 mb-8">Purchase Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Purchase Date *
                </label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Retailer/Store *
                </label>
                <input
                  type="text"
                  name="retailer"
                  value={formData.retailer}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="e.g., Best Buy, Amazon, Official Store"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Contact Information */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-light text-gray-900 mb-8">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <User className="inline w-4 h-4 mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Phone className="inline w-4 h-4 mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <MapPin className="inline w-4 h-4 mr-2" />
                  Shipping Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="Street address, City, State, ZIP"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Supporting Documents */}
        {currentStep === 4 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-light text-gray-900 mb-8">Supporting Documents</h3>
            <div className="space-y-8">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-gray-400 transition-colors bg-gray-50">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <p className="text-gray-600">
                    <span className="font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 mt-2">PNG, JPG, PDF up to 10MB</p>
                </div>
                <input
                  type="file"
                  multiple
                  accept=".png,.jpg,.jpeg,.pdf"
                  className="hidden"
                />
              </div>
              <div className="text-sm text-gray-600 bg-gray-50 p-6 rounded-lg">
                <p className="font-medium mb-3 text-gray-900">Required documents:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Purchase receipt or invoice</li>
                  <li>Photos of the defective product</li>
                  <li>Product packaging (if available)</li>
                  <li>Any previous repair documentation</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8 mt-8 border-t border-gray-100">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-8 py-3 rounded-md font-medium transition-all ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Previous
          </button>
          
          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              className="px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-all font-medium"
            >
              Next Step
            </button>
          ) : (
            <button className="px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-all font-medium">
              Submit Claim
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ClaimForm;
