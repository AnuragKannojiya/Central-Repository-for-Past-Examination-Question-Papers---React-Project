"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FileText, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for demonstration
const mockDownloads = [
  {
    id: "1",
    title: "Computer Science Final Exam 2022",
    department: "Computer Science",
    downloadedAt: "2023-11-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Mathematics Midterm 2023",
    department: "Mathematics",
    downloadedAt: "2023-11-10T14:45:00Z",
  },
  {
    id: "3",
    title: "Physics Lab Report Guidelines",
    department: "Physics",
    downloadedAt: "2023-11-05T09:15:00Z",
  },
  {
    id: "4",
    title: "English Literature Essay Questions",
    department: "English",
    downloadedAt: "2023-10-28T16:20:00Z",
  },
]

export function RecentDownloads() {
  const [downloads, setDownloads] = useState<typeof mockDownloads | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchDownloads = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setDownloads(mockDownloads)
      } catch (error) {
        console.error("Error fetching downloads:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDownloads()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!downloads?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Download className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No downloads yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">When you download papers, they will appear here.</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/search">Browse Papers</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {downloads.map((download) => (
        <div key={download.id} className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
            <FileText className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <Link href={`/papers/${download.id}`} className="font-medium hover:underline">
                {download.title}
              </Link>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/papers/${download.id}`}>
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">View paper</span>
                </Link>
              </Button>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{download.department}</span>
              <span className="mx-2">•</span>
              <span>{new Date(download.downloadedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
      <div className="pt-2">
        <Button variant="outline" asChild className="w-full">
          <Link href="/dashboard/downloads">View All Downloads</Link>
        </Button>
      </div>
    </div>
  )
}
