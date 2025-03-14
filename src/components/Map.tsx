
import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { getMockHealthcareLocations } from '@/lib/cycleCalculations';

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const locations = getMockHealthcareLocations();
  
  useEffect(() => {
    // In a real implementation, this would initialize a map library like Google Maps or Mapbox
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="glass-card h-full animate-enter">
      <h3 className="text-lg font-semibold mb-3">Nearby Healthcare Locations</h3>
      
      <div className="rounded-lg overflow-hidden bg-app-mist h-64 relative mb-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div ref={mapRef} className="h-full">
            {/* This would be replaced with actual map implementation */}
            <div className="h-full relative bg-app-mist">
              <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                Map functionality would be implemented with Google Maps or Mapbox
              </div>
              
              {/* Static map pins illustration */}
              {locations.map((location, i) => (
                <div 
                  key={i}
                  className="absolute animate-pulse-gentle"
                  style={{ 
                    left: `${15 + (i * 15)}%`, 
                    top: `${30 + (i % 3) * 20}%`,
                    animationDelay: `${i * 0.2}s` 
                  }}
                >
                  <MapPin className="text-primary" size={28} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        {locations.map((location) => (
          <div key={location.id} className="flex items-start p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
            <div className="flex-shrink-0 mr-3">
              <div className="h-8 w-8 rounded-full bg-app-lavender/20 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-app-lavender" />
              </div>
            </div>
            <div className="flex-grow">
              <div className="font-medium">{location.name}</div>
              <div className="text-sm text-muted-foreground">{location.address}</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs bg-app-lavender/10 text-app-lavender py-1 px-2 rounded-full">
                  {location.type}
                </span>
                <span className="text-xs">{location.distance}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Map;
