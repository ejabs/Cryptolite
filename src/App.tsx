
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Layout from "@/components/layout/Layout"
import Dashboard from "@/pages/Dashboard"
import Crypto from "@/pages/Crypto"
import Forex from "@/pages/Forex"
import Markets from "@/pages/Markets"
import News from "@/pages/News"
import Converter from "@/pages/Converter"
import Charts from "@/pages/Charts"
import Settings from "@/pages/Settings"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="crypto-fx-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="crypto" element={<Crypto />} />
            <Route path="forex" element={<Forex />} />
            <Route path="markets" element={<Markets />} />
            <Route path="news" element={<News />} />
            <Route path="analysis" element={<Dashboard />} />
            <Route path="converter" element={<Converter />} />
            <Route path="charts" element={<Charts />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<div>404 - Not Found</div>} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
