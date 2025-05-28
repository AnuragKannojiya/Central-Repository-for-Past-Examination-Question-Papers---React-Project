"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { FileText, Download, UserPlus, Settings, Edit } from "lucide-react"

type Activity = {
  id: string
  type: "upload" | "download" | "user_signup" | "settings_change" | "edit"
  user: {
    name: string
    avatar?: string
  }
  item?: string
  timestamp: string
  description: string
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "upload",
    user: {
      name: "John Doe",
      avatar: "/vibrant-street-market.png",
    },
    item: "Computer Science: Data Structures",
    timestamp: "10 minutes ago",
    description: "Uploaded a new paper",
  },
  {
    id: "2",
    type: "download",
    user: {
      name: "Sarah Brown",
      avatar: "/contemplative-artist.png",
    },
    item: "Physics: Quantum Mechanics",
    timestamp: "25 minutes ago",
    description: "Downloaded a paper",
  },
  {
    id: "3",
    type: "user_signup",
    user: {
      name: "Michael Wilson",
    },
    timestamp: "1 hour ago",
    description: "Created a new account",
  },
  {
    id: "4",
    type: "settings_change",
    user: {
      name: "Admin User",
      avatar: "/abstract-admin-interface.png",
    },
    timestamp: "2 hours ago",
    description: "Updated system settings",
  },
  {
    id: "5",
    type: "edit",
    user: {
      name: "Emily Davis",
      avatar: "/confident-woman-portrait.png",
    },
    item: "Mathematics: Calculus",
    timestamp: "3 hours ago",
    description: "Edited paper details",
  },
]

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "upload":
      return <FileText className="h-4 w-4" />
    case "download":
      return <Download className="h-4 w-4" />
    case "user_signup":
      return <UserPlus className="h-4 w-4" />
    case "settings_change":
      return <Settings className="h-4 w-4" />
    case "edit":
      return <Edit className="h-4 w-4" />
  }
}

const getActivityColor = (type: Activity["type"]) => {
  switch (type) {
    case "upload":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "download":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "user_signup":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "settings_change":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    case "edit":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
  }
}

export function RecentActivity({ isLoading = false }: { isLoading?: boolean }) {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    if (!isLoading) {
      setActivities(mockActivities)
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <p className="font-medium">{activity.user.name}</p>
              <Badge variant="outline" className={getActivityColor(activity.type)}>
                {getActivityIcon(activity.type)}
                <span className="ml-1">{activity.type.replace("_", " ")}</span>
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {activity.description}
              {activity.item && <span className="font-medium"> "{activity.item}"</span>}
            </p>
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
