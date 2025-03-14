
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar className="w-64 hidden md:block border-r" />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
