
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
          <Music className="h-6 w-6" />
          <span className="font-display">Epochouse</span>
        </Link>
        
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/services" className="text-sm font-medium transition-colors hover:text-primary">
            Services
          </Link>
          <Link to="/consultation" className="text-sm font-medium transition-colors hover:text-primary">
            Consultation
          </Link>
          <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About Us
          </Link>
          <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Menu"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-sm md:hidden">
          <nav className="container flex flex-col items-center gap-8 p-8 animate-fade-in">
            <Link 
              to="/" 
              className="text-xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className="text-xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/consultation" 
              className="text-xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              Consultation
            </Link>
            <Link 
              to="/about" 
              className="text-xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="text-xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
