import React, { useState } from 'react';
import { useTelegram } from '../contexts/TelegramContext';
import ThemeToggle from './ThemeToggle';
import UserTooltip from './UserTooltip';
import { ShieldCheck } from 'lucide-react';

const Header: React.FC = () => {
  const { user, isInTelegram } = useTelegram();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200/80 dark:border-gray-800/80 z-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-primary/10 dark:bg-primary/5 rounded-lg">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            NULLID
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {user && (
            <div className="relative">
              <button
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setShowTooltip(!showTooltip)}
              >
                <span className="w-6 h-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">
                    {user.first_name?.[0] || user.username?.[0] || 'U'}
                  </span>
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  @{user.username || 'user'}
                </span>
              </button>
              
              {showTooltip && (
                <UserTooltip 
                  user={user} 
                  onClose={() => setShowTooltip(false)} 
                />
              )}
            </div>
          )}
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;