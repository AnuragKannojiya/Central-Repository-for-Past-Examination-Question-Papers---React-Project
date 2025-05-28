"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { uploadFile } from "@/lib/file-upload"

export function DebugFileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    setResult(null)

    try {
      // Create FormData
      const formData = new FormData()
      formData.append("file", file)

      // Log file details
      console.log("File details:", {
        name: file.name,
        type: file.type,
        size: file.size,
      })

      // Upload file
      const uploadResult = await uploadFile(formData)
      setResult(uploadResult)
    } catch (error) {
      console.error("Error in debug upload:", error)
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Debug File Upload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="debug-file">Select File</Label>
          <Input id="debug-file" type="file" onChange={handleFileChange} />
        </div>

        {file && (
          <div className="text-sm space-y-1">
            <p>
              <strong>Name:</strong> {file.name}
            </p>
            <p>
              <strong>Type:</strong> {file.type || "Unknown"}
            </p>
            <p>
              <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}

        <Button onClick={handleUpload} disabled={!file || loading}>
          {loading ? "Uploading..." : "Test Upload"}
        </Button>

        {result && (
          <div className="mt-4 p-4 rounded-md bg-muted overflow-auto max-h-60">
            <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
