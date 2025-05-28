"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Download, FileText, Search, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useToast } from "@/components/ui/use-toast"

// Mock data for downloads
const downloadHistory = [
  {
    id: 1,
    title: "Computer Science: Data Structures and Algorithms",
    department: "Computer Science",
    year: "2023",
    downloadDate: "2023-05-20T14:30:00",
    fileSize: "2.4 MB",
    fileType: "PDF",
  },
  {
    id: 2,
    title: "Mathematics: Linear Algebra",
    department: "Mathematics",
    year: "2023",
    downloadDate: "2023-05-18T09:15:00",
    fileSize: "1.8 MB",
    fileType: "PDF",
  },
  {
    id: 3,
    title: "Physics: Quantum Mechanics",
    department: "Physics",
    year: "2021",
    downloadDate: "2023-05-15T16:45:00",
    fileSize: "3.2 MB",
    fileType: "PDF",
  },
  {
    id: 4,
    title: "Business Administration: Marketing Management",
    department: "Business",
    year: "2023",
    downloadDate: "2023-05-10T11:20:00",
    fileSize: "1.5 MB",
    fileType: "PDF",
  },
  {
    id: 5,
    title: "Civil Engineering: Structural Analysis",
    department: "Civil Engineering",
    year: "2023",
    downloadDate: "2023-05-05T13:10:00",
    fileSize: "2.1 MB",
    fileType: "PDF",
  },
  {
    id: 6,
    title: "Psychology: Cognitive Psychology",
    department: "Psychology",
    year: "2022",
    downloadDate: "2023-04-28T10:05:00",
    fileSize: "1.9 MB",
    fileType: "PDF",
  },
  {
    id: 7,
    title: "Economics: Macroeconomics",
    department: "Economics",
    year: "2023",
    downloadDate: "2023-04-20T15:30:00",
    fileSize: "2.3 MB",
    fileType: "PDF",
  },
  {
    id: 8,
    title: "Chemistry: Organic Chemistry",
    department: "Chemistry",
    year: "2022",
    downloadDate: "2023-04-15T09:45:00",
    fileSize: "2.7 MB",
    fileType: "PDF",
  },
  {
    id: 9,
    title: "Mechanical Engineering: Thermodynamics",
    department: "Mechanical Engineering",
    year: "2023",
    downloadDate: "2023-04-10T14:20:00",
    fileSize: "2.2 MB",
    fileType: "PDF",
  },
  {
    id: 10,
    title: "Computer Science: Operating Systems",
    department: "Computer Science",
    year: "2022",
    downloadDate: "2023-04-05T11:15:00",
    fileSize: "2.5 MB",
    fileType: "PDF",
  },
]

export default function DownloadsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [downloads, setDownloads] = useState(downloadHistory)
  const [searchQuery, setSearchQuery] = useState("")
  const [department, setDepartment] = useState("All Departments")
  const [timeframe, setTimeframe] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  const handleDownload = (id: number) => {
    toast({
      title: "Download started",
      description: "Your file is being downloaded.",
    })
  }

  const handleDelete = (id: number) => {
    setDownloads(downloads.filter((download) => download.id !== id))
    toast({
      title: "Download removed",
      description: "The download has been removed from your history.",
    })
  }

  // Filter downloads based on search and filters
  const filteredDownloads = downloads.filter((download) => {
    const matchesSearch = download.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = department === "All Departments" || download.department === department

    const downloadDate = new Date(download.downloadDate)
    const now = new Date()
    const oneDay = 24 * 60 * 60 * 1000
    const oneWeek = 7 * oneDay
    const oneMonth = 30 * oneDay

    const matchesTimeframe =
      timeframe === "all" ||
      (timeframe === "today" && now.getTime() - downloadDate.getTime() < oneDay) ||
      (timeframe === "week" && now.getTime() - downloadDate.getTime() < oneWeek) ||
      (timeframe === "month" && now.getTime() - downloadDate.getTime() < oneMonth)

    return matchesSearch && matchesDepartment && matchesTimeframe
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredDownloads.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredDownloads.slice(indexOfFirstItem, indexOfLastItem)

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Downloads</h1>
          <p className="text-muted-foreground">View and manage your downloaded examination papers</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search downloads..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Departments">All Departments</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                  <SelectItem value="Psychology">Psychology</SelectItem>
                  <SelectItem value="Economics">Economics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                </SelectContent>
              </Select>

              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Downloads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Download History</CardTitle>
          <CardDescription>You have downloaded {filteredDownloads.length} papers</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredDownloads.length > 0 ? (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Paper</TableHead>
                      <TableHead className="hidden md:table-cell">Department</TableHead>
                      <TableHead className="hidden md:table-cell">Year</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="hidden md:table-cell">Size</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((download) => (
                      <TableRow key={download.id}>
                        <TableCell>
                          <div className="font-medium">{download.title}</div>
                          <div className="md:hidden text-sm text-muted-foreground">
                            <div>
                              {download.department} • {download.year}
                            </div>
                            <div>{new Date(download.downloadDate).toLocaleDateString()}</div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{download.department}</TableCell>
                        <TableCell className="hidden md:table-cell">{download.year}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {new Date(download.downloadDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{download.fileSize}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleDownload(download.id)}>
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(download.id)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-4 flex justify-center">
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
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No downloads found</h3>
              <p className="text-muted-foreground mb-6">You haven't downloaded any papers matching your filters</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setDepartment("All Departments")
                  setTimeframe("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Download Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{downloads.length}</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                downloads.filter((d) => {
                  const downloadDate = new Date(d.downloadDate)
                  const now = new Date()
                  const oneWeek = 7 * 24 * 60 * 60 * 1000
                  return now.getTime() - downloadDate.getTime() < oneWeek
                }).length
              }
            </div>
            <p className="text-xs text-muted-foreground">Downloads in the past week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {downloads
                .reduce((total, download) => {
                  return total + Number.parseFloat(download.fileSize.replace(" MB", ""))
                }, 0)
                .toFixed(1)}{" "}
              MB
            </div>
            <p className="text-xs text-muted-foreground">Total download size</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
