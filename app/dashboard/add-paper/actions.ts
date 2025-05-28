"use server"

import { revalidatePath } from "next/cache"
import { uploadFile } from "@/lib/file-upload"

export type PaperFormData = {
  title: string
  department: string
  year: string
  semester: string
  examType: string
  professor: string
  description: string
  pages: string
  isPremium: boolean
  keywords: string[]
  file?: File
}

export async function addPaper(formData: FormData): Promise<{ success: boolean; message: string }> {
  try {
    // Extract form data
    const title = formData.get("title") as string
    const department = formData.get("department") as string
    const year = formData.get("year") as string
    const semester = formData.get("semester") as string
    const examType = formData.get("examType") as string
    const professor = formData.get("professor") as string
    const description = formData.get("description") as string
    const pages = formData.get("pages") as string
    const isPremium = formData.get("isPremium") === "true"
    const keywordsJson = formData.get("keywords") as string
    const keywords = JSON.parse(keywordsJson)

    // Validate required fields
    if (!title || !department || !year || !semester || !examType || !professor || !description || !pages) {
      return { success: false, message: "Please fill in all required fields" }
    }

    // Handle file upload if present
    const file = formData.get("file")

    if (!file) {
      return { success: false, message: "Please upload a file" }
    }

    // Check if file is a File object
    if (!(file instanceof File) || file.size === 0) {
      return { success: false, message: "Invalid file or empty file uploaded" }
    }

    // Create a new FormData for the file upload
    const fileFormData = new FormData()
    fileFormData.append("file", file)

    // Upload the file
    const uploadResult = await uploadFile(fileFormData)

    if (!uploadResult.success) {
      return {
        success: false,
        message: uploadResult.error || "File upload failed",
      }
    }

    const fileData = {
      url: uploadResult.url,
      filename: uploadResult.filename,
      size: uploadResult.size,
      fileType: uploadResult.fileType,
    }

    // In a real application, you would save this data to your database
    // For now, we'll just log it and return success
    console.log("Paper data:", {
      title,
      department,
      year,
      semester,
      examType,
      professor,
      description,
      pages,
      isPremium,
      keywords,
      file: fileData,
    })

    // Revalidate the dashboard page to show the new paper
    revalidatePath("/dashboard")

    return {
      success: true,
      message: "Paper added successfully",
    }
  } catch (error) {
    console.error("Error adding paper:", error)
    return {
      success: false,
      message:
        error instanceof Error
          ? `An error occurred: ${error.message}`
          : "An unknown error occurred while adding the paper. Please try again.",
    }
  }
}
