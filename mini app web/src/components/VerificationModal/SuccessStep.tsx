import React from 'react';
import { CheckCircle, Shield } from 'lucide-react';

interface SuccessStepProps {
  email: string;
  onClose: () => void;
}

const SuccessStep: React.FC<SuccessStepProps> = ({ email, onClose }) => {
  return (
    <div className="text-center py-4 animate-fadeIn">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Verification Successful!
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Your email <span className="font-medium text-gray-800 dark:text-gray-200">{email}</span> has been verified.
      </p>
      
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-primary mt-0.5" />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Your workspace is now protected
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              NULLID's zk verification helps prevent scams on Telegram
            </p>
          </div>
        </div>
      </div>
      
      <button
        onClick={onClose}
        className="w-full bg-primary hover:bg-primary-dark text-white font-medium rounded-lg py-2.5 px-4 transition-colors"
      >
        Continue
      </button>
    </div>
  );
};

export default SuccessStep;