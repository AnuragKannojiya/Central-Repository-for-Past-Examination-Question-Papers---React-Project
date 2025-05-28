"use client"

import { CheckCircle, Circle } from "lucide-react"
import { useEffect, useState } from "react"

export function SaveIndicator({ saving }: { saving: boolean }) {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (saving) {
      setSaved(false)
    } else if (saving === false) {
      setSaved(true)
      const timer = setTimeout(() => {
        setSaved(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [saving])

  return (
    <div className="flex items-center text-sm space-x-2">
      {saving ? (
        <>
          <Circle className="h-4 w-4 animate-spin text-muted-foreground" />
          <span>Saving...</span>
        </>
      ) : saved ? (
        <>
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span>Saved</span>
        </>
      ) : null}
    </div>
  )
}
