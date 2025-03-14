
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Map from '@/components/Map';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Phone, Building, Clock, Star } from 'lucide-react';
import { getMockHealthcareLocations } from '@/lib/cycleCalculations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const LocatorPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  
  const locations = getMockHealthcareLocations();
  
  // Filter locations based on search query and selected type
  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          location.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || location.type.toLowerCase() === selectedType.toLowerCase();
    
    return matchesSearch && matchesType;
  });
  
  // Sort locations based on selected sort option
  const sortedLocations = [...filteredLocations].sort((a, b) => {
    if (sortBy === 'distance') {
      return parseFloat(a.distance) - parseFloat(b.distance);
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="pt-6 pb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-4 animate-fade-in">Healthcare Locator</h1>
          <p className="text-muted-foreground animate-fade-in">Find nearby hospitals, clinics, and healthcare providers for your reproductive health needs.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search and filters column */}
          <div className="space-y-6">
            <div className="glass-card animate-enter">
              <h3 className="text-lg font-semibold mb-4">Find Healthcare</h3>
              
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input 
                    type="text" 
                    placeholder="Search hospitals, clinics..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Type</label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="hospital">Hospitals</SelectItem>
                        <SelectItem value="clinic">Clinics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Distance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="distance">Distance</SelectItem>
                        <SelectItem value="name">Name (A-Z)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button className="w-full">
                  <MapPin className="mr-2 h-4 w-4" />
                  Use Current Location
                </Button>
              </div>
            </div>
            
            <div className="glass-card animate-enter">
              <h3 className="text-lg font-semibold mb-4">Healthcare Types</h3>
              
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-app-lavender/20 border border-app-lavender/30">
                  <h4 className="font-medium mb-1">OB-GYN Clinics</h4>
                  <p className="text-sm">Specialized healthcare for women's reproductive health, pregnancy, and childbirth.</p>
                </div>
                
                <div className="p-3 rounded-lg bg-app-teal/20 border border-app-teal/30">
                  <h4 className="font-medium mb-1">General Hospitals</h4>
                  <p className="text-sm">Full-service medical facilities with emergency care and multiple departments.</p>
                </div>
                
                <div className="p-3 rounded-lg bg-app-peach/20 border border-app-peach/30">
                  <h4 className="font-medium mb-1">Women's Health Centers</h4>
                  <p className="text-sm">Comprehensive care focused on women's unique health needs across all life stages.</p>
                </div>
                
                <div className="p-3 rounded-lg bg-app-blush/20 border border-app-blush/30">
                  <h4 className="font-medium mb-1">Family Planning Clinics</h4>
                  <p className="text-sm">Services related to contraception, pregnancy testing, and reproductive health education.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map and results column */}
          <div className="lg:col-span-2 space-y-6">
            <Map />
            
            <div className="glass-card animate-enter">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Nearby Locations</h3>
                <span className="text-sm text-muted-foreground">{sortedLocations.length} results</span>
              </div>
              
              <div className="space-y-4">
                {sortedLocations.map((location) => (
                  <div key={location.id} className="border border-muted rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-3/4 p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-3">
                            <div className="h-10 w-10 rounded-full bg-app-lavender/20 flex items-center justify-center">
                              {location.type === 'Hospital' ? (
                                <Building className="h-5 w-5 text-app-lavender" />
                              ) : (
                                <MapPin className="h-5 w-5 text-app-lavender" />
                              )}
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">{location.name}</h4>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                              {location.address}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Phone className="h-3.5 w-3.5 mr-1" />
                              {location.phone}
                            </div>
                            <div className="flex items-center mt-2">
                              <span className="bg-app-lavender/10 text-app-lavender text-xs py-1 px-2 rounded-full">
                                {location.type}
                              </span>
                              <span className="text-xs ml-2 flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                Open now
                              </span>
                              <span className="text-xs ml-2 flex items-center">
                                <Star className="h-3.5 w-3.5 mr-1 text-amber-400" />
                                4.8
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-1/4 bg-muted/30 p-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-muted">
                        <div className="text-center md:text-right">
                          <span className="text-sm font-medium">{location.distance}</span>
                        </div>
                        <div className="flex mt-3 md:justify-end">
                          <Button size="sm" className="w-full md:w-auto">Get Directions</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {sortedLocations.length === 0 && (
                  <div className="text-center py-8">
                    <div className="mx-auto h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                      <Search className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h4 className="font-medium">No results found</h4>
                    <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LocatorPage;
