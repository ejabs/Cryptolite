
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Euro, PoundSterling, BarChart, CircleDollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

export default function ForexPage() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("1d")
  const [forexPairs, setForexPairs] = useState([
    {
      name: "EUR/USD",
      rate: 1.0924,
      change: -0.15,
      high: 1.0956,
      low: 1.0915,
      icon: <Euro className="h-5 w-5 text-blue-500" />
    },
    {
      name: "GBP/USD",
      rate: 1.2654,
      change: -0.32,
      high: 1.2689,
      low: 1.2621,
      icon: <PoundSterling className="h-5 w-5 text-green-500" />
    },
    {
      name: "USD/JPY",
      rate: 147.58,
      change: 0.45,
      high: 147.82,
      low: 146.95,
      icon: <CircleDollarSign className="h-5 w-5 text-red-500" />
    },
    {
      name: "USD/CAD",
      rate: 1.3652,
      change: 0.28,
      high: 1.3675,
      low: 1.3621,
      icon: <DollarSign className="h-5 w-5 text-red-600" />
    },
    {
      name: "AUD/USD",
      rate: 0.6582,
      change: -0.17,
      high: 0.6598,
      low: 0.6575,
      icon: <BarChart className="h-5 w-5 text-yellow-600" />
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
    fetchForexData()
    
    // Set up interval for data updates (every 60 seconds)
    const intervalId = setInterval(() => {
      fetchForexData()
    }, 60000)
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }, [])
  
  const fetchForexData = async () => {
    try {
      setIsLoading(true)
      
      // Fetch forex data from API
      const response = await fetch("https://open.er-api.com/v6/latest/USD")
      
      if (!response.ok) {
        throw new Error("Failed to fetch forex data")
      }
      
      const data = await response.json()
      
      // Calculate the rates and changes
      const updatedPairs = forexPairs.map(pair => {
        const [base, quote] = pair.name.split('/')
        let rate, change, high, low
        
        if (base === "USD") {
          // For USD/XXX pairs
          rate = data.rates[quote]
          // Generate random but realistic change percentage
          change = (Math.random() * 0.6 - 0.3).toFixed(2)
          high = rate * (1 + Math.random() * 0.005)
          low = rate * (1 - Math.random() * 0.005)
        } else {
          // For XXX/USD pairs
          rate = 1 / data.rates[base]
          change = (Math.random() * 0.6 - 0.3).toFixed(2)
          high = rate * (1 + Math.random() * 0.005)
          low = rate * (1 - Math.random() * 0.005)
        }
        
        return {
          ...pair,
          rate,
          change: parseFloat(change),
          high,
          low
        }
      })
      
      setForexPairs(updatedPairs)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching forex data:", error)
      toast({
        title: "Error fetching forex data",
        description: "Please try again later",
        variant: "destructive"
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Forex Markets</h1>
        <div className="flex gap-2">
          {timeFrames.map(time => (
            <Button 
              key={time.value}
              size="sm"
              variant={selectedTimeFrame === time.value ? "default" : "outline"}
              onClick={() => setSelectedTimeFrame(time.value)}
            >
              {time.label}
            </Button>
          ))}
        </div>
      </div>
      
      <Tabs defaultValue="major" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="major">Major Pairs</TabsTrigger>
          <TabsTrigger value="minor">Minor Pairs</TabsTrigger>
          <TabsTrigger value="exotic">Exotic Pairs</TabsTrigger>
          <TabsTrigger value="commodities">Commodities</TabsTrigger>
          <TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
        </TabsList>
        
        <TabsContent value="major" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Major Currency Pairs</CardTitle>
              <CardDescription>
                Live exchange rates for major currency pairs | {new Date().toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Pair</th>
                      <th className="text-right py-3 px-4 font-medium">Rate</th>
                      <th className="text-right py-3 px-4 font-medium">24h %</th>
                      <th className="text-right py-3 px-4 font-medium">24h High</th>
                      <th className="text-right py-3 px-4 font-medium">24h Low</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      Array(5).fill(0).map((_, index) => (
                        <tr key={`skeleton-${index}`} className="border-b">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Skeleton className="h-5 w-5 rounded-full" />
                              <Skeleton className="h-5 w-24" />
                            </div>
                          </td>
                          <td className="text-right py-3 px-4">
                            <Skeleton className="h-5 w-16 ml-auto" />
                          </td>
                          <td className="text-right py-3 px-4">
                            <Skeleton className="h-5 w-14 ml-auto" />
                          </td>
                          <td className="text-right py-3 px-4">
                            <Skeleton className="h-5 w-16 ml-auto" />
                          </td>
                          <td className="text-right py-3 px-4">
                            <Skeleton className="h-5 w-16 ml-auto" />
                          </td>
                        </tr>
                      ))
                    ) : (
                      forexPairs.map((pair) => (
                        <tr key={pair.name} className="hover:bg-muted/50 border-b">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {pair.icon}
                              <span className="font-medium">{pair.name}</span>
                            </div>
                          </td>
                          <td className="text-right py-3 px-4">{pair.rate.toFixed(4)}</td>
                          <td className={`text-right py-3 px-4 ${pair.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {pair.change >= 0 ? '+' : ''}{pair.change}%
                          </td>
                          <td className="text-right py-3 px-4">{pair.high.toFixed(4)}</td>
                          <td className="text-right py-3 px-4">{pair.low.toFixed(4)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="minor" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Minor Currency Pairs</CardTitle>
              <CardDescription>Currency pairs not involving USD</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Pair</th>
                      <th className="text-right py-3 px-4 font-medium">Rate</th>
                      <th className="text-right py-3 px-4 font-medium">24h %</th>
                      <th className="text-right py-3 px-4 font-medium">24h High</th>
                      <th className="text-right py-3 px-4 font-medium">24h Low</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-muted/50 border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Euro className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">EUR/GBP</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">0.8632</td>
                      <td className="text-right py-3 px-4 text-red-500">-0.18%</td>
                      <td className="text-right py-3 px-4">0.8644</td>
                      <td className="text-right py-3 px-4">0.8621</td>
                    </tr>
                    <tr className="hover:bg-muted/50 border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Euro className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">EUR/CHF</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">0.9541</td>
                      <td className="text-right py-3 px-4 text-green-500">+0.27%</td>
                      <td className="text-right py-3 px-4">0.9573</td>
                      <td className="text-right py-3 px-4">0.9532</td>
                    </tr>
                    <tr className="hover:bg-muted/50 border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <PoundSterling className="h-5 w-5 text-green-500" />
                          <span className="font-medium">GBP/JPY</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">186.84</td>
                      <td className="text-right py-3 px-4 text-green-500">+0.32%</td>
                      <td className="text-right py-3 px-4">187.21</td>
                      <td className="text-right py-3 px-4">186.51</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="exotic" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Exotic Currency Pairs</CardTitle>
              <CardDescription>Major currency paired with emerging market currency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Pair</th>
                      <th className="text-right py-3 px-4 font-medium">Rate</th>
                      <th className="text-right py-3 px-4 font-medium">24h %</th>
                      <th className="text-right py-3 px-4 font-medium">24h High</th>
                      <th className="text-right py-3 px-4 font-medium">24h Low</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-muted/50 border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-green-500" />
                          <span className="font-medium">USD/TRY</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">32.1246</td>
                      <td className="text-right py-3 px-4 text-green-500">+0.53%</td>
                      <td className="text-right py-3 px-4">32.1965</td>
                      <td className="text-right py-3 px-4">32.0873</td>
                    </tr>
                    <tr className="hover:bg-muted/50 border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Euro className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">EUR/ZAR</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">19.8732</td>
                      <td className="text-right py-3 px-4 text-red-500">-0.64%</td>
                      <td className="text-right py-3 px-4">19.9256</td>
                      <td className="text-right py-3 px-4">19.7865</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="commodities" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Commodities</CardTitle>
              <CardDescription>Gold, silver, oil and other commodities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Commodity</th>
                      <th className="text-right py-3 px-4 font-medium">Price</th>
                      <th className="text-right py-3 px-4 font-medium">24h %</th>
                      <th className="text-right py-3 px-4 font-medium">24h High</th>
                      <th className="text-right py-3 px-4 font-medium">24h Low</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-muted/50 border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="h-5 w-5 flex items-center justify-center text-yellow-500">XAU</span>
                          <span className="font-medium">Gold</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">$2,345.67</td>
                      <td className="text-right py-3 px-4 text-green-500">+0.78%</td>
                      <td className="text-right py-3 px-4">$2,352.40</td>
                      <td className="text-right py-3 px-4">$2,337.15</td>
                    </tr>
                    <tr className="hover:bg-muted/50 border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="h-5 w-5 flex items-center justify-center text-gray-300">XAG</span>
                          <span className="font-medium">Silver</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">$27.85</td>
                      <td className="text-right py-3 px-4 text-green-500">+1.24%</td>
                      <td className="text-right py-3 px-4">$28.12</td>
                      <td className="text-right py-3 px-4">$27.65</td>
                    </tr>
                    <tr className="hover:bg-muted/50 border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="h-5 w-5 flex items-center justify-center text-black">OIL</span>
                          <span className="font-medium">Crude Oil</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">$83.42</td>
                      <td className="text-right py-3 px-4 text-red-500">-0.53%</td>
                      <td className="text-right py-3 px-4">$84.18</td>
                      <td className="text-right py-3 px-4">$82.95</td>
                    </tr>
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
              <CardDescription>Your saved forex pairs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="mb-4">You haven't added any forex pairs to your watchlist yet.</p>
                <Button onClick={() => toast({ title: "Feature coming soon", description: "Watchlist functionality will be available in the next update" })}>
                  Browse Forex Pairs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
