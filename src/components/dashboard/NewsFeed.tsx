
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "../ui/badge"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface NewsItem {
  id: string
  title: string
  source: string
  time: string
  url: string
  sentiment: "positive" | "negative" | "neutral"
  categories: string[]
}

export default function NewsFeed() {
  // Sample data - in a real app, this would come from an API
  const news: NewsItem[] = [
    {
      id: "1",
      title: "Bitcoin Surpasses $50,000 for First Time Since 2021",
      source: "CoinDesk",
      time: "2h ago",
      url: "#",
      sentiment: "positive",
      categories: ["Bitcoin", "Markets"]
    },
    {
      id: "2",
      title: "SEC Chair Signals New Approach to Crypto Regulation",
      source: "Bloomberg",
      time: "4h ago",
      url: "#",
      sentiment: "neutral",
      categories: ["Regulation", "Markets"]
    },
    {
      id: "3",
      title: "Ethereum Gas Fees Spike as NFT Project Launches",
      source: "Decrypt",
      time: "6h ago",
      url: "#",
      sentiment: "negative",
      categories: ["Ethereum", "NFTs"]
    },
    {
      id: "4",
      title: "Dollar Weakens Against Major Currencies on Rate Cut Expectations",
      source: "ForexLive",
      time: "8h ago",
      url: "#",
      sentiment: "neutral",
      categories: ["Forex", "USD"]
    },
  ]
  
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "negative":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
    }
  }
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Latest News</CardTitle>
        <CardDescription>Real-time updates from the crypto & FX world</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {news.map(item => (
            <div key={item.id} className="group">
              <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
                <span>{item.source}</span>
                <span>•</span>
                <span>{item.time}</span>
                <Badge 
                  variant="secondary" 
                  className={cn("ml-auto", getSentimentColor(item.sentiment))}
                >
                  {item.sentiment}
                </Badge>
              </div>
              <a 
                href={item.url} 
                className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2"
                target="_blank" 
                rel="noopener noreferrer"
              >
                {item.title}
                <ExternalLink className="inline-block ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <div className="flex gap-2 mt-2">
                {item.categories.map(category => (
                  <Badge key={category} variant="outline" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
