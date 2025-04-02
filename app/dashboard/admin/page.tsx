"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CheckCircle, Search, Shield, UserX, Users } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Input placeholder="Search..." className="max-w-sm" />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="flagged">Flagged</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">182</div>
            <p className="text-xs text-muted-foreground">+8 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Content</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">-2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended Users</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">No change from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage all users on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-4 font-medium">
                    <div>Company</div>
                    <div>Email</div>
                    <div>Type</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  <div className="divide-y">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="grid grid-cols-5 p-4">
                        <div>Acme Corp {i}</div>
                        <div>contact@acmecorp{i}.com</div>
                        <div>
                          <Badge variant="outline">{i % 2 === 0 ? "Producer" : "User"}</Badge>
                        </div>
                        <div>
                          <Badge
                            className={
                              i === 3
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : "bg-green-100 text-green-800 hover:bg-green-100"
                            }
                          >
                            {i === 3 ? "Pending" : "Active"}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="listings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Listing Management</CardTitle>
              <CardDescription>View and manage all waste listings on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 p-4 font-medium">
                    <div>Title</div>
                    <div>Category</div>
                    <div>Company</div>
                    <div>Quantity</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  <div className="divide-y">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="grid grid-cols-6 p-4">
                        <div>Material Listing {i}</div>
                        <div>
                          {["Metal Scrap", "Plastic Waste", "Paper & Cardboard", "Wood Waste", "Chemical Waste"][i - 1]}
                        </div>
                        <div>Company {i}</div>
                        <div>{i * 100} kg</div>
                        <div>
                          <Badge
                            className={
                              i === 2
                                ? "bg-red-100 text-red-800 hover:bg-red-100"
                                : "bg-green-100 text-green-800 hover:bg-green-100"
                            }
                          >
                            {i === 2 ? "Flagged" : "Active"}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          {i === 2 && (
                            <Button size="sm" variant="destructive">
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Management</CardTitle>
              <CardDescription>View and manage all transactions on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 p-4 font-medium">
                    <div>ID</div>
                    <div>Material</div>
                    <div>Seller</div>
                    <div>Buyer</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  <div className="divide-y">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="grid grid-cols-6 p-4">
                        <div>TRX-{1000 + i}</div>
                        <div>
                          {["Metal Scrap", "Plastic Waste", "Paper & Cardboard", "Wood Waste", "Chemical Waste"][i - 1]}
                        </div>
                        <div>Seller Company {i}</div>
                        <div>Buyer Company {i}</div>
                        <div>
                          <Badge
                            className={
                              i === 1
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : i === 2
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : i === 3
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                            }
                          >
                            {i === 1 ? "Completed" : i === 2 ? "In Progress" : i === 3 ? "Pending" : "Cancelled"}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Reports</CardTitle>
              <CardDescription>View and download platform reports and statistics.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium mb-2">Available Reports</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">User Growth Report</p>
                        <p className="text-sm text-muted-foreground">
                          Monthly user registration and activity statistics
                        </p>
                      </div>
                      <Button>Download</Button>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Transaction Volume Report</p>
                        <p className="text-sm text-muted-foreground">
                          Detailed breakdown of transaction volume by material type
                        </p>
                      </div>
                      <Button>Download</Button>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Environmental Impact Report</p>
                        <p className="text-sm text-muted-foreground">CO₂ savings and waste diversion metrics</p>
                      </div>
                      <Button>Download</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Platform Usage Report</p>
                        <p className="text-sm text-muted-foreground">
                          User engagement and feature utilization statistics
                        </p>
                      </div>
                      <Button>Download</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

