"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Filter, SearchIcon, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Mock data for papers (same as in papers page)
const allPapers = [
  {
    id: 1,
    title: "Computer Science: Data Structures and Algorithms",
    department: "Computer Science",
    year: "2023",
    downloads: 1245,
    isPremium: false,
    semester: "Spring",
    examType: "Final",
    professor: "Dr. Smith",
    keywords: ["algorithms", "data structures", "computer science"],
  },
  {
    id: 2,
    title: "Mechanical Engineering: Thermodynamics",
    department: "Mechanical Engineering",
    year: "2023",
    downloads: 987,
    isPremium: true,
    semester: "Fall",
    examType: "Midterm",
    professor: "Dr. Johnson",
    keywords: ["thermodynamics", "mechanical engineering", "heat transfer"],
  },
  {
    id: 3,
    title: "Business Administration: Marketing Management",
    department: "Business",
    year: "2023",
    downloads: 1102,
    isPremium: false,
    semester: "Spring",
    examType: "Final",
    professor: "Prof. Williams",
    keywords: ["marketing", "business", "management"],
  },
  {
    id: 4,
    title: "Electrical Engineering: Circuit Analysis",
    department: "Electrical Engineering",
    year: "2022",
    downloads: 856,
    isPremium: true,
    semester: "Fall",
    examType: "Final",
    professor: "Dr. Brown",
    keywords: ["circuits", "electrical engineering", "analysis"],
  },
  {
    id: 5,
    title: "Medicine: Human Anatomy",
    department: "Medicine",
    year: "2023",
    downloads: 1320,
    isPremium: true,
    semester: "Spring",
    examType: "Midterm",
    professor: "Dr. Davis",
    keywords: ["anatomy", "medicine", "human body"],
  },
  {
    id: 6,
    title: "Psychology: Cognitive Psychology",
    department: "Psychology",
    year: "2022",
    downloads: 743,
    isPremium: false,
    semester: "Fall",
    examType: "Final",
    professor: "Dr. Miller",
    keywords: ["psychology", "cognitive", "brain"],
  },
  {
    id: 7,
    title: "Computer Science: Operating Systems",
    department: "Computer Science",
    year: "2022",
    downloads: 932,
    isPremium: true,
    semester: "Spring",
    examType: "Final",
    professor: "Dr. Wilson",
    keywords: ["operating systems", "computer science", "OS"],
  },
  {
    id: 8,
    title: "Civil Engineering: Structural Analysis",
    department: "Civil Engineering",
    year: "2023",
    downloads: 678,
    isPremium: false,
    semester: "Fall",
    examType: "Midterm",
    professor: "Prof. Taylor",
    keywords: ["structural", "civil engineering", "analysis"],
  },
  {
    id: 9,
    title: "Physics: Quantum Mechanics",
    department: "Physics",
    year: "2021",
    downloads: 1056,
    isPremium: true,
    semester: "Spring",
    examType: "Final",
    professor: "Dr. Anderson",
    keywords: ["quantum", "physics", "mechanics"],
  },
  {
    id: 10,
    title: "Mathematics: Linear Algebra",
    department: "Mathematics",
    year: "2023",
    downloads: 890,
    isPremium: false,
    semester: "Fall",
    examType: "Final",
    professor: "Prof. Thomas",
    keywords: ["linear algebra", "mathematics", "vectors"],
  },
  {
    id: 11,
    title: "Chemistry: Organic Chemistry",
    department: "Chemistry",
    year: "2022",
    downloads: 765,
    isPremium: true,
    semester: "Spring",
    examType: "Midterm",
    professor: "Dr. Jackson",
    keywords: ["organic", "chemistry", "compounds"],
  },
  {
    id: 12,
    title: "Economics: Macroeconomics",
    department: "Economics",
    year: "2023",
    downloads: 823,
    isPremium: false,
    semester: "Fall",
    examType: "Final",
    professor: "Prof. White",
    keywords: ["macroeconomics", "economics", "fiscal policy"],
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
const semesters = ["All Semesters", "Spring", "Summer", "Fall", "Winter"]
const examTypes = ["All Types", "Final", "Midterm", "Quiz", "Assignment"]

export default function AdvancedSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [department, setDepartment] = useState("All Departments")
  const [year, setYear] = useState("All Years")
  const [semester, setSemester] = useState("All Semesters")
  const [examType, setExamType] = useState("All Types")
  const [paperType, setPaperType] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const papersPerPage = 6

  // Filter papers based on search and filters
  const filteredPapers = allPapers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase())) ||
      paper.professor.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = department === "All Departments" || paper.department === department
    const matchesYear = year === "All Years" || paper.year === year
    const matchesSemester = semester === "All Semesters" || paper.semester === semester
    const matchesExamType = examType === "All Types" || paper.examType === examType
    const matchesType =
      paperType === "all" || (paperType === "free" && !paper.isPremium) || (paperType === "premium" && paper.isPremium)

    return matchesSearch && matchesDepartment && matchesYear && matchesSemester && matchesExamType && matchesType
  })

  // Sort papers
  const sortedPapers = [...filteredPapers].sort((a, b) => {
    if (sortBy === "downloads") {
      return b.downloads - a.downloads
    } else if (sortBy === "newest") {
      return Number.parseInt(b.year) - Number.parseInt(a.year)
    } else if (sortBy === "oldest") {
      return Number.parseInt(a.year) - Number.parseInt(b.year)
    }
    // Default: relevance (keep original order)
    return 0
  })

  // Pagination logic
  const totalPages = Math.ceil(sortedPapers.length / papersPerPage)
  const indexOfLastPaper = currentPage * papersPerPage
  const indexOfFirstPaper = indexOfLastPaper - papersPerPage
  const currentPapers = sortedPapers.slice(indexOfFirstPaper, indexOfLastPaper)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Advanced Search</h1>
          <p className="text-muted-foreground">Find exactly what you need with our powerful search tools</p>
        </div>
      </div>

      {/* Main Search Bar */}
      <div className="bg-muted/40 p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by keyword, title, professor..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setShowFilters(!showFilters)}>
            <Filter className="mr-2 h-4 w-4" /> {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          <Button type="submit">
            <SearchIcon className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="department">Department</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="year">Year</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((yr) => (
                    <SelectItem key={yr} value={yr}>
                      {yr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="semester">Semester</Label>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger id="semester">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((sem) => (
                    <SelectItem key={sem} value={sem}>
                      {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="examType">Exam Type</Label>
              <Select value={examType} onValueChange={setExamType}>
                <SelectTrigger id="examType">
                  <SelectValue placeholder="Select Exam Type" />
                </SelectTrigger>
                <SelectContent>
                  {examTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="paperType">Paper Type</Label>
              <Select value={paperType} onValueChange={setPaperType}>
                <SelectTrigger id="paperType">
                  <SelectValue placeholder="Select Paper Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Papers</SelectItem>
                  <SelectItem value="free">Free Papers</SelectItem>
                  <SelectItem value="premium">Premium Papers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sortBy">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sortBy">
                  <SelectValue placeholder="Sort Results" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="downloads">Most Downloads</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing {filteredPapers.length > 0 ? indexOfFirstPaper + 1 : 0}-
          {Math.min(indexOfLastPaper, filteredPapers.length)} of {filteredPapers.length} results
        </p>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Sorted by: <span className="font-medium">{sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}</span>
          </span>
        </div>
      </div>

      {/* Results Grid */}
      {currentPapers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentPapers.map((paper) => (
            <Card key={paper.id} className="flex flex-col h-full">
              <CardContent className="pt-6 flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant={paper.isPremium ? "default" : "secondary"}>
                    {paper.isPremium ? "Premium" : "Free"}
                  </Badge>
                  <div className="flex gap-2">
                    <Badge variant="outline">{paper.year}</Badge>
                    <Badge variant="outline">{paper.examType}</Badge>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{paper.title}</h3>
                <p className="text-muted-foreground text-sm mb-1">Department: {paper.department}</p>
                <p className="text-muted-foreground text-sm mb-1">Professor: {paper.professor}</p>
                <p className="text-muted-foreground text-sm mb-1">Semester: {paper.semester}</p>
                <p className="text-sm text-muted-foreground mt-2">{paper.downloads} downloads</p>
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
              setSemester("All Semesters")
              setExamType("All Types")
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

      {/* Search Tips */}
      <div className="mt-12">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="search-tips">
            <AccordionTrigger>Search Tips</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Keyword Search</h4>
                  <p className="text-muted-foreground">
                    Use specific keywords related to the subject or topic you're looking for.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Filter Combinations</h4>
                  <p className="text-muted-foreground">Combine multiple filters to narrow down your search results.</p>
                </div>
                <div>
                  <h4 className="font-medium">Professor Names</h4>
                  <p className="text-muted-foreground">
                    Search by professor name to find papers from specific instructors.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Exam Types</h4>
                  <p className="text-muted-foreground">
                    Filter by exam type (Final, Midterm, etc.) to find specific test formats.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
