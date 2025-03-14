
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  MoreHorizontal, 
  Star 
} from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface PriceCardProps {
  name: string
  symbol: string
  price: number
  change: number
  chartData?: number[]
  icon?: React.ReactNode
  isLoading?: boolean
}

export default function PriceCard({ 
  name, 
  symbol, 
  price, 
  change, 
  chartData = [],
  icon,
  isLoading = false
}: PriceCardProps) {
  const isPositive = change >= 0
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">
          <div className="flex items-center gap-2">
            {icon}
            <span>{name}</span>
            <span className="text-xs text-muted-foreground">{symbol}</span>
          </div>
        </CardTitle>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Star className="h-4 w-4" />
            <span className="sr-only">Add to favorites</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start justify-between">
          <div>
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-24 mb-1" />
                <Skeleton className="h-4 w-16" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">${price.toLocaleString()}</div>
                <div className={cn(
                  "flex items-center text-xs",
                  isPositive ? "text-green-500" : "text-red-500"
                )}>
                  {isPositive ? <ArrowUpIcon className="mr-1 h-3 w-3" /> : <ArrowDownIcon className="mr-1 h-3 w-3" />}
                  <span>{Math.abs(change).toFixed(2)}%</span>
                  <span className="text-muted-foreground ml-1">24h</span>
                </div>
              </>
            )}
          </div>
          
          {chartData.length > 0 && (
            <div className="h-12 w-28">
              {isLoading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <svg 
                  viewBox="0 0 100 30" 
                  className={cn(
                    "overflow-visible",
                    isPositive ? "stroke-green-500" : "stroke-red-500"
                  )}
                >
                  <path
                    d={`M 0,${30 - chartData[0]} ${chartData.map((value, index) => {
                      const x = (index / (chartData.length - 1)) * 100;
                      const y = 30 - value;
                      return `L ${x},${y}`;
                    }).join(' ')}`}
                    fill="none"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
