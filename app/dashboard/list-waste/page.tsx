"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  ArrowLeft,
  Check,
  CheckCircle,
  ChevronsUpDown,
  Info,
  Sparkles,
  ThumbsUp,
  Trash2,
  Upload,
  Wand2,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { AIMatchingRecommendations } from "@/components/ai-matching-recommendations"
import { ComplianceChecker } from "@/components/compliance-checker"
import { MarketInsights } from "@/components/market-insights"
import { SmartListingPreview } from "@/components/smart-listing-preview"

const wasteCategories = [
  { value: "metal", label: "Metal Scrap" },
  { value: "plastic", label: "Plastic Waste" },
  { value: "paper", label: "Paper & Cardboard" },
  { value: "wood", label: "Wood Waste" },
  { value: "chemical", label: "Chemical Waste" },
  { value: "textile", label: "Textile Waste" },
  { value: "electronic", label: "Electronic Waste" },
  { value: "glass", label: "Glass Waste" },
  { value: "organic", label: "Organic Waste" },
  { value: "other", label: "Other" },
]

// Mock data for material suggestions
const materialSuggestions = [
  { value: "aluminum-scrap", label: "Aluminum Scrap" },
  { value: "copper-wire", label: "Copper Wire" },
  { value: "steel-offcuts", label: "Steel Offcuts" },
  { value: "brass-turnings", label: "Brass Turnings" },
  { value: "lead-scrap", label: "Lead Scrap" },
  { value: "hdpe-plastic", label: "HDPE Plastic" },
  { value: "ldpe-plastic", label: "LDPE Plastic" },
  { value: "pet-bottles", label: "PET Bottles" },
  { value: "pp-containers", label: "PP Containers" },
  { value: "cardboard-boxes", label: "Cardboard Boxes" },
  { value: "office-paper", label: "Office Paper" },
  { value: "newspaper", label: "Newspaper" },
  { value: "wood-pallets", label: "Wood Pallets" },
  { value: "sawdust", label: "Sawdust" },
  { value: "electronic-boards", label: "Electronic Circuit Boards" },
]

export default function ListWastePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [materialValue, setMaterialValue] = useState("")
  const [materialInput, setMaterialInput] = useState("")
  const [category, setCategory] = useState("")
  const [quantity, setQuantity] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [frequency, setFrequency] = useState("")
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false)
  const [showAIRecommendations, setShowAIRecommendations] = useState(false)
  const [formCompleteness, setFormCompleteness] = useState(0)
  const [showPreview, setShowPreview] = useState(false)

  // Update form completeness
  useEffect(() => {
    let complete = 0
    if (materialValue) complete += 20
    if (category) complete += 20
    if (quantity) complete += 20
    if (location) complete += 20
    if (description) complete += 20
    setFormCompleteness(complete)

    // Show AI recommendations when form is at least 40% complete
    if (complete >= 40 && !showAIRecommendations) {
      setShowAIRecommendations(true)
    }
  }, [materialValue, category, quantity, location, description])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const generateSmartDescription = () => {
    setIsGeneratingDescription(true)

    // Simulate AI-generated description
    setTimeout(() => {
      const generatedDescription = `High-quality ${materialInput || "waste material"} available for immediate purchase. ${
        category === "metal"
          ? "This metal scrap is clean and sorted, ideal for recycling or reuse in manufacturing processes."
          : category === "plastic"
            ? "This plastic waste has been cleaned and sorted by type, ready for recycling into new products."
            : category === "paper"
              ? "Clean paper and cardboard waste, suitable for pulping and recycling into new paper products."
              : category === "wood"
                ? "Wood waste in good condition, suitable for recycling, biomass energy, or reuse in manufacturing."
                : "This material has been properly sorted and prepared for efficient recycling or reuse."
      } Located in ${location || "our facility"}, with ${quantity || "substantial"} kg available ${
        frequency === "one-time"
          ? "as a one-time pickup"
          : frequency === "weekly"
            ? "with weekly availability"
            : frequency === "monthly"
              ? "with monthly availability"
              : frequency === "quarterly"
                ? "with quarterly availability"
                : "with regular availability"
      }. Contact us for more details or to arrange inspection.`

      setDescription(generatedDescription)
      setIsGeneratingDescription(false)
    }, 1500)
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)

    // Auto-suggest material based on category
    if (value === "metal" && !materialValue) {
      setMaterialInput("Metal Scrap")
    } else if (value === "plastic" && !materialValue) {
      setMaterialInput("Plastic Waste")
    } else if (value === "paper" && !materialValue) {
      setMaterialInput("Cardboard")
    }
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">List Waste Material</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Create New Waste Listing</CardTitle>
                    <CardDescription>
                      Provide details about your waste material to find potential buyers.
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">Form Completeness</span>
                      <span className="text-sm font-medium">{formCompleteness}%</span>
                    </div>
                    <Progress value={formCompleteness} className="w-[150px]" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Material Name</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                        >
                          {materialValue
                            ? materialSuggestions.find((material) => material.value === materialValue)?.label
                            : materialInput || "Select material..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search materials..."
                            value={materialInput}
                            onValueChange={setMaterialInput}
                          />
                          <CommandList>
                            <CommandEmpty>No material found.</CommandEmpty>
                            <CommandGroup>
                              {materialSuggestions.map((material) => (
                                <CommandItem
                                  key={material.value}
                                  value={material.value}
                                  onSelect={(currentValue) => {
                                    setMaterialValue(currentValue === materialValue ? "" : currentValue)
                                    setMaterialInput(material.label)
                                    setOpen(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      materialValue === material.value ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  {material.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <p className="text-xs text-muted-foreground">
                      <Sparkles className="inline h-3 w-3 mr-1" />
                      AI-powered suggestions as you type
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Waste Category</Label>
                    <Select value={category} onValueChange={handleCategoryChange} required>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {wasteCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {category && (
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" /> Auto-classified
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity (kg)</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      placeholder="e.g., 500"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger id="frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-time">One-time</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Chicago, IL"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="description">Description</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={generateSmartDescription}
                      disabled={isGeneratingDescription || (!materialInput && !category)}
                    >
                      {isGeneratingDescription ? (
                        <>Generating...</>
                      ) : (
                        <>
                          <Wand2 className="h-3 w-3" />
                          Generate Smart Description
                        </>
                      )}
                    </Button>
                  </div>
                  <Textarea
                    id="description"
                    placeholder="Provide details about the waste material, its condition, and any other relevant information."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                  {description && (
                    <div className="flex items-center justify-end mt-1">
                      <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                        <ThumbsUp className="h-3 w-3 mr-1" /> AI-enhanced description
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Images (Optional)</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden border group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Waste material ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setImages(images.filter((_, i) => i !== index))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="aspect-square flex items-center justify-center border border-dashed rounded-md cursor-pointer hover:bg-muted/50">
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <Label
                        htmlFor="images"
                        className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Upload Images</span>
                      </Label>
                    </div>
                  </div>
                  {images.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      <Info className="inline h-3 w-3 mr-1" />
                      AI will analyze your images to improve matching and quality assessment
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" asChild>
                  <Link href="/dashboard">Cancel</Link>
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPreview(true)}
                    disabled={formCompleteness < 60}
                  >
                    Preview Listing
                  </Button>
                  <Button type="submit" disabled={isLoading || formCompleteness < 80}>
                    {isLoading ? "Creating listing..." : "Create Listing"}
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Card>

          {/* Compliance Checker */}
          {formCompleteness > 0 && (
            <ComplianceChecker
              materialType={category}
              location={location}
              hasImages={images.length > 0}
              description={description}
            />
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* AI Matching Recommendations */}
          {showAIRecommendations && (
            <AIMatchingRecommendations
              materialType={category}
              materialName={materialInput}
              quantity={quantity}
              location={location}
            />
          )}

          {/* Market Insights */}
          {formCompleteness >= 60 && (
            <MarketInsights materialType={category} materialName={materialInput} quantity={quantity} />
          )}
        </div>
      </div>

      {/* Smart Listing Preview Modal */}
      {showPreview && (
        <SmartListingPreview
          materialName={materialInput}
          category={category}
          quantity={quantity}
          location={location}
          description={description}
          images={images}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  )
}

