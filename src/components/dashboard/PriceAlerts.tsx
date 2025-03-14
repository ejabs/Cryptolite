
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { Button } from "../ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select"
import { Input } from "../ui/input"
import { useState } from "react"

interface Alert {
  id: string
  asset: string
  condition: "above" | "below"
  price: number
  triggered: boolean
}

export default function PriceAlerts() {
  // In a real app, you would load from localStorage
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: "1", asset: "BTC", condition: "above", price: 50000, triggered: false },
    { id: "2", asset: "ETH", condition: "below", price: 2800, triggered: false },
  ])
  
  const [showForm, setShowForm] = useState(false)
  const [newAlert, setNewAlert] = useState<Partial<Alert>>({
    asset: "BTC",
    condition: "above",
    price: 0
  })
  
  const addAlert = () => {
    if (!newAlert.asset || !newAlert.condition || !newAlert.price) return
    
    const alert: Alert = {
      id: Date.now().toString(),
      asset: newAlert.asset,
      condition: newAlert.condition as "above" | "below",
      price: newAlert.price,
      triggered: false
    }
    
    setAlerts([...alerts, alert])
    setShowForm(false)
    setNewAlert({ asset: "BTC", condition: "above", price: 0 })
    
    // In a real app, you would save to localStorage here
  }
  
  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id))
    // In a real app, you would update localStorage here
  }
  
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle>Price Alerts</CardTitle>
          <CardDescription>Get notified when prices hit your targets</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-1"
          onClick={() => setShowForm(!showForm)}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span>New Alert</span>
        </Button>
      </CardHeader>
      <CardContent>
        {showForm && (
          <div className="flex flex-wrap gap-2 mb-4 p-3 bg-muted/50 rounded-md">
            <Select 
              value={newAlert.asset} 
              onValueChange={value => setNewAlert({...newAlert, asset: value})}
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Asset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BTC">BTC</SelectItem>
                <SelectItem value="ETH">ETH</SelectItem>
                <SelectItem value="XRP">XRP</SelectItem>
                <SelectItem value="SOL">SOL</SelectItem>
                <SelectItem value="ADA">ADA</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={newAlert.condition} 
              onValueChange={value => setNewAlert({
                ...newAlert, 
                condition: value as "above" | "below"
              })}
            >
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="above">Goes above</SelectItem>
                <SelectItem value="below">Goes below</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-1">
              <span className="text-sm">$</span>
              <Input 
                type="number" 
                className="w-28" 
                placeholder="Price"
                value={newAlert.price || ""}
                onChange={e => setNewAlert({
                  ...newAlert, 
                  price: parseFloat(e.target.value)
                })}
              />
            </div>
            
            <Button className="ml-auto" size="sm" onClick={addAlert}>
              Add Alert
            </Button>
          </div>
        )}
      
        {alerts.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <p>No alerts set. Create one to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map(alert => (
              <div key={alert.id} className="flex items-center justify-between bg-background p-3 rounded-md border">
                <div className="flex items-center gap-2">
                  <div className="font-medium">{alert.asset}</div>
                  <div className="text-sm text-muted-foreground">
                    {alert.condition === "above" ? ">" : "<"} ${alert.price.toLocaleString()}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 px-2 text-muted-foreground hover:text-destructive"
                  onClick={() => deleteAlert(alert.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
