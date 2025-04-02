import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertCircle, ArrowUpRight, Info, Lightbulb, TrendingUp, TrendingDown } from "lucide-react"

interface InsightCardProps {
  title: string
  description?: string
  type: "recommendation" | "alert" | "trend" | "achievement"
  children: React.ReactNode
}

export function InsightCard({ title, description, type, children }: InsightCardProps) {
  const icons = {
    recommendation: <Lightbulb className="h-4 w-4 text-primary" />,
    alert: <AlertCircle className="h-4 w-4 text-yellow-600" />,
    trend: <TrendingUp className="h-4 w-4 text-blue-600" />,
    achievement: <TrendingUp className="h-4 w-4 text-green-600" />,
  }

  const colors = {
    recommendation: "bg-primary/5 border-primary/10",
    alert: "bg-yellow-50 border-yellow-100",
    trend: "bg-blue-50 border-blue-100",
    achievement: "bg-green-50 border-green-100",
  }

  return (
    <Card className={`border-0 shadow-sm ${colors[type]}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icons[type]}
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          <Badge
            variant="outline"
            className={type === "recommendation" ? "bg-primary/10 text-primary border-primary/20" : ""}
          >
            {type === "recommendation" && "AI Recommendation"}
            {type === "alert" && "Alert"}
            {type === "trend" && "Trend"}
            {type === "achievement" && "Achievement"}
          </Badge>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

interface MetricWithTooltipProps {
  label: string
  value: string | number
  tooltip: string
  positive?: boolean
  negative?: boolean
  change?: string
  icon?: React.ReactNode
}

export function MetricWithTooltip({ label, value, tooltip, positive, negative, change, icon }: MetricWithTooltipProps) {
  return (
    <div className="space-y-2 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium flex items-center gap-1">
          {label}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help ml-1" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h3>
        {icon}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">{value}</p>
        {change && (
          <Badge
            variant="outline"
            className={
              positive
                ? "bg-green-50 text-green-800 border-green-200"
                : negative
                  ? "bg-red-50 text-red-800 border-red-200"
                  : ""
            }
          >
            {positive && <TrendingUp className="h-3 w-3 mr-1" />}
            {negative && <TrendingDown className="h-3 w-3 mr-1" />}
            {change}
          </Badge>
        )}
      </div>
    </div>
  )
}

export function PredictionCard({
  title,
  currentValue,
  predictedValue,
  percentageChange,
  type,
}: {
  title: string
  currentValue: string
  predictedValue: string
  percentageChange: string
  type: "increase" | "decrease" | "stable"
}) {
  return (
    <div className="flex flex-col p-4 border rounded-lg">
      <h3 className="text-sm font-medium flex items-center gap-1">
        {title}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help ml-1" />
            </TooltipTrigger>
            <TooltipContent>
              <p>AI prediction based on historical data and market trends</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h3>
      <div className="mt-2 flex items-center">
        <span className="text-xl font-bold">{currentValue}</span>
        <ArrowUpRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-xl font-bold">{predictedValue}</span>
        <Badge
          className={
            type === "increase"
              ? "bg-green-50 text-green-800 border-green-200 ml-2"
              : type === "decrease"
                ? "bg-red-50 text-red-800 border-red-200 ml-2"
                : "bg-gray-50 text-gray-800 border-gray-200 ml-2"
          }
        >
          {type === "increase" && <TrendingUp className="h-3 w-3 mr-1" />}
          {type === "decrease" && <TrendingDown className="h-3 w-3 mr-1" />}
          {percentageChange}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground mt-1">Predicted next month</p>
    </div>
  )
}

