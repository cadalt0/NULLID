import React from 'react';
import { Check } from 'lucide-react';

interface VerifyButtonProps {
  onClick: () => void;
}

const VerifyButton: React.FC<VerifyButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
    >
      <span className="flex items-center justify-center gap-2">
        <Check className="w-5 h-5" />
        <span>Verify</span>
      </span>
      
      {/* Animation elements */}
      <span className="absolute inset-0 flex justify-center items-center">
        <span className="h-full w-full bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-0 transition-opacity duration-300"></span>
      </span>
      <span className="absolute inset-0 -z-10 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></span>
    </button>
  );
};

export default VerifyButton;