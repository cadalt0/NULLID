import React, { useRef, useEffect } from 'react';

interface UserTooltipProps {
  user: {
    id: number | null;
    username: string | null;
    first_name: string | null;
    last_name: string | null;
  };
  onClose: () => void;
}

const UserTooltip: React.FC<UserTooltipProps> = ({ user, onClose }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div 
      ref={tooltipRef}
      className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-20 border border-gray-200 dark:border-gray-700 animate-fadeIn"
    >
      <div className="flex flex-col space-y-2">
        <div className="pb-2 border-b border-gray-200 dark:border-gray-700">
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-sm text-primary dark:text-primary-light">
            @{user.username || 'user'}
          </p>
        </div>
        
        <div className="pt-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">Telegram ID</p>
          <p className="text-sm font-mono text-gray-800 dark:text-gray-200">
            {user.id || 'Unknown'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserTooltip;