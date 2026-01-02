import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Clock, ChevronRight, Shield, AlertTriangle, Sparkles, Navigation2, Users } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import SOSButton from '@/components/SOSButton';

const recentDestinations = [
  { id: '1', name: 'Home', address: '123 Oak Street', time: '25 min', icon: '🏠' },
  { id: '2', name: 'Work', address: '456 Business Ave', time: '35 min', icon: '💼' },
  { id: '3', name: "Sarah's Place", address: '789 Friend Lane', time: '15 min', icon: '👩' },
];

const safetyTips = [
  { icon: Shield, text: 'Share your location with trusted contacts before walking at night', type: 'tip' },
  { icon: AlertTriangle, text: '3 unsafe areas reported near your usual route today', type: 'warning' },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="orb w-64 h-64 bg-primary/20 -top-20 -left-20" style={{ animationDelay: '0s' }} />
      <div className="orb w-48 h-48 bg-accent/15 top-40 -right-10" style={{ animationDelay: '2s' }} />
      <div className="orb w-32 h-32 bg-purple/10 bottom-40 left-10" style={{ animationDelay: '4s' }} />

      {/* Header with Gradient */}
      <div className="relative z-10">
        <div className="glass-card mx-4 mt-8 p-6 border-0" style={{ background: 'linear-gradient(145deg, hsla(210, 45%, 18%, 0.7) 0%, hsla(207, 55%, 11%, 0.85) 100%)' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-muted-foreground text-sm flex items-center gap-1">
                <Sparkles size={14} className="text-warning" />
                Good evening
              </p>
              <h1 className="text-2xl font-bold text-gradient mt-1">Stay safe tonight</h1>
            </div>
            <SOSButton size="default" />
          </div>

          {/* Search Bar */}
          <button
            onClick={() => navigate('/map')}
            className="w-full gradient-border rounded-2xl p-4 flex items-center gap-3 touch-feedback"
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Search size={18} className="text-primary" />
            </div>
            <span className="text-muted-foreground text-left flex-1">Where are you going?</span>
            <ChevronRight size={20} className="text-primary" />
          </button>
        </div>
      </div>

      {/* Current Location Card */}
      <div className="px-4 py-4 relative z-10">
        <div className="glass-card p-4 interactive-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center icon-glow">
              <MapPin size={22} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Current Location</h3>
              <p className="text-sm text-muted-foreground">Downtown District, Block A</p>
            </div>
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-primary/25 to-primary/15 text-primary rounded-full border border-primary/30">
              <Shield size={14} />
              <span className="font-medium">Safe Area</span>
            </div>
            <span className="text-muted-foreground">Safety Score: <span className="text-primary font-semibold">85</span></span>
          </div>
        </div>
      </div>

      {/* Safety Tips */}
      <div className="px-4 py-2 relative z-10">
        <div className="space-y-3">
          {safetyTips.map((tip, index) => {
            const Icon = tip.icon;
            const isWarning = tip.type === 'warning';
            return (
              <div
                key={index}
                className={`glass-card p-4 flex items-start gap-3 ${isWarning ? 'border-warning/30' : 'border-primary/20'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isWarning 
                    ? 'bg-gradient-to-br from-warning/30 to-warning/10' 
                    : 'bg-gradient-to-br from-primary/30 to-primary/10'
                }`}>
                  <Icon size={18} className={isWarning ? 'text-warning' : 'text-primary'} />
                </div>
                <p className="text-sm text-muted-foreground flex-1 leading-relaxed">{tip.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Destinations */}
      <div className="px-4 py-4 relative z-10">
        <h2 className="section-title text-foreground mb-4 flex items-center gap-2">
          <Navigation2 size={18} className="text-primary" />
          Recent Destinations
        </h2>
        <div className="space-y-3">
          {recentDestinations.map((dest, index) => (
            <button
              key={dest.id}
              onClick={() => navigate('/map')}
              className="w-full glass-card p-4 flex items-center gap-4 touch-feedback interactive-card text-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-muted/50 flex items-center justify-center text-xl">
                {dest.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">{dest.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{dest.address}</p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 rounded-full">
                <Clock size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{dest.time}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-4 relative z-10">
        <h2 className="section-title text-foreground mb-4 flex items-center gap-2">
          <Sparkles size={18} className="text-warning" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/contacts')}
            className="glass-card p-5 text-left touch-feedback interactive-card group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Users size={22} className="text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-sm">Emergency Contacts</h3>
            <p className="text-xs text-muted-foreground mt-1">4 contacts set</p>
            <div className="mt-3 flex items-center gap-1 text-xs text-primary">
              <span>Manage</span>
              <ChevronRight size={14} />
            </div>
          </button>
          <button
            onClick={() => navigate('/report')}
            className="glass-card p-5 text-left touch-feedback interactive-card group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-warning/30 to-warning/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <AlertTriangle size={22} className="text-warning" />
            </div>
            <h3 className="font-semibold text-foreground text-sm">Report Area</h3>
            <p className="text-xs text-muted-foreground mt-1">Help others stay safe</p>
            <div className="mt-3 flex items-center gap-1 text-xs text-warning">
              <span>Report</span>
              <ChevronRight size={14} />
            </div>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
