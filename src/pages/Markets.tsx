
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Activity, BarChart2 } from "lucide-react"

export default function MarketsPage() {
  const stockIndices = [
    { name: "S&P 500", value: "4,738.23", change: "+0.85%", trend: "up" },
    { name: "Nasdaq", value: "16,742.39", change: "+1.12%", trend: "up" },
    { name: "Dow Jones", value: "38,654.12", change: "+0.43%", trend: "up" },
    { name: "Russell 2000", value: "2,016.69", change: "-0.21%", trend: "down" },
    { name: "FTSE 100", value: "7,865.64", change: "+0.37%", trend: "up" },
    { name: "DAX", value: "16,952.76", change: "+0.53%", trend: "up" },
    { name: "Nikkei 225", value: "36,158.02", change: "-0.62%", trend: "down" },
    { name: "Shanghai Composite", value: "3,285.63", change: "+0.15%", trend: "up" }
  ]
  
  const commodities = [
    { name: "Gold", value: "$2,034.67", change: "+0.24%", trend: "up" },
    { name: "Silver", value: "$23.45", change: "+0.53%", trend: "up" },
    { name: "Crude Oil WTI", value: "$78.42", change: "-1.15%", trend: "down" },
    { name: "Brent Crude", value: "$82.31", change: "-0.86%", trend: "down" },
    { name: "Natural Gas", value: "$2.87", change: "+2.13%", trend: "up" },
    { name: "Copper", value: "$4.12", change: "+0.35%", trend: "up" }
  ]
  
  const bonds = [
    { name: "US 10Y Treasury", value: "4.52%", change: "+0.03%", trend: "up" },
    { name: "US 30Y Treasury", value: "4.70%", change: "+0.02%", trend: "up" },
    { name: "US 2Y Treasury", value: "4.35%", change: "-0.01%", trend: "down" },
    { name: "Germany 10Y", value: "2.34%", change: "+0.02%", trend: "up" },
    { name: "UK 10Y", value: "4.01%", change: "+0.04%", trend: "up" },
    { name: "Japan 10Y", value: "0.95%", change: "+0.01%", trend: "up" }
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Global Markets</h1>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Market Overview</CardTitle>
                <CardDescription>Global market conditions</CardDescription>
              </div>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Fear & Greed Index</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-red-500" style={{ width: "65%" }}></div>
                    </div>
                    <span className="text-sm font-bold">65</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Greed</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Market Volatility</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: "32%" }}></div>
                    </div>
                    <span className="text-sm font-bold">32</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Low</p>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Advancing: 65%</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Declining: 35%</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Volume: +12%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Economic Calendar</CardTitle>
            <CardDescription>Upcoming economic events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <div>
                <p className="text-sm font-medium">US Non-Farm Payrolls</p>
                <p className="text-xs text-muted-foreground">High Impact</p>
              </div>
              <div className="text-right">
                <p className="text-sm">Fri, Jun 7</p>
                <p className="text-xs text-muted-foreground">8:30 AM EST</p>
              </div>
            </div>
            <div className="flex justify-between border-b pb-2">
              <div>
                <p className="text-sm font-medium">ECB Interest Rate Decision</p>
                <p className="text-xs text-muted-foreground">High Impact</p>
              </div>
              <div className="text-right">
                <p className="text-sm">Thu, Jun 6</p>
                <p className="text-xs text-muted-foreground">7:45 AM EST</p>
              </div>
            </div>
            <div className="flex justify-between border-b pb-2">
              <div>
                <p className="text-sm font-medium">US ISM Services PMI</p>
                <p className="text-xs text-muted-foreground">Medium Impact</p>
              </div>
              <div className="text-right">
                <p className="text-sm">Wed, Jun 5</p>
                <p className="text-xs text-muted-foreground">10:00 AM EST</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium">China Trade Balance</p>
                <p className="text-xs text-muted-foreground">Medium Impact</p>
              </div>
              <div className="text-right">
                <p className="text-sm">Wed, Jun 5</p>
                <p className="text-xs text-muted-foreground">10:00 PM EST</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="stocks" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="stocks">Stock Indices</TabsTrigger>
          <TabsTrigger value="commodities">Commodities</TabsTrigger>
          <TabsTrigger value="bonds">Bonds</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stocks" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Global Stock Indices</CardTitle>
              <CardDescription>Major stock indices from around the world</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {stockIndices.map((index) => (
                  <div key={index.name} className="flex flex-col p-3 border rounded-lg">
                    <div className="text-sm text-muted-foreground">{index.name}</div>
                    <div className="text-xl font-bold mt-1">{index.value}</div>
                    <div className={`flex items-center mt-1 ${index.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {index.trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                      {index.change}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="commodities" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Commodities</CardTitle>
              <CardDescription>Precious metals and energy markets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {commodities.map((commodity) => (
                  <div key={commodity.name} className="flex flex-col p-3 border rounded-lg">
                    <div className="text-sm text-muted-foreground">{commodity.name}</div>
                    <div className="text-xl font-bold mt-1">{commodity.value}</div>
                    <div className={`flex items-center mt-1 ${commodity.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {commodity.trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                      {commodity.change}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bonds" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Global Bond Markets</CardTitle>
              <CardDescription>Government bond yields</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {bonds.map((bond) => (
                  <div key={bond.name} className="flex flex-col p-3 border rounded-lg">
                    <div className="text-sm text-muted-foreground">{bond.name}</div>
                    <div className="text-xl font-bold mt-1">{bond.value}</div>
                    <div className={`flex items-center mt-1 ${bond.trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
                      {bond.trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                      {bond.change}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
