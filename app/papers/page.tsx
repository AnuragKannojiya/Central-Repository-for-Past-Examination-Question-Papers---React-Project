"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Filter, Search } from "lucide-react"
import Link from "next/link"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Mock data for papers
const allPapers = [
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
  {
    id: 7,
    title: "Computer Science: Operating Systems",
    department: "Computer Science",
    year: "2022",
    downloads: 932,
    isPremium: true,
  },
  {
    id: 8,
    title: "Civil Engineering: Structural Analysis",
    department: "Civil Engineering",
    year: "2023",
    downloads: 678,
    isPremium: false,
  },
  {
    id: 9,
    title: "Physics: Quantum Mechanics",
    department: "Physics",
    year: "2021",
    downloads: 1056,
    isPremium: true,
  },
  {
    id: 10,
    title: "Mathematics: Linear Algebra",
    department: "Mathematics",
    year: "2023",
    downloads: 890,
    isPremium: false,
  },
  {
    id: 11,
    title: "Chemistry: Organic Chemistry",
    department: "Chemistry",
    year: "2022",
    downloads: 765,
    isPremium: true,
  },
  {
    id: 12,
    title: "Economics: Macroeconomics",
    department: "Economics",
    year: "2023",
    downloads: 823,
    isPremium: false,
  },
]

const departments = [
  "All Departments",
  "Computer Science",
  "Mechanical Engineering",
  "Business",
  "Electrical Engineering",
  "Medicine",
  "Psychology",
  "Civil Engineering",
  "Physics",
  "Mathematics",
  "Chemistry",
  "Economics",
]

const years = ["All Years", "2023", "2022", "2021", "2020", "2019"]

export default function PapersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [department, setDepartment] = useState("All Departments")
  const [year, setYear] = useState("All Years")
  const [paperType, setPaperType] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const papersPerPage = 6

  // Filter papers based on search and filters
  const filteredPapers = allPapers.filter((paper) => {
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = department === "All Departments" || paper.department === department
    const matchesYear = year === "All Years" || paper.year === year
    const matchesType =
      paperType === "all" || (paperType === "free" && !paper.isPremium) || (paperType === "premium" && paper.isPremium)

    return matchesSearch && matchesDepartment && matchesYear && matchesType
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredPapers.length / papersPerPage)
  const indexOfLastPaper = currentPage * papersPerPage
  const indexOfFirstPaper = indexOfLastPaper - papersPerPage
  const currentPapers = filteredPapers.slice(indexOfFirstPaper, indexOfLastPaper)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Examination Papers</h1>
          <p className="text-muted-foreground">Browse and download past examination papers</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-muted/40 p-4 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search papers..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger>
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={year} onValueChange={setYear}>
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((yr) => (
                <SelectItem key={yr} value={yr}>
                  {yr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={paperType} onValueChange={setPaperType}>
            <SelectTrigger>
              <SelectValue placeholder="Paper Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Papers</SelectItem>
              <SelectItem value="free">Free Papers</SelectItem>
              <SelectItem value="premium">Premium Papers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing {indexOfFirstPaper + 1}-{Math.min(indexOfLastPaper, filteredPapers.length)} of {filteredPapers.length}{" "}
          papers
        </p>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Filters Applied:{" "}
            {department !== "All Departments" || year !== "All Years" || paperType !== "all" ? "Yes" : "No"}
          </span>
        </div>
      </div>

      {/* Papers Grid */}
      {currentPapers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentPapers.map((paper) => (
            <Card key={paper.id} className="flex flex-col h-full">
              <CardContent className="pt-6 flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant={paper.isPremium ? "default" : "secondary"}>
                    {paper.isPremium ? "Premium" : "Free"}
                  </Badge>
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
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No papers found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
          <Button
            onClick={() => {
              setSearchQuery("")
              setDepartment("All Departments")
              setYear("All Years")
              setPaperType("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {filteredPapers.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) setCurrentPage(currentPage - 1)
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(page)
                  }}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
