
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Video {
  id: string;
  title: string;
  description: string;
}

export default function VideoSection() {
  const [activeTab, setActiveTab] = useState("studio");

  const videos = {
    studio: [
      {
        id: "dQw4w9WgXcQ", // Replace with actual YouTube IDs
        title: "Studio Session: Making the Beat",
        description: "Watch our team create a beat from scratch in this behind-the-scenes studio session."
      },
      {
        id: "dQw4w9WgXcQ", // Replace with actual YouTube IDs
        title: "Vocal Recording Techniques",
        description: "Learn about our approach to capturing the perfect vocal performance."
      }
    ],
    live: [
      {
        id: "dQw4w9WgXcQ", // Replace with actual YouTube IDs
        title: "Live at Melody Hall",
        description: "Highlights from our recent live recording session at Melody Hall."
      },
      {
        id: "dQw4w9WgXcQ", // Replace with actual YouTube IDs
        title: "Concert Production Setup",
        description: "See how we transform a venue for an unforgettable live music experience."
      }
    ]
  };

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl font-bold font-display md:text-4xl">Our Work in Action</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch our team in action as we create music magic in the studio and on stage.
          </p>
        </div>
        
        <Tabs defaultValue="studio" className="w-full max-w-4xl mx-auto" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="studio">Studio Sessions</TabsTrigger>
              <TabsTrigger value="live">Live Performances</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="studio" className="space-y-8">
            {videos.studio.map((video) => (
              <div key={video.id} className="space-y-4">
                <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="border-0"
                  ></iframe>
                </div>
                <h3 className="text-xl font-semibold">{video.title}</h3>
                <p className="text-muted-foreground">{video.description}</p>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="live" className="space-y-8">
            {videos.live.map((video) => (
              <div key={video.id} className="space-y-4">
                <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="border-0"
                  ></iframe>
                </div>
                <h3 className="text-xl font-semibold">{video.title}</h3>
                <p className="text-muted-foreground">{video.description}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
