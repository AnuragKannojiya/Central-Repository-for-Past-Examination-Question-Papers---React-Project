import type React from "react"
import { cn } from "@/lib/utils"

interface AdminDashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AdminDashboardShell({ children, className, ...props }: AdminDashboardShellProps) {
  return (
    <div className={cn("space-y-6 p-6", className)} {...props}>
      {children}
    </div>
  )
}
