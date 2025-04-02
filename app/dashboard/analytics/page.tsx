"use client"

import { Badge } from "@/components/ui/badge"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, Leaf, AlertCircle } from "lucide-react"
import Link from "next/link"
import { BarChart, LineChart } from "@/components/ui/chart"
import { TooltipProvider } from "@/components/ui/tooltip"
import { MetricWithTooltip, InsightCard, PredictionCard } from "@/components/insight-card"
import { CategoryPerformance } from "@/components/category-performance"
import { HeatmapVisualization } from "@/components/heatmap-visualization"
import { ImpactEquivalents } from "@/components/impact-equivalents"
import { PredictiveAnalytics } from "@/components/predictive-analytics"

export default function AnalyticsPage() {
  return (
    <TooltipProvider>
      <div className="p-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold">Analytics</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="last30days">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7days">Last 7 days</SelectItem>
                <SelectItem value="last30days">Last 30 days</SelectItem>
                <SelectItem value="last90days">Last 90 days</SelectItem>
                <SelectItem value="lastYear">Last year</SelectItem>
                <SelectItem value="allTime">All time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* AI Insights and Alerts Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">AI Insights & Alerts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <InsightCard title="Monthly Recommendation" type="recommendation">
              <p>
                Based on your data, consider targeting more <strong>Plastic Waste</strong> next month — it's in high
                demand in your region with a 24% growth in transactions.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                This recommendation is based on current market trends and your historical performance.
              </p>
            </InsightCard>

            <InsightCard title="Activity Anomaly Detected" type="alert">
              <p>
                You had a <strong>40% drop in transactions</strong> last week compared to your monthly average. Consider
                checking your listing activity and engagement.
              </p>
              <Button size="sm" variant="outline" className="mt-2">
                View Listing Activity
              </Button>
            </InsightCard>
          </div>
        </div>

        {/* Key Metrics with Enhanced Tooltips */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <MetricWithTooltip
            label="Total Waste Diverted"
            value="5,240 kg"
            tooltip="This is equivalent to keeping 52 cubic meters of waste out of landfills. That's about the volume of a shipping container!"
            positive={true}
            change="+12%"
          />
          <MetricWithTooltip
            label="CO₂ Emissions Saved"
            value="1,350 kg"
            tooltip="This is equivalent to taking 3 cars off the road for a month. Your waste diversion is making a real impact on reducing greenhouse gas emissions."
            positive={true}
            change="+8%"
            icon={<Leaf className="h-4 w-4 text-green-600" />}
          />
          <MetricWithTooltip
            label="Completed Transactions"
            value="28"
            tooltip="Each transaction represents a successful waste exchange that diverted materials from landfills into productive reuse."
            positive={true}
            change="+4"
          />
          <MetricWithTooltip
            label="Cost Savings"
            value="$3,850"
            tooltip="Total financial savings from avoided disposal costs and revenue from material sales compared to conventional waste management."
            positive={true}
            change="+15%"
          />
        </div>

        {/* Predictive Metrics */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Next Month Forecasts</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <PredictionCard
              title="Waste Diversion"
              currentValue="620 kg"
              predictedValue="680 kg"
              percentageChange="+9.7%"
              type="increase"
            />
            <PredictionCard
              title="CO₂ Emissions Saved"
              currentValue="170 kg"
              predictedValue="190 kg"
              percentageChange="+11.8%"
              type="increase"
            />
            <PredictionCard
              title="Transactions"
              currentValue="9"
              predictedValue="11"
              percentageChange="+22%"
              type="increase"
            />
          </div>
        </div>

        <Tabs defaultValue="impact" className="space-y-4">
          <TabsList>
            <TabsTrigger value="waste">Waste Diversion</TabsTrigger>
            <TabsTrigger value="emissions">CO₂ Emissions</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="waste" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Waste Diversion Over Time</CardTitle>
                <CardDescription>Track the amount of waste diverted from landfill over time.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <LineChart
                  data={[
                    { name: "Jan", value: 420 },
                    { name: "Feb", value: 380 },
                    { name: "Mar", value: 510 },
                    { name: "Apr", value: 490 },
                    { name: "May", value: 580 },
                    { name: "Jun", value: 620 },
                    { name: "Jul", value: 750 },
                    { name: "Aug", value: 680 },
                    { name: "Sep", value: 720 },
                    { name: "Oct", value: 890 },
                    { name: "Nov", value: 950 },
                    { name: "Dec", value: 1020 },
                  ]}
                  xAxisKey="name"
                  yAxisKey="value"
                  height={300}
                  className="w-full"
                  showAnimation
                  showLegend={false}
                  showXAxis
                  showYAxis
                  showTooltip
                  showGridLines
                  curveType="monotone"
                  colors={["#0e4714"]}
                />
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Waste by Category</CardTitle>
                <CardDescription>Breakdown of waste diverted by material category.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <BarChart
                  data={[
                    { name: "Metal", value: 1240 },
                    { name: "Plastic", value: 980 },
                    { name: "Paper", value: 850 },
                    { name: "Wood", value: 720 },
                    { name: "Chemical", value: 450 },
                    { name: "Electronic", value: 380 },
                    { name: "Glass", value: 320 },
                    { name: "Textile", value: 180 },
                    { name: "Other", value: 120 },
                  ]}
                  xAxisKey="name"
                  yAxisKey="value"
                  height={300}
                  className="w-full"
                  showAnimation
                  showLegend={false}
                  showXAxis
                  showYAxis
                  showTooltip
                  showGridLines
                  colors={["#0e4714"]}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emissions" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>CO₂ Emissions Saved Over Time</CardTitle>
                <CardDescription>Track the amount of CO₂ emissions saved over time.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <LineChart
                  data={[
                    { name: "Jan", value: 120 },
                    { name: "Feb", value: 90 },
                    { name: "Mar", value: 140 },
                    { name: "Apr", value: 130 },
                    { name: "May", value: 160 },
                    { name: "Jun", value: 170 },
                    { name: "Jul", value: 210 },
                    { name: "Aug", value: 190 },
                    { name: "Sep", value: 200 },
                    { name: "Oct", value: 240 },
                    { name: "Nov", value: 260 },
                    { name: "Dec", value: 280 },
                  ]}
                  xAxisKey="name"
                  yAxisKey="value"
                  height={300}
                  className="w-full"
                  showAnimation
                  showLegend={false}
                  showXAxis
                  showYAxis
                  showTooltip
                  showGridLines
                  curveType="monotone"
                  colors={["#0e4714"]}
                />
              </CardContent>
            </Card>

            <ImpactEquivalents co2Value={1350} />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Transaction Volume Over Time</CardTitle>
                <CardDescription>Track the number of transactions completed over time.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <LineChart
                  data={[
                    { name: "Jan", value: 2 },
                    { name: "Feb", value: 1 },
                    { name: "Mar", value: 3 },
                    { name: "Apr", value: 2 },
                    { name: "May", value: 4 },
                    { name: "Jun", value: 3 },
                    { name: "Jul", value: 5 },
                    { name: "Aug", value: 4 },
                    { name: "Sep", value: 6 },
                    { name: "Oct", value: 7 },
                    { name: "Nov", value: 8 },
                    { name: "Dec", value: 9 },
                  ]}
                  xAxisKey="name"
                  yAxisKey="value"
                  height={300}
                  className="w-full"
                  showAnimation
                  showLegend={false}
                  showXAxis
                  showYAxis
                  showTooltip
                  showGridLines
                  curveType="monotone"
                  colors={["#0e4714"]}
                />
              </CardContent>
            </Card>

            <CategoryPerformance />
          </TabsContent>

          <TabsContent value="impact" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PredictiveAnalytics />
              <HeatmapVisualization />
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Industry Benchmarking</CardTitle>
                <CardDescription>How your performance compares to similar businesses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Waste Diversion Comparison</h3>
                    <Badge className="bg-green-50 text-green-800 border-green-200">+20% above average</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You diverted 20% more waste than similar-sized companies in your industry this month.
                  </p>
                  <div className="flex items-center pt-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: "80%" }}></div>
                    </div>
                    <div className="w-2"></div>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-400" style={{ width: "60%" }}></div>
                    </div>
                    <div className="ml-2 text-xs text-muted-foreground">
                      <span className="text-green-600 font-medium">You</span> vs{" "}
                      <span className="text-gray-500">Industry</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg space-y-4">
                  <h3 className="text-sm font-medium">Progress Toward Your Goals</h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>10,000 kg waste diverted (Annual)</span>
                      <span className="font-medium">52.4%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "52.4%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground">5,240 kg of 10,000 kg goal (4,760 kg remaining)</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>100 completed transactions (Annual)</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "28%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground">28 of 100 transaction goal (72 remaining)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <InsightCard title="Inventory Intelligence" type="trend">
              <div className="space-y-3">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                  <p>
                    You've had 3 listings for <strong>Plastic Waste</strong> sitting idle for 30+ days
                  </p>
                </div>
                <div className="flex justify-between">
                  <Button size="sm" variant="outline">
                    Review Listings
                  </Button>
                  <Button size="sm">AI Suggestions</Button>
                </div>
              </div>
            </InsightCard>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  )
}

