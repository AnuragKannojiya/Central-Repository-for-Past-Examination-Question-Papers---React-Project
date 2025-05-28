"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Download, Edit, MoreHorizontal, Search, Trash2, Eye, ArrowUpDown, PlusCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for papers
const papersList = [
  {
    id: 1,
    title: "Computer Science: Data Structures and Algorithms",
    department: "Computer Science",
    year: "2023",
    downloads: 1245,
    isPremium: false,
    dateAdded: "2023-05-15",
  },
  {
    id: 2,
    title: "Mechanical Engineering: Thermodynamics",
    department: "Mechanical Engineering",
    year: "2023",
    downloads: 987,
    isPremium: true,
    dateAdded: "2023-06-02",
  },
  {
    id: 3,
    title: "Business Administration: Marketing Management",
    department: "Business",
    year: "2023",
    downloads: 1102,
    isPremium: false,
    dateAdded: "2023-06-10",
  },
  {
    id: 4,
    title: "Electrical Engineering: Circuit Analysis",
    department: "Electrical Engineering",
    year: "2022",
    downloads: 856,
    isPremium: true,
    dateAdded: "2023-07-05",
  },
  {
    id: 5,
    title: "Medicine: Human Anatomy",
    department: "Medicine",
    year: "2023",
    downloads: 1320,
    isPremium: true,
    dateAdded: "2023-07-22",
  },
  {
    id: 6,
    title: "Psychology: Cognitive Psychology",
    department: "Psychology",
    year: "2022",
    downloads: 743,
    isPremium: false,
    dateAdded: "2023-08-14",
  },
  {
    id: 7,
    title: "Computer Science: Operating Systems",
    department: "Computer Science",
    year: "2022",
    downloads: 932,
    isPremium: true,
    dateAdded: "2023-09-01",
  },
  {
    id: 8,
    title: "Civil Engineering: Structural Analysis",
    department: "Civil Engineering",
    year: "2023",
    downloads: 678,
    isPremium: false,
    dateAdded: "2023-09-18",
  },
]

export function PaperManagement() {
  const [papers, setPapers] = useState(papersList)
  const [filteredPapers, setFilteredPapers] = useState(papersList)
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const [premiumFilter, setPremiumFilter] = useState("all")
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPapers, setSelectedPapers] = useState<number[]>([])
  const { toast } = useToast()
  const router = useRouter()
  const [paperToDelete, setPaperToDelete] = useState<number | null>(null)
  const [paperToToggle, setPaperToToggle] = useState<{ id: number; isPremium: boolean } | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isToggleDialogOpen, setIsToggleDialogOpen] = useState(false)
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let result = [...papers]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (paper) =>
          paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          paper.department.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply department filter
    if (departmentFilter !== "all") {
      result = result.filter((paper) => paper.department === departmentFilter)
    }

    // Apply year filter
    if (yearFilter !== "all") {
      result = result.filter((paper) => paper.year === yearFilter)
    }

    // Apply premium filter
    if (premiumFilter !== "all") {
      result = result.filter((paper) => (premiumFilter === "premium" ? paper.isPremium : !paper.isPremium))
    }

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }

    setFilteredPapers(result)
  }, [papers, searchQuery, departmentFilter, yearFilter, premiumFilter, sortConfig])

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc"

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }

    setSortConfig({ key, direction })
  }

  const handleDeleteClick = (id: number) => {
    setPaperToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const handleToggleClick = (id: number, isPremium: boolean) => {
    setPaperToToggle({ id, isPremium })
    setIsToggleDialogOpen(true)
  }

  const confirmDelete = () => {
    if (paperToDelete !== null) {
      setPapers(papers.filter((paper) => paper.id !== paperToDelete))
      toast({
        title: "Paper deleted",
        description: "The paper has been successfully deleted",
      })
      setPaperToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const confirmToggle = () => {
    if (paperToToggle !== null) {
      setPapers(
        papers.map((paper) =>
          paper.id === paperToToggle.id ? { ...paper, isPremium: !paperToToggle.isPremium } : paper,
        ),
      )
      toast({
        title: "Paper updated",
        description: `The paper has been marked as ${paperToToggle.isPremium ? "Free" : "Premium"}`,
      })
      setPaperToToggle(null)
      setIsToggleDialogOpen(false)
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPapers(filteredPapers.map((paper) => paper.id))
    } else {
      setSelectedPapers([])
    }
  }

  const handleSelectPaper = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedPapers([...selectedPapers, id])
    } else {
      setSelectedPapers(selectedPapers.filter((paperId) => paperId !== id))
    }
  }

  const handleBulkDelete = () => {
    if (selectedPapers.length > 0) {
      setIsBulkDeleteDialogOpen(true)
    }
  }

  const confirmBulkDelete = () => {
    setPapers(papers.filter((paper) => !selectedPapers.includes(paper.id)))
    toast({
      title: "Papers deleted",
      description: `${selectedPapers.length} papers have been successfully deleted`,
    })
    setSelectedPapers([])
    setIsBulkDeleteDialogOpen(false)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setDepartmentFilter("all")
    setYearFilter("all")
    setPremiumFilter("all")
    setSortConfig(null)
  }

  const departments = Array.from(new Set(papers.map((paper) => paper.department)))
  const years = Array.from(new Set(papers.map((paper) => paper.year)))

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center mb-6">
          <div className="relative flex-1">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="ml-4">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <div className="rounded-md border">
          <div className="p-4">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search papers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={premiumFilter} onValueChange={setPremiumFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="free">Free</SelectItem>
            </SelectContent>
          </Select>

          {(searchQuery || departmentFilter !== "all" || yearFilter !== "all" || premiumFilter !== "all") && (
            <Button variant="ghost" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          {selectedPapers.length > 0 && (
            <>
              <span className="text-sm font-medium">{selectedPapers.length} selected</span>
              <Button variant="outline" size="sm" onClick={handleBulkDelete}>
                <Trash2 className="h-4 w-4 mr-2" /> Delete Selected
              </Button>
            </>
          )}
        </div>
        <div>
          <Button asChild>
            <Link href="/dashboard/add-paper">
              <PlusCircle className="h-4 w-4 mr-2" /> Add New Paper
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={filteredPapers.length > 0 && selectedPapers.length === filteredPapers.length}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all papers"
                />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                <div className="flex items-center">
                  Title
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("department")}>
                <div className="flex items-center">
                  Department
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("year")}>
                <div className="flex items-center">
                  Year
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("downloads")}>
                <div className="flex items-center justify-end">
                  Downloads
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("dateAdded")}>
                <div className="flex items-center">
                  Date Added
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPapers.length > 0 ? (
              filteredPapers.map((paper) => (
                <TableRow key={paper.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedPapers.includes(paper.id)}
                      onCheckedChange={(checked) => handleSelectPaper(paper.id, !!checked)}
                      aria-label={`Select ${paper.title}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium max-w-[300px] truncate">{paper.title}</TableCell>
                  <TableCell>{paper.department}</TableCell>
                  <TableCell>{paper.year}</TableCell>
                  <TableCell className="text-right">{paper.downloads.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={paper.isPremium ? "default" : "secondary"}>
                      {paper.isPremium ? "Premium" : "Free"}
                    </Badge>
                  </TableCell>
                  <TableCell>{paper.dateAdded}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/papers/${paper.id}`}>
                            <Eye className="mr-2 h-4 w-4" /> View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/papers/edit/${paper.id}`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleClick(paper.id, paper.isPremium)}>
                          <Badge className="mr-2 h-4" variant={paper.isPremium ? "secondary" : "default"}>
                            {paper.isPremium ? "Free" : "Premium"}
                          </Badge>
                          Mark as {paper.isPremium ? "Free" : "Premium"}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" /> Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteClick(paper.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No papers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this paper?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the paper from the repository.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Toggle Premium Status Dialog */}
      <AlertDialog open={isToggleDialogOpen} onOpenChange={setIsToggleDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change paper status to {paperToToggle?.isPremium ? "Free" : "Premium"}?</AlertDialogTitle>
            <AlertDialogDescription>
              {paperToToggle?.isPremium
                ? "This will make the paper available to all users without requiring a premium subscription."
                : "This will restrict access to this paper to premium subscribers only."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmToggle}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog open={isBulkDeleteDialogOpen} onOpenChange={setIsBulkDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete {selectedPapers.length} papers?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected papers from the repository.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmBulkDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete {selectedPapers.length} Papers
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
