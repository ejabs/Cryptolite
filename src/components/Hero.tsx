
import { ArrowRight, ExternalLink, Headphones, ShoppingBag, Music } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80')",
          backgroundBlendMode: "overlay"
        }}
      />
      
      {/* Background overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-0" />
      
      {/* Animated circles */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container relative z-10 px-4 py-24 md:py-32 lg:py-40 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight font-display sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Where Musical<br />Dreams Come Alive
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Elevate your sound with our professional music production services. From studio sessions to live performances, 
            we bring your vision to life.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link to="/consultation" className="flex items-center gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link to="/services">
                Explore Services
              </Link>
            </Button>
          </div>
          
          {/* Platform links */}
          <div className="mt-12">
            <p className="text-sm text-muted-foreground mb-4">Find us on</p>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <a href="https://www.fiverr.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <span>Fiverr</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a href="https://www.airgigs.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <Music className="h-5 w-5 text-primary" />
                <span>AirGigs</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a href="https://www.soundbetter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <Headphones className="h-5 w-5 text-primary" />
                <span>SoundBetter</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
