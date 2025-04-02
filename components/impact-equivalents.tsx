"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Droplet, Zap } from "lucide-react"
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

interface ImpactEquivalent {
  icon: React.ReactNode
  value: string
  description: string
  tooltip: string
}

export function ImpactEquivalents({ co2Value }: { co2Value: number }) {
  // Calculate impact equivalents based on CO2 value
  const treeEquivalent = Math.round(co2Value / 25)
  const showersEquivalent = Math.round((co2Value * 2) / 35)
  const homesEquivalent = Math.round(co2Value / 445)

  const equivalents: ImpactEquivalent[] = [
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      value: `${treeEquivalent} trees`,
      description: "planted for a year",
      tooltip: "Calculation based on an average tree absorbing 25kg of CO2 per year",
    },
    {
      icon: <Droplet className="h-8 w-8 text-blue-600" />,
      value: `${showersEquivalent} showers`,
      description: "of water saved",
      tooltip: "Calculation based on an average 8-minute shower using 35 gallons of water",
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      value: `${homesEquivalent} homes`,
      description: "powered for a month",
      tooltip: "Calculation based on average home energy consumption of 445 kWh per month",
    },
  ]

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Impact Equivalents</CardTitle>
        <CardDescription>Making sustainability metrics relatable</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TooltipProvider>
            {equivalents.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4 border rounded-md">
                <div className="mb-2">{item.icon}</div>
                <div className="text-xl font-bold">{item.value}</div>
                <div className="text-sm text-muted-foreground flex items-center">
                  {item.description}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help ml-1" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ))}
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}

