"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate saving
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Company Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card className="border-0 shadow-sm">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
                <CardDescription>Update your company information and profile details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="Acme Corp" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="contact@acmecorp.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" defaultValue="123 Main St, Chicago, IL 60601" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    defaultValue="Acme Corp is a manufacturing company specializing in industrial equipment and components."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" type="url" defaultValue="https://acmecorp.com" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading} className="gap-2">
                  <Save className="h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-inquiries" className="flex-1">
                      New inquiries
                    </Label>
                    <Switch id="new-inquiries" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="transaction-updates" className="flex-1">
                      Transaction updates
                    </Label>
                    <Switch id="transaction-updates" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-matches" className="flex-1">
                      New material matches
                    </Label>
                    <Switch id="new-matches" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weekly-summary" className="flex-1">
                      Weekly summary
                    </Label>
                    <Switch id="weekly-summary" defaultChecked />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="in-app-messages" className="flex-1">
                      Messages
                    </Label>
                    <Switch id="in-app-messages" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="in-app-transactions" className="flex-1">
                      Transaction updates
                    </Label>
                    <Switch id="in-app-transactions" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="in-app-matches" className="flex-1">
                      New material matches
                    </Label>
                    <Switch id="in-app-matches" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="preferences">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>Customize your GreenLoop experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Display Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode" className="flex-1">
                      Dark Mode
                    </Label>
                    <Switch id="dark-mode" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="compact-view" className="flex-1">
                      Compact View
                    </Label>
                    <Switch id="compact-view" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Material Preferences</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-match" className="flex-1">
                      Automatic Matching
                    </Label>
                    <Switch id="auto-match" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="distance-filter" className="flex-1">
                      Default Distance Filter (50km)
                    </Label>
                    <Switch id="distance-filter" defaultChecked />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Privacy Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="public-profile" className="flex-1">
                      Public Company Profile
                    </Label>
                    <Switch id="public-profile" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="analytics-sharing" className="flex-1">
                      Share Analytics Data
                    </Label>
                    <Switch id="analytics-sharing" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="api">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>Manage API keys and access for integrating with your systems.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    type="password"
                    value="sk_live_51NzQjKLkjOiJKLjkLJKLjkLJKLjkLJKLjkLJKLjkLJKL"
                    readOnly
                  />
                  <Button variant="outline">Show</Button>
                  <Button variant="outline">Copy</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  This key provides full access to your GreenLoop account. Keep it secure.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">API Permissions</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="read-listings" className="flex-1">
                      Read Listings
                    </Label>
                    <Switch id="read-listings" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="write-listings" className="flex-1">
                      Write Listings
                    </Label>
                    <Switch id="write-listings" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="read-transactions" className="flex-1">
                      Read Transactions
                    </Label>
                    <Switch id="read-transactions" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="write-transactions" className="flex-1">
                      Write Transactions
                    </Label>
                    <Switch id="write-transactions" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="read-analytics" className="flex-1">
                      Read Analytics
                    </Label>
                    <Switch id="read-analytics" defaultChecked />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Webhook Configuration</h3>
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input id="webhook-url" placeholder="https://your-server.com/webhook" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="webhook-enabled" className="flex-1">
                      Enable Webhooks
                    </Label>
                    <Switch id="webhook-enabled" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Regenerate API Key</Button>
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save API Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

