"use client"

import type React from "react"

import { useState, useRef, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, ArrowLeft, Save, Upload, AlertCircle, CheckCircle2, X, FileIcon, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { addPaper } from "./actions"
import { PDFViewer } from "@/components/pdf-viewer"

// Mock data for departments, years, etc.
const departments = [
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

const years = ["2023", "2022", "2021", "2020", "2019"]
const semesters = ["Spring", "Summer", "Fall", "Winter"]
const examTypes = ["Final", "Midterm", "Quiz", "Assignment"]

export default function AddPaperPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [keywords, setKeywords] = useState<string[]>([])
  const [keywordInput, setKeywordInput] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const [paperData, setPaperData] = useState({
    title: "",
    department: "",
    year: "",
    semester: "",
    examType: "",
    professor: "",
    description: "",
    pages: "",
    isPremium: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPaperData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setPaperData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setPaperData((prev) => ({ ...prev, isPremium: checked }))
  }

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()])
      setKeywordInput("")
    }
  }

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // Reset upload status
      setUploadStatus("idle")
      setUploadProgress(0)

      // Auto-fill file size
      const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2)

      // Check if it's a PDF
      const isPDF = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")

      // Show preview if it's a PDF
      if (isPDF) {
        setShowPreview(true)
      } else {
        setShowPreview(false)
      }
    }
  }

  const simulateUploadProgress = () => {
    setUploadStatus("uploading")
    setUploadProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return prev
        }
        return prev + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate form
    if (
      !paperData.title ||
      !paperData.department ||
      !paperData.year ||
      !paperData.semester ||
      !paperData.examType ||
      !paperData.professor ||
      !paperData.description ||
      !paperData.pages ||
      keywords.length === 0 ||
      !selectedFile
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and upload a file",
        variant: "destructive",
      })
      return
    }

    // Start upload progress simulation
    const clearProgressInterval = simulateUploadProgress()

    // Create form data for submission
    const formData = new FormData()
    formData.append("title", paperData.title)
    formData.append("department", paperData.department)
    formData.append("year", paperData.year)
    formData.append("semester", paperData.semester)
    formData.append("examType", paperData.examType)
    formData.append("professor", paperData.professor)
    formData.append("description", paperData.description)
    formData.append("pages", paperData.pages)
    formData.append("isPremium", String(paperData.isPremium))
    formData.append("keywords", JSON.stringify(keywords))

    // Make sure the file is properly appended
    try {
      formData.append("file", selectedFile)
    } catch (error) {
      console.error("Error appending file to FormData:", error)
      toast({
        title: "Error",
        description: "There was a problem with the selected file. Please try again.",
        variant: "destructive",
      })
      return
    }

    startTransition(async () => {
      try {
        const result = await addPaper(formData)

        // Clear the progress interval
        clearProgressInterval()

        if (result.success) {
          setUploadProgress(100)
          setUploadStatus("success")

          toast({
            title: "Success",
            description: "Paper added successfully",
          })

          // Reset form
          if (formRef.current) {
            formRef.current.reset()
          }
          setPaperData({
            title: "",
            department: "",
            year: "",
            semester: "",
            examType: "",
            professor: "",
            description: "",
            pages: "",
            isPremium: false,
          })
          setKeywords([])
          setSelectedFile(null)
          setUploadStatus("idle")
          setUploadProgress(0)
          setShowPreview(false)

          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push("/dashboard")
          }, 1500)
        } else {
          setUploadStatus("error")
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          })
        }
      } catch (error) {
        clearProgressInterval()
        setUploadStatus("error")
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        })
      }
    })
  }

  const isPDF = selectedFile?.type === "application/pdf"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <Button variant="ghost" size="sm" className="mb-2" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-2">Add New Paper</h1>
          <p className="text-muted-foreground">Add a new examination paper to the repository</p>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paper Information</CardTitle>
                <CardDescription>Enter the basic information about the examination paper</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Paper Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Computer Science: Data Structures and Algorithms"
                    value={paperData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">
                      Department <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={paperData.department}
                      onValueChange={(value) => handleSelectChange("department", value)}
                    >
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

                  <div className="space-y-2">
                    <Label htmlFor="year">
                      Year <span className="text-destructive">*</span>
                    </Label>
                    <Select value={paperData.year} onValueChange={(value) => handleSelectChange("year", value)}>
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="semester">
                      Semester <span className="text-destructive">*</span>
                    </Label>
                    <Select value={paperData.semester} onValueChange={(value) => handleSelectChange("semester", value)}>
                      <SelectTrigger id="semester">
                        <SelectValue placeholder="Select Semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {semesters.map((semester) => (
                          <SelectItem key={semester} value={semester}>
                            {semester}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="examType">
                      Exam Type <span className="text-destructive">*</span>
                    </Label>
                    <Select value={paperData.examType} onValueChange={(value) => handleSelectChange("examType", value)}>
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="professor">
                    Professor <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="professor"
                    name="professor"
                    placeholder="e.g., Dr. Smith"
                    value={paperData.professor}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide a detailed description of the examination paper..."
                    value={paperData.description}
                    onChange={handleChange}
                    className="min-h-[120px]"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paper Details</CardTitle>
                <CardDescription>Additional information about the paper</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pages">
                      Number of Pages <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="pages"
                      name="pages"
                      type="number"
                      placeholder="e.g., 10"
                      value={paperData.pages}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fileSize">File Size</Label>
                    <Input
                      id="fileSize"
                      name="fileSize"
                      value={selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : ""}
                      readOnly
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    Keywords <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add keywords (e.g., algorithms, data structures)"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addKeyword()
                        }
                      }}
                    />
                    <Button type="button" onClick={addKeyword}>
                      Add
                    </Button>
                  </div>
                  {keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="px-2 py-1">
                          {keyword}
                          <button
                            type="button"
                            className="ml-1 text-xs"
                            onClick={() => removeKeyword(keyword)}
                            aria-label={`Remove ${keyword} keyword`}
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="isPremium" checked={paperData.isPremium} onCheckedChange={handleCheckboxChange} />
                  <Label htmlFor="isPremium">This is a premium paper (requires subscription)</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upload Paper</CardTitle>
                <CardDescription>Upload the examination paper file (PDF format recommended)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="paperFile">
                    Paper File <span className="text-destructive">*</span>
                  </Label>

                  {!selectedFile ? (
                    <div
                      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center cursor-pointer hover:border-muted-foreground/40 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="font-medium">Click to upload or drag and drop</p>
                        <p className="text-sm text-muted-foreground">PDF or Word documents (max 10MB)</p>
                      </div>
                      <Input
                        id="paperFile"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted p-2 rounded-md">
                            <FileIcon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{selectedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {isPDF && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowPreview(!showPreview)}
                              title={showPreview ? "Hide preview" : "Show preview"}
                            >
                              {showPreview ? (
                                <>
                                  <EyeOff className="h-4 w-4 mr-1" /> Hide Preview
                                </>
                              ) : (
                                <>
                                  <Eye className="h-4 w-4 mr-1" /> Preview PDF
                                </>
                              )}
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedFile(null)
                              setShowPreview(false)
                              if (fileInputRef.current) {
                                fileInputRef.current.value = ""
                              }
                            }}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove file</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {uploadStatus === "uploading" && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        <p className="text-sm font-medium">Uploading...</p>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Uploading: {uploadProgress}%</p>
                    </div>
                  )}

                  {uploadStatus === "success" && (
                    <Alert className="mt-4 bg-green-50 dark:bg-green-900/20">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <AlertTitle>Upload successful</AlertTitle>
                      <AlertDescription className="text-sm">Your file has been uploaded successfully.</AlertDescription>
                    </Alert>
                  )}

                  {uploadStatus === "error" && (
                    <Alert className="mt-4 bg-red-50 dark:bg-red-900/20" variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Upload failed</AlertTitle>
                      <AlertDescription>There was an error uploading your file. Please try again.</AlertDescription>
                    </Alert>
                  )}

                  {/* PDF Preview */}
                  {selectedFile && isPDF && showPreview && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">PDF Preview</h3>
                        <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>
                          <X className="h-4 w-4 mr-1" /> Close Preview
                        </Button>
                      </div>
                      <PDFViewer file={selectedFile} className="max-h-[600px]" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Paper Preview</CardTitle>
                <CardDescription>Preview how the paper will appear</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={paperData.isPremium ? "default" : "secondary"}>
                      {paperData.isPremium ? "Premium" : "Free"}
                    </Badge>
                    {paperData.year && <Badge variant="outline">{paperData.year}</Badge>}
                    {paperData.examType && <Badge variant="outline">{paperData.examType}</Badge>}
                  </div>

                  <h3 className="font-semibold text-lg">{paperData.title || "Paper Title"}</h3>

                  <div className="text-sm text-muted-foreground">
                    <p>Department: {paperData.department || "Department"}</p>
                    <p>Professor: {paperData.professor || "Professor"}</p>
                    <p>Semester: {paperData.semester || "Semester"}</p>
                    {paperData.pages && <p>Pages: {paperData.pages}</p>}
                    {selectedFile && <p>Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>}
                  </div>

                  {keywords.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">Keywords:</p>
                      <div className="flex flex-wrap gap-1">
                        {keywords.map((keyword) => (
                          <Badge key={keyword} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedFile && (
                    <div className="flex items-center gap-2 text-sm">
                      <FileIcon className="h-4 w-4 text-primary" />
                      <span className="truncate">{selectedFile.name}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding Paper
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Add Paper
                    </>
                  )}
                </Button>
                <Button variant="outline" className="w-full" type="button" asChild>
                  <Link href="/dashboard">Cancel</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
