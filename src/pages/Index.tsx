
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CycleVisualizer from '@/components/CycleVisualizer';
import SymptomTracker from '@/components/SymptomTracker';
import PeriodPredictor from '@/components/PeriodPredictor';
import CyclePhaseCard from '@/components/CyclePhaseCard';
import { Button } from '@/components/ui/button';
import { CycleData, calculateCyclePhases } from '@/lib/cycleCalculations';
import { CalendarDays, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  // Initial cycle data - in a real app, this would come from a database
  const [cycleData, setCycleData] = useState<CycleData>({
    lastPeriodStart: new Date(new Date().setDate(new Date().getDate() - 10)),
    cycleLength: 28,
    periodLength: 5
  });
  
  const cycleResults = calculateCyclePhases(cycleData);
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Header section */}
        <div className="pt-6 pb-8">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-semibold tracking-tight mb-2">Welcome to PeriodPal</h1>
            <p className="text-muted-foreground">Track your cycle, understand your body, and take control of your health.</p>
          </div>
          
          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="glass-card flex items-center p-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="mr-4 h-12 w-12 rounded-full bg-app-lavender/20 flex items-center justify-center">
                <CalendarDays className="h-6 w-6 text-app-lavender" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Current Cycle Day</p>
                <p className="font-medium text-lg">Day {new Date().getDate() - cycleData.lastPeriodStart.getDate() + 1}</p>
              </div>
            </div>
            
            <div className="glass-card p-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-muted-foreground text-sm">Next Period</p>
              <p className="font-medium text-lg">
                In {cycleResults.daysUntilNextPeriod} days
              </p>
            </div>
            
            <div className="glass-card p-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <p className="text-muted-foreground text-sm">Cycle Length</p>
              <p className="font-medium text-lg">{cycleData.cycleLength} days</p>
            </div>
            
            <div className="glass-card p-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <p className="text-muted-foreground text-sm">Period Length</p>
              <p className="font-medium text-lg">{cycleData.periodLength} days</p>
            </div>
          </div>
        </div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <CycleVisualizer cycleData={cycleData} />
            
            <div className="glass-card animate-enter" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Cycle Phases</h3>
                <Link to="/calendar">
                  <Button variant="ghost" size="sm" className="text-primary">
                    <span>View Calendar</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cycleResults.allPhases.map((phase, index) => (
                  <CyclePhaseCard 
                    key={index} 
                    phase={phase} 
                    isActive={phase.name === cycleResults.currentPhase.name} 
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column */}
          <div className="space-y-6">
            <SymptomTracker />
            <PeriodPredictor cycleData={cycleData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
