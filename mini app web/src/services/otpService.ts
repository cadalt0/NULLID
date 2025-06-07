import { create } from 'zustand';

interface OtpStore {
  otp: string | null;
  email: string | null;
  expiryTime: number | null;
  generateOtp: (email: string) => string;
  verifyOtp: (email: string, otp: string) => boolean;
  clearOtp: () => void;
}

const useOtpStore = create<OtpStore>((set, get) => ({
  otp: null,
  email: null,
  expiryTime: null,

  generateOtp: (email: string) => {
    // Generate 6 random digits
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTime = Date.now() + 3 * 60 * 1000; // 3 minutes from now

    set({ otp, email, expiryTime });

    // Log OTP to terminal for testing
    console.log(`\n=== OTP for ${email} ===`);
    console.log(`Code: ${otp}`);
    console.log(`Expires in: 3 minutes\n`);

    return otp;
  },

  verifyOtp: (email: string, otp: string) => {
    const { otp: storedOtp, email: storedEmail, expiryTime } = get();

    // Check if OTP exists and hasn't expired
    if (!storedOtp || !storedEmail || !expiryTime) {
      return false;
    }

    // Check if OTP has expired
    if (Date.now() > expiryTime) {
      set({ otp: null, email: null, expiryTime: null });
      return false;
    }

    // Verify email and OTP match
    return storedEmail === email && storedOtp === otp;
  },

  clearOtp: () => {
    set({ otp: null, email: null, expiryTime: null });
  },
}));

export default useOtpStore; 