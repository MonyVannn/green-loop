"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Star } from "lucide-react"
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface CategoryData {
  name: string
  transactions: number
  conversion: number
  growth: number
  top: boolean
}

const categoryData: CategoryData[] = [
  { name: "Metal Scrap", transactions: 10, conversion: 78, growth: 15, top: false },
  { name: "Plastic Waste", transactions: 11, conversion: 82, growth: 24, top: true },
  { name: "Paper & Cardboard", transactions: 8, conversion: 65, growth: 5, top: false },
  { name: "Wood Waste", transactions: 6, conversion: 70, growth: 8, top: false },
  { name: "Electronic Waste", transactions: 4, conversion: 90, growth: 35, top: false },
]

export function CategoryPerformance() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Category Performance</CardTitle>
        <CardDescription>Transaction and conversion rates by material category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {categoryData.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">{category.name}</h3>
                  {category.top && (
                    <Badge className="bg-yellow-50 text-yellow-800 border-yellow-200">
                      <Star className="h-3 w-3 mr-1" /> Top Performer
                    </Badge>
                  )}
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {category.growth}% growth
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Transactions</span>
                    <span className="text-xs font-medium">{category.transactions}</span>
                  </div>
                  <Progress
                    value={(category.transactions / 12) * 100}
                    className="h-1.5"
                    indicatorClassName="bg-primary"
                  />
                </div>

                <TooltipProvider>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">
                        Conversion Rate
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help ml-1">ⓘ</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Percentage of listings that led to completed transactions</p>
                          </TooltipContent>
                        </Tooltip>
                      </span>
                      <span className="text-xs font-medium">{category.conversion}%</span>
                    </div>
                    <Progress
                      value={category.conversion}
                      className="h-1.5"
                      indicatorClassName={
                        category.conversion > 80
                          ? "bg-green-600"
                          : category.conversion > 60
                            ? "bg-yellow-600"
                            : "bg-red-600"
                      }
                    />
                  </div>
                </TooltipProvider>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

