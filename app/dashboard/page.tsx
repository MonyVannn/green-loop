"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Factory, Recycle, TrendingUp, Truck } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your GreenLoop dashboard.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/list-waste">
            <Button>List New Waste</Button>
          </Link>
          <Link href="/dashboard/find-materials">
            <Button variant="outline">Find Materials</Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waste Diverted</CardTitle>
            <Recycle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,240 kg</div>
            <p className="text-xs text-muted-foreground">+189 kg from last month</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">320 kg</div>
            <p className="text-xs text-muted-foreground">+42 kg from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Recommended Matches */}
      <Tabs defaultValue="recent-activity" className="mb-8">
        <TabsList>
          <TabsTrigger value="recent-activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="recommended">Recommended Matches</TabsTrigger>
        </TabsList>
        <TabsContent value="recent-activity" className="space-y-4 pt-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest transactions and listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-medium">
                        E
                      </div>
                      <div>
                        <p className="font-medium">New inquiry for Metal Scrap</p>
                        <p className="text-sm text-muted-foreground">From: EcoMetals Inc.</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <Badge className="bg-blue-50 text-blue-800 border-blue-200">New</Badge>
                    <p className="text-sm text-muted-foreground">2h ago</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-medium">
                        G
                      </div>
                      <div>
                        <p className="font-medium">Transaction completed: Plastic Waste</p>
                        <p className="text-sm text-muted-foreground">With: GreenPlastics Co.</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                      Completed
                    </Badge>
                    <p className="text-sm text-muted-foreground">1d ago</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center font-medium">
                        A
                      </div>
                      <div>
                        <p className="font-medium">New listing: Wood Pallets</p>
                        <p className="text-sm text-muted-foreground">500 kg available</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <Badge variant="outline">Active</Badge>
                    <p className="text-sm text-muted-foreground">3d ago</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-medium">
                        C
                      </div>
                      <div>
                        <p className="font-medium">Transaction in progress: Chemical Waste</p>
                        <p className="text-sm text-muted-foreground">With: ChemRecycle Ltd.</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                      In Progress
                    </Badge>
                    <p className="text-sm text-muted-foreground">5d ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4 pt-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Recommended Matches</CardTitle>
              <CardDescription>Potential buyers for your waste materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-medium">
                        M
                      </div>
                      <div>
                        <p className="font-medium">Metal Scrap (250 kg)</p>
                        <p className="text-sm text-muted-foreground">Match: MetalWorks Inc. - 5 km away</p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1 mt-2 md:mt-0">
                    Contact <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center font-medium">
                        P
                      </div>
                      <div>
                        <p className="font-medium">Cardboard Waste (180 kg)</p>
                        <p className="text-sm text-muted-foreground">Match: PaperRecycle Co. - 12 km away</p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1 mt-2 md:mt-0">
                    Contact <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-medium">
                        E
                      </div>
                      <div>
                        <p className="font-medium">Plastic Containers (120 kg)</p>
                        <p className="text-sm text-muted-foreground">Match: EcoPlastics Ltd. - 8 km away</p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1 mt-2 md:mt-0">
                    Contact <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-medium">
                        W
                      </div>
                      <div>
                        <p className="font-medium">Wood Scraps (300 kg)</p>
                        <p className="text-sm text-muted-foreground">Match: WoodWorks Manufacturing - 15 km away</p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1 mt-2 md:mt-0">
                    Contact <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Waste Diversion Chart - Cleaned Up */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm h-full">
            <CardHeader>
              <CardTitle>Waste Diversion by Category</CardTitle>
              <CardDescription>Monthly breakdown of waste diverted by material type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col h-full">
                <div className="flex mb-4">
                  <div className="w-24"></div>
                  <div className="flex-1 grid grid-cols-6 gap-2">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
                      <div key={month} className="text-xs text-center font-medium">
                        {month}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  {[
                    { name: "Metal", values: [30, 40, 60, 75, 80, 70] },
                    { name: "Plastic", values: [50, 60, 70, 80, 90, 85] },
                    { name: "Paper", values: [40, 50, 65, 70, 75, 60] },
                    { name: "Wood", values: [20, 30, 40, 50, 60, 55] },
                    { name: "Chemical", values: [10, 15, 20, 25, 30, 25] },
                    { name: "Other", values: [5, 10, 15, 20, 25, 20] },
                  ].map((category) => (
                    <div key={category.name} className="flex items-center">
                      <div className="w-24 text-sm font-medium">{category.name}</div>
                      <div className="flex-1 grid grid-cols-6 gap-2">
                        {category.values.map((value, i) => (
                          <div
                            key={`${category.name}-${i}`}
                            className="aspect-square rounded-md flex items-center justify-center text-xs font-medium text-white"
                            style={{
                              backgroundColor: `rgba(14, 71, 20, ${value / 100})`,
                              opacity: value > 50 ? 1 : 0.9,
                            }}
                          >
                            {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-2 mt-6">
                  <div className="h-3 w-3 rounded-full bg-primary/80"></div>
                  <span className="text-sm font-medium">92% of quarterly target reached</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-0 shadow-sm h-full">
            <CardHeader>
              <CardTitle>Partner Retention</CardTitle>
              <CardDescription>Monthly returning partner activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
                  <div key={month} className="flex items-center gap-3">
                    <div className="w-12 text-sm font-medium">{month}</div>
                    <div className="flex-1 h-6 bg-gray-100 rounded-md overflow-hidden">
                      <div
                        className="h-full bg-[#b5e48c]"
                        style={{
                          width: `${
                            month === "Jan"
                              ? 60
                              : month === "Feb"
                                ? 75
                                : month === "Mar"
                                  ? 65
                                  : month === "Apr"
                                    ? 40
                                    : month === "May"
                                      ? 55
                                      : month === "Jun"
                                        ? 85
                                        : 50
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}

                <div className="pt-4 mt-4 border-t flex justify-between">
                  <div>
                    <div className="text-2xl font-bold">+48</div>
                    <div className="text-sm text-muted-foreground">returning partners</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">12%</div>
                    <div className="text-sm text-muted-foreground">growth</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-primary">
                  <span className="text-sm font-medium">Increasing retention rate</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

