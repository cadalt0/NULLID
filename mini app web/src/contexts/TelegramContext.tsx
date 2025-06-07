import React, { createContext, useContext, useEffect, useState } from 'react';

interface TelegramUser {
  id: number | null;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  is_bot?: boolean;
}

interface TelegramContextType {
  user: TelegramUser | null;
  isLoading: boolean;
  error: string | null;
  isInTelegram: boolean;
  telegram: any; // WebApp object
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

export const TelegramProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isInTelegram, setIsInTelegram] = useState<boolean>(false);
  const [telegram, setTelegram] = useState<any>(null);

  useEffect(() => {
    const loadTelegramSDK = () => {
      // Create script element
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-web-app.js';
      script.async = true;
      
      // On script load, try to initialize user data
      script.onload = () => {
        if (window.Telegram && window.Telegram.WebApp) {
          const tg = window.Telegram.WebApp;
          setTelegram(tg);
          setIsInTelegram(true);
          
          try {
            // Get user from Telegram
            const initData = tg.initDataUnsafe;
            if (initData && initData.user) {
              setUser({
                id: initData.user.id,
                username: initData.user.username,
                first_name: initData.user.first_name,
                last_name: initData.user.last_name,
                is_bot: initData.user.is_bot
              });
            }
          } catch (err) {
            console.error('Failed to get user data from Telegram:', err);
          }
        }
        
        // For testing purposes, always set a mock user
        if (!window.Telegram?.WebApp?.initDataUnsafe?.user) {
          setUser({
            id: 12345678,
            username: 'testuser',
            first_name: 'Test',
            last_name: 'User',
            is_bot: false
          });
        }
        
        setIsLoading(false);
      };
      
      // Handle errors
      script.onerror = () => {
        setError('Failed to load Telegram SDK');
        setIsLoading(false);
        setIsInTelegram(false);
      };
      
      document.body.appendChild(script);
    };

    loadTelegramSDK();
  }, []);

  return (
    <TelegramContext.Provider value={{ user, isLoading, error, isInTelegram, telegram }}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = (): TelegramContextType => {
  const context = useContext(TelegramContext);
  if (context === undefined) {
    throw new Error('useTelegram must be used within a TelegramProvider');
  }
  return context;
};

// Add Telegram WebApp types to window
declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}