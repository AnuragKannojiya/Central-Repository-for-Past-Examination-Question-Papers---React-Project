"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, ArrowLeft, Save, Upload, FileText, AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { uploadFile } from "@/lib/file-upload"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
  const [loading, setLoading] = useState(false)
  const [keywords, setKeywords] = useState<string[]>([])
  const [keywordInput, setKeywordInput] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [uploadedFile, setUploadedFile] = useState<{ url: string; filename: string; size: number } | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [paperData, setPaperData] = useState({
    title: "",
    department: "",
    year: "",
    semester: "",
    examType: "",
    professor: "",
    description: "",
    pages: "",
    fileSize: "",
    isPremium: false,
    relatedPapers: [] as number[],
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
      // Auto-fill file size
      const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2)
      setPaperData((prev) => ({
        ...prev,
        fileSize: `${fileSizeInMB} MB`,
      }))
    }
  }

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      })
      return
    }

    setUploadStatus("uploading")
    setUploadProgress(0)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + 5
      })
    }, 200)

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      const result = await uploadFile(formData)

      clearInterval(progressInterval)

      if (result.success) {
        setUploadProgress(100)
        setUploadStatus("success")
        setUploadedFile({
          url: result.url,
          filename: result.filename,
          size: result.size,
        })

        toast({
          title: "File uploaded successfully",
          description: "Your file has been uploaded and is ready to be added to the repository.",
        })
      } else {
        setUploadProgress(0)
        setUploadStatus("error")

        toast({
          title: "Upload failed",
          description: result.error || "There was an error uploading your file.",
          variant: "destructive",
        })
      }
    } catch (error) {
      clearInterval(progressInterval)
      setUploadProgress(0)
      setUploadStatus("error")

      toast({
        title: "Upload failed",
        description: "There was an error uploading your file.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

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
      !paperData.fileSize ||
      keywords.length === 0 ||
      !uploadedFile
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and upload a file",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    // In a real app, this would be an API call to add the paper with the uploaded file URL
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Paper Added",
        description: "The examination paper has been successfully added to the repository.",
      })
      router.push("/dashboard")
    }, 1500)
  }

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

      <form onSubmit={handleSubmit}>
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
                    <Label htmlFor="fileSize">
                      File Size <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fileSize"
                      name="fileSize"
                      placeholder="e.g., 2.4 MB"
                      value={paperData.fileSize}
                      onChange={handleChange}
                      required
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
                          <button type="button" className="ml-1 text-xs" onClick={() => removeKeyword(keyword)}>
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
                  <div className="flex items-center gap-2">
                    <Input
                      id="paperFile"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                    <Button
                      type="button"
                      onClick={handleFileUpload}
                      disabled={!selectedFile || uploadStatus === "uploading" || uploadStatus === "success"}
                    >
                      {uploadStatus === "uploading" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading
                        </>
                      ) : uploadStatus === "success" ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" /> Uploaded
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" /> Upload
                        </>
                      )}
                    </Button>
                  </div>

                  {uploadStatus === "uploading" && (
                    <div className="mt-2">
                      <Progress value={uploadProgress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Uploading: {uploadProgress}%</p>
                    </div>
                  )}

                  {uploadStatus === "success" && uploadedFile && (
                    <Alert className="mt-2 bg-green-50 dark:bg-green-900/20">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <AlertTitle>Upload successful</AlertTitle>
                      <AlertDescription className="text-sm">
                        File: {uploadedFile.filename.split("/").pop()} ({(uploadedFile.size / (1024 * 1024)).toFixed(2)}{" "}
                        MB)
                      </AlertDescription>
                    </Alert>
                  )}

                  {uploadStatus === "error" && (
                    <Alert className="mt-2 bg-red-50 dark:bg-red-900/20" variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Upload failed</AlertTitle>
                      <AlertDescription>There was an error uploading your file. Please try again.</AlertDescription>
                    </Alert>
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
                    {paperData.fileSize && <p>Size: {paperData.fileSize}</p>}
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

                  {uploadedFile && (
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-primary" />
                      <span>File uploaded and ready</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full" disabled={loading || !uploadedFile}>
                  {loading ? (
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
