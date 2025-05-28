"use server"

import { put } from "@vercel/blob"
import { nanoid } from "nanoid"

export type UploadResult = {
  success: boolean
  url?: string
  filename?: string
  size?: number
  error?: string
  fileType?: string
}

export async function uploadFile(formData: FormData): Promise<UploadResult> {
  const file = formData.get("file") as File

  if (!file || !(file instanceof File)) {
    return {
      success: false,
      error: "No file provided or invalid file object",
    }
  }

  // Validate file type
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]

  // Some browsers might not correctly identify the file type, so we'll also check the extension
  const fileName = file.name.toLowerCase()
  const isValidExtension = fileName.endsWith(".pdf") || fileName.endsWith(".doc") || fileName.endsWith(".docx")

  if (!allowedTypes.includes(file.type) && !isValidExtension) {
    return {
      success: false,
      error: `Invalid file type: ${file.type}. Only PDF and Word documents are allowed.`,
    }
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    return {
      success: false,
      error: `File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds the 10MB limit.`,
    }
  }

  try {
    // Generate a unique filename
    const filename = `papers/${nanoid()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
    })

    return {
      success: true,
      url: blob.url,
      filename: blob.pathname,
      size: blob.size,
      fileType: file.type,
    }
  } catch (error) {
    console.error("Error uploading file:", error)
    return {
      success: false,
      error: `Failed to upload file: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}
