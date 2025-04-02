"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Info, ShieldAlert, ShieldCheck } from "lucide-react"

interface ComplianceCheckerProps {
  materialType: string
  location: string
  hasImages: boolean
  description: string
}

export function ComplianceChecker({ materialType, location, hasImages, description }: ComplianceCheckerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [complianceScore, setComplianceScore] = useState(0)
  const [qualityScore, setQualityScore] = useState(0)
  const [issues, setIssues] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])

  useEffect(() => {
    setIsLoading(true)

    // Simulate AI compliance check
    setTimeout(() => {
      let compliance = 0
      let quality = 0
      const newIssues: string[] = []
      const newRecommendations: string[] = []

      // Calculate compliance score
      if (materialType) {
        compliance += 30

        // Add material-specific compliance checks
        if (materialType === "chemical") {
          newIssues.push("Chemical waste requires hazardous material documentation")
          newRecommendations.push("Add hazardous material classification details")
          compliance -= 10
        }
      } else {
        newIssues.push("Material type is required for compliance checks")
        newRecommendations.push("Select a material type")
      }

      if (location) {
        compliance += 30

        // Location-specific regulations
        if (location.toLowerCase().includes("chicago")) {
          newRecommendations.push("Chicago requires waste transfer documentation")
        }
      } else {
        newIssues.push("Location is required for regulatory compliance")
        newRecommendations.push("Add your location")
      }

      if (description && description.length > 50) {
        compliance += 20
      } else {
        newIssues.push("Detailed description improves compliance verification")
        newRecommendations.push("Provide a more detailed description")
      }

      if (hasImages) {
        compliance += 20
      } else {
        newIssues.push("Images are recommended for compliance verification")
        newRecommendations.push("Add images of the waste material")
      }

      // Calculate quality score
      quality = Math.min(100, compliance + (hasImages ? 20 : 0) + (description.length > 100 ? 20 : 0))

      setComplianceScore(Math.min(100, compliance))
      setQualityScore(quality)
      setIssues(newIssues)
      setRecommendations(newRecommendations)
      setIsLoading(false)
    }, 1000)
  }, [materialType, location, hasImages, description])

  const getComplianceStatus = () => {
    if (complianceScore >= 80) return "Compliant"
    if (complianceScore >= 50) return "Needs Attention"
    return "Non-Compliant"
  }

  const getQualityGrade = () => {
    if (qualityScore >= 90) return "A"
    if (qualityScore >= 80) return "B"
    if (qualityScore >= 70) return "C"
    if (qualityScore >= 60) return "D"
    return "F"
  }

  return (
    <Card className="border-0 shadow-sm mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">AI Compliance & Quality Check</CardTitle>
        <CardDescription>Real-time validation of your listing</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4 py-2">
            <div className="h-4 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-20 bg-gray-100 animate-pulse rounded-md"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Regulatory Compliance</span>
                  <Badge
                    className={
                      complianceScore >= 80
                        ? "bg-green-50 text-green-800 border-green-200"
                        : complianceScore >= 50
                          ? "bg-yellow-50 text-yellow-800 border-yellow-200"
                          : "bg-red-50 text-red-800 border-red-200"
                    }
                  >
                    {getComplianceStatus()}
                  </Badge>
                </div>
                <Progress value={complianceScore} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Quality Grade</span>
                  <Badge
                    className={
                      qualityScore >= 80
                        ? "bg-green-50 text-green-800 border-green-200"
                        : qualityScore >= 60
                          ? "bg-yellow-50 text-yellow-800 border-yellow-200"
                          : "bg-red-50 text-red-800 border-red-200"
                    }
                  >
                    Grade {getQualityGrade()}
                  </Badge>
                </div>
                <Progress value={qualityScore} className="h-2" />
              </div>
            </div>

            {issues.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-sm font-medium flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1 text-yellow-600" />
                  Issues to Address
                </h4>
                <ul className="space-y-1">
                  {issues.map((issue, index) => (
                    <li key={index} className="text-sm flex items-start">
                      <ShieldAlert className="h-3 w-3 mr-1 mt-0.5 text-yellow-600 flex-shrink-0" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {recommendations.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-sm font-medium flex items-center">
                  <Info className="h-4 w-4 mr-1 text-blue-600" />
                  Recommendations
                </h4>
                <ul className="space-y-1">
                  {recommendations.map((recommendation, index) => (
                    <li key={index} className="text-sm flex items-start">
                      <ShieldCheck className="h-3 w-3 mr-1 mt-0.5 text-blue-600 flex-shrink-0" />
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {issues.length === 0 && recommendations.length === 0 && (
              <div className="flex items-center justify-center py-2">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                <span className="text-green-600 font-medium">All compliance checks passed!</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

