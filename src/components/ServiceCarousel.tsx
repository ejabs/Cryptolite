
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Mic, Music, Headphones, Speaker, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";

export default function ServiceCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (!scrollRef.current) return;
    
    setCanScrollLeft(scrollRef.current.scrollLeft > 0);
    setCanScrollRight(
      scrollRef.current.scrollLeft <
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
    );
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      // Initial check
      checkScrollButtons();
      // Check on window resize
      window.addEventListener("resize", checkScrollButtons);
    }
    
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollButtons);
      }
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const services = [
    {
      title: "Music Production",
      description: "Transform your musical ideas into professional tracks with our cutting-edge production services.",
      icon: <Music className="h-6 w-6" />,
      href: "/services#production",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80"
    },
    {
      title: "Session Musicians",
      description: "Enhance your recordings with our talented pool of professional session musicians.",
      icon: <Users className="h-6 w-6" />,
      href: "/services#musicians",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80"
    },
    {
      title: "Background Singers",
      description: "Add depth and harmony to your music with our experienced background vocalists.",
      icon: <Mic className="h-6 w-6" />,
      href: "/services#singers",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
    },
    {
      title: "Mixing & Mastering",
      description: "Perfect your sound with our professional mixing and mastering services.",
      icon: <Headphones className="h-6 w-6" />,
      href: "/services#mixing",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80"
    },
    {
      title: "Show Production",
      description: "Create memorable live performances with our comprehensive show production services.",
      icon: <Speaker className="h-6 w-6" />,
      href: "/services#show",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80"
    },
    {
      title: "Live Recording",
      description: "Capture the magic of your live performances with our high-quality recording services.",
      icon: <Video className="h-6 w-6" />,
      href: "/services#live",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="relative">
      <div 
        className="flex overflow-x-auto scrollbar-none scroll-smooth py-4 px-1 gap-6 hide-scrollbar" 
        ref={scrollRef}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.map((service, index) => (
          <div key={index} className="flex-none w-[300px]">
            <ServiceCard {...service} />
          </div>
        ))}
      </div>
      
      <div className="absolute top-1/2 -left-5 -translate-y-1/2 hidden md:block">
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full shadow-md ${!canScrollLeft ? 'opacity-0' : 'opacity-100'}`}
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Scroll left</span>
        </Button>
      </div>
      
      <div className="absolute top-1/2 -right-5 -translate-y-1/2 hidden md:block">
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full shadow-md ${!canScrollRight ? 'opacity-0' : 'opacity-100'}`}
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Scroll right</span>
        </Button>
      </div>
    </div>
  );
}
