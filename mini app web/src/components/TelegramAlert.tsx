import React from 'react';
import { AlertTriangle } from 'lucide-react';

const TelegramAlert: React.FC = () => {
  // Temporarily disabled for local testing
  return null;

  /* return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-6 z-50 animate-fadeIn">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 max-w-md shadow-lg border border-yellow-200 dark:border-yellow-800 text-center">
        <AlertTriangle className="w-12 h-12 text-yellow-500 dark:text-yellow-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          Telegram Required
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Please open this page from Telegram to access all features of NULLID.
        </p>
        <a 
          href="https://telegram.org/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full py-2 px-6 transition-colors"
        >
          Open Telegram
        </a>
      </div>
    </div>
  ); */
};

export default TelegramAlert;