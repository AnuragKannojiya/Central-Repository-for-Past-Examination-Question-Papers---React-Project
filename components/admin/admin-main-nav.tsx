"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface AdminMainNavProps extends React.HTMLAttributes<HTMLElement> {}

export function AdminMainNav({ className, ...props }: AdminMainNavProps) {
  const pathname = usePathname()

  const items = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      title: "Papers",
      href: "/admin/dashboard/papers",
    },
    {
      title: "Users",
      href: "/admin/dashboard/users",
    },
    {
      title: "Analytics",
      href: "/admin/dashboard/analytics",
    },
  ]

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "text-primary" : "text-muted-foreground",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
