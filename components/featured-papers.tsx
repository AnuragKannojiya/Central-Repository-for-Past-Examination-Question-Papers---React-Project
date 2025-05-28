"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock data for featured papers
const featuredPapers = [
  {
    id: 1,
    title: "Computer Science: Data Structures and Algorithms",
    department: "Computer Science",
    year: "2023",
    downloads: 1245,
    isPremium: false,
  },
  {
    id: 2,
    title: "Mechanical Engineering: Thermodynamics",
    department: "Mechanical Engineering",
    year: "2023",
    downloads: 987,
    isPremium: true,
  },
  {
    id: 3,
    title: "Business Administration: Marketing Management",
    department: "Business",
    year: "2023",
    downloads: 1102,
    isPremium: false,
  },
  {
    id: 4,
    title: "Electrical Engineering: Circuit Analysis",
    department: "Electrical Engineering",
    year: "2022",
    downloads: 856,
    isPremium: true,
  },
  {
    id: 5,
    title: "Medicine: Human Anatomy",
    department: "Medicine",
    year: "2023",
    downloads: 1320,
    isPremium: true,
  },
  {
    id: 6,
    title: "Psychology: Cognitive Psychology",
    department: "Psychology",
    year: "2022",
    downloads: 743,
    isPremium: false,
  },
]

export function FeaturedPapers() {
  const [papers] = useState(featuredPapers)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {papers.map((paper) => (
        <Card key={paper.id} className="flex flex-col h-full">
          <CardContent className="pt-6 flex-grow">
            <div className="flex justify-between items-start mb-3">
              <Badge variant={paper.isPremium ? "default" : "secondary"}>{paper.isPremium ? "Premium" : "Free"}</Badge>
              <Badge variant="outline">{paper.year}</Badge>
            </div>
            <h3 className="font-semibold text-lg mb-2">{paper.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">Department: {paper.department}</p>
            <p className="text-sm text-muted-foreground">{paper.downloads} downloads</p>
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/papers/${paper.id}`}>
                <Eye className="mr-2 h-4 w-4" /> Preview
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={paper.isPremium ? "/pricing" : `/papers/${paper.id}/download`}>
                <Download className="mr-2 h-4 w-4" /> {paper.isPremium ? "Upgrade" : "Download"}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
