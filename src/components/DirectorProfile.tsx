
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function DirectorProfile() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="lg:order-last">
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-xl bg-muted">
                <img 
                  src="/placeholder.svg" 
                  alt="Creative Director" 
                  className="object-cover w-full h-full animate-fade-in"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full hidden lg:block" />
            </div>
          </div>
          
          <div className="space-y-5">
            <h3 className="text-sm tracking-wide text-primary uppercase font-medium">Creative Director</h3>
            <h2 className="text-3xl font-bold font-display md:text-4xl lg:text-5xl">Daniel Johnson</h2>
            <p className="text-muted-foreground">
              With over 15 years of experience in the music industry, Daniel has worked with Grammy-winning artists 
              and produced chart-topping hits. His unique approach to music production combines traditional techniques 
              with cutting-edge technology, creating sounds that are both familiar and innovative.
            </p>
            <p className="text-muted-foreground">
              As the founder of Epochouse, Daniel's vision is to create a collaborative space where artists can 
              bring their musical ideas to life, supported by a team of talented professionals and state-of-the-art equipment.
            </p>
            <Button asChild className="mt-4">
              <Link to="/about" className="flex items-center gap-2">
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
