"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, MessageSquare, RefreshCw } from "lucide-react"

interface AIMatchingRecommendationsProps {
  materialType: string
  materialName: string
  quantity: string
  location: string
}

// Mock data for potential buyers
const potentialBuyers = [
  {
    id: 1,
    name: "EcoMetals Inc.",
    matchScore: 92,
    location: "Chicago, IL",
    distance: 5,
    estimatedValue: "$450",
    materials: ["metal", "electronic"],
  },
  {
    id: 2,
    name: "GreenPlastics Co.",
    matchScore: 87,
    location: "Evanston, IL",
    distance: 12,
    estimatedValue: "$320",
    materials: ["plastic"],
  },
  {
    id: 3,
    name: "RecycleTech",
    matchScore: 78,
    location: "Oak Park, IL",
    distance: 8,
    estimatedValue: "$280",
    materials: ["electronic", "metal", "plastic"],
  },
  {
    id: 4,
    name: "PaperWorks",
    matchScore: 85,
    location: "Naperville, IL",
    distance: 15,
    estimatedValue: "$190",
    materials: ["paper", "cardboard"],
  },
  {
    id: 5,
    name: "WoodReclaim",
    matchScore: 81,
    location: "Schaumburg, IL",
    distance: 22,
    estimatedValue: "$210",
    materials: ["wood"],
  },
]

export function AIMatchingRecommendations({
  materialType,
  materialName,
  quantity,
  location,
}: AIMatchingRecommendationsProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [buyers, setBuyers] = useState<any[]>([])

  useEffect(() => {
    setIsLoading(true)

    // Simulate AI matching process
    setTimeout(() => {
      let filteredBuyers = [...potentialBuyers]

      // Filter by material type if provided
      if (materialType) {
        filteredBuyers = filteredBuyers.filter((buyer) => buyer.materials.includes(materialType))
      }

      // Sort by match score
      filteredBuyers.sort((a, b) => b.matchScore - a.matchScore)

      // Take top 3
      setBuyers(filteredBuyers.slice(0, 3))
      setIsLoading(false)
    }, 1500)
  }, [materialType, materialName, quantity, location])

  const refreshMatches = () => {
    setIsLoading(true)

    // Simulate refreshing matches
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">AI-Powered Matches</CardTitle>
            <CardDescription>Potential buyers for your waste material</CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={refreshMatches} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4 py-2">
            <div className="h-20 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-20 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-20 bg-gray-100 animate-pulse rounded-md"></div>
          </div>
        ) : buyers.length > 0 ? (
          <div className="space-y-4">
            {buyers.map((buyer) => (
              <div key={buyer.id} className="flex flex-col p-3 border rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{buyer.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>
                        {buyer.location} ({buyer.distance} km)
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-green-50 text-green-800 border-green-200">{buyer.matchScore}% Match</Badge>
                </div>
                <div className="flex items-center mb-2">
                  <Progress value={buyer.matchScore} className="h-1.5" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium">Est. Value:</span> {buyer.estimatedValue}
                  </div>
                  <Button size="sm" className="gap-1">
                    <MessageSquare className="h-3 w-3" />
                    Contact
                  </Button>
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground text-center pt-2">
              AI-powered matches based on material type, location, and transaction history
            </p>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No matches found yet.</p>
            <p className="text-sm text-muted-foreground mt-1">Add more details to improve matching.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

