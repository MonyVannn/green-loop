"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Factory, Leaf, MapPin, Sparkles, Tag, ThumbsUp } from "lucide-react"

interface SmartListingPreviewProps {
  materialName: string
  category: string
  quantity: string
  location: string
  description: string
  images: string[]
  onClose: () => void
}

export function SmartListingPreview({
  materialName,
  category,
  quantity,
  location,
  description,
  images,
  onClose,
}: SmartListingPreviewProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [enhancedTitle, setEnhancedTitle] = useState("")
  const [enhancedDescription, setEnhancedDescription] = useState("")
  const [suggestedTags, setSuggestedTags] = useState<string[]>([])
  const [demandScore, setDemandScore] = useState(0)

  useEffect(() => {
    setIsLoading(true)

    // Simulate AI enhancement
    setTimeout(() => {
      // Generate enhanced title
      const titlePrefix =
        category === "metal"
          ? "Premium Metal Scrap"
          : category === "plastic"
            ? "High-Quality Plastic Waste"
            : category === "paper"
              ? "Recyclable Paper & Cardboard"
              : category === "wood"
                ? "Reusable Wood Materials"
                : category === "chemical"
                  ? "Industrial Chemical Waste"
                  : category === "electronic"
                    ? "Recoverable Electronic Components"
                    : "Recyclable Materials"

      setEnhancedTitle(`${titlePrefix}: ${materialName || "Industrial Waste"} (${quantity || "0"} kg)`)

      // Generate enhanced description
      const enhancedDesc =
        description ||
        `High-quality ${materialName || "waste material"} available for immediate purchase. This material has been properly sorted and prepared for efficient recycling or reuse. Located in ${location || "our facility"}, with ${quantity || "substantial"} kg available.`

      // Add additional details based on category
      const additionalInfo =
        category === "metal"
          ? "\n\nThis metal is free from contaminants and sorted by type, making it ideal for direct recycling into new products. Our material meets industry standards for purity and consistency."
          : category === "plastic"
            ? "\n\nThis plastic waste has been cleaned, sorted by polymer type, and is ready for processing. Suitable for recycling into new plastic products or materials."
            : category === "paper"
              ? "\n\nThis paper and cardboard material is dry, clean, and sorted. Ideal for pulping and recycling into new paper products."
              : category === "wood"
                ? "\n\nThis wood material is clean and free from hazardous treatments. Suitable for recycling, biomass energy production, or reuse in manufacturing."
                : ""

      setEnhancedDescription(enhancedDesc + additionalInfo)

      // Generate suggested tags
      const baseTags = [category]

      if (category === "metal") {
        baseTags.push("recyclable", "industrial", "manufacturing")
      } else if (category === "plastic") {
        baseTags.push("recyclable", "polymer", "packaging")
      } else if (category === "paper") {
        baseTags.push("recyclable", "packaging", "office")
      } else if (category === "wood") {
        baseTags.push("biomass", "pallets", "construction")
      } else if (category === "chemical") {
        baseTags.push("industrial", "hazardous", "treatment")
      } else if (category === "electronic") {
        baseTags.push("e-waste", "components", "recovery")
      }

      setSuggestedTags(baseTags)

      // Calculate demand score
      let demand = 50 // Base score

      // Adjust based on material type
      if (category === "metal" || category === "electronic") {
        demand += 20
      } else if (category === "plastic" || category === "paper") {
        demand += 15
      } else if (category === "chemical") {
        demand -= 10
      }

      // Adjust based on description quality
      if (description && description.length > 100) {
        demand += 10
      }

      // Adjust based on images
      if (images.length > 0) {
        demand += 10 * Math.min(images.length, 3)
      }

      setDemandScore(Math.min(100, Math.max(0, demand)))
      setIsLoading(false)
    }, 1500)
  }, [materialName, category, quantity, location, description, images])

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-primary" />
            AI-Enhanced Listing Preview
          </DialogTitle>
          <DialogDescription>Preview how your listing will appear with AI enhancements</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4 py-6">
            <div className="h-8 bg-gray-100 animate-pulse rounded-md w-3/4 mx-auto"></div>
            <div className="h-40 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-20 bg-gray-100 animate-pulse rounded-md"></div>
          </div>
        ) : (
          <Tabs defaultValue="preview">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="preview">Listing Preview</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="pt-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-50 text-blue-800 border-blue-200 mb-2">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI-Enhanced
                    </Badge>
                    <Badge variant="outline">
                      {category === "metal"
                        ? "Metal Scrap"
                        : category === "plastic"
                          ? "Plastic Waste"
                          : category === "paper"
                            ? "Paper & Cardboard"
                            : category === "wood"
                              ? "Wood Waste"
                              : category === "chemical"
                                ? "Chemical Waste"
                                : category === "electronic"
                                  ? "Electronic Waste"
                                  : "Waste Material"}
                    </Badge>
                  </div>
                  <CardTitle>{enhancedTitle}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{location || "Location not specified"}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {images.slice(0, 3).map((image, index) => (
                        <div key={index} className="aspect-square rounded-md overflow-hidden">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Waste material ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Description</h3>
                    <div className="text-sm whitespace-pre-line">{enhancedDescription}</div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {suggestedTags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center">
                    <Factory className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Your Company Name</span>
                  </div>
                  <Badge className="bg-green-50 text-green-800 border-green-200">
                    <Leaf className="h-3 w-3 mr-1" />
                    Eco-friendly
                  </Badge>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Generated Insights</CardTitle>
                  <CardDescription>How your listing will perform in the marketplace</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Predicted Demand Score</h3>
                      <Badge
                        className={
                          demandScore >= 80
                            ? "bg-green-50 text-green-800 border-green-200"
                            : demandScore >= 50
                              ? "bg-blue-50 text-blue-800 border-blue-200"
                              : "bg-yellow-50 text-yellow-800 border-yellow-200"
                        }
                      >
                        {demandScore >= 80 ? "High" : demandScore >= 50 ? "Medium" : "Low"}
                      </Badge>
                    </div>
                    <Progress value={demandScore} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Based on current market conditions and similar listings
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">AI Enhancements Applied</h3>
                    <ul className="space-y-2">
                      <li className="text-sm flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Title Optimization</span>
                          <p className="text-muted-foreground">Enhanced with industry-specific terminology</p>
                        </div>
                      </li>
                      <li className="text-sm flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Description Enhancement</span>
                          <p className="text-muted-foreground">Added material-specific details and formatting</p>
                        </div>
                      </li>
                      <li className="text-sm flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Smart Tagging</span>
                          <p className="text-muted-foreground">Added relevant tags to improve discoverability</p>
                        </div>
                      </li>
                      {images.length > 0 && (
                        <li className="text-sm flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Image Analysis</span>
                            <p className="text-muted-foreground">Verified image quality and relevance</p>
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Recommendations</h3>
                    <ul className="space-y-2">
                      {!images.length && (
                        <li className="text-sm flex items-start">
                          <ThumbsUp className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                          <span>Add images to increase visibility and buyer interest</span>
                        </li>
                      )}
                      {(description?.length || 0) < 100 && (
                        <li className="text-sm flex items-start">
                          <ThumbsUp className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                          <span>Expand your description with more details about material quality</span>
                        </li>
                      )}
                      <li className="text-sm flex items-start">
                        <ThumbsUp className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                        <span>Consider adding pricing information to attract more buyers</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close Preview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

