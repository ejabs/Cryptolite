
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  image?: string;
}

export default function ServiceCard({ title, description, icon, href, image }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/10 h-full flex flex-col">
      {image && (
        <div className="relative w-full h-40 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        </div>
      )}
      <CardHeader className="p-6">
        <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-sm mt-2">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="p-6 pt-0 mt-auto">
        <Button variant="ghost" asChild className="p-0 h-auto font-normal text-primary">
          <Link to={href} className="flex items-center gap-2 group-hover:gap-3 transition-all">
            Learn more <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
