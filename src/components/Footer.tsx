
import { Link } from "react-router-dom";
import { Music, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t bg-background py-10">
      <div className="container grid gap-8 px-4 md:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
            <Music className="h-6 w-6" />
            <span className="font-display">Epochouse</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Creating musical masterpieces, one note at a time.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link to="/consultation" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Consultation
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <address className="not-italic text-sm text-muted-foreground space-y-2">
            <p>123 Music Street</p>
            <p>Melody City, MC 12345</p>
            <p className="mt-4">Email: info@epochouse.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </address>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="container px-4 md:px-6 mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
        <p>© {currentYear} Epochouse. All rights reserved.</p>
      </div>
    </footer>
  );
}
