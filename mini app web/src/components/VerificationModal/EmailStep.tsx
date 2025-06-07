import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import useOtpStore from '../../services/otpService';

interface EmailStepProps {
  onSubmit: (email: string) => void;
}

const EmailStep: React.FC<EmailStepProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const generateOtp = useOtpStore(state => state.generateOtp);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Generate and send OTP
    setIsLoading(true);
    setError('');
    
    try {
      generateOtp(email);
      onSubmit(email);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="animate-fadeIn">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Work Email
          </label>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            
            <input
              type="email"
              id="email"
              className={`block w-full pl-10 pr-4 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-900 rounded-lg border ${
                error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light transition-colors`}
              placeholder="your.name@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              required
            />
          </div>
          
          {error && (
            <p className="mt-1 text-sm text-red-500">{error}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg py-2.5 px-4 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send OTP</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
        
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
          We'll send a one-time password to verify your email
        </p>
      </form>
    </div>
  );
};

export default EmailStep;