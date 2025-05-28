"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { LayoutDashboard, FileText, Users, Settings, BarChart3, CreditCard, Shield } from "lucide-react"

export function AdminNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Overview",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      exact: true,
    },
    {
      title: "Papers",
      href: "/admin/dashboard/papers",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: "Users",
      href: "/admin/dashboard/users",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      title: "Analytics",
      href: "/admin/dashboard/analytics",
      icon: <BarChart3 className="mr-2 h-4 w-4" />,
    },
    {
      title: "Subscriptions",
      href: "/admin/dashboard/subscriptions",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Permissions",
      href: "/admin/dashboard/permissions",
      icon: <Shield className="mr-2 h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/admin/dashboard/settings",
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
