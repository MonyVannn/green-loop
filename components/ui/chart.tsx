import type React from "react"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface ChartData {
  name: string
  value: number
}

interface BarChartProps {
  data: ChartData[]
  xAxisKey: string
  yAxisKey: string
  height: number
  className?: string
  showAnimation?: boolean
  showLegend?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showTooltip?: boolean
  showGridLines?: boolean
  colors?: string[]
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  xAxisKey,
  yAxisKey,
  height,
  className,
  showAnimation = true,
  showLegend = false,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
  showGridLines = true,
  colors = ["#8884d8"],
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} className={className}>
        <CartesianGrid strokeDasharray={showGridLines ? "3 3" : "none"} />
        {showXAxis && <XAxis dataKey={xAxisKey} />}
        {showYAxis && <YAxis />}
        {showTooltip && <Tooltip />}
        {showLegend && <Legend />}
        {colors.map((color, index) => (
          <Bar key={index} dataKey={yAxisKey} fill={color} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

interface LineChartProps {
  data: ChartData[]
  xAxisKey: string
  yAxisKey: string
  height: number
  className?: string
  showAnimation?: boolean
  showLegend?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showTooltip?: boolean
  showGridLines?: boolean
  curveType?: "monotone" | "natural" | "linear" | "step" | "stepBefore" | "stepAfter"
  colors?: string[]
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  xAxisKey,
  yAxisKey,
  height,
  className,
  showAnimation = true,
  showLegend = false,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
  showGridLines = true,
  curveType = "monotone",
  colors = ["#8884d8"],
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} className={className}>
        <CartesianGrid strokeDasharray={showGridLines ? "3 3" : "none"} />
        {showXAxis && <XAxis dataKey={xAxisKey} />}
        {showYAxis && <YAxis />}
        {showTooltip && <Tooltip />}
        {showLegend && <Legend />}
        {colors.map((color, index) => (
          <Line key={index} type={curveType} dataKey={yAxisKey} stroke={color} strokeWidth={2} dot={false} />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

