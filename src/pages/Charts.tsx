
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, BarChart, AreaChart, Line, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function ChartsPage() {
  const [selectedAsset, setSelectedAsset] = useState("btc")
  const [timeRange, setTimeRange] = useState("1m")
  
  // Sample historical data - in a real app, this would come from an API
  const historicalData = [
    { date: "Jan", btc: 42000, eth: 2900, sol: 120, eur_usd: 1.08, gbp_usd: 1.27 },
    { date: "Feb", btc: 44500, eth: 3100, sol: 105, eur_usd: 1.07, gbp_usd: 1.25 },
    { date: "Mar", btc: 47000, eth: 3300, sol: 115, eur_usd: 1.09, gbp_usd: 1.28 },
    { date: "Apr", btc: 52000, eth: 3500, sol: 140, eur_usd: 1.08, gbp_usd: 1.27 },
    { date: "May", btc: 49000, eth: 3200, sol: 130, eur_usd: 1.08, gbp_usd: 1.26 },
    { date: "Jun", btc: 53000, eth: 3400, sol: 145, eur_usd: 1.09, gbp_usd: 1.27 },
    { date: "Jul", btc: 54000, eth: 3600, sol: 150, eur_usd: 1.10, gbp_usd: 1.28 },
    { date: "Aug", btc: 50000, eth: 3300, sol: 135, eur_usd: 1.09, gbp_usd: 1.27 },
    { date: "Sep", btc: 48000, eth: 3100, sol: 125, eur_usd: 1.08, gbp_usd: 1.26 },
    { date: "Oct", btc: 51000, eth: 3400, sol: 140, eur_usd: 1.07, gbp_usd: 1.25 },
    { date: "Nov", btc: 55000, eth: 3700, sol: 155, eur_usd: 1.08, gbp_usd: 1.26 },
    { date: "Dec", btc: 57000, eth: 3800, sol: 165, eur_usd: 1.09, gbp_usd: 1.27 },
  ]
  
  const volumeData = [
    { date: "Jan", btc: 320, eth: 180, sol: 85 },
    { date: "Feb", btc: 350, eth: 200, sol: 90 },
    { date: "Mar", btc: 330, eth: 190, sol: 80 },
    { date: "Apr", btc: 400, eth: 220, sol: 100 },
    { date: "May", btc: 380, eth: 210, sol: 95 },
    { date: "Jun", btc: 420, eth: 230, sol: 110 },
    { date: "Jul", btc: 450, eth: 250, sol: 120 },
    { date: "Aug", btc: 430, eth: 240, sol: 115 },
    { date: "Sep", btc: 410, eth: 220, sol: 105 },
    { date: "Oct", btc: 440, eth: 230, sol: 110 },
    { date: "Nov", btc: 470, eth: 260, sol: 125 },
    { date: "Dec", btc: 500, eth: 280, sol: 135 },
  ]
  
  const marketCapData = [
    { name: "Bitcoin", value: 1050 },
    { name: "Ethereum", value: 510 },
    { name: "Other", value: 940 },
  ]
  
  const timeRanges = [
    { value: "1d", label: "1D" },
    { value: "1w", label: "1W" },
    { value: "1m", label: "1M" },
    { value: "3m", label: "3M" },
    { value: "1y", label: "1Y" },
    { value: "all", label: "All" },
  ]
  
  const assets = [
    { value: "btc", label: "Bitcoin (BTC)" },
    { value: "eth", label: "Ethereum (ETH)" },
    { value: "sol", label: "Solana (SOL)" },
    { value: "eur_usd", label: "EUR/USD" },
    { value: "gbp_usd", label: "GBP/USD" },
  ]
  
  const getChartColor = () => {
    switch (selectedAsset) {
      case "btc":
        return "#F7931A"
      case "eth":
        return "#627EEA"
      case "sol":
        return "#14F195"
      case "eur_usd":
        return "#4299E1"
      case "gbp_usd":
        return "#48BB78"
      default:
        return "#2563EB"
    }
  }
  
  const renderLineChart = (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={historicalData}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="date" stroke="#6B7280" />
        <YAxis 
          stroke="#6B7280" 
          domain={selectedAsset === "eur_usd" || selectedAsset === "gbp_usd" ? ["dataMin", "dataMax"] : ["auto", "auto"]}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} 
          itemStyle={{ color: "#F9FAFB" }}
          formatter={(value: any) => {
            if (selectedAsset === "eur_usd" || selectedAsset === "gbp_usd") {
              return [typeof value === 'number' ? value.toFixed(4) : value, selectedAsset.toUpperCase()]
            }
            return [`$${typeof value === 'number' ? value.toLocaleString() : value}`, selectedAsset.toUpperCase()]
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey={selectedAsset} 
          stroke={getChartColor()} 
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
  
  const renderAreaChart = (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={historicalData}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="date" stroke="#6B7280" />
        <YAxis stroke="#6B7280" />
        <Tooltip 
          contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} 
          itemStyle={{ color: "#F9FAFB" }}
          formatter={(value: any) => {
            if (selectedAsset === "eur_usd" || selectedAsset === "gbp_usd") {
              return [typeof value === 'number' ? value.toFixed(4) : value, selectedAsset.toUpperCase()]
            }
            return [`$${typeof value === 'number' ? value.toLocaleString() : value}`, selectedAsset.toUpperCase()]
          }}
        />
        <Legend />
        <Area 
          type="monotone" 
          dataKey={selectedAsset} 
          stroke={getChartColor()} 
          fill={getChartColor()} 
          fillOpacity={0.2} 
        />
      </AreaChart>
    </ResponsiveContainer>
  )
  
  const renderVolumeChart = (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={volumeData}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="date" stroke="#6B7280" />
        <YAxis stroke="#6B7280" />
        <Tooltip 
          contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} 
          itemStyle={{ color: "#F9FAFB" }}
          formatter={(value) => [`$${value} billion`, "Volume"]}
        />
        <Legend />
        <Bar 
          dataKey={selectedAsset} 
          fill={getChartColor()} 
          barSize={20}
          fillOpacity={0.8}
        />
      </BarChart>
    </ResponsiveContainer>
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Interactive Charts</h1>
      
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-80">
          <Select value={selectedAsset} onValueChange={setSelectedAsset}>
            <SelectTrigger>
              <SelectValue placeholder="Select asset" />
            </SelectTrigger>
            <SelectContent>
              {assets.map((asset) => (
                <SelectItem key={asset.value} value={asset.value}>
                  {asset.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          {timeRanges.map((range) => (
            <Button 
              key={range.value}
              size="sm"
              variant={timeRange === range.value ? "default" : "outline"}
              onClick={() => setTimeRange(range.value)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>
      
      <Tabs defaultValue="line" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="line">Line Chart</TabsTrigger>
          <TabsTrigger value="area">Area Chart</TabsTrigger>
          <TabsTrigger value="candlestick">Candlestick Chart</TabsTrigger>
          <TabsTrigger value="indicators">Technical Indicators</TabsTrigger>
        </TabsList>
        
        <TabsContent value="line" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <div>
                  {assets.find(a => a.value === selectedAsset)?.label} Price Chart
                </div>
                <div className="text-sm font-normal text-muted-foreground">
                  {timeRange.toUpperCase()} | {new Date().toLocaleDateString()}
                </div>
              </CardTitle>
              <CardDescription>
                Historical price data for selected time period
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderLineChart}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="area" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <div>
                  {assets.find(a => a.value === selectedAsset)?.label} Price Chart
                </div>
                <div className="text-sm font-normal text-muted-foreground">
                  {timeRange.toUpperCase()} | {new Date().toLocaleDateString()}
                </div>
              </CardTitle>
              <CardDescription>
                Historical price data with area visualization
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderAreaChart}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="candlestick" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Candlestick Chart</CardTitle>
              <CardDescription>
                OHLC data visualization
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">
                Candlestick chart visualization coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="indicators" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Technical Indicators</CardTitle>
              <CardDescription>
                Advanced technical analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">
                Technical indicators visualization coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Trading Volume</CardTitle>
            <CardDescription>
              24h trading volume over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderVolumeChart}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Market Statistics</CardTitle>
            <CardDescription>
              Key performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Current Price</p>
                <p className="text-xl font-bold">
                  {selectedAsset === "eur_usd" || selectedAsset === "gbp_usd" 
                    ? historicalData[11][selectedAsset].toFixed(4) 
                    : `$${historicalData[11][selectedAsset].toLocaleString()}`
                  }
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">24h Change</p>
                <p className="text-xl font-bold text-green-500">+5.2%</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">24h High</p>
                <p className="text-xl font-bold">
                  {selectedAsset === "eur_usd" || selectedAsset === "gbp_usd" 
                    ? (historicalData[11][selectedAsset] * 1.005).toFixed(4) 
                    : `$${(historicalData[11][selectedAsset] * 1.05).toLocaleString()}`
                  }
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">24h Low</p>
                <p className="text-xl font-bold">
                  {selectedAsset === "eur_usd" || selectedAsset === "gbp_usd" 
                    ? (historicalData[11][selectedAsset] * 0.995).toFixed(4) 
                    : `$${(historicalData[11][selectedAsset] * 0.95).toLocaleString()}`
                  }
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">30 Day Change</p>
                <p className="text-xl font-bold text-green-500">+12.6%</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">YTD Change</p>
                <p className="text-xl font-bold text-green-500">+45.8%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
