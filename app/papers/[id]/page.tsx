"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Calendar, Download, FileText, Lock, Share2, Star, ThumbsUp, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

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
    description:
      "This examination paper covers fundamental data structures such as arrays, linked lists, trees, and graphs, as well as common algorithms for searching, sorting, and graph traversal. Students are expected to analyze algorithm complexity and implement efficient solutions to computational problems.",
    pages: 12,
    fileSize: "2.4 MB",
    dateAdded: "2023-05-15",
    keywords: ["algorithms", "data structures", "computer science"],
    relatedPapers: [7, 3, 10],
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
    description:
      "This examination covers the laws of thermodynamics, heat transfer, energy conversion, and thermodynamic cycles. Students will solve problems related to heat engines, refrigeration systems, and energy efficiency in mechanical systems.",
    pages: 10,
    fileSize: "1.8 MB",
    dateAdded: "2023-06-02",
    keywords: ["thermodynamics", "mechanical engineering", "heat transfer"],
    relatedPapers: [9, 4, 8],
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
    description:
      "This examination tests knowledge of marketing principles, consumer behavior, market research, product development, pricing strategies, and promotional tactics. Students will analyze case studies and develop marketing strategies for various business scenarios.",
    pages: 8,
    fileSize: "1.5 MB",
    dateAdded: "2023-06-10",
    keywords: ["marketing", "business", "management"],
    relatedPapers: [12, 1, 6],
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
    description:
      "This examination covers DC and AC circuit analysis, network theorems, operational amplifiers, and frequency response. Students will analyze and design electrical circuits using various techniques including mesh and nodal analysis.",
    pages: 14,
    fileSize: "2.2 MB",
    dateAdded: "2023-07-05",
    keywords: ["circuits", "electrical engineering", "analysis"],
    relatedPapers: [2, 9, 7],
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
    description:
      "This examination tests knowledge of human anatomical structures, organ systems, and their functions. Students will identify anatomical features, explain physiological processes, and demonstrate understanding of clinical correlations.",
    pages: 16,
    fileSize: "3.2 MB",
    dateAdded: "2023-07-22",
    keywords: ["anatomy", "medicine", "human body"],
    relatedPapers: [11, 6, 3],
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
    description:
      "This examination covers perception, attention, memory, language, problem-solving, and decision-making processes. Students will analyze experimental findings and apply cognitive theories to explain human mental processes.",
    pages: 9,
    fileSize: "1.9 MB",
    dateAdded: "2023-08-14",
    keywords: ["psychology", "cognitive", "brain"],
    relatedPapers: [5, 3, 12],
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
    description:
      "This examination covers process management, memory management, file systems, I/O systems, and distributed systems. Students will analyze operating system designs and solve problems related to resource allocation and scheduling.",
    pages: 11,
    fileSize: "2.5 MB",
    dateAdded: "2023-09-01",
    keywords: ["operating systems", "computer science", "OS"],
    relatedPapers: [1, 4, 10],
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
    description:
      "This examination tests knowledge of structural mechanics, force analysis, deformation, and design principles for beams, trusses, and frames. Students will analyze structural systems and calculate internal forces and displacements.",
    pages: 10,
    fileSize: "2.1 MB",
    dateAdded: "2023-09-18",
    keywords: ["structural", "civil engineering", "analysis"],
    relatedPapers: [2, 4, 9],
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
    description:
      "This examination covers wave-particle duality, Schrödinger's equation, quantum states, and measurement theory. Students will solve quantum mechanical problems and interpret physical phenomena at the quantum level.",
    pages: 13,
    fileSize: "2.7 MB",
    dateAdded: "2023-10-05",
    keywords: ["quantum", "physics", "mechanics"],
    relatedPapers: [10, 4, 2],
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
    description:
      "This examination covers vector spaces, linear transformations, matrices, determinants, eigenvalues, and eigenvectors. Students will solve systems of linear equations and apply linear algebra concepts to various mathematical problems.",
    pages: 8,
    fileSize: "1.8 MB",
    dateAdded: "2023-10-20",
    keywords: ["linear algebra", "mathematics", "vectors"],
    relatedPapers: [9, 1, 7],
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
    description:
      "This examination tests knowledge of organic compounds, reaction mechanisms, stereochemistry, and spectroscopic analysis. Students will identify functional groups, predict reaction outcomes, and propose synthesis routes for organic molecules.",
    pages: 12,
    fileSize: "2.3 MB",
    dateAdded: "2023-11-05",
    keywords: ["organic", "chemistry", "compounds"],
    relatedPapers: [5, 9, 12],
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
    description:
      "This examination covers national income, inflation, unemployment, monetary and fiscal policy, economic growth, and international trade. Students will analyze economic data and apply macroeconomic theories to explain economic phenomena.",
    pages: 9,
    fileSize: "2.0 MB",
    dateAdded: "2023-11-20",
    keywords: ["macroeconomics", "economics", "fiscal policy"],
    relatedPapers: [3, 6, 10],
  },
]

export default function PaperDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [paper, setPaper] = useState<any>(null)
  const [relatedPapers, setRelatedPapers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the paper with the matching ID
    const foundPaper = allPapers.find((p) => p.id === Number.parseInt(id as string))

    if (foundPaper) {
      setPaper(foundPaper)

      // Get related papers
      const related = allPapers.filter((p) => foundPaper.relatedPapers.includes(p.id)).slice(0, 3)

      setRelatedPapers(related)
    }

    setLoading(false)
  }, [id])

  const handleDownload = () => {
    if (paper.isPremium && (!user || user.subscription?.plan !== "premium")) {
      toast({
        title: "Premium content",
        description: "Please upgrade your subscription to download this paper.",
        variant: "destructive",
      })
      router.push("/pricing")
      return
    }

    toast({
      title: "Download started",
      description: "Your file is being downloaded.",
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground animate-pulse mb-4" />
          <p className="text-muted-foreground">Loading paper details...</p>
        </div>
      </div>
    )
  }

  if (!paper) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Paper not found</h3>
          <p className="text-muted-foreground mb-6">The paper you're looking for doesn't exist or has been removed</p>
          <Button asChild>
            <Link href="/papers">Browse Papers</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/papers">Papers</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/papers?department=${paper.department}`}>{paper.department}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{paper.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Button variant="ghost" size="sm" className="mb-4" asChild>
            <Link href="/papers">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Papers
            </Link>
          </Button>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant={paper.isPremium ? "default" : "secondary"}>{paper.isPremium ? "Premium" : "Free"}</Badge>
            <Badge variant="outline">{paper.year}</Badge>
            <Badge variant="outline">{paper.examType}</Badge>
            <Badge variant="outline">{paper.semester} Semester</Badge>
          </div>

          <h1 className="text-3xl font-bold mb-4">{paper.title}</h1>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>Professor: {paper.professor}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Added: {paper.dateAdded}</span>
            </div>
            <div className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              <span>{paper.downloads} downloads</span>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Paper Preview</CardTitle>
              <CardDescription>
                {paper.pages} pages • {paper.fileSize}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {paper.isPremium && (!user || user.subscription?.plan !== "premium") ? (
                <div className="relative">
                  <div className="aspect-[3/4] bg-muted rounded-md overflow-hidden relative">
                    <Image
                      src="/placeholder.svg?height=600&width=450"
                      alt="Paper preview"
                      width={450}
                      height={600}
                      className="w-full h-full object-cover blur-sm"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
                      <Lock className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
                      <p className="text-muted-foreground mb-4 text-center max-w-xs">
                        Upgrade to Premium to access this examination paper
                      </p>
                      <Button asChild>
                        <Link href="/pricing">Upgrade Now</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-[3/4] bg-muted rounded-md overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=450"
                    alt="Paper preview"
                    width={450}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-2" /> Helpful
                </Button>
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4 mr-2" /> Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </Button>
              </div>
              <Button onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" /> Download
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{paper.description}</p>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {paper.keywords.map((keyword: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Paper Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Department</dt>
                  <dd>{paper.department}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Year</dt>
                  <dd>{paper.year}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Exam Type</dt>
                  <dd>{paper.examType}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Semester</dt>
                  <dd>{paper.semester}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Professor</dt>
                  <dd>{paper.professor}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Pages</dt>
                  <dd>{paper.pages}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">File Size</dt>
                  <dd>{paper.fileSize}</dd>
                </div>
              </dl>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" /> Download Paper
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Papers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relatedPapers.map((relatedPaper) => (
                  <div key={relatedPaper.id} className="flex gap-4">
                    <div className="h-16 w-12 bg-muted rounded flex-shrink-0 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm line-clamp-2">
                        <Link href={`/papers/${relatedPaper.id}`} className="hover:underline">
                          {relatedPaper.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {relatedPaper.department} • {relatedPaper.year}
                      </p>
                      <div className="mt-1">
                        <Badge variant={relatedPaper.isPremium ? "default" : "secondary"} className="text-xs">
                          {relatedPaper.isPremium ? "Premium" : "Free"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/papers">View More Papers</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
