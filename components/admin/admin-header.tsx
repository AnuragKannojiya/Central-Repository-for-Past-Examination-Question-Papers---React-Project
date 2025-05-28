"use client"

import Link from "next/link"
import type { UserSession } from "@/lib/auth-service"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { AdminUserNav } from "@/components/admin/admin-user-nav"
import { AdminMainNav } from "@/components/admin/admin-main-nav"
import { AdminMobileSidebar } from "@/components/admin/admin-mobile-sidebar"

interface AdminHeaderProps {
  user: UserSession
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <AdminMobileSidebar />
          <Link href="/admin/dashboard" className="hidden items-center space-x-2 md:flex">
            <span className="hidden font-bold sm:inline-block">EduArchive Admin</span>
          </Link>
          <AdminMainNav className="hidden md:flex" />
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">User Dashboard</Link>
          </Button>
          <AdminUserNav user={user} />
        </div>
      </div>
    </header>
  )
}
