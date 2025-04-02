"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  ListPlus,
  Search,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Recycle,
  Menu,
  X,
  FileSearch,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "List Waste",
    href: "/dashboard/list-waste",
    icon: ListPlus,
    role: "producer",
  },
  {
    title: "Request Materials",
    href: "/dashboard/request-materials",
    icon: FileSearch,
    role: "consumer",
  },
  {
    title: "Find Materials",
    href: "/dashboard/find-materials",
    icon: Search,
    role: "consumer",
  },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: MessageSquare,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  // For demo purposes, let's assume the user is both a producer and consumer
  const userRoles = ["producer", "consumer"]

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter((item) => !item.role || userRoles.includes(item.role))

  return (
    <>
      {/* Mobile Navigation */}
      <div className="flex items-center justify-between lg:hidden p-4 border-b">
        <div className="flex items-center gap-2">
          <Recycle className="h-6 w-6 text-green-900" />
          <span className="text-xl font-bold text-green-900">GreenLoop</span>
        </div>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <Recycle className="h-6 w-6 text-green-900" />
                  <span className="text-xl font-bold text-green-900">GreenLoop</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <nav className="grid gap-1 px-2">
                  {filteredNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                        pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.title}
                      {item.role && (
                        <Badge variant="outline" className="ml-auto text-xs">
                          {item.role === "producer" ? "Producer" : "Consumer"}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="border-t p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Acme Corp</p>
                    <p className="text-xs text-muted-foreground">Producer & Consumer</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full justify-start gap-2" asChild>
                  <Link href="/">
                    <LogOut className="h-4 w-4" />
                    Log out
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col h-full border-r bg-white">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Recycle className="h-6 w-6 text-green-900" />
              <span className="text-xl font-bold text-green-900">GreenLoop</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-4">
            <nav className="grid gap-1 px-2">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon
                    className={cn("h-5 w-5", pathname === item.href ? "text-primary" : "text-muted-foreground")}
                  />
                  {item.title}
                  {item.role && (
                    <Badge variant="outline" className="ml-auto text-xs">
                      {item.role === "producer" ? "Producer" : "Consumer"}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t p-4">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Acme Corp</p>
                <p className="text-xs text-muted-foreground">Producer & Consumer</p>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <Link href="/">
                <LogOut className="h-4 w-4" />
                Log out
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

