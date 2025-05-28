"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import type { UserSession } from "@/lib/auth-service"
import { FileText, Download, CreditCard, Settings, User, Search } from "lucide-react"

interface DashboardNavProps {
  user: UserSession
}

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: <FileText className="mr-2 h-4 w-4" />,
      exact: true,
    },
    {
      title: "Search Papers",
      href: "/dashboard/search",
      icon: <Search className="mr-2 h-4 w-4" />,
    },
    {
      title: "My Downloads",
      href: "/dashboard/downloads",
      icon: <Download className="mr-2 h-4 w-4" />,
    },
    {
      title: "Subscription",
      href: "/dashboard/subscription",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <nav className="grid items-start gap-2 p-4">
      {navItems.map((item) => {
        const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: isActive ? "default" : "ghost" }),
              isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              "justify-start",
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
