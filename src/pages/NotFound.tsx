
import { ArrowLeft, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-16rem)] flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Music className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold font-display">Page Not Found</h1>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        <Button asChild size="lg">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>
    </main>
  );
}
