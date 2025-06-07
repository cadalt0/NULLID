import React, { useState } from 'react';
import Header from './components/Header';
import VerifyButton from './components/VerifyButton';
import VerificationModal from './components/VerificationModal';
import TelegramAlert from './components/TelegramAlert';
import { useTelegram } from './contexts/TelegramContext';
import { ShieldCheck } from 'lucide-react';

function App() {
  const { isInTelegram, isLoading } = useTelegram();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-primary/40" />
          </div>
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      
      <main className="pt-16 px-4">
        <div className="max-w-4xl mx-auto min-h-[calc(100vh-64px)] flex flex-col items-center justify-center py-12">
          <div className="w-full max-w-md text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-primary/10 dark:bg-primary/5 animate-pulse"></div>
                <div className="relative bg-white dark:bg-gray-900 rounded-full p-4 shadow-lg">
                  <ShieldCheck className="w-16 h-16 text-primary" />
                </div>
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Secure Your Workspace
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-sm mx-auto">
              NULLID uses zk to verify your work workspace and avoid scams on Telegram.
            </p>
            
            <div className="flex justify-center">
              <VerifyButton onClick={() => setIsModalOpen(true)} />
            </div>
          </div>
        </div>
      </main>
      
      <VerificationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      {!isInTelegram && !isLoading && <TelegramAlert />}
    </div>
  );
}

export default App