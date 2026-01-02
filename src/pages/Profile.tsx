import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Phone,
  MapPin,
  Bell,
  Shield,
  ChevronRight,
  HelpCircle,
  Lock,
  LogOut,
  Check,
  X,
  Sparkles,
  Settings,
  Crown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import BottomNav from '@/components/BottomNav';

interface ToggleItemProps {
  icon: React.ElementType;
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  iconColor?: string;
  iconBg?: string;
}

const ToggleItem = ({ icon: Icon, label, description, enabled, onToggle, iconColor = 'text-primary', iconBg = 'from-primary/30 to-primary/10' }: ToggleItemProps) => (
  <div className="glass-card p-4 flex items-center gap-4 interactive-card">
    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${iconBg} flex items-center justify-center`}>
      <Icon size={22} className={iconColor} />
    </div>
    <div className="flex-1">
      <h3 className="font-medium text-foreground">{label}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    <button
      onClick={onToggle}
      className={cn(
        'w-14 h-8 rounded-full transition-all duration-300 flex items-center px-1',
        enabled 
          ? 'bg-gradient-to-r from-primary to-accent' 
          : 'bg-muted'
      )}
    >
      <div
        className={cn(
          'w-6 h-6 rounded-full bg-white shadow-lg transition-all duration-300',
          enabled ? 'translate-x-6' : 'translate-x-0'
        )}
      />
    </button>
  </div>
);

interface PermissionItemProps {
  label: string;
  granted: boolean;
}

const PermissionItem = ({ label, granted }: PermissionItemProps) => (
  <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
    <span className="text-sm text-foreground">{label}</span>
    <div className={cn(
      'w-7 h-7 rounded-full flex items-center justify-center',
      granted 
        ? 'bg-gradient-to-br from-primary/30 to-primary/10' 
        : 'bg-gradient-to-br from-destructive/30 to-destructive/10'
    )}>
      {granted ? (
        <Check size={14} className="text-primary" />
      ) : (
        <X size={14} className="text-destructive" />
      )}
    </div>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    autoCall: true,
    shareLiveLocation: true,
    nearbyAlerts: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="orb w-48 h-48 bg-primary/15 -top-10 -right-10" />
      <div className="orb w-32 h-32 bg-purple/10 bottom-40 left-0" />
      
      {/* Header */}
      <div className="relative z-10 px-4 pt-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gradient">Profile</h1>
          <button className="w-10 h-10 rounded-full glass-card flex items-center justify-center touch-feedback">
            <Settings size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* User Card */}
        <div className="glass-card p-5 interactive-card">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-18 h-18 w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-primary/40 to-accent/30 flex items-center justify-center">
                <User size={36} className="text-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-warning to-warning/80 flex items-center justify-center">
                <Crown size={12} className="text-warning-foreground" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">Sarah Johnson</h2>
              <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">Premium</span>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center touch-feedback">
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Safety Settings */}
      <div className="px-4 py-6 relative z-10">
        <h2 className="section-title text-foreground mb-4 flex items-center gap-2">
          <Shield size={18} className="text-primary" />
          Safety Settings
        </h2>
        <div className="space-y-3">
          <ToggleItem
            icon={Phone}
            label="Auto-call on SOS"
            description="Automatically call first contact"
            enabled={settings.autoCall}
            onToggle={() => toggleSetting('autoCall')}
            iconColor="text-primary"
            iconBg="from-primary/30 to-primary/10"
          />
          <ToggleItem
            icon={MapPin}
            label="Share live location"
            description="Share location with contacts during SOS"
            enabled={settings.shareLiveLocation}
            onToggle={() => toggleSetting('shareLiveLocation')}
            iconColor="text-accent"
            iconBg="from-accent/30 to-accent/10"
          />
          <ToggleItem
            icon={Bell}
            label="Nearby safety alerts"
            description="Get notified of incidents nearby"
            enabled={settings.nearbyAlerts}
            onToggle={() => toggleSetting('nearbyAlerts')}
            iconColor="text-warning"
            iconBg="from-warning/30 to-warning/10"
          />
        </div>
      </div>

      {/* Permissions */}
      <div className="px-4 py-2 relative z-10">
        <h2 className="section-title text-foreground mb-4 flex items-center gap-2">
          <Sparkles size={18} className="text-warning" />
          Permissions
        </h2>
        <div className="glass-card p-4">
          <PermissionItem label="Location" granted={true} />
          <PermissionItem label="Notifications" granted={true} />
          <PermissionItem label="Camera" granted={true} />
          <PermissionItem label="Microphone" granted={false} />
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-4 py-4 relative z-10">
        <h2 className="section-title text-foreground mb-4">More</h2>
        <div className="space-y-2">
          <button
            onClick={() => navigate('/contacts')}
            className="w-full glass-card p-4 flex items-center gap-4 touch-feedback interactive-card"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Shield size={18} className="text-primary" />
            </div>
            <span className="flex-1 text-left text-foreground font-medium">Emergency Contacts</span>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
          <button className="w-full glass-card p-4 flex items-center gap-4 touch-feedback interactive-card">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple/20 to-purple/5 flex items-center justify-center">
              <Lock size={18} className="text-purple" />
            </div>
            <span className="flex-1 text-left text-foreground font-medium">Privacy Settings</span>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
          <button className="w-full glass-card p-4 flex items-center gap-4 touch-feedback interactive-card">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
              <HelpCircle size={18} className="text-accent" />
            </div>
            <span className="flex-1 text-left text-foreground font-medium">Help & Support</span>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
          <button className="w-full glass-card p-4 flex items-center gap-4 touch-feedback interactive-card group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-destructive/20 to-destructive/5 flex items-center justify-center">
              <LogOut size={18} className="text-destructive" />
            </div>
            <span className="flex-1 text-left text-destructive font-medium">Log Out</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
