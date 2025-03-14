
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ExternalLink, Search, Filter, Clock, ArrowUpRight } from "lucide-react"

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  
  // Sample news data - in a real app, this would come from an API
  const newsArticles = [
    {
      id: 1,
      title: "Bitcoin Surpasses $50,000 for First Time Since 2021",
      source: "CoinDesk",
      time: "2h ago",
      url: "#",
      sentiment: "positive",
      categories: ["Bitcoin", "Markets"],
      summary: "Bitcoin has broken through the psychological $50,000 barrier for the first time since December 2021, as institutional adoption continues to increase following the approval of spot ETFs."
    },
    {
      id: 2,
      title: "SEC Chair Signals New Approach to Crypto Regulation",
      source: "Bloomberg",
      time: "4h ago",
      url: "#",
      sentiment: "neutral",
      categories: ["Regulation", "Markets"],
      summary: "The Securities and Exchange Commission Chair outlined a new framework for cryptocurrency regulation, suggesting a more collaborative approach with industry stakeholders."
    },
    {
      id: 3,
      title: "Ethereum Gas Fees Spike as NFT Project Launches",
      source: "Decrypt",
      time: "6h ago",
      url: "#",
      sentiment: "negative",
      categories: ["Ethereum", "NFTs"],
      summary: "Gas fees on the Ethereum network reached multi-month highs as a highly anticipated NFT project launched, causing network congestion and frustration among users."
    },
    {
      id: 4,
      title: "Dollar Weakens Against Major Currencies on Rate Cut Expectations",
      source: "ForexLive",
      time: "8h ago",
      url: "#",
      sentiment: "neutral",
      categories: ["Forex", "USD"],
      summary: "The US dollar declined against a basket of major currencies as traders increased bets on Federal Reserve interest rate cuts following weaker-than-expected economic data."
    },
    {
      id: 5,
      title: "Central Banks Accelerate Digital Currency Development",
      source: "Financial Times",
      time: "10h ago",
      url: "#",
      sentiment: "positive",
      categories: ["CBDC", "Central Banks"],
      summary: "Central banks around the world are accelerating their development of digital currencies, with over 80% now actively researching or piloting CBDCs according to a new BIS survey."
    },
    {
      id: 6,
      title: "Technical Analysis: EUR/USD Approaches Key Resistance Level",
      source: "DailyFX",
      time: "12h ago",
      url: "#",
      sentiment: "neutral",
      categories: ["Forex", "Technical Analysis"],
      summary: "EUR/USD is approaching a key resistance level at 1.1050, which has previously acted as a strong ceiling for the pair. A breakthrough could signal further upside potential."
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">News & Analysis</h1>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search news articles..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
        <Button variant="outline" className="gap-2">
          <Clock className="h-4 w-4" />
          <span>Latest</span>
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="forex">Forex</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="economy">Economy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Latest Financial News</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {newsArticles.map((article) => (
                  <div key={article.id} className="group border rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                        <span>{article.source}</span>
                        <span>•</span>
                        <span>{article.time}</span>
                        <Badge 
                          variant="secondary" 
                          className={`ml-auto ${getSentimentColor(article.sentiment)}`}
                        >
                          {article.sentiment}
                        </Badge>
                      </div>
                      
                      <a 
                        href={article.url} 
                        className="block mb-2"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <h3 className="text-lg font-medium group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                          <ExternalLink className="inline-block ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                      </a>
                      
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                        {article.summary}
                      </p>
                      
                      <div className="flex gap-2 mt-2">
                        {article.categories.map(category => (
                          <Badge key={category} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-muted/30 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        2 min read
                      </span>
                      <Button variant="ghost" size="sm" className="h-7 px-2 gap-1">
                        <span>Read Full Article</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="crypto" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Crypto News</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Filtered crypto-related news articles.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forex" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Forex News</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Filtered forex-related news articles.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stocks" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Stock Market News</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Filtered stock market news articles.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="economy" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Economic News</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Filtered economic news articles.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
