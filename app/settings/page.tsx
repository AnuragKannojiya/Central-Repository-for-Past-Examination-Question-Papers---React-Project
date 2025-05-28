"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, CreditCard, Globe, HelpCircle, LogOut, Moon, Shield, Sun, Trash2, UserX } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  const handleDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    toast({
      title: "Account deleted",
      description: "Your account has been permanently deleted.",
      variant: "destructive",
    })
    logout()
    router.push("/")
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Sun className="h-4 w-4 mr-2" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-4 w-4 mr-2" /> Billing
          </TabsTrigger>
          <TabsTrigger value="account">
            <Shield className="h-4 w-4 mr-2" /> Account
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified about activity on EduArchive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  {[
                    { id: "new-papers", label: "New papers in your department" },
                    { id: "downloads", label: "Download confirmations" },
                    { id: "subscription", label: "Subscription updates" },
                    { id: "promotions", label: "Promotions and offers" },
                    { id: "newsletter", label: "Monthly newsletter" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <Label htmlFor={item.id} className="flex-1">
                        {item.label}
                      </Label>
                      <Switch id={item.id} defaultChecked={item.id !== "promotions"} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">In-App Notifications</h3>
                <div className="space-y-3">
                  {[
                    { id: "app-new-papers", label: "New papers in your department" },
                    { id: "app-downloads", label: "Download confirmations" },
                    { id: "app-subscription", label: "Subscription updates" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <Label htmlFor={item.id} className="flex-1">
                        {item.label}
                      </Label>
                      <Switch id={item.id} defaultChecked />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button onClick={handleSaveSettings}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how EduArchive looks and feels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    className={`border rounded-md p-4 cursor-pointer flex flex-col items-center ${theme === "light" ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-8 w-8 mb-2" />
                    <span>Light</span>
                  </div>
                  <div
                    className={`border rounded-md p-4 cursor-pointer flex flex-col items-center ${theme === "dark" ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-8 w-8 mb-2" />
                    <span>Dark</span>
                  </div>
                  <div
                    className={`border rounded-md p-4 cursor-pointer flex flex-col items-center ${theme === "system" ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => setTheme("system")}
                  >
                    <div className="h-8 w-8 mb-2 flex">
                      <Sun className="h-8 w-4" />
                      <Moon className="h-8 w-4" />
                    </div>
                    <span>System</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Language</h3>
                <div className="flex items-center space-x-4">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <Select defaultValue="en">
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button onClick={handleSaveSettings}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your subscription and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Current Plan</h3>
                <div className="bg-muted/40 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-semibold text-lg capitalize">{user.subscription?.plan} Plan</p>
                      <p className="text-sm text-muted-foreground">
                        {user.subscription?.plan === "premium"
                          ? "Unlimited access to all papers"
                          : user.subscription?.plan === "basic"
                            ? "Enhanced access with more features"
                            : "Basic access to examination papers"}
                      </p>
                    </div>
                    <Button variant="outline" asChild>
                      <a href="/pricing">Change Plan</a>
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Next billing date: {new Date(user.subscription?.expiresAt || "").toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Payment Methods</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/40 rounded-md">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-3" />
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <CreditCard className="h-4 w-4 mr-2" /> Add Payment Method
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Billing History</h3>
                <div className="space-y-3">
                  {[
                    { date: "May 1, 2023", amount: "$19.99", status: "Paid" },
                    { date: "Apr 1, 2023", amount: "$19.99", status: "Paid" },
                    { date: "Mar 1, 2023", amount: "$19.99", status: "Paid" },
                  ].map((invoice, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted/40 rounded-md">
                      <div>
                        <p className="font-medium">{invoice.date}</p>
                        <p className="text-sm text-muted-foreground">
                          {invoice.amount} - {invoice.status}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Privacy</h3>
                <div className="space-y-3">
                  {[
                    { id: "data-collection", label: "Allow data collection for service improvement" },
                    { id: "profile-visibility", label: "Make my profile visible to other users" },
                    { id: "download-history", label: "Save my download history" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <Label htmlFor={item.id} className="flex-1">
                        {item.label}
                      </Label>
                      <Switch id={item.id} defaultChecked={item.id !== "profile-visibility"} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium text-destructive">Danger Zone</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Log out from all devices</p>
                      <p className="text-sm text-muted-foreground">
                        This will log you out from all devices except this one
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <LogOut className="h-4 w-4 mr-2" /> Log Out
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Delete Account</p>
                      <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove all your
                            data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteAccount}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            <UserX className="h-4 w-4 mr-2" /> Delete Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Need help?{" "}
                    <a href="/contact" className="text-primary hover:underline">
                      Contact Support
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
