import React, { useState } from 'react';
import { X } from 'lucide-react';
import EmailStep from './EmailStep';
import OtpStep from './OtpStep';
import SuccessStep from './SuccessStep';

type VerificationStep = 'email' | 'otp' | 'success';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<VerificationStep>('email');
  const [email, setEmail] = useState('');
  
  // Close modal and reset step
  const handleClose = () => {
    onClose();
    // Reset step after animation completes
    setTimeout(() => setStep('email'), 300);
  };
  
  // Handle email submission
  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep('otp');
  };
  
  // Handle OTP submission
  const handleOtpSubmit = () => {
    setStep('success');
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Modal content */}
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Verify Your Workspace
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We'll verify your work email to protect against scams
            </p>
          </div>
          
          {/* Steps */}
          <div className="mt-6">
            {step === 'email' && (
              <EmailStep onSubmit={handleEmailSubmit} />
            )}
            
            {step === 'otp' && (
              <OtpStep email={email} onSubmit={handleOtpSubmit} />
            )}
            
            {step === 'success' && (
              <SuccessStep email={email} onClose={handleClose} />
            )}
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="h-1 w-full bg-gray-200 dark:bg-gray-700">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ 
              width: step === 'email' ? '33%' : step === 'otp' ? '66%' : '100%' 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;