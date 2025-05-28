"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

// Mock data for demonstration
const mockPapers = [
  {
    id: "1",
    title: "Advanced Database Systems Final Exam 2023",
    department: "Computer Science",
    year: 2023,
    downloads: 1245,
    isPremium: true,
  },
  {
    id: "2",
    title: "Calculus II Midterm Examination",
    department: "Mathematics",
    year: 2023,
    downloads: 987,
    isPremium: false,
  },
  {
    id: "3",
    title: "Organic Chemistry Laboratory Assessment",
    department: "Chemistry",
    year: 2022,
    downloads: 756,
    isPremium: false,
  },
  {
    id: "4",
    title: "Microeconomics Principles Final Exam",
    department: "Economics",
    year: 2023,
    downloads: 1102,
    isPremium: true,
  },
  {
    id: "5",
    title: "Digital Signal Processing Quiz Solutions",
    department: "Electrical Engineering",
    year: 2022,
    downloads: 543,
    isPremium: false,
  },
  {
    id: "6",
    title: "Modern Literature Critical Analysis",
    department: "English",
    year: 2023,
    downloads: 421,
    isPremium: false,
  },
]

export function RecommendedPapers() {
  const [papers, setPapers] = useState<typeof mockPapers | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchPapers = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setPapers(mockPapers)
      } catch (error) {
        console.error("Error fetching papers:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPapers()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!papers?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <FileText className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No recommended papers</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We'll recommend papers based on your interests and activity.
        </p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/search">Browse Papers</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {papers.map((paper) => (
        <div key={paper.id} className="rounded-lg border p-4">
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant={paper.isPremium ? "default" : "secondary"}>
                  {paper.isPremium ? "Premium" : "Free"}
                </Badge>
                <span className="text-xs text-muted-foreground">{paper.year}</span>
              </div>
              <Link href={`/papers/${paper.id}`} className="font-medium hover:underline">
                {paper.title}
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">{paper.department}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Download className="mr-1 h-3 w-3" />
                <span>{paper.downloads}</span>
              </div>
              <Button size="sm" asChild>
                <Link href={`/papers/${paper.id}`}>View Paper</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
