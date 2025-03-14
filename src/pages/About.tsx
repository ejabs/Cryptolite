import { ArrowRight, Headphones, Music, Heart, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="py-20">
      {/* Hero Section */}
      <section className="container px-4 md:px-6 mb-20">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl font-bold font-display md:text-5xl lg:text-6xl">Our Story</h1>
            <p className="mt-4 text-xl text-muted-foreground">
              From humble beginnings to industry recognition, discover the journey of Epochouse.
            </p>
          </div>
          <div className="aspect-video overflow-hidden rounded-xl bg-muted">
            <img 
              src="/placeholder.svg" 
              alt="About Epochouse" 
              className="object-cover w-full h-full animate-fade-in"
            />
          </div>
        </div>
      </section>
      
      {/* Our Journey Section */}
      <section className="bg-muted/30 py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative lg:order-last">
              <div className="aspect-square overflow-hidden rounded-xl bg-muted">
                <img 
                  src="/placeholder.svg" 
                  alt="Our Journey" 
                  className="object-cover w-full h-full animate-fade-in"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full hidden lg:block" />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-display">Our Journey</h2>
              <p className="text-muted-foreground">
                Epochouse was founded in 2015 by producer and musician Daniel Johnson with a simple mission: to create a space where artists could bring their musical visions to life without compromise.
              </p>
              <p className="text-muted-foreground">
                What began as a small home studio with limited equipment quickly evolved as word spread about our unique approach to music production. By focusing on the artist's creative vision and providing honest, constructive feedback, we built a reputation for excellence in the local scene.
              </p>
              <p className="text-muted-foreground">
                In 2018, we expanded into our current facility, allowing us to offer a wider range of services including live recording, session musicians, and show production. Today, Epochouse is proud to work with both emerging talents and established artists across multiple genres.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold font-display">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Epochouse.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Music className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Musical Integrity</h3>
              <p className="text-muted-foreground">
                We believe in preserving the authentic voice of each artist while enhancing their sound with our technical expertise.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sound Quality</h3>
              <p className="text-muted-foreground">
                We never compromise on sound quality, investing in the best equipment and continuously refining our techniques.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Passion</h3>
              <p className="text-muted-foreground">
                Our team brings genuine enthusiasm to every project, treating each one as if it were our own personal creation.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-muted-foreground">
                We believe the best results come from true partnership between our team and the artists we work with.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="bg-muted/30 py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold font-display">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The talented professionals who make the magic happen at Epochouse.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
              <div className="aspect-[4/3] bg-muted">
                <img 
                  src="/placeholder.svg" 
                  alt="Daniel Johnson" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">Daniel Johnson</h3>
                <p className="text-sm text-primary mb-2">Founder & Creative Director</p>
                <p className="text-muted-foreground text-sm">
                  With 15+ years of industry experience, Daniel has worked with Grammy-winning artists and produced chart-topping hits.
                </p>
              </div>
            </div>
            
            <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
              <div className="aspect-[4/3] bg-muted">
                <img 
                  src="/placeholder.svg" 
                  alt="Sophia Martinez" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">Sophia Martinez</h3>
                <p className="text-sm text-primary mb-2">Lead Sound Engineer</p>
                <p className="text-muted-foreground text-sm">
                  Sophia's ear for detail and technical expertise ensure every project meets our high standards for sound quality.
                </p>
              </div>
            </div>
            
            <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
              <div className="aspect-[4/3] bg-muted">
                <img 
                  src="/placeholder.svg" 
                  alt="Marcus Chen" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">Marcus Chen</h3>
                <p className="text-sm text-primary mb-2">Music Producer</p>
                <p className="text-muted-foreground text-sm">
                  Marcus brings versatility and innovation to our production team, with expertise across multiple genres.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Achievements Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold font-display mb-6">Our Achievements</h2>
              <p className="text-muted-foreground mb-8">
                Over the years, we've had the privilege of contributing to numerous successful projects and receiving recognition for our work.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Industry Recognition</h3>
                    <p className="text-sm text-muted-foreground">
                      Multiple projects produced at Epochouse have received industry awards and nominations, including three Gold Records.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Client Success</h3>
                    <p className="text-sm text-muted-foreground">
                      We've helped launch the careers of over 50 emerging artists, with many going on to sign with major labels.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Community Impact</h3>
                    <p className="text-sm text-muted-foreground">
                      Our annual scholarship program has provided studio time and mentorship to 25 talented artists from underrepresented communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video overflow-hidden rounded-xl bg-muted">
                <img 
                  src="/placeholder.svg" 
                  alt="Our Achievements" 
                  className="object-cover w-full h-full animate-fade-in"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full hidden lg:block" />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-muted/50 py-20">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold font-display mb-4">Ready to Create with Us?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Let's turn your musical vision into reality. Contact us today to discuss your project or book a consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/consultation" className="flex items-center gap-2">
                Book a Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
