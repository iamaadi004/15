import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Tag, Hash, Calendar, UploadCloud, Globe, Lock, AlertTriangle, ShieldCheck, FileCheck2, XCircle } from 'lucide-react';
import FuturisticBackground from './FuturisticBackground';

// Define a type for the uploaded file with its validation status
interface UploadedFile {
  file: File;
  status: 'valid' | 'invalid';
  message: string;
}

const QuickRegister: React.FC = () => {
  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [termError, setTermError] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: OTP Verification
  const [formData, setFormData] = useState({ email: '', phone: '' });
  const formRef = useRef<HTMLFormElement>(null);

  // State for file upload and validation
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [fileError, setFileError] = useState<string>('');

  // State for dual OTP verification
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [emailResendTimer, setEmailResendTimer] = useState(0);
  const [phoneResendTimer, setPhoneResendTimer] = useState(0);
  const [emailOtpError, setEmailOtpError] = useState('');
  const [phoneOtpError, setPhoneOtpError] = useState('');
  const [emailNotification, setEmailNotification] = useState('');
  const [phoneNotification, setPhoneNotification] = useState('');

  // Combined timer effect
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (emailResendTimer > 0 || phoneResendTimer > 0) {
      timerId = setTimeout(() => {
        if (emailResendTimer > 0) setEmailResendTimer(prev => prev - 1);
        if (phoneResendTimer > 0) setPhoneResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timerId);
  }, [emailResendTimer, phoneResendTimer]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setFileError('');
    const newFiles: UploadedFile[] = [];
    const maxFileSize = 25 * 1024 * 1024; // 25MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

    for (const file of Array.from(files)) {
      if (file.size > maxFileSize) {
        newFiles.push({ file, status: 'invalid', message: 'File size exceeds 25MB' });
        setFileError('One or more files exceed the 25MB size limit.');
      } else if (!allowedTypes.includes(file.type)) {
        newFiles.push({ file, status: 'invalid', message: 'Invalid file type' });
        setFileError('Invalid file type detected. Please upload PDF, JPG, or PNG.');
      } else {
        newFiles.push({ file, status: 'valid', message: 'Ready to upload' });
      }
    }
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(f => f.file.name !== fileName));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setTermError(true);
      return;
    }
    if (uploadedFiles.some(f => f.status === 'invalid')) {
      setFileError('Please resolve file errors before proceeding.');
      return;
    }
    
    if (formRef.current) {
      const formElements = formRef.current.elements;
      const emailInput = formElements.namedItem('email') as HTMLInputElement;
      const phoneInput = formElements.namedItem('phone') as HTMLInputElement;
      setFormData({
        email: emailInput.value,
        phone: phoneInput.value,
      });
    }

    setStep(2);
    setEmailResendTimer(30);
    setPhoneResendTimer(35); // Stagger timers slightly
    setEmailOtpError('');
    setPhoneOtpError('');
  };

  const handleVerifyEmailOtp = () => {
    if (emailOtp.length === 6 && /^\d{6}$/.test(emailOtp)) {
      setIsEmailVerified(true);
      setEmailOtpError('');
    } else {
      setEmailOtpError('Invalid OTP. Please enter the 6-digit code.');
    }
  };

  const handleVerifyPhoneOtp = () => {
    if (phoneOtp.length === 6 && /^\d{6}$/.test(phoneOtp)) {
      setIsPhoneVerified(true);
      setPhoneOtpError('');
    } else {
      setPhoneOtpError('Invalid OTP. Please enter the 6-digit code.');
    }
  };
  
  const handleCompleteRegistration = () => {
    if (isEmailVerified && isPhoneVerified) {
      // In a real app, this would be a final API call.
      // For now, we'll navigate home.
      navigate('/');
    }
  };

  const handleResendOtp = (type: 'email' | 'phone') => {
    if (type === 'email' && emailResendTimer === 0) {
      setEmailResendTimer(30);
      setEmailOtp('');
      setEmailOtpError('');
      setEmailNotification('New OTP sent!');
      setTimeout(() => setEmailNotification(''), 4000);
    }
    if (type === 'phone' && phoneResendTimer === 0) {
      setPhoneResendTimer(30);
      setPhoneOtp('');
      setPhoneOtpError('');
      setPhoneNotification('New OTP sent!');
      setTimeout(() => setPhoneNotification(''), 4000);
    }
  };

  const maskEmail = (email: string) => email.replace(/^(.).*?@/, '$1*****@');
  const maskPhone = (phone: string) => phone.replace(/\d(?=\d{4})/g, '*');

  const brandOptions = ["Samsung", "Apple", "Dell", "HP", "LG", "Sony", "Adidas", "Nike", "Puma", "Cera", "Havells", "IFB", "Jaguar", "Lenovo", "Philips", "Skechers", "VIP Industries"];
  const countryOptions = ["United States", "Canada", "United Kingdom", "Australia", "India", "Germany", "France", "Japan"];

  return (
    <div className="relative min-h-screen font-sans text-brand-dark bg-brand-bg-start">
      <FuturisticBackground />
      
      <motion.button
        onClick={() => step === 1 ? navigate('/') : setStep(1)}
        className="absolute top-8 left-8 flex items-center gap-2 text-brand-dark/70 hover:text-brand-dark transition-all z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{step === 1 ? 'Back to Home' : 'Back to Form'}</span>
      </motion.button>

      <main className="relative flex items-center justify-center min-h-screen py-16 px-4">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="form-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full max-w-3xl bg-brand-glass backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/10 border border-brand-glass-border p-8 md:p-12 z-10"
            >
              <div className="text-center mb-10">
                <h1 className="text-4xl font-light text-brand-dark">Quick Register Warranty</h1>
                <p className="text-brand-dark/60 mt-2">Secure your product's warranty in a few simple steps.</p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/40 pointer-events-none" /><input type="text" name="fullName" placeholder="Full Name" required className="w-full pl-10 pr-4 py-3 bg-white/50 border-b-2 border-brand-dark/20 focus:border-brand-blue text-brand-dark focus:outline-none transition-all duration-300 rounded-t-lg" /></div>
                  <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/40 pointer-events-none" /><input type="email" name="email" placeholder="Email Address" required className="w-full pl-10 pr-4 py-3 bg-white/50 border-b-2 border-brand-dark/20 focus:border-brand-blue text-brand-dark focus:outline-none transition-all duration-300 rounded-t-lg" /></div>
                  <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/40 pointer-events-none" /><input type="tel" name="phone" placeholder="Mobile Number" required className="w-full pl-10 pr-4 py-3 bg-white/50 border-b-2 border-brand-dark/20 focus:border-brand-blue text-brand-dark focus:outline-none transition-all duration-300 rounded-t-lg" /></div>
                  <div className="relative"><Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/40 pointer-events-none" /><select required defaultValue="" className="w-full pl-10 pr-4 py-3 bg-white/50 border-b-2 border-brand-dark/20 focus:border-brand-blue text-brand-dark focus:outline-none transition-all duration-300 rounded-t-lg appearance-none"><option value="" disabled>Select Product Brand</option>{brandOptions.map(brand => <option key={brand} value={brand}>{brand}</option>)}</select></div>
                  <div className="relative"><Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/40 pointer-events-none" /><input type="text" placeholder="Product Model" required className="w-full pl-10 pr-4 py-3 bg-white/50 border-b-2 border-brand-dark/20 focus:border-brand-blue text-brand-dark focus:outline-none transition-all duration-300 rounded-t-lg" /></div>
                  <div className="relative"><Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/40 pointer-events-none" /><input type="text" placeholder="Product Serial Number" required className="w-full pl-10 pr-4 py-3 bg-white/50 border-b-2 border-brand-dark/20 focus:border-brand-blue text-brand-dark focus:outline-none transition-all duration-300 rounded-t-lg" /></div>
                  <div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/40 pointer-events-none" /><input type="date" required className="w-full pl-10 pr-4 py-3 bg-white/50 border-b-2 border-brand-dark/20 focus:border-brand-blue text-brand-dark focus:outline-none transition-all duration-300 rounded-t-lg" /></div>
                  <div className="relative"><Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/40 pointer-events-none" /><select required defaultValue="" className="w-full pl-10 pr-4 py-3 bg-white/50 border-b-2 border-brand-dark/20 focus:border-brand-blue text-brand-dark focus:outline-none transition-all duration-300 rounded-t-lg appearance-none"><option value="" disabled>Select Country / Location</option>{countryOptions.map(country => <option key={country} value={country}>{country}</option>)}</select></div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-brand-dark/80">Upload Purchase Proof</label>
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-brand-dark/20 border-dashed rounded-lg cursor-pointer bg-white/30 hover:bg-white/50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-8 h-8 mb-2 text-brand-dark/60" />
                        <p className="mb-1 text-sm text-brand-dark/80"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-brand-dark/60">PDF, PNG, JPG (MAX. 25MB)</p>
                      </div>
                      <input id="dropzone-file" type="file" multiple className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>
                  {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2 pt-2">
                      {uploadedFiles.map((f, i) => (
                        <div key={i} className={`flex items-center justify-between p-2 rounded-lg ${f.status === 'valid' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                          <div className="flex items-center gap-2 overflow-hidden">
                            {f.status === 'valid' ? <FileCheck2 className="w-5 h-5 text-green-700 flex-shrink-0" /> : <XCircle className="w-5 h-5 text-red-700 flex-shrink-0" />}
                            <div className="flex-grow overflow-hidden">
                                <p className="text-sm font-medium truncate text-brand-dark">{f.file.name}</p>
                                <p className={`text-xs ${f.status === 'valid' ? 'text-green-800' : 'text-red-800'}`}>{f.message}</p>
                            </div>
                          </div>
                          <button type="button" onClick={() => removeFile(f.file.name)} className="p-1 text-gray-500 hover:text-gray-800"><XCircle className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-start gap-2 p-3 bg-yellow-500/10 rounded-lg text-yellow-800 text-xs">
                    <AlertTriangle className="w-6 h-4 mt-0.5 flex-shrink-0" />
                    <span>If purchased from an online marketplace (Amazon, Flipkart, etc.), an original invoice in <strong>PDF format is mandatory</strong>. Screenshots or images will not be accepted.</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <input id="terms" type="checkbox" checked={agreedToTerms} onChange={(e) => { setAgreedToTerms(e.target.checked); setTermError(false); }} className="h-5 w-5 mt-1 rounded border-gray-300 text-brand-blue focus:ring-brand-blue flex-shrink-0" />
                    <label htmlFor="terms" className="text-sm text-brand-dark/90">I agree to the Terms & Legal Consents. <span className="text-red-500">*</span></label>
                  </div>
                  {termError && <p className="text-red-500 text-xs mt-1">You must agree to the terms to proceed.</p>}
                  <details className="text-xs text-brand-dark/70 bg-white/20 p-3 rounded-lg max-h-48 overflow-y-auto">
                    <summary className="cursor-pointer font-medium hover:text-brand-blue">View full terms and consents</summary>
                    <ul className="list-disc list-inside space-y-2 mt-2 pl-2">
                      <li>I agree to the <b>Terms & Conditions</b> of registration and warranty claims.</li>
                      <li>I have read and understood the <b>Privacy Policy</b> detailing personal data use and protection.</li>
                      <li>I consent to share my information with manufacturers and authorized service providers.</li>
                      <li>I agree to receive communications via email/SMS regarding my warranty and promotional offers.</li>
                      <li><b>Fraud Declaration:</b> I affirm that all information and uploaded documents are genuine.</li>
                      <li>I consent to the use of electronic records and signatures for this transaction.</li>
                      <li>I agree to comply with applicable laws and dispute resolution terms.</li>
                      <li>I acknowledge the warranty transferability rules as specified.</li>
                      <li>This constitutes the entire agreement between me and the provider.</li>
                    </ul>
                  </details>
                </div>
                <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} type="submit" disabled={!agreedToTerms} className="w-full bg-gradient-to-br from-brand-primary to-brand-dark text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all shadow-md disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  <Lock className="w-5 h-5" />
                  Register and Proceed to Verification
                </motion.button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="otp-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full max-w-2xl bg-brand-glass backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/10 border border-brand-glass-border p-8 md:p-12 z-10"
            >
              <div className="text-center mb-8">
                <ShieldCheck className="w-16 h-16 mx-auto text-brand-blue mb-4" />
                <h1 className="text-3xl font-light text-brand-dark">Two-Factor Authentication</h1>
                <p className="text-brand-dark/60 mt-2">Please verify both your email and phone number to continue.</p>
              </div>

              <div className="space-y-6">
                {/* Email Verification */}
                <div className={`p-6 rounded-2xl transition-all ${isEmailVerified ? 'bg-green-500/10' : 'bg-white/30'}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-brand-dark">Verify Email Address</h3>
                      <p className="text-sm text-brand-dark/70">{maskEmail(formData.email)}</p>
                    </div>
                    {isEmailVerified && <div className="flex items-center gap-2 text-green-700 font-semibold"><ShieldCheck className="w-5 h-5"/> Verified</div>}
                  </div>
                  {!isEmailVerified && (
                    <div className="mt-4 space-y-2">
                      <input type="text" value={emailOtp} onChange={(e) => setEmailOtp(e.target.value)} maxLength={6} placeholder="Enter 6-digit code" className="w-full text-center tracking-[0.3em] text-xl p-2 bg-white/50 border-b-2 border-brand-dark/20 focus:border-brand-blue text-brand-dark focus:outline-none transition-all duration-300 rounded-t-lg" />
                      {emailOtpError && <p className="text-red-500 text-sm text-center -mb-1">{emailOtpError}</p>}
                      <div className="flex justify-between items-center pt-2">
                        <button onClick={() => handleResendOtp('email')} disabled={emailResendTimer > 0} className="text-sm font-medium text-brand-blue hover:underline disabled:text-gray-500 disabled:cursor-not-allowed">Resend OTP {emailResendTimer > 0 && `in ${emailResendTimer}s`}</button>
                        <button onClick={handleVerifyEmailOtp} disabled={emailOtp.length !== 6} className="px-4 py-2 bg-brand-blue text-white text-sm rounded-lg font-medium hover:bg-brand-blue/90 transition-colors shadow-md disabled:bg-gray-400">Verify Email</button>
                      </div>
                      <div className="text-right h-4">
                        <AnimatePresence>
                          {emailNotification && <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="text-xs text-green-700 font-medium">{emailNotification}</motion.p>}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}
                </div>

                {/* Phone Verification */}
                <div className={`relative p-6 rounded-2xl transition-all duration-500 ${isPhoneVerified ? 'bg-green-500/10' : 'bg-white/30'} ${!isEmailVerified ? 'opacity-50' : ''}`}>
                  {!isEmailVerified && (
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10 cursor-not-allowed">
                      <div className="flex items-center gap-2 text-brand-dark/70 font-medium">
                        <Lock className="w-4 h-4" />
                        <span>Verify email first</span>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-brand-dark">Verify Phone Number</h3>
                      <p className="text-sm text-brand-dark/70">{maskPhone(formData.phone)}</p>
                    </div>
                    {isPhoneVerified && <div className="flex items-center gap-2 text-green-700 font-semibold"><ShieldCheck className="w-5 h-5"/> Verified</div>}
                  </div>
                  {!isPhoneVerified && (
                     <div className="mt-4 space-y-2">
                      <input type="text" value={phoneOtp} onChange={(e) => setPhoneOtp(e.target.value)} maxLength={6} placeholder="Enter 6-digit code" className="w-full text-center tracking-[0.3em] text-xl p-2 bg-white/50 border-b-2 border-brand-dark/20 focus:border-brand-blue text-brand-dark focus:outline-none transition-all duration-300 rounded-t-lg" />
                      {phoneOtpError && <p className="text-red-500 text-sm text-center -mb-1">{phoneOtpError}</p>}
                      <div className="flex justify-between items-center pt-2">
                        <button onClick={() => handleResendOtp('phone')} disabled={phoneResendTimer > 0} className="text-sm font-medium text-brand-blue hover:underline disabled:text-gray-500 disabled:cursor-not-allowed">Resend OTP {phoneResendTimer > 0 && `in ${phoneResendTimer}s`}</button>
                        <button onClick={handleVerifyPhoneOtp} disabled={phoneOtp.length !== 6} className="px-4 py-2 bg-brand-blue text-white text-sm rounded-lg font-medium hover:bg-brand-blue/90 transition-colors shadow-md disabled:bg-gray-400">Verify Phone</button>
                      </div>
                      <div className="text-right h-4">
                        <AnimatePresence>
                          {phoneNotification && <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="text-xs text-green-700 font-medium">{phoneNotification}</motion.p>}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCompleteRegistration}
                  disabled={!isEmailVerified || !isPhoneVerified}
                  className="w-full bg-gradient-to-br from-brand-primary to-brand-dark text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all shadow-md disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  Complete Registration
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default QuickRegister;
