
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface TrendItemProps {
  name: string
  value: number
  change: number
}

function TrendItem({ name, value, change }: TrendItemProps) {
  const isPositive = change >= 0
  
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm">{name}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm tabular-nums">{value.toLocaleString()}</span>
        <span className={cn(
          "flex items-center text-xs",
          isPositive ? "text-green-500" : "text-red-500"
        )}>
          {isPositive ? <ArrowUpIcon className="mr-1 h-3 w-3" /> : <ArrowDownIcon className="mr-1 h-3 w-3" />}
          {Math.abs(change).toFixed(2)}%
        </span>
      </div>
    </div>
  )
}

export default function MarketTrends() {
  // Sample data - in a real app, this would come from an API
  const marketTrends = [
    { name: "BTC Dominance", value: 52.14, change: 0.22 },
    { name: "Crypto Market Cap", value: 2.45, change: -1.34 }, // in trillions
    { name: "24h Volume", value: 86.3, change: 5.47 }, // in billions
    { name: "DeFi Market Cap", value: 58.67, change: -0.87 }, // in billions
    { name: "BTC Hashrate", value: 542.8, change: 2.34 }, // in EH/s
    { name: "Fear & Greed Index", value: 65, change: 8 }, // 0-100
  ]
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Market Trends</CardTitle>
        <CardDescription>Overview of key market indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 divide-y">
          {marketTrends.map((trend, i) => (
            <TrendItem 
              key={i} 
              name={trend.name} 
              value={trend.value} 
              change={trend.change} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
