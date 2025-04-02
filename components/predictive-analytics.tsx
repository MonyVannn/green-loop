"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sparkles, CalendarDays } from "lucide-react"
import { useState } from "react"

export function PredictiveAnalytics() {
  const [metricType, setMetricType] = useState("waste")

  // Historical data (past 6 months)
  const historicalWasteData = [
    { name: "Jan", value: 420 },
    { name: "Feb", value: 380 },
    { name: "Mar", value: 510 },
    { name: "Apr", value: 490 },
    { name: "May", value: 580 },
    { name: "Jun", value: 620 },
  ]

  const historicalCO2Data = [
    { name: "Jan", value: 120 },
    { name: "Feb", value: 90 },
    { name: "Mar", value: 140 },
    { name: "Apr", value: 130 },
    { name: "May", value: 160 },
    { name: "Jun", value: 170 },
  ]

  // Predictive data (next 3 months)
  const predictiveWasteData = [
    { name: "Jul", value: 680, predicted: true },
    { name: "Aug", value: 730, predicted: true },
    { name: "Sep", value: 790, predicted: true },
  ]

  const predictiveCO2Data = [
    { name: "Jul", value: 190, predicted: true },
    { name: "Aug", value: 210, predicted: true },
    { name: "Sep", value: 230, predicted: true },
  ]

  // Combine historical and predictive data
  const combinedWasteData = [...historicalWasteData, ...predictiveWasteData]
  const combinedCO2Data = [...historicalCO2Data, ...predictiveCO2Data]

  // Seasonal insights based on the metric
  const seasonalInsights = {
    waste: [
      "Metal scrap availability typically spikes in Q2",
      "Paper & Cardboard expected to increase by 20% in demand next quarter",
      "Electronic waste tends to decrease during summer months",
    ],
    co2: [
      "CO₂ savings follow material volume patterns with an efficiency multiplier",
      "Highest CO₂ savings occur in August-October period historically",
      "Metals and electronics provide highest CO₂ savings per kg",
    ],
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="w-[90%]">
          <div className="flex items-center gap-2">
            <CardTitle>Predictive Analytics</CardTitle>
            {/* <Badge className="bg-blue-50 text-blue-800 border-blue-200">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Forecast
            </Badge> */}
          </div>
          <CardDescription className="w-[30%]">Forecast for the next 3 months </CardDescription>
        </div>
        <Select value={metricType} onValueChange={setMetricType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="waste">Waste Diversion</SelectItem>
            <SelectItem value="co2">CO₂ Emissions</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[300px]">
          <LineChart
            data={metricType === "waste" ? combinedWasteData : combinedCO2Data}
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
        </div>

        <div className="space-y-2 mt-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Seasonal Patterns & Insights</h3>
          </div>
          <div className="space-y-2">
            {(metricType === "waste" ? seasonalInsights.waste : seasonalInsights.co2).map((insight, index) => (
              <div key={index} className="p-2 bg-muted/50 rounded-md text-sm flex items-start">
                <Sparkles className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

