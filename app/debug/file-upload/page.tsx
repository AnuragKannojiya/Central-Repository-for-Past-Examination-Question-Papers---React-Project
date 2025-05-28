import { DebugFileUpload } from "@/components/debug-file-upload"

export default function DebugFileUploadPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Debug File Upload</h1>
      <p className="mb-6 text-muted-foreground">
        Use this page to test file uploads and diagnose any issues with the upload functionality.
      </p>
      <DebugFileUpload />
    </div>
  )
}
