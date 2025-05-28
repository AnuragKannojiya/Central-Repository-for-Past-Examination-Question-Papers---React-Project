"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/lib/auth-context"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function Navbar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Papers", href: "/papers" },
    { name: "Search", href: "/search" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ]

  const userNavigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Profile", href: "/profile" },
    { name: "Downloads", href: "/downloads" },
    { name: "Settings", href: "/settings" },
    { name: "Subscription", href: "/subscription" },
  ]

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="text-xl font-bold">
                EduArchive
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    isActive(item.href)
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:border-gray-300 hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <ModeToggle />
            {user ? (
              <>
                <div className="relative ml-3">
                  <div className="flex space-x-3">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`text-sm font-medium ${
                          isActive(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Button variant="outline" onClick={logout}>
                      Logout
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex space-x-4">
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="mt-6 flow-root">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block px-3 py-2 text-base font-medium ${
                          isActive(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {user && (
                      <>
                        <div className="border-t border-gray-200 dark:border-gray-700"></div>
                        {userNavigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`block px-3 py-2 text-base font-medium ${
                              isActive(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                  {user ? (
                    <div className="border-t border-gray-200 py-6 dark:border-gray-700">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          logout()
                          setIsOpen(false)
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="border-t border-gray-200 py-6 dark:border-gray-700">
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full" asChild onClick={() => setIsOpen(false)}>
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button className="w-full" asChild onClick={() => setIsOpen(false)}>
                          <Link href="/register">Register</Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
