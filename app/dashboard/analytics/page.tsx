"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/date-range-picker"
import { BarChart, LineChart, PieChart, Download, Share2, RefreshCw } from "lucide-react"

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  })

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Track usage, downloads, and user engagement</p>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-500 font-medium">+25%</span>
              <span className="text-xs text-muted-foreground ml-1">from previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8%</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-500 font-medium">+3.2%</span>
              <span className="text-xs text-muted-foreground ml-1">from previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,427</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-500 font-medium">+12%</span>
              <span className="text-xs text-muted-foreground ml-1">from previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="downloads" className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <TabsList>
            <TabsTrigger value="downloads">
              <BarChart className="h-4 w-4 mr-2" /> Downloads
            </TabsTrigger>
            <TabsTrigger value="users">
              <LineChart className="h-4 w-4 mr-2" /> Users
            </TabsTrigger>
            <TabsTrigger value="papers">
              <PieChart className="h-4 w-4 mr-2" /> Papers
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Select defaultValue="daily">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download data</span>
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share report</span>
            </Button>
          </div>
        </div>

        <TabsContent value="downloads">
          <Card>
            <CardHeader>
              <CardTitle>Download Analytics</CardTitle>
              <CardDescription>Track paper downloads over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground">Chart visualization would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
              <CardDescription>Track user registrations and activity</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground">Chart visualization would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="papers">
          <Card>
            <CardHeader>
              <CardTitle>Paper Analytics</CardTitle>
              <CardDescription>Track paper uploads and popularity</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground">Chart visualization would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
