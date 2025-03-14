
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bitcoin, CircleDollarSign, TrendingUp, LineChart, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

export default function CryptoPage() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("1d")
  const [cryptocurrencies, setCryptocurrencies] = useState([
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: 52843.21,
      marketCap: "1.02T",
      volume: "42.3B",
      change: 2.34,
      icon: <Bitcoin className="h-5 w-5 text-[#F7931A]" />
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: 3248.76,
      marketCap: "389.2B",
      volume: "18.5B",
      change: -1.2,
      icon: <CircleDollarSign className="h-5 w-5 text-[#627EEA]" />
    },
    {
      name: "Binance Coin",
      symbol: "BNB",
      price: 521.35,
      marketCap: "87.4B",
      volume: "3.2B",
      change: 0.87,
      icon: <TrendingUp className="h-5 w-5 text-[#F3BA2F]" />
    },
    {
      name: "Cardano",
      symbol: "ADA",
      price: 0.542,
      marketCap: "18.3B",
      volume: "1.4B",
      change: -2.31,
      icon: <LineChart className="h-5 w-5 text-[#0033AD]" />
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: 142.75,
      marketCap: "64.8B",
      volume: "2.7B",
      change: 4.52,
      icon: <ArrowUpDown className="h-5 w-5 text-[#14F195]" />
    }
  ])
  
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  
  const timeFrames = [
    { value: "1h", label: "1H" },
    { value: "1d", label: "1D" },
    { value: "1w", label: "1W" },
    { value: "1m", label: "1M" },
    { value: "1y", label: "1Y" },
  ]
  
  useEffect(() => {
    fetchCryptoData()
    
    // Set up interval for data updates (every 60 seconds)
    const intervalId = setInterval(() => {
      fetchCryptoData()
    }, 60000)
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }, [])
  
  const fetchCryptoData = async () => {
    try {
      setIsLoading(true)
      
      // Using CoinGecko API to fetch top cryptocurrencies
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
      )
      
      if (!response.ok) {
        throw new Error("Failed to fetch cryptocurrency data")
      }
      
      const data = await response.json()
      
      // Map the API response to our cryptocurrency format
      const updatedCryptos = [
        {
          name: "Bitcoin",
          symbol: "BTC",
          price: data.find(coin => coin.symbol === "btc")?.current_price || 0,
          marketCap: formatMarketCap(data.find(coin => coin.symbol === "btc")?.market_cap || 0),
          volume: formatVolume(data.find(coin => coin.symbol === "btc")?.total_volume || 0),
          change: data.find(coin => coin.symbol === "btc")?.price_change_percentage_24h || 0,
          icon: <Bitcoin className="h-5 w-5 text-[#F7931A]" />
        },
        {
          name: "Ethereum",
          symbol: "ETH",
          price: data.find(coin => coin.symbol === "eth")?.current_price || 0,
          marketCap: formatMarketCap(data.find(coin => coin.symbol === "eth")?.market_cap || 0),
          volume: formatVolume(data.find(coin => coin.symbol === "eth")?.total_volume || 0),
          change: data.find(coin => coin.symbol === "eth")?.price_change_percentage_24h || 0,
          icon: <CircleDollarSign className="h-5 w-5 text-[#627EEA]" />
        },
        {
          name: "Binance Coin",
          symbol: "BNB",
          price: data.find(coin => coin.symbol === "bnb")?.current_price || 0,
          marketCap: formatMarketCap(data.find(coin => coin.symbol === "bnb")?.market_cap || 0),
          volume: formatVolume(data.find(coin => coin.symbol === "bnb")?.total_volume || 0),
          change: data.find(coin => coin.symbol === "bnb")?.price_change_percentage_24h || 0,
          icon: <TrendingUp className="h-5 w-5 text-[#F3BA2F]" />
        },
        {
          name: "Cardano",
          symbol: "ADA",
          price: data.find(coin => coin.symbol === "ada")?.current_price || 0,
          marketCap: formatMarketCap(data.find(coin => coin.symbol === "ada")?.market_cap || 0),
          volume: formatVolume(data.find(coin => coin.symbol === "ada")?.total_volume || 0),
          change: data.find(coin => coin.symbol === "ada")?.price_change_percentage_24h || 0,
          icon: <LineChart className="h-5 w-5 text-[#0033AD]" />
        },
        {
          name: "Solana",
          symbol: "SOL",
          price: data.find(coin => coin.symbol === "sol")?.current_price || 0,
          marketCap: formatMarketCap(data.find(coin => coin.symbol === "sol")?.market_cap || 0),
          volume: formatVolume(data.find(coin => coin.symbol === "sol")?.total_volume || 0),
          change: data.find(coin => coin.symbol === "sol")?.price_change_percentage_24h || 0,
          icon: <ArrowUpDown className="h-5 w-5 text-[#14F195]" />
        }
      ]
      
      setCryptocurrencies(updatedCryptos)
      setIsLoading(false)
      
    } catch (error) {
      console.error("Error fetching cryptocurrency data:", error)
      toast({
        title: "Error fetching cryptocurrency data",
        description: "Please try again later. Using sample data for now.",
        variant: "destructive"
      })
      setIsLoading(false)
    }
  }
  
  const formatMarketCap = (marketCap: number): string => {
    if (marketCap >= 1e12) {
      return `${(marketCap / 1e12).toFixed(2)}T`
    } else if (marketCap >= 1e9) {
      return `${(marketCap / 1e9).toFixed(1)}B`
    } else if (marketCap >= 1e6) {
      return `${(marketCap / 1e6).toFixed(1)}M`
    } else {
      return `${marketCap.toFixed(0)}`
    }
  }
  
  const formatVolume = (volume: number): string => {
    if (volume >= 1e9) {
      return `${(volume / 1e9).toFixed(1)}B`
    } else if (volume >= 1e6) {
      return `${(volume / 1e6).toFixed(1)}M`
    } else {
      return `${volume.toFixed(0)}`
    }
  }
  
  const handleTimeFrameChange = (tf: string) => {
    setSelectedTimeFrame(tf)
    toast({
      title: `Timeframe changed to ${tf}`,
      description: "Chart data will update accordingly.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Cryptocurrency Markets</h1>
        <div className="flex gap-2">
          {timeFrames.map(time => (
            <Button 
              key={time.value}
              size="sm"
              variant={selectedTimeFrame === time.value ? "default" : "outline"}
              onClick={() => handleTimeFrameChange(time.value)}
            >
              {time.label}
            </Button>
          ))}
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Assets</TabsTrigger>
          <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
          <TabsTrigger value="losers">Top Losers</TabsTrigger>
          <TabsTrigger value="volume">Highest Volume</TabsTrigger>
          <TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Cryptocurrency Prices</CardTitle>
              <CardDescription>
                Live prices of major cryptocurrencies | {new Date().toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">#</th>
                      <th className="text-left py-3 px-4 font-medium">Name</th>
                      <th className="text-right py-3 px-4 font-medium">Price</th>
                      <th className="text-right py-3 px-4 font-medium">24h %</th>
                      <th className="text-right py-3 px-4 font-medium">Market Cap</th>
                      <th className="text-right py-3 px-4 font-medium">Volume (24h)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      Array(5).fill(0).map((_, index) => (
                        <tr key={`skeleton-${index}`} className="border-b">
                          <td className="py-3 px-4">
                            <Skeleton className="h-5 w-6" />
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Skeleton className="h-5 w-5 rounded-full" />
                              <Skeleton className="h-5 w-24" />
                            </div>
                          </td>
                          <td className="text-right py-3 px-4">
                            <Skeleton className="h-5 w-24 ml-auto" />
                          </td>
                          <td className="text-right py-3 px-4">
                            <Skeleton className="h-5 w-16 ml-auto" />
                          </td>
                          <td className="text-right py-3 px-4">
                            <Skeleton className="h-5 w-20 ml-auto" />
                          </td>
                          <td className="text-right py-3 px-4">
                            <Skeleton className="h-5 w-20 ml-auto" />
                          </td>
                        </tr>
                      ))
                    ) : (
                      cryptocurrencies.map((crypto, index) => (
                        <tr key={crypto.symbol} className="hover:bg-muted/50 border-b">
                          <td className="py-3 px-4">{index + 1}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {crypto.icon}
                              <span className="font-medium">{crypto.name}</span>
                              <span className="text-muted-foreground text-sm">{crypto.symbol}</span>
                            </div>
                          </td>
                          <td className="text-right py-3 px-4">${crypto.price.toLocaleString()}</td>
                          <td className={`text-right py-3 px-4 ${crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                          </td>
                          <td className="text-right py-3 px-4">${crypto.marketCap}</td>
                          <td className="text-right py-3 px-4">${crypto.volume}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="gainers" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Top Gainers</CardTitle>
              <CardDescription>Cryptocurrencies with the highest price increases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">#</th>
                      <th className="text-left py-3 px-4 font-medium">Name</th>
                      <th className="text-right py-3 px-4 font-medium">Price</th>
                      <th className="text-right py-3 px-4 font-medium">24h %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cryptocurrencies
                      .filter(crypto => crypto.change > 0)
                      .sort((a, b) => b.change - a.change)
                      .map((crypto, index) => (
                        <tr key={crypto.symbol} className="hover:bg-muted/50 border-b">
                          <td className="py-3 px-4">{index + 1}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {crypto.icon}
                              <span className="font-medium">{crypto.name}</span>
                              <span className="text-muted-foreground text-sm">{crypto.symbol}</span>
                            </div>
                          </td>
                          <td className="text-right py-3 px-4">${crypto.price.toLocaleString()}</td>
                          <td className="text-right py-3 px-4 text-green-500">
                            +{crypto.change.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="losers" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Top Losers</CardTitle>
              <CardDescription>Cryptocurrencies with the largest price decreases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">#</th>
                      <th className="text-left py-3 px-4 font-medium">Name</th>
                      <th className="text-right py-3 px-4 font-medium">Price</th>
                      <th className="text-right py-3 px-4 font-medium">24h %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cryptocurrencies
                      .filter(crypto => crypto.change < 0)
                      .sort((a, b) => a.change - b.change)
                      .map((crypto, index) => (
                        <tr key={crypto.symbol} className="hover:bg-muted/50 border-b">
                          <td className="py-3 px-4">{index + 1}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {crypto.icon}
                              <span className="font-medium">{crypto.name}</span>
                              <span className="text-muted-foreground text-sm">{crypto.symbol}</span>
                            </div>
                          </td>
                          <td className="text-right py-3 px-4">${crypto.price.toLocaleString()}</td>
                          <td className="text-right py-3 px-4 text-red-500">
                            {crypto.change.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="volume" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Highest Volume</CardTitle>
              <CardDescription>Cryptocurrencies with the most trading activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">#</th>
                      <th className="text-left py-3 px-4 font-medium">Name</th>
                      <th className="text-right py-3 px-4 font-medium">Price</th>
                      <th className="text-right py-3 px-4 font-medium">Volume (24h)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cryptocurrencies
                      .sort((a, b) => parseFloat(b.volume.replace(/[A-Z]/g, '')) - parseFloat(a.volume.replace(/[A-Z]/g, '')))
                      .map((crypto, index) => (
                        <tr key={crypto.symbol} className="hover:bg-muted/50 border-b">
                          <td className="py-3 px-4">{index + 1}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {crypto.icon}
                              <span className="font-medium">{crypto.name}</span>
                              <span className="text-muted-foreground text-sm">{crypto.symbol}</span>
                            </div>
                          </td>
                          <td className="text-right py-3 px-4">${crypto.price.toLocaleString()}</td>
                          <td className="text-right py-3 px-4">${crypto.volume}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="watchlist" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>My Watchlist</CardTitle>
              <CardDescription>Your saved cryptocurrencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="mb-4">You haven't added any cryptocurrencies to your watchlist yet.</p>
                <Button onClick={() => toast({ title: "Feature coming soon", description: "Watchlist functionality will be available in the next update" })}>
                  Browse Cryptocurrencies
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
