"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { FileText, Users, Download, CreditCard } from "lucide-react"

// Mock data for demonstration
const mockStats = {
  totalPapers: 1284,
  totalUsers: 573,
  totalDownloads: 12234,
  activeSubscriptions: 89,
  paperGrowth: 10,
  userGrowth: 12,
  downloadGrowth: 25,
  subscriptionGrowth: 15,
}

export function AdminStats() {
  const [stats, setStats] = useState<typeof mockStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchStats = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setStats(mockStats)
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-6 w-[60px]" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="rounded-lg border p-6 text-center">
        <p className="text-muted-foreground">Unable to load statistics</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Papers</p>
            <p className="text-2xl font-bold">{stats.totalPapers}</p>
            <p className="text-xs text-muted-foreground">+{stats.paperGrowth}% from last month</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <FileText className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
            <p className="text-xs text-muted-foreground">+{stats.userGrowth}% from last month</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Users className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Downloads</p>
            <p className="text-2xl font-bold">{stats.totalDownloads}</p>
            <p className="text-xs text-muted-foreground">+{stats.downloadGrowth}% from last month</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Download className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Subscriptions</p>
            <p className="text-2xl font-bold">{stats.activeSubscriptions}</p>
            <p className="text-xs text-muted-foreground">+{stats.subscriptionGrowth}% from last month</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <CreditCard className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
