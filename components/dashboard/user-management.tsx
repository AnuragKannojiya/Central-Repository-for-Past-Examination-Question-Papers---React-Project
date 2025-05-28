"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Ban, Edit, MoreHorizontal, Search, ShieldCheck, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for users
const usersList = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "user",
    subscription: "premium",
    status: "active",
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
    subscription: "basic",
    status: "active",
    joinDate: "2023-02-22",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "admin",
    subscription: "premium",
    status: "active",
    joinDate: "2023-03-10",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "user",
    subscription: "free",
    status: "inactive",
    joinDate: "2023-04-05",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "user",
    subscription: "basic",
    status: "active",
    joinDate: "2023-05-18",
  },
  {
    id: 6,
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    role: "user",
    subscription: "premium",
    status: "active",
    joinDate: "2023-06-30",
  },
  {
    id: 7,
    name: "David Miller",
    email: "david.miller@example.com",
    role: "user",
    subscription: "free",
    status: "inactive",
    joinDate: "2023-07-12",
  },
  {
    id: 8,
    name: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    role: "user",
    subscription: "basic",
    status: "active",
    joinDate: "2023-08-05",
  },
]

export function UserManagement() {
  const [users, setUsers] = useState(usersList)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleStatus = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
    toast({
      title: "User status updated",
      description: "The user's status has been updated successfully",
    })
  }

  const changeRole = (id: number, newRole: "user" | "admin") => {
    setUsers(users.map((user) => (user.id === id ? { ...user, role: newRole } : user)))
    toast({
      title: "User role updated",
      description: `The user's role has been updated to ${newRole}`,
    })
  }

  const changeSubscription = (id: number, newSubscription: string) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, subscription: newSubscription } : user)))
    toast({
      title: "Subscription updated",
      description: `The user's subscription has been updated to ${newSubscription}`,
    })
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="ml-4">Add New User</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "outline"}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.subscription === "premium"
                          ? "default"
                          : user.subscription === "basic"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {user.subscription}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === "active" ? "success" : "destructive"}
                      className={
                        user.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : undefined
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleStatus(user.id)}>
                          {user.status === "active" ? (
                            <>
                              <Ban className="mr-2 h-4 w-4" /> Deactivate
                            </>
                          ) : (
                            <>
                              <User className="mr-2 h-4 w-4" /> Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => changeRole(user.id, "user")} disabled={user.role === "user"}>
                          <User className="mr-2 h-4 w-4" /> User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeRole(user.id, "admin")} disabled={user.role === "admin"}>
                          <ShieldCheck className="mr-2 h-4 w-4" /> Admin
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Change Subscription</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => changeSubscription(user.id, "free")}
                          disabled={user.subscription === "free"}
                        >
                          Free
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => changeSubscription(user.id, "basic")}
                          disabled={user.subscription === "basic"}
                        >
                          Basic
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => changeSubscription(user.id, "premium")}
                          disabled={user.subscription === "premium"}
                        >
                          Premium
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
