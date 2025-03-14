
import { useEffect, useState } from "react"
import { Bitcoin, CircleDollarSign, DollarSign, Euro } from "lucide-react"
import PriceCard from "@/components/dashboard/PriceCard"
import MarketTrends from "@/components/dashboard/MarketTrends"
import NewsFeed from "@/components/dashboard/NewsFeed"
import PriceAlerts from "@/components/dashboard/PriceAlerts"
import { useToast } from "@/components/ui/use-toast"

interface CryptoData {
  name: string
  symbol: string
  price: number
  change: number
  chartData: number[]
  icon: React.ReactNode
}

export default function Dashboard() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: 0,
      change: 0,
      chartData: [10, 12, 8, 15, 18, 15, 22, 25, 28, 30],
      icon: <Bitcoin className="h-4 w-4 text-[#F7931A]" />
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: 0,
      change: 0,
      chartData: [20, 22, 25, 18, 15, 17, 12, 10, 8, 5],
      icon: <CircleDollarSign className="h-4 w-4 text-[#627EEA]" />
    },
    {
      name: "US Dollar / Euro",
      symbol: "USD/EUR",
      price: 0,
      change: 0,
      chartData: [15, 16, 14, 16, 18, 19, 20, 18, 20, 22],
      icon: <Euro className="h-4 w-4 text-blue-500" />
    },
    {
      name: "British Pound / USD",
      symbol: "GBP/USD",
      price: 0,
      change: 0,
      chartData: [25, 24, 22, 18, 20, 18, 17, 18, 16, 15],
      icon: <DollarSign className="h-4 w-4 text-green-500" />
    }
  ])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Initial data fetch
    fetchCryptoData()
    
    // Set up interval for data updates (every 30 seconds)
    const intervalId = setInterval(() => {
      fetchCryptoData()
    }, 30000)
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  const fetchCryptoData = async () => {
    try {
      setIsLoading(true)
      
      // Fetch crypto data
      const cryptoResponse = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true"
      )
      
      if (!cryptoResponse.ok) {
        throw new Error("Failed to fetch crypto data")
      }
      
      const cryptoResult = await cryptoResponse.json()
      
      // Fetch forex data
      const forexResponse = await fetch(
        "https://open.er-api.com/v6/latest/USD"
      )
      
      if (!forexResponse.ok) {
        throw new Error("Failed to fetch forex data")
      }
      
      const forexResult = await forexResponse.json()
      
      // Update state with live data
      setCryptoData(prevData => {
        return prevData.map(item => {
          if (item.symbol === "BTC") {
            return {
              ...item,
              price: cryptoResult.bitcoin.usd,
              change: cryptoResult.bitcoin.usd_24h_change,
              chartData: updateChartData(item.chartData, cryptoResult.bitcoin.usd)
            }
          } else if (item.symbol === "ETH") {
            return {
              ...item,
              price: cryptoResult.ethereum.usd,
              change: cryptoResult.ethereum.usd_24h_change,
              chartData: updateChartData(item.chartData, cryptoResult.ethereum.usd)
            }
          } else if (item.symbol === "USD/EUR") {
            const eurRate = forexResult.rates.EUR
            return {
              ...item,
              price: eurRate,
              change: ((eurRate / 0.93) - 1) * 100, // Simplified change calculation
              chartData: updateChartData(item.chartData, eurRate * 20) // Scale for visibility
            }
          } else if (item.symbol === "GBP/USD") {
            const gbpRate = 1 / forexResult.rates.GBP
            return {
              ...item,
              price: gbpRate,
              change: ((gbpRate / 1.26) - 1) * 100, // Simplified change calculation
              chartData: updateChartData(item.chartData, gbpRate * 15) // Scale for visibility
            }
          }
          return item
        })
      })
      
      setIsLoading(false)
      
    } catch (error) {
      console.error("Error fetching market data:", error)
      toast({
        title: "Error fetching market data",
        description: "Please try again later. Using sample data for now.",
        variant: "destructive"
      })
      setIsLoading(false)
    }
  }
  
  const updateChartData = (currentData: number[], newValue: number) => {
    // Normalize the new value to be between 5-30 for chart visualization
    const normalizedValue = Math.max(5, Math.min(30, newValue / 2000))
    // Shift chart data and add new value
    const updatedData = [...currentData.slice(1), normalizedValue]
    return updatedData
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Market Overview</h1>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cryptoData.map((item, index) => (
          <PriceCard
            key={index}
            name={item.name}
            symbol={item.symbol}
            price={item.price}
            change={item.change}
            chartData={item.chartData}
            icon={item.icon}
            isLoading={isLoading}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <MarketTrends />
        <PriceAlerts />
      </div>
      
      <div className="grid grid-cols-1">
        <NewsFeed />
      </div>
    </div>
  )
}
