"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, MoreHorizontal, CheckCircle2, XCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

// Mock subscription data
const mockSubscriptions = [
  {
    id: "sub_123456",
    userId: "user_1",
    userName: "John Doe",
    userEmail: "john@example.com",
    plan: "premium",
    status: "active",
    startDate: "2023-09-15",
    endDate: "2024-09-15",
    amount: 1499,
    billingPeriod: "monthly",
    paymentMethod: "Credit Card",
    lastPayment: "2023-10-15",
  },
  {
    id: "sub_123457",
    userId: "user_2",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    plan: "basic",
    status: "active",
    startDate: "2023-08-10",
    endDate: "2024-08-10",
    amount: 799,
    billingPeriod: "monthly",
    paymentMethod: "UPI",
    lastPayment: "2023-10-10",
  },
  {
    id: "sub_123458",
    userId: "user_3",
    userName: "Robert Johnson",
    userEmail: "robert@example.com",
    plan: "premium",
    status: "cancelled",
    startDate: "2023-07-05",
    endDate: "2023-10-05",
    amount: 1499 * 12 * 0.8,
    billingPeriod: "yearly",
    paymentMethod: "Credit Card",
    lastPayment: "2023-07-05",
  },
  {
    id: "sub_123459",
    userId: "user_4",
    userName: "Emily Davis",
    userEmail: "emily@example.com",
    plan: "basic",
    status: "expired",
    startDate: "2023-06-20",
    endDate: "2023-09-20",
    amount: 799,
    billingPeriod: "monthly",
    paymentMethod: "Debit Card",
    lastPayment: "2023-09-20",
  },
  {
    id: "sub_123460",
    userId: "user_5",
    userName: "Michael Wilson",
    userEmail: "michael@example.com",
    plan: "premium",
    status: "active",
    startDate: "2023-10-01",
    endDate: "2024-10-01",
    amount: 1499 * 12 * 0.8,
    billingPeriod: "yearly",
    paymentMethod: "Net Banking",
    lastPayment: "2023-10-01",
  },
]

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions)
  const [searchQuery, setSearchQuery] = useState("")
  const [planFilter, setPlanFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()

  // Filter subscriptions based on search query and filters
  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlan = planFilter === "all" || sub.plan === planFilter
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter
    return matchesSearch && matchesPlan && matchesStatus
  })

  // Handle subscription status change
  const handleStatusChange = (id: string, newStatus: string) => {
    setSubscriptions(subscriptions.map((sub) => (sub.id === id ? { ...sub, status: newStatus as any } : sub)))
    toast({
      title: "Subscription updated",
      description: `Subscription status changed to ${newStatus}`,
    })
  }

  // Handle subscription plan change
  const handlePlanChange = (id: string, newPlan: string) => {
    setSubscriptions(subscriptions.map((sub) => (sub.id === id ? { ...sub, plan: newPlan as any } : sub)))
    toast({
      title: "Subscription updated",
      description: `Subscription plan changed to ${newPlan}`,
    })
  }

  // Generate receipt
  const handleGenerateReceipt = (id: string) => {
    toast({
      title: "Receipt generated",
      description: `Receipt for subscription ${id} has been generated`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Subscription Management</h1>
          <p className="text-muted-foreground">Manage user subscriptions and payments</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Subscriptions</CardTitle>
          <CardDescription>View and manage all user subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Billing</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.length > 0 ? (
                  filteredSubscriptions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{sub.userName}</div>
                          <div className="text-sm text-muted-foreground">{sub.userEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={sub.plan === "premium" ? "default" : sub.plan === "basic" ? "secondary" : "outline"}
                        >
                          {sub.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            sub.status === "active" ? "success" : sub.status === "cancelled" ? "warning" : "destructive"
                          }
                          className={
                            sub.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : undefined
                          }
                        >
                          {sub.status === "active" ? (
                            <CheckCircle2 className="mr-1 h-3 w-3 inline" />
                          ) : (
                            <XCircle className="mr-1 h-3 w-3 inline" />
                          )}
                          {sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>₹{sub.amount}</div>
                          <div className="text-xs text-muted-foreground">{sub.billingPeriod}</div>
                        </div>
                      </TableCell>
                      <TableCell>{sub.startDate}</TableCell>
                      <TableCell>{sub.endDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleGenerateReceipt(sub.id)}>
                              <Download className="mr-2 h-4 w-4" /> Generate Receipt
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(sub.id, "active")}>
                              <CheckCircle2 className="mr-2 h-4 w-4" /> Mark as Active
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(sub.id, "cancelled")}>
                              <XCircle className="mr-2 h-4 w-4" /> Mark as Cancelled
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePlanChange(sub.id, "premium")}>
                              Upgrade to Premium
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePlanChange(sub.id, "basic")}>
                              Change to Basic
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No subscriptions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Subscription Analytics</CardTitle>
          <CardDescription>Overview of subscription metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">Active Subscriptions</h3>
              <p className="text-3xl font-bold">{subscriptions.filter((sub) => sub.status === "active").length}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">Premium Users</h3>
              <p className="text-3xl font-bold">
                {subscriptions.filter((sub) => sub.plan === "premium" && sub.status === "active").length}
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">Monthly Revenue</h3>
              <p className="text-3xl font-bold">
                ₹
                {subscriptions
                  .filter((sub) => sub.status === "active")
                  .reduce((total, sub) => {
                    if (sub.billingPeriod === "monthly") {
                      return total + sub.amount
                    } else {
                      // For yearly, divide by 12 to get monthly equivalent
                      return total + sub.amount / 12
                    }
                  }, 0)
                  .toFixed(0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
