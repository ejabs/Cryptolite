
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { 
  BarChart3, 
  Bitcoin, 
  DollarSign, 
  Globe, 
  Home, 
  LayoutDashboard, 
  LineChart, 
  Newspaper, 
  Settings, 
  TrendingUp 
} from "lucide-react"

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const location = useLocation()
  
  const menuItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Crypto",
      href: "/crypto",
      icon: <Bitcoin className="h-5 w-5" />,
    },
    {
      title: "Forex",
      href: "/forex",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: "Markets",
      href: "/markets",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      title: "News",
      href: "/news",
      icon: <Newspaper className="h-5 w-5" />,
    },
    {
      title: "Analysis",
      href: "/analysis",
      icon: <LineChart className="h-5 w-5" />,
    },
    {
      title: "Converter",
      href: "/converter",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      title: "Charts",
      href: "/charts",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className={cn("pb-12", className)}>
      <div className="py-4">
        <div className="px-3 py-2">
          <div className="mb-6 flex items-center px-2">
            <Home className="mr-2 h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold tracking-tight">Crypto & FX</h2>
          </div>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                  location.pathname === item.href 
                    ? "bg-accent text-accent-foreground" 
                    : "text-muted-foreground hover:bg-accent/50"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
