import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Phone, ChevronRight, ArrowLeft, Sparkles, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleSendOTP = () => {
    if (phoneNumber.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
      if (index === 5 && value) {
        setTimeout(() => navigate('/home'), 500);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  if (otpSent) {
    return (
      <div className="min-h-screen flex flex-col px-6 py-12 relative overflow-hidden">
        <div className="orb w-48 h-48 bg-primary/15 -top-10 -right-10" />
        <button
          onClick={() => setOtpSent(false)}
          className="w-12 h-12 rounded-xl glass-card flex items-center justify-center mb-8 touch-feedback"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="flex-1 relative z-10">
          <h1 className="text-2xl font-bold text-gradient mb-2">Verify your number</h1>
          <p className="text-muted-foreground mb-8">We sent a code to +1 {phoneNumber}</p>

          <div className="flex gap-3 justify-center mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 glass-card border-2 border-white/10 rounded-xl text-center text-xl font-bold text-foreground focus:border-primary focus:outline-none transition-all"
              />
            ))}
          </div>

          <div className="text-center">
            <button className="text-primary text-sm touch-feedback font-medium">Resend code</button>
          </div>
        </div>

        <div className="glass-card p-4 flex items-start gap-3 relative z-10">
          <Lock size={22} className="text-primary flex-shrink-0" />
          <p className="text-sm text-muted-foreground">Your number is encrypted and only used for emergency verification.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 relative overflow-hidden">
      <div className="orb w-64 h-64 bg-primary/15 -top-20 -left-20" />
      <div className="orb w-40 h-40 bg-accent/10 bottom-20 -right-10" />

      <div className="flex items-center gap-3 mb-12 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/40 to-accent/30 flex items-center justify-center">
          <Shield size={30} className="text-primary" />
        </div>
        <span className="text-2xl font-bold text-gradient">SafeRoute</span>
      </div>

      <div className="flex-1 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={18} className="text-warning" />
          <span className="text-sm text-warning font-medium">Secure login</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
        <p className="text-muted-foreground mb-8">Enter your phone number to continue</p>

        <div className="glass-card p-4 flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
            <Phone size={22} className="text-primary" />
          </div>
          <div className="flex-1">
            <label className="text-xs text-muted-foreground block mb-1">Phone Number</label>
            <div className="flex items-center gap-2">
              <span className="text-foreground font-medium">+1</span>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="(555) 000-0000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                className="flex-1 bg-transparent text-foreground text-lg font-medium outline-none placeholder:text-muted-foreground/50"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSendOTP}
          disabled={phoneNumber.length < 10}
          className="w-full btn-gradient text-primary-foreground py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 touch-feedback disabled:opacity-50"
        >
          Continue
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="glass-card p-4 flex items-start gap-3 relative z-10">
        <Shield size={22} className="text-primary flex-shrink-0" />
        <p className="text-sm text-muted-foreground">Your safety is our priority. We use bank-level encryption to protect your information.</p>
      </div>
    </div>
  );
};

export default Login;
