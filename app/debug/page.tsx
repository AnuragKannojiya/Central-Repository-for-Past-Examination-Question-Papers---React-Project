"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function DebugPage() {
  const router = useRouter()
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `${new Date().toISOString()}: ${message}`])
  }

  useEffect(() => {
    addLog("Debug page loaded")
  }, [])

  const testRoutes = ["/dashboard", "/dashboard/add-paper", "/dashboard/papers/new", "/login", "/"]

  const navigateTo = (route: string) => {
    addLog(`Attempting to navigate to ${route}`)
    try {
      router.push(route)
    } catch (error) {
      addLog(`Error navigating to ${route}: ${error}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Routing Debug Page</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Test Navigation</h2>
            <div className="flex flex-wrap gap-2">
              {testRoutes.map((route) => (
                <Button key={route} onClick={() => navigateTo(route)} variant="outline">
                  Navigate to {route}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Navigation Logs</h2>
            <div className="bg-muted p-4 rounded-md h-64 overflow-auto">
              {logs.map((log, index) => (
                <div key={index} className="text-sm mb-1 font-mono">
                  {log}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Direct Links</h2>
            <div className="flex flex-wrap gap-2">
              {testRoutes.map((route) => (
                <Button key={route} asChild variant="secondary">
                  <a href={route}>Direct to {route}</a>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
