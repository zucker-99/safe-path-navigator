import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, Navigation, Sparkles } from 'lucide-react';
import MapPlaceholder from '@/components/MapPlaceholder';
import BottomSheet from '@/components/BottomSheet';
import RouteCard from '@/components/RouteCard';
import SOSButton from '@/components/SOSButton';
import BottomNav from '@/components/BottomNav';
import { mockRoutes } from '@/mock/data';
import type { Route } from '@/mock/data';

const MapScreen = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [showRoutes, setShowRoutes] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  const handleSearch = () => {
    if (destination.trim()) {
      setShowRoutes(true);
      setSelectedRoute(mockRoutes[0]); // Default to safest
    }
  };

  const handleStartNavigation = () => {
    if (selectedRoute) {
      navigate('/navigation', { state: { route: selectedRoute } });
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Map */}
      <div className="absolute inset-0">
        <MapPlaceholder
          showRiskZones={showRoutes}
          showRoutes={showRoutes}
          selectedRoute={selectedRoute?.type}
        />
      </div>

      {/* Search Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 pt-10">
        <div className="glass-card p-3 flex items-center gap-3" style={{ background: 'linear-gradient(145deg, hsla(210, 45%, 18%, 0.85) 0%, hsla(207, 55%, 11%, 0.95) 100%)' }}>
          <button
            onClick={() => showRoutes ? setShowRoutes(false) : navigate(-1)}
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-secondary to-muted/50 flex items-center justify-center touch-feedback"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Where are you going?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-11 h-11 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center touch-feedback shadow-glow-teal"
          >
            <Search size={18} className="text-primary-foreground" />
          </button>
        </div>
      </div>

      {/* Floating SOS Button */}
      <div className="absolute top-28 right-4 z-20">
        <SOSButton />
      </div>

      {/* Route Selection Bottom Sheet */}
      {showRoutes && (
        <BottomSheet height="half">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-warning" />
            <h2 className="text-lg font-bold text-foreground">Choose Your Route</h2>
          </div>
          
          <div className="space-y-3 mb-6">
            {mockRoutes.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                isSelected={selectedRoute?.id === route.id}
                onSelect={() => setSelectedRoute(route)}
              />
            ))}
          </div>

          {/* Start Navigation Button */}
          <button
            onClick={handleStartNavigation}
            disabled={!selectedRoute}
            className="w-full btn-gradient text-primary-foreground py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 touch-feedback disabled:opacity-50"
          >
            <Navigation size={20} />
            Start Navigation
          </button>
        </BottomSheet>
      )}

      {!showRoutes && <BottomNav />}
    </div>
  );
};

export default MapScreen;
