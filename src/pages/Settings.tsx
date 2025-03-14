
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Check, Download, Settings2, Share2, Trash, Save } from "lucide-react"

export default function SettingsPage() {
  const [priceCurrency, setPriceCurrency] = useState("USD")
  const [showLogo, setShowLogo] = useState(true)
  const [dataRefreshRate, setDataRefreshRate] = useState("30")
  const [showNotifications, setShowNotifications] = useState(true)
  const [chartType, setChartType] = useState("line")
  const [defaultFavorites, setDefaultFavorites] = useState(true)
  const { toast } = useToast()
  
  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem("crypto_fx_settings")
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        setPriceCurrency(settings.priceCurrency || "USD")
        setShowLogo(settings.showLogo !== undefined ? settings.showLogo : true)
        setDataRefreshRate(settings.dataRefreshRate || "30")
        setShowNotifications(settings.showNotifications !== undefined ? settings.showNotifications : true)
        setChartType(settings.chartType || "line")
        setDefaultFavorites(settings.defaultFavorites !== undefined ? settings.defaultFavorites : true)
      }
    } catch (error) {
      console.error("Error loading settings:", error)
    }
  }, [])
  
  const saveSettings = () => {
    try {
      const settings = {
        priceCurrency,
        showLogo,
        dataRefreshRate,
        showNotifications,
        chartType,
        defaultFavorites
      }
      
      localStorage.setItem("crypto_fx_settings", JSON.stringify(settings))
      
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated",
        action: <Check className="h-4 w-4" />
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Could not save settings",
        variant: "destructive"
      })
    }
  }
  
  const resetSettings = () => {
    setPriceCurrency("USD")
    setShowLogo(true)
    setDataRefreshRate("30")
    setShowNotifications(true)
    setChartType("line")
    setDefaultFavorites(true)
    
    localStorage.removeItem("crypto_fx_settings")
    
    toast({
      title: "Settings reset",
      description: "All settings have been restored to defaults"
    })
  }
  
  const clearLocalStorage = () => {
    localStorage.clear()
    
    toast({
      title: "Data cleared",
      description: "All local data has been cleared",
      action: <Check className="h-4 w-4" />
    })
  }
  
  const exportData = () => {
    try {
      const data = {
        settings: JSON.parse(localStorage.getItem("crypto_fx_settings") || "{}"),
        watchlist: JSON.parse(localStorage.getItem("crypto_fx_watchlist") || "[]"),
        alerts: JSON.parse(localStorage.getItem("crypto_fx_alerts") || "[]")
      }
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      
      const a = document.createElement("a")
      a.href = url
      a.download = "crypto_fx_backup.json"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast({
        title: "Export successful",
        description: "Your data has been exported"
      })
    } catch (error) {
      console.error("Error exporting data:", error)
      toast({
        title: "Export failed",
        description: "Could not export data",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Button onClick={saveSettings} className="gap-2">
          <Save className="h-4 w-4" />
          <span>Save Settings</span>
        </Button>
      </div>
      
      <Tabs defaultValue="display" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="display">Display</TabsTrigger>
          <TabsTrigger value="data">Data & Privacy</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="backup">Backup & Reset</TabsTrigger>
        </TabsList>
        
        <TabsContent value="display" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>
                Customize how data is displayed in the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="currency">Price Currency</Label>
                    <p className="text-sm text-muted-foreground">
                      Select your preferred currency for price display
                    </p>
                  </div>
                  <Select value={priceCurrency} onValueChange={setPriceCurrency}>
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                      <SelectItem value="AUD">AUD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showLogo">Show Logo</Label>
                    <p className="text-sm text-muted-foreground">
                      Display crypto and FX logos in listings
                    </p>
                  </div>
                  <Switch id="showLogo" checked={showLogo} onCheckedChange={setShowLogo} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="refreshRate">Data Refresh Rate</Label>
                    <p className="text-sm text-muted-foreground">
                      How often price data is refreshed (in seconds)
                    </p>
                  </div>
                  <Select value={dataRefreshRate} onValueChange={setDataRefreshRate}>
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 sec</SelectItem>
                      <SelectItem value="30">30 sec</SelectItem>
                      <SelectItem value="60">1 min</SelectItem>
                      <SelectItem value="300">5 min</SelectItem>
                      <SelectItem value="600">10 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Default Chart Type</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Select your preferred chart visualization
                  </p>
                  <RadioGroup value={chartType} onValueChange={setChartType} className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="line" id="line" />
                      <Label htmlFor="line">Line Chart</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="area" id="area" />
                      <Label htmlFor="area">Area Chart</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="candlestick" id="candlestick" />
                      <Label htmlFor="candlestick">Candlestick Chart</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy Settings</CardTitle>
              <CardDescription>
                Manage how your data is used and stored
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showNotifications">Show Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable browser notifications for price alerts
                    </p>
                  </div>
                  <Switch 
                    id="showNotifications" 
                    checked={showNotifications} 
                    onCheckedChange={setShowNotifications} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="defaultFavorites">Default Favorites</Label>
                    <p className="text-sm text-muted-foreground">
                      Show popular cryptocurrencies and forex pairs in watchlist by default
                    </p>
                  </div>
                  <Switch 
                    id="defaultFavorites" 
                    checked={defaultFavorites} 
                    onCheckedChange={setDefaultFavorites} 
                  />
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Data Storage</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This application uses your browser's local storage to save settings, 
                    watchlists, and alerts. No data is sent to any server or shared with 
                    third parties.
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={clearLocalStorage}
                    className="gap-2"
                  >
                    <Trash className="h-4 w-4" />
                    <span>Clear All Local Data</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Alert Settings</CardTitle>
              <CardDescription>
                Configure how price alerts are displayed and managed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Alert Sound</Label>
                    <p className="text-sm text-muted-foreground">
                      Play sound when price alert is triggered
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Alert Duration</Label>
                    <p className="text-sm text-muted-foreground">
                      How long alerts remain visible
                    </p>
                  </div>
                  <Select defaultValue="10">
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 sec</SelectItem>
                      <SelectItem value="10">10 sec</SelectItem>
                      <SelectItem value="30">30 sec</SelectItem>
                      <SelectItem value="60">1 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-remove Triggered Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically remove alerts after they are triggered
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Alert Limits</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    You can set up to 10 price alerts at once. Alerts are stored locally 
                    in your browser and will remain active until manually removed or triggered.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="backup" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Reset</CardTitle>
              <CardDescription>
                Manage your application data and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Export Data</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download a backup of your settings, watchlists, and alerts as a JSON file
                  </p>
                  <Button 
                    onClick={exportData}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export All Data</span>
                  </Button>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Import Data</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Restore your settings from a previously exported file
                  </p>
                  <div className="flex items-center gap-2">
                    <Input type="file" className="max-w-xs" />
                    <Button variant="outline">
                      Import
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Reset to Default</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Reset all settings to their default values. This will not delete your 
                    watchlists or alerts.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={resetSettings}
                    className="gap-2"
                  >
                    <Settings2 className="h-4 w-4" />
                    <span>Reset All Settings</span>
                  </Button>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Share Configuration</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Generate a shareable link with your current dashboard configuration
                  </p>
                  <Button 
                    variant="outline"
                    className="gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Generate Share Link</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
