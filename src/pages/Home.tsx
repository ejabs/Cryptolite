
import Hero from "@/components/Hero";
import ServiceCarousel from "@/components/ServiceCarousel";
import DirectorProfile from "@/components/DirectorProfile";
import VideoSection from "@/components/VideoSection";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-3xl font-bold font-display md:text-4xl">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover how we can help bring your musical vision to life with our professional services.
            </p>
          </div>
          
          <ServiceCarousel />
        </div>
      </section>
      
      <DirectorProfile />
      
      <VideoSection />
    </main>
  );
}
