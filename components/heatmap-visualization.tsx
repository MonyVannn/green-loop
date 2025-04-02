"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

// Mock data for heatmap
const regionData = [
  { id: 1, name: "California", transactions: 18, costSavings: 1200, color: "#0e4714" },
  { id: 2, name: "Texas", transactions: 12, costSavings: 850, color: "#1a6e23" },
  { id: 3, name: "Florida", transactions: 8, costSavings: 550, color: "#2d8d35" },
  { id: 4, name: "New York", transactions: 6, costSavings: 950, color: "#43aa4a" },
  { id: 5, name: "Illinois", transactions: 5, costSavings: 650, color: "#62ba68" },
  { id: 6, name: "Pennsylvania", transactions: 3, costSavings: 300, color: "#81ca86" },
  { id: 7, name: "Ohio", transactions: 2, costSavings: 200, color: "#a0dba3" },
  { id: 8, name: "Georgia", transactions: 1, costSavings: 150, color: "#beebb1" },
]

export function HeatmapVisualization() {
  const [view, setView] = useState<"transactions" | "costSavings">("transactions")

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="w-full">
          <CardTitle>Geographic Activity</CardTitle>
          <CardDescription>Regional distribution of waste exchange activity</CardDescription>
        </div>
        <Select value={view} onValueChange={(value) => setView(value as "transactions" | "costSavings")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="transactions">Transactions</SelectItem>
            <SelectItem value="costSavings">Cost Savings</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="aspect-[1.6/1] relative bg-gray-100 rounded-md p-4 flex items-center justify-center">
            <div className="text-center text-gray-500">
              {/* In a real implementation, this would be an actual map visualization */}
              <div className="mb-2">Geographic Heatmap Visualization</div>
              <div className="text-xs">Regional waste exchange activity across Cambodia</div>
            </div>
          </div>

          <div className="space-y-3 mt-2">
            <div className="text-sm font-medium">Top Regions</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {regionData
                .sort((a, b) =>
                  view === "transactions" ? b.transactions - a.transactions : b.costSavings - a.costSavings,
                )
                .slice(0, 4)
                .map((region) => (
                  <div key={region.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }} />
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{region.name}</span>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {view === "transactions" ? `${region.transactions} transactions` : `$${region.costSavings} saved`}
                    </Badge>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

