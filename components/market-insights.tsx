"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, DollarSign, TrendingUp, BarChart3 } from "lucide-react"

interface MarketInsightsProps {
  materialType: string
  materialName: string
  quantity: string
}

export function MarketInsights({ materialType, materialName, quantity }: MarketInsightsProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [marketValue, setMarketValue] = useState("")
  const [co2Reduction, setCo2Reduction] = useState("")
  const [landfillDiversion, setLandfillDiversion] = useState("")
  const [demandTrend, setDemandTrend] = useState("")

  useEffect(() => {
    setIsLoading(true)

    // Simulate AI market analysis
    setTimeout(() => {
      const quantityNum = Number.parseInt(quantity) || 100

      // Calculate market value based on material type
      let valuePerKg = 0
      if (materialType === "metal") valuePerKg = 0.85
      else if (materialType === "plastic") valuePerKg = 0.45
      else if (materialType === "paper") valuePerKg = 0.25
      else if (materialType === "wood") valuePerKg = 0.3
      else if (materialType === "electronic") valuePerKg = 1.2
      else if (materialType === "glass") valuePerKg = 0.15
      else if (materialType === "chemical") valuePerKg = 0.9
      else valuePerKg = 0.4

      const totalValue = valuePerKg * quantityNum
      setMarketValue(`$${totalValue.toFixed(2)}`)

      // Calculate environmental impact
      let co2PerKg = 0
      if (materialType === "metal") co2PerKg = 2.5
      else if (materialType === "plastic") co2PerKg = 1.8
      else if (materialType === "paper") co2PerKg = 1.2
      else if (materialType === "wood") co2PerKg = 1.5
      else co2PerKg = 1.7

      const totalCo2 = co2PerKg * quantityNum
      setCo2Reduction(`${totalCo2.toFixed(1)} kg`)

      // Set landfill diversion
      setLandfillDiversion(`${quantityNum.toFixed(0)} kg`)

      // Set demand trend based on material type
      if (materialType === "metal" || materialType === "electronic") {
        setDemandTrend("High")
      } else if (materialType === "plastic" || materialType === "paper") {
        setDemandTrend("Medium")
      } else {
        setDemandTrend("Stable")
      }

      setIsLoading(false)
    }, 1200)
  }, [materialType, materialName, quantity])

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Market Insights</CardTitle>
        <CardDescription>AI-powered market analysis and impact metrics</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4 py-2">
            <div className="h-16 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-16 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-16 bg-gray-100 animate-pulse rounded-md"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border rounded-md">
                <div className="flex items-center mb-1">
                  <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                  <span className="text-sm font-medium">Estimated Value</span>
                </div>
                <div className="text-2xl font-bold">{marketValue}</div>
                <div className="text-xs text-muted-foreground">Market rate analysis</div>
              </div>

              <div className="p-3 border rounded-md">
                <div className="flex items-center mb-1">
                  <TrendingUp className="h-4 w-4 mr-1 text-blue-600" />
                  <span className="text-sm font-medium">Market Demand</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold mr-2">{demandTrend}</span>
                  <Badge
                    className={
                      demandTrend === "High"
                        ? "bg-green-50 text-green-800 border-green-200"
                        : demandTrend === "Medium"
                          ? "bg-blue-50 text-blue-800 border-blue-200"
                          : "bg-gray-50 text-gray-800 border-gray-200"
                    }
                  >
                    {demandTrend === "High" ? "↑" : demandTrend === "Medium" ? "→" : "−"}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">Current trend</div>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-md">
              <h3 className="text-sm font-medium flex items-center mb-3">
                <Leaf className="h-4 w-4 mr-1 text-green-600" />
                Environmental Impact
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-green-800">CO₂ Reduction</div>
                  <div className="text-xl font-bold text-green-700">{co2Reduction}</div>
                </div>

                <div>
                  <div className="text-sm text-green-800">Landfill Diversion</div>
                  <div className="text-xl font-bold text-green-700">{landfillDiversion}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center text-xs text-muted-foreground pt-1">
              <BarChart3 className="h-3 w-3 mr-1" />
              Based on historical transaction data and market trends
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

