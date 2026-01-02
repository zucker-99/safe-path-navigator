import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, MapPin, Users, ChevronRight, Bell, Camera, Mic, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    icon: MapPin,
    title: 'Safe Routes',
    description: 'Navigate through well-lit, crowded streets. We analyze real-time safety data to guide you home safely.',
    gradient: 'from-primary/30 to-accent/20',
    iconColor: 'text-primary',
    accentOrb: 'bg-primary/20',
  },
  {
    icon: Shield,
    title: 'SOS Protection',
    description: 'One tap alerts your emergency contacts, shares your live location, and connects you with help instantly.',
    gradient: 'from-destructive/30 to-pink/20',
    iconColor: 'text-destructive',
    accentOrb: 'bg-destructive/20',
  },
  {
    icon: Users,
    title: 'Community Safety',
    description: 'Report unsafe areas and help other women stay safe. Together, we create safer neighborhoods.',
    gradient: 'from-warning/30 to-warning/10',
    iconColor: 'text-warning',
    accentOrb: 'bg-warning/20',
  },
];

const permissions = [
  { icon: MapPin, label: 'Location', description: 'To show safe routes and share location in emergencies', color: 'text-primary', bg: 'from-primary/30 to-primary/10' },
  { icon: Bell, label: 'Notifications', description: 'To alert you about nearby safety concerns', color: 'text-accent', bg: 'from-accent/30 to-accent/10' },
  { icon: Camera, label: 'Camera', description: 'To capture evidence when reporting unsafe areas', color: 'text-warning', bg: 'from-warning/30 to-warning/10' },
  { icon: Mic, label: 'Microphone', description: 'For voice-activated SOS in emergencies', color: 'text-purple', bg: 'from-purple/30 to-purple/10' },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPermissions, setShowPermissions] = useState(false);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowPermissions(true);
    }
  };

  const handleComplete = () => {
    navigate('/login');
  };

  if (showPermissions) {
    return (
      <div className="min-h-screen flex flex-col px-6 py-12 safe-area-inset relative overflow-hidden">
        {/* Background Orbs */}
        <div className="orb w-48 h-48 bg-primary/15 -top-10 -right-10" />
        <div className="orb w-32 h-32 bg-accent/10 bottom-20 -left-10" />
        
        <div className="flex-1 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={20} className="text-warning" />
            <span className="text-sm text-warning font-medium">Almost there</span>
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Enable Permissions
          </h1>
          <p className="text-muted-foreground mb-8">
            These permissions help keep you safe
          </p>

          <div className="space-y-4">
            {permissions.map((perm, index) => {
              const Icon = perm.icon;
              return (
                <div
                  key={perm.label}
                  className="glass-card p-4 flex items-start gap-4 fade-in interactive-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${perm.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={26} className={perm.color} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-lg">{perm.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{perm.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleComplete}
          className="w-full btn-gradient text-primary-foreground py-4 rounded-2xl font-semibold text-lg touch-feedback mt-8 relative z-10"
        >
          Continue
        </button>
      </div>
    );
  }

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Orbs */}
      <div className={cn('orb w-72 h-72 -top-20 -left-20 transition-all duration-700', slide.accentOrb)} />
      <div className={cn('orb w-48 h-48 bottom-40 -right-10 transition-all duration-700', slide.accentOrb)} style={{ animationDelay: '2s' }} />
      
      {/* Skip button */}
      <div className="flex justify-end p-6 relative z-10">
        <button
          onClick={() => navigate('/login')}
          className="text-muted-foreground text-sm touch-feedback px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center relative z-10">
        {/* Decorative Stars */}
        <div className="absolute top-10 left-10 text-primary/30">
          <Star size={16} fill="currentColor" />
        </div>
        <div className="absolute top-20 right-16 text-warning/30">
          <Star size={12} fill="currentColor" />
        </div>
        <div className="absolute bottom-32 left-8 text-accent/30">
          <Star size={14} fill="currentColor" />
        </div>
        
        {/* Icon */}
        <div className={cn(
          'w-36 h-36 rounded-3xl flex items-center justify-center mb-8 animate-float bg-gradient-to-br shadow-xl',
          slide.gradient
        )}>
          <Icon size={70} className={slide.iconColor} />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-foreground mb-4">{slide.title}</h1>

        {/* Description */}
        <p className="text-muted-foreground text-lg leading-relaxed max-w-xs">
          {slide.description}
        </p>
      </div>

      {/* Bottom navigation */}
      <div className="p-6 relative z-10">
        {/* Dots */}
        <div className="flex justify-center gap-3 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                'h-2.5 rounded-full transition-all duration-300',
                index === currentSlide 
                  ? 'w-10 bg-gradient-to-r from-primary to-accent' 
                  : 'w-2.5 bg-muted hover:bg-muted-foreground/50'
              )}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="w-full btn-gradient text-primary-foreground py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 touch-feedback"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
