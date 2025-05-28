"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { FileText, UserPlus, Download, CreditCard, Settings, AlertTriangle } from "lucide-react"

// Mock data for demonstration
const mockActivities = [
  {
    id: "1",
    type: "paper_upload",
    title: "New paper uploaded: Advanced Database Systems Final Exam 2023",
    user: "Admin User",
    timestamp: "2023-11-15T10:30:00Z",
  },
  {
    id: "2",
    type: "user_register",
    title: "New user registered: john.smith@example.com",
    user: "System",
    timestamp: "2023-11-14T14:45:00Z",
  },
  {
    id: "3",
    type: "paper_download",
    title: "Paper downloaded: Calculus II Midterm Examination",
    user: "Sarah Johnson",
    timestamp: "2023-11-14T09:15:00Z",
  },
  {
    id: "4",
    type: "subscription",
    title: "New premium subscription: michael.brown@example.com",
    user: "System",
    timestamp: "2023-11-13T16:20:00Z",
  },
  {
    id: "5",
    type: "settings",
    title: "System settings updated",
    user: "Admin User",
    timestamp: "2023-11-12T11:05:00Z",
  },
  {
    id: "6",
    type: "error",
    title: "Payment processing error for user: lisa.wong@example.com",
    user: "System",
    timestamp: "2023-11-11T08:30:00Z",
  },
]

export function RecentActivity() {
  const [activities, setActivities] = useState<typeof mockActivities | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchActivities = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setActivities(mockActivities)
      } catch (error) {
        console.error("Error fetching activities:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!activities?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <FileText className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No recent activity</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          System activity will appear here as users interact with the platform.
        </p>
      </div>
    )
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "paper_upload":
        return <FileText className="h-5 w-5" />
      case "user_register":
        return <UserPlus className="h-5 w-5" />
      case "paper_download":
        return <Download className="h-5 w-5" />
      case "subscription":
        return <CreditCard className="h-5 w-5" />
      case "settings":
        return <Settings className="h-5 w-5" />
      case "error":
        return <AlertTriangle className="h-5 w-5 text-destructive" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">{activity.title}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{activity.user}</span>
              <span className="mx-2">•</span>
              <span>{new Date(activity.timestamp).toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
