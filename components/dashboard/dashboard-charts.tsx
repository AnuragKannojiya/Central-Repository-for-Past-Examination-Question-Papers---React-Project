"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart } from "lucide-react"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for charts
const downloadData = [
  { month: "Jan", downloads: 1200 },
  { month: "Feb", downloads: 1800 },
  { month: "Mar", downloads: 2400 },
  { month: "Apr", downloads: 2000 },
  { month: "May", downloads: 2600 },
  { month: "Jun", downloads: 3100 },
  { month: "Jul", downloads: 2800 },
  { month: "Aug", downloads: 3200 },
  { month: "Sep", downloads: 3800 },
  { month: "Oct", downloads: 4000 },
  { month: "Nov", downloads: 4200 },
  { month: "Dec", downloads: 3900 },
]

const userSignupData = [
  { month: "Jan", signups: 120 },
  { month: "Feb", signups: 180 },
  { month: "Mar", signups: 240 },
  { month: "Apr", signups: 200 },
  { month: "May", signups: 260 },
  { month: "Jun", signups: 310 },
  { month: "Jul", signups: 280 },
  { month: "Aug", signups: 320 },
  { month: "Sep", signups: 380 },
  { month: "Oct", signups: 400 },
  { month: "Nov", signups: 420 },
  { month: "Dec", signups: 390 },
]

export function DashboardCharts({ isLoading = false }: { isLoading?: boolean }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="h-[300px] relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="h-full w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Tabs defaultValue="downloads">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Analytics</h2>
        <TabsList>
          <TabsTrigger value="downloads">
            <BarChart className="h-4 w-4 mr-2" /> Downloads
          </TabsTrigger>
          <TabsTrigger value="users">
            <LineChart className="h-4 w-4 mr-2" /> User Signups
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="downloads">
        <Card>
          <CardHeader>
            <CardTitle>Download Statistics</CardTitle>
            <CardDescription>Monthly download trends for the past year</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground">Chart visualization would be displayed here</p>
            </div>
            <div className="flex justify-between mt-8">
              {downloadData.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="bg-primary w-6 rounded-t-sm" style={{ height: `${item.downloads / 50}px` }}></div>
                  <span className="text-xs mt-1">{item.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="users">
        <Card>
          <CardHeader>
            <CardTitle>User Signup Statistics</CardTitle>
            <CardDescription>Monthly user signup trends for the past year</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground">Chart visualization would be displayed here</p>
            </div>
            <div className="flex justify-between mt-8">
              {userSignupData.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="bg-primary w-6 rounded-t-sm" style={{ height: `${item.signups / 5}px` }}></div>
                  <span className="text-xs mt-1">{item.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
