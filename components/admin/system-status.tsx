"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"

// Mock data for demonstration
const mockStatus = {
  serverStatus: "operational",
  databaseStatus: "operational",
  storageUsed: 68,
  cpuUsage: 42,
  memoryUsage: 57,
  lastBackup: "2023-11-14T03:00:00Z",
  activeUsers: 24,
}

export function SystemStatus() {
  const [status, setStatus] = useState<typeof mockStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchStatus = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setStatus(mockStatus)
      } catch (error) {
        console.error("Error fetching system status:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    )
  }

  if (!status) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <XCircle className="h-12 w-12 text-destructive" />
        <h3 className="mt-4 text-lg font-medium">Unable to fetch system status</h3>
        <p className="mt-2 text-sm text-muted-foreground">There was an error retrieving the current system status.</p>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "degraded":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "down":
        return <XCircle className="h-5 w-5 text-destructive" />
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Server</span>
            {getStatusIcon(status.serverStatus)}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Database</span>
            {getStatusIcon(status.databaseStatus)}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Last Backup</span>
            <span className="text-sm">{new Date(status.lastBackup).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Active Users</span>
            <span className="text-sm">{status.activeUsers}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span>Storage</span>
            <span>{status.storageUsed}%</span>
          </div>
          <Progress value={status.storageUsed} className="h-2" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span>CPU Usage</span>
            <span>{status.cpuUsage}%</span>
          </div>
          <Progress value={status.cpuUsage} className="h-2" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span>Memory Usage</span>
            <span>{status.memoryUsage}%</span>
          </div>
          <Progress value={status.memoryUsage} className="h-2" />
        </div>
      </div>
    </div>
  )
}
