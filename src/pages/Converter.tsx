
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ArrowLeftRight, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ConverterPage() {
  const [amount, setAmount] = useState<number>(1)
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("EUR")
  const [conversionRate, setConversionRate] = useState<number | null>(null)
  const [result, setResult] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const { toast } = useToast()
  
  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "BTC", name: "Bitcoin" },
    { code: "ETH", name: "Ethereum" },
  ]

  useEffect(() => {
    // Convert on initial load
    handleConvert()
  }, [])
  
  const fetchConversionRate = async () => {
    setIsLoading(true)
    
    // For crypto to fiat or fiat to crypto conversion
    if (fromCurrency === "BTC" || fromCurrency === "ETH" || toCurrency === "BTC" || toCurrency === "ETH") {
      try {
        const cryptoResponse = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd,eur,gbp,jpy,aud,cad,chf,cny,hkd,nzd"
        )
        
        if (!cryptoResponse.ok) {
          throw new Error("Failed to fetch crypto rates")
        }
        
        const cryptoData = await cryptoResponse.json()
        
        let rate = 0
        
        // Handle crypto to fiat
        if (fromCurrency === "BTC" && toCurrency !== "ETH") {
          const currencyLower = toCurrency.toLowerCase()
          rate = cryptoData.bitcoin[currencyLower] || 0
        } 
        else if (fromCurrency === "ETH" && toCurrency !== "BTC") {
          const currencyLower = toCurrency.toLowerCase()
          rate = cryptoData.ethereum[currencyLower] || 0
        }
        // Handle fiat to crypto
        else if (toCurrency === "BTC" && fromCurrency !== "ETH") {
          const currencyLower = fromCurrency.toLowerCase()
          rate = 1 / (cryptoData.bitcoin[currencyLower] || 1)
        }
        else if (toCurrency === "ETH" && fromCurrency !== "BTC") {
          const currencyLower = fromCurrency.toLowerCase()
          rate = 1 / (cryptoData.ethereum[currencyLower] || 1)
        }
        // Handle crypto to crypto
        else if (fromCurrency === "BTC" && toCurrency === "ETH") {
          rate = cryptoData.bitcoin.usd / cryptoData.ethereum.usd
        }
        else if (fromCurrency === "ETH" && toCurrency === "BTC") {
          rate = cryptoData.ethereum.usd / cryptoData.bitcoin.usd
        }
        
        setConversionRate(rate)
        return rate
        
      } catch (error) {
        console.error("Error fetching crypto conversion rate:", error)
        toast({
          title: "Error",
          description: "Could not fetch crypto conversion rates",
          variant: "destructive"
        })
        setIsLoading(false)
        return null
      }
    } 
    // For fiat to fiat conversion
    else {
      try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch conversion rates")
        }
        
        const data = await response.json()
        const rate = data.rates[toCurrency]
        
        setConversionRate(rate)
        setLastUpdated(new Date(data.time_last_update_utc).toLocaleString())
        return rate
        
      } catch (error) {
        console.error("Error fetching conversion rate:", error)
        toast({
          title: "Error",
          description: "Could not fetch conversion rates",
          variant: "destructive"
        })
        setIsLoading(false)
        return null
      }
    }
  }
  
  const handleConvert = async () => {
    const rate = await fetchConversionRate()
    
    if (rate !== null) {
      const calculatedResult = amount * rate
      setResult(calculatedResult)
    }
    
    setIsLoading(false)
  }
  
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    // Clear results to force a recalculation
    setResult(null)
    setConversionRate(null)
  }
  
  const formatCurrencyValue = (value: number) => {
    if (toCurrency === "BTC" || toCurrency === "ETH") {
      return value.toFixed(8)
    } else {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
      })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Currency Converter</h1>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Convert Currencies</CardTitle>
          <CardDescription>
            Exchange rates for 170+ currencies including crypto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                placeholder="Enter amount"
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleSwapCurrencies}
              className="rounded-full"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Result</label>
              <div className="relative">
                <Input
                  value={result !== null ? formatCurrencyValue(result) : ""}
                  readOnly
                  className="pr-10 bg-muted/50"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-sm font-medium">
                  {toCurrency}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {conversionRate !== null && (
                <div>
                  1 {fromCurrency} = {conversionRate.toFixed(4)} {toCurrency}
                </div>
              )}
              {lastUpdated && (
                <div className="text-xs mt-1">
                  Last updated: {lastUpdated}
                </div>
              )}
            </div>
            
            <Button onClick={handleConvert} disabled={isLoading} className="gap-2">
              {isLoading && <RefreshCw className="h-4 w-4 animate-spin" />}
              <span>Convert</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Popular Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            <Button variant="outline" className="justify-start" onClick={() => {
              setFromCurrency("USD");
              setToCurrency("EUR");
              handleConvert();
            }}>
              USD to EUR
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => {
              setFromCurrency("EUR");
              setToCurrency("USD");
              handleConvert();
            }}>
              EUR to USD
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => {
              setFromCurrency("USD");
              setToCurrency("GBP");
              handleConvert();
            }}>
              USD to GBP
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => {
              setFromCurrency("USD");
              setToCurrency("BTC");
              handleConvert();
            }}>
              USD to BTC
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => {
              setFromCurrency("USD");
              setToCurrency("ETH");
              handleConvert();
            }}>
              USD to ETH
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => {
              setFromCurrency("BTC");
              setToCurrency("USD");
              handleConvert();
            }}>
              BTC to USD
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
