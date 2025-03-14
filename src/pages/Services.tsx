
import {
  Music,
  Mic,
  Headphones,
  Users,
  Speaker,
  Video,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    id: "production",
    title: "Music Production",
    description: "Our music production services encompass everything from concept development to final delivery. We work closely with artists to understand their vision and bring it to life with our state-of-the-art equipment and experienced team.",
    longDescription: "Whether you're looking to produce a single track or a full album, our team handles every aspect of the production process. We start with pre-production planning, move through recording, and finish with post-production. Our producers have worked across genres including pop, rock, hip-hop, R&B, electronic, and classical music.",
    icon: <Music className="h-10 w-10" />,
    features: [
      "Songwriting and arrangement assistance",
      "Instrumental production and beat making",
      "Vocal production and editing",
      "Sound design and synthesizer programming",
      "Remote and in-studio production options"
    ]
  },
  {
    id: "musicians",
    title: "Session Musicians",
    description: "Enhance your recordings with our roster of professional session musicians. From strings to brass, keyboard to percussion, we provide skilled instrumentalists to add depth and authenticity to your music.",
    longDescription: "Our network includes some of the industry's most versatile and experienced session players. Each musician brings years of recording experience and a keen ear for what makes a track stand out. Whether you need a subtle piano part or a full string arrangement, our session musicians deliver performances that elevate your music.",
    icon: <Users className="h-10 w-10" />,
    features: [
      "Strings, brass, and woodwind sections",
      "Guitar, bass, and keyboard specialists",
      "Percussionists and drummers",
      "Remote recording options",
      "Customized arrangements for your project"
    ]
  },
  {
    id: "singers",
    title: "Background Singers",
    description: "Our professional background vocalists add richness and harmony to your tracks. With experience across multiple genres, they provide the perfect complement to lead vocals.",
    longDescription: "The right backing vocals can transform a good track into a great one. Our background singers understand how to blend with lead vocals while adding texture and depth. They're experienced in creating harmonies that enhance your music without overpowering the main vocal performance.",
    icon: <Mic className="h-10 w-10" />,
    features: [
      "Solo and group vocal arrangements",
      "Harmony development and vocal stacking",
      "Genre-specific vocal styling",
      "Ad-libs and vocal effects",
      "Male and female vocalists available"
    ]
  },
  {
    id: "mixing",
    title: "Mixing & Mastering",
    description: "Perfect your sound with our professional mixing and mastering services. We balance all elements of your track and optimize it for release across all platforms and formats.",
    longDescription: "Our mixing engineers use a combination of technical expertise and artistic sensibility to blend all the elements of your music into a cohesive whole. After mixing, our mastering process ensures your music sounds its best on any playback system, from smartphone speakers to club sound systems.",
    icon: <Headphones className="h-10 w-10" />,
    features: [
      "Detailed EQ and dynamic processing",
      "Spatial enhancement and depth creation",
      "Stem mixing options",
      "Reference matching",
      "Format-specific masters for streaming, vinyl, and CD"
    ]
  },
  {
    id: "show",
    title: "Show Production",
    description: "From intimate venues to large festivals, our show production services ensure your live performances captivate audiences with pristine sound and professional staging.",
    longDescription: "Live music experiences require careful planning and execution. Our show production team handles everything from initial concept through to the final note. We work with venues of all sizes to create memorable performances that align with your artistic vision while managing technical requirements.",
    icon: <Speaker className="h-10 w-10" />,
    features: [
      "Venue acoustics assessment",
      "Sound system design and setup",
      "Lighting design",
      "Stage plot and technical rider creation",
      "Live sound engineering"
    ]
  },
  {
    id: "live",
    title: "Live Recording",
    description: "Capture the energy and atmosphere of your live performances with our professional recording services, perfect for live albums, video content, or archival purposes.",
    longDescription: "There's something special about a live performance that studio recordings can't always capture. Our live recording services preserve those magical moments with multi-track recordings that can be mixed and mastered to professional standards. We use discreet equipment setups that don't interfere with the performance or audience experience.",
    icon: <Video className="h-10 w-10" />,
    features: [
      "Multi-track live recording",
      "Audience microphone placement",
      "Mobile recording rig",
      "Post-production mixing and editing",
      "Video recording coordination"
    ]
  }
];

export default function Services() {
  return (
    <main className="py-20">
      <section className="container px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-bold font-display md:text-5xl lg:text-6xl">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive music production services to help you create, perfect, and share your sound with the world.
          </p>
        </div>
        
        <div className="space-y-32">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              id={service.id}
              className="scroll-mt-20"
            >
              <div className={`grid gap-12 lg:grid-cols-2 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div>
                  <div className="mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl font-bold font-display mb-4">{service.title}</h2>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <p className="text-muted-foreground mb-8">
                    {service.longDescription}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="mr-3 mt-1 w-5 h-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild>
                    <Link to="/consultation" className="flex items-center gap-2">
                      I'm Interested <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className={`aspect-video overflow-hidden rounded-xl bg-muted ${index % 2 === 1 ? 'lg:order-first' : ''}`}>
                  <img 
                    src="/placeholder.svg" 
                    alt={service.title} 
                    className="object-cover w-full h-full animate-fade-in"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
