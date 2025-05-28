import { Suspense } from "react"
import { getCurrentUser, isAdmin } from "@/lib/auth-service"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AdminDashboardShell } from "@/components/admin/admin-dashboard-shell"
import { AdminDashboardHeader } from "@/components/admin/admin-dashboard-header"
import { RecentActivity } from "@/components/admin/recent-activity"
import { SystemStatus } from "@/components/admin/system-status"
import { AdminStats } from "@/components/admin/admin-stats"

export default async function AdminDashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  if (!isAdmin(user)) {
    redirect("/dashboard")
  }

  return (
    <AdminDashboardShell>
      <AdminDashboardHeader heading="Admin Dashboard" text="Manage your EduArchive platform." />
      <Suspense fallback={<Skeleton className="h-[120px] w-full" />}>
        <AdminStats />
      </Suspense>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions and updates in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
              <RecentActivity />
            </Suspense>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system performance and health</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
              <SystemStatus />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardShell>
  )
}
