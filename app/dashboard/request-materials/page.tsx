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
import { ArrowLeft, Check, CheckCircle, ChevronsUpDown, Info, Sparkles, ThumbsUp, Calendar, Wand2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

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

export default function RequestMaterialsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [materialValue, setMaterialValue] = useState("")
  const [materialInput, setMaterialInput] = useState("")
  const [category, setCategory] = useState("")
  const [quantity, setQuantity] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [frequency, setFrequency] = useState("")
  const [deadline, setDeadline] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false)
  const [showAIRecommendations, setShowAIRecommendations] = useState(false)
  const [formCompleteness, setFormCompleteness] = useState(0)
  const [showPreview, setShowPreview] = useState(false)

  // Update form completeness
  useEffect(() => {
    let complete = 0
    if (materialValue || materialInput) complete += 15
    if (category) complete += 15
    if (quantity) complete += 15
    if (location) complete += 15
    if (description) complete += 15
    if (deadline) complete += 10
    if (priceRange) complete += 15
    setFormCompleteness(complete)

    // Show AI recommendations when form is at least 40% complete
    if (complete >= 40 && !showAIRecommendations) {
      setShowAIRecommendations(true)
    }
  }, [materialValue, materialInput, category, quantity, location, description, deadline, priceRange])

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
      const generatedDescription = `We are looking for high-quality ${materialInput || "waste material"} for our manufacturing process. ${
        category === "metal"
          ? "We require clean metal scrap, preferably sorted by type. We can accept various grades and are equipped to handle processing."
          : category === "plastic"
            ? "We need sorted plastic waste, preferably separated by polymer type. We can process both post-consumer and post-industrial plastic waste."
            : category === "paper"
              ? "We're seeking clean paper and cardboard waste for our recycling operation. Material should be dry and free from contaminants."
              : category === "wood"
                ? "We need wood waste for our manufacturing process. Material should be free from hazardous treatments and sorted by type if possible."
                : "We're looking for quality materials that meet industry standards for our recycling and manufacturing operations."
      } Located in ${location || "our facility"}, we need ${quantity || "a substantial amount"} kg ${
        frequency === "one-time"
          ? "as a one-time delivery"
          : frequency === "weekly"
            ? "with weekly deliveries"
            : frequency === "monthly"
              ? "with monthly deliveries"
              : frequency === "quarterly"
                ? "with quarterly deliveries"
                : "with regular deliveries"
      }. Our budget is ${priceRange || "competitive"} and we need delivery by ${deadline || "the specified deadline"}. Please contact us to discuss specifications and logistics.`

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
        <h1 className="text-2xl font-semibold">Request Materials</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Create Material Request</CardTitle>
                    <CardDescription>Specify the materials you need and let suppliers come to you.</CardDescription>
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
                    <Label htmlFor="title">Material Needed</Label>
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
                    <Label htmlFor="category">Material Category</Label>
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
                    <Label htmlFor="quantity">Quantity Needed (kg)</Label>
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
                    <Label htmlFor="location">Your Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Chicago, IL"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <div className="flex items-center">
                      <Input
                        id="deadline"
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="rounded-r-none"
                      />
                      <Button variant="outline" size="icon" className="rounded-l-none border-l-0" disabled>
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">When do you need this material by?</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price-range">Price Range (per kg)</Label>
                    <Input
                      id="price-range"
                      placeholder="e.g., $0.50-0.75"
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      <Sparkles className="inline h-3 w-3 mr-1" />
                      AI will suggest fair market rates
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="description">Description & Requirements</Label>
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
                    placeholder="Describe the materials you need, quality requirements, and any other specifications."
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
                    Preview Request
                  </Button>
                  <Button type="submit" disabled={isLoading || formCompleteness < 80}>
                    {isLoading ? "Creating request..." : "Create Request"}
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Card>

          {/* Request Requirements Checker */}
          {formCompleteness > 0 && (
            <RequestRequirementsChecker
              materialType={category}
              location={location}
              hasDeadline={!!deadline}
              description={description}
              hasPriceRange={!!priceRange}
            />
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* AI Matching Recommendations */}
          {showAIRecommendations && (
            <SupplierMatchingRecommendations
              materialType={category}
              materialName={materialInput}
              quantity={quantity}
              location={location}
            />
          )}

          {/* Market Insights */}
          {formCompleteness >= 60 && (
            <MaterialAvailabilityInsights materialType={category} materialName={materialInput} quantity={quantity} />
          )}
        </div>
      </div>

      {/* Smart Request Preview Modal */}
      {showPreview && (
        <SmartRequestPreview
          materialName={materialInput}
          category={category}
          quantity={quantity}
          location={location}
          description={description}
          deadline={deadline}
          priceRange={priceRange}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  )
}

// Request Requirements Checker Component
function RequestRequirementsChecker({
  materialType,
  location,
  hasDeadline,
  description,
  hasPriceRange,
}: {
  materialType: string
  location: string
  hasDeadline: boolean
  description: string
  hasPriceRange: boolean
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [completenessScore, setCompletenessScore] = useState(0)
  const [clarityScore, setclarityScore] = useState(0)
  const [issues, setIssues] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])

  useEffect(() => {
    setIsLoading(true)

    // Simulate AI requirements check
    setTimeout(() => {
      let completeness = 0
      let clarity = 0
      const newIssues: string[] = []
      const newRecommendations: string[] = []

      // Calculate completeness score
      if (materialType) {
        completeness += 30

        // Add material-specific requirement checks
        if (materialType === "chemical") {
          newIssues.push("Chemical waste requires specific handling capabilities")
          newRecommendations.push("Add details about your chemical handling capabilities")
          completeness -= 10
        }
      } else {
        newIssues.push("Material type is required for matching with suppliers")
        newRecommendations.push("Select a material type")
      }

      if (location) {
        completeness += 20
      } else {
        newIssues.push("Location is required for logistics planning")
        newRecommendations.push("Add your location")
      }

      if (hasDeadline) {
        completeness += 20
      } else {
        newIssues.push("Deadline helps suppliers determine if they can meet your timeframe")
        newRecommendations.push("Add a deadline for when you need the materials")
      }

      if (hasPriceRange) {
        completeness += 20
      } else {
        newIssues.push("Price range helps match with suppliers within your budget")
        newRecommendations.push("Add your budget or price range")
      }

      if (description && description.length > 50) {
        completeness += 10
        clarity += 40
      } else {
        newIssues.push("Detailed description improves matching accuracy")
        newRecommendations.push("Provide a more detailed description of your requirements")
      }

      // Calculate clarity score
      if (description && description.length > 100) {
        clarity += 30
      }

      if (
        description &&
        (description.includes("quality") || description.includes("grade") || description.includes("specification"))
      ) {
        clarity += 30
      } else {
        newRecommendations.push("Specify quality requirements or grade specifications")
      }

      setCompletenessScore(Math.min(100, completeness))
      setclarityScore(Math.min(100, clarity))
      setIssues(newIssues)
      setRecommendations(newRecommendations)
      setIsLoading(false)
    }, 1000)
  }, [materialType, location, hasDeadline, description, hasPriceRange])

  const getCompletenessStatus = () => {
    if (completenessScore >= 80) return "Complete"
    if (completenessScore >= 50) return "Needs Details"
    return "Incomplete"
  }

  const getClarityGrade = () => {
    if (clarityScore >= 90) return "A"
    if (clarityScore >= 80) return "B"
    if (clarityScore >= 70) return "C"
    if (clarityScore >= 60) return "D"
    return "F"
  }

  return (
    <Card className="border-0 shadow-sm mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">AI Request Analyzer</CardTitle>
        <CardDescription>Real-time analysis of your request effectiveness</CardDescription>
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
                  <span className="text-sm font-medium">Request Completeness</span>
                  <Badge
                    className={
                      completenessScore >= 80
                        ? "bg-green-50 text-green-800 border-green-200"
                        : completenessScore >= 50
                          ? "bg-yellow-50 text-yellow-800 border-yellow-200"
                          : "bg-red-50 text-red-800 border-red-200"
                    }
                  >
                    {getCompletenessStatus()}
                  </Badge>
                </div>
                <Progress value={completenessScore} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Clarity Grade</span>
                  <Badge
                    className={
                      clarityScore >= 80
                        ? "bg-green-50 text-green-800 border-green-200"
                        : clarityScore >= 60
                          ? "bg-yellow-50 text-yellow-800 border-yellow-200"
                          : "bg-red-50 text-red-800 border-red-200"
                    }
                  >
                    Grade {getClarityGrade()}
                  </Badge>
                </div>
                <Progress value={clarityScore} className="h-2" />
              </div>
            </div>

            {issues.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-sm font-medium flex items-center">
                  <Info className="h-4 w-4 mr-1 text-yellow-600" />
                  Issues to Address
                </h4>
                <ul className="space-y-1">
                  {issues.map((issue, index) => (
                    <li key={index} className="text-sm flex items-start">
                      <Info className="h-3 w-3 mr-1 mt-0.5 text-yellow-600 flex-shrink-0" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {recommendations.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-sm font-medium flex items-center">
                  <Sparkles className="h-4 w-4 mr-1 text-blue-600" />
                  Recommendations
                </h4>
                <ul className="space-y-1">
                  {recommendations.map((recommendation, index) => (
                    <li key={index} className="text-sm flex items-start">
                      <ThumbsUp className="h-3 w-3 mr-1 mt-0.5 text-blue-600 flex-shrink-0" />
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {issues.length === 0 && recommendations.length === 0 && (
              <div className="flex items-center justify-center py-2">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                <span className="text-green-600 font-medium">Your request is clear and complete!</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Supplier Matching Recommendations Component
function SupplierMatchingRecommendations({
  materialType,
  materialName,
  quantity,
  location,
}: {
  materialType: string
  materialName: string
  quantity: string
  location: string
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [suppliers, setSuppliers] = useState<any[]>([])

  useEffect(() => {
    setIsLoading(true)

    // Simulate AI matching process
    setTimeout(() => {
      // Mock data for potential suppliers
      const potentialSuppliers = [
        {
          id: 1,
          name: "MetalWorks Inc.",
          matchScore: 92,
          location: "Chicago, IL",
          distance: 5,
          estimatedPrice: "$0.65/kg",
          materials: ["metal", "electronic"],
        },
        {
          id: 2,
          name: "GreenPlastics Co.",
          matchScore: 87,
          location: "Evanston, IL",
          distance: 12,
          estimatedPrice: "$0.45/kg",
          materials: ["plastic"],
        },
        {
          id: 3,
          name: "RecycleTech",
          matchScore: 78,
          location: "Oak Park, IL",
          distance: 8,
          estimatedPrice: "$0.55/kg",
          materials: ["electronic", "metal", "plastic"],
        },
        {
          id: 4,
          name: "PaperWorks",
          matchScore: 85,
          location: "Naperville, IL",
          distance: 15,
          estimatedPrice: "$0.30/kg",
          materials: ["paper", "cardboard"],
        },
        {
          id: 5,
          name: "WoodReclaim",
          matchScore: 81,
          location: "Schaumburg, IL",
          distance: 22,
          estimatedPrice: "$0.25/kg",
          materials: ["wood"],
        },
      ]

      let filteredSuppliers = [...potentialSuppliers]

      // Filter by material type if provided
      if (materialType) {
        filteredSuppliers = filteredSuppliers.filter((supplier) => supplier.materials.includes(materialType))
      }

      // Sort by match score
      filteredSuppliers.sort((a, b) => b.matchScore - a.matchScore)

      // Take top 3
      setSuppliers(filteredSuppliers.slice(0, 3))
      setIsLoading(false)
    }, 1500)
  }, [materialType, materialName, quantity, location])

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">AI-Powered Supplier Matches</CardTitle>
            <CardDescription>Potential suppliers for your material request</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4 py-2">
            <div className="h-20 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-20 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-20 bg-gray-100 animate-pulse rounded-md"></div>
          </div>
        ) : suppliers.length > 0 ? (
          <div className="space-y-4">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="flex flex-col p-3 border rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{supplier.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>
                        {supplier.location} ({supplier.distance} km)
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-green-50 text-green-800 border-green-200">{supplier.matchScore}% Match</Badge>
                </div>
                <div className="flex items-center mb-2">
                  <Progress value={supplier.matchScore} className="h-1.5" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium">Est. Price:</span> {supplier.estimatedPrice}
                  </div>
                  <Button size="sm" className="gap-1">
                    Contact
                  </Button>
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground text-center pt-2">
              AI-powered matches based on material type, location, and supplier history
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

// Material Availability Insights Component
function MaterialAvailabilityInsights({
  materialType,
  materialName,
  quantity,
}: {
  materialType: string
  materialName: string
  quantity: string
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [availability, setAvailability] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [leadTime, setLeadTime] = useState("")
  const [marketTrend, setMarketTrend] = useState("")

  useEffect(() => {
    setIsLoading(true)

    // Simulate AI market analysis
    setTimeout(() => {
      // Calculate availability based on material type
      if (materialType === "metal") {
        setAvailability("High")
        setPriceRange("$0.60-0.85/kg")
        setLeadTime("1-3 days")
        setMarketTrend("Stable")
      } else if (materialType === "plastic") {
        setAvailability("Medium")
        setPriceRange("$0.40-0.55/kg")
        setLeadTime("2-5 days")
        setMarketTrend("Increasing")
      } else if (materialType === "paper") {
        setAvailability("High")
        setPriceRange("$0.25-0.35/kg")
        setLeadTime("1-2 days")
        setMarketTrend("Stable")
      } else if (materialType === "wood") {
        setAvailability("Medium")
        setPriceRange("$0.20-0.30/kg")
        setLeadTime("3-7 days")
        setMarketTrend("Decreasing")
      } else if (materialType === "electronic") {
        setAvailability("Low")
        setPriceRange("$0.90-1.50/kg")
        setLeadTime("5-10 days")
        setMarketTrend("Increasing")
      } else if (materialType === "chemical") {
        setAvailability("Low")
        setPriceRange("$0.75-1.20/kg")
        setLeadTime("7-14 days")
        setMarketTrend("Volatile")
      } else {
        setAvailability("Medium")
        setPriceRange("$0.40-0.70/kg")
        setLeadTime("3-7 days")
        setMarketTrend("Stable")
      }

      setIsLoading(false)
    }, 1200)
  }, [materialType, materialName, quantity])

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Market Insights</CardTitle>
        <CardDescription>AI-powered market analysis for your request</CardDescription>
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
                  <span className="text-sm font-medium">Current Availability</span>
                </div>
                <div className="text-2xl font-bold">{availability}</div>
                <div className="text-xs text-muted-foreground">Based on recent listings</div>
              </div>

              <div className="p-3 border rounded-md">
                <div className="flex items-center mb-1">
                  <span className="text-sm font-medium">Market Price Range</span>
                </div>
                <div className="text-2xl font-bold">{priceRange}</div>
                <div className="text-xs text-muted-foreground">Current market rates</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border rounded-md">
                <div className="flex items-center mb-1">
                  <span className="text-sm font-medium">Typical Lead Time</span>
                </div>
                <div className="text-2xl font-bold">{leadTime}</div>
                <div className="text-xs text-muted-foreground">From request to delivery</div>
              </div>

              <div className="p-3 border rounded-md">
                <div className="flex items-center mb-1">
                  <span className="text-sm font-medium">Price Trend</span>
                </div>
                <div className="text-2xl font-bold">{marketTrend}</div>
                <div className="text-xs text-muted-foreground">Over the past 30 days</div>
              </div>
            </div>

            <div className="flex items-center justify-center text-xs text-muted-foreground pt-1">
              <Sparkles className="h-3 w-3 mr-1" />
              Based on historical transaction data and current market conditions
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Smart Request Preview Component
function SmartRequestPreview({
  materialName,
  category,
  quantity,
  location,
  description,
  deadline,
  priceRange,
  onClose,
}: {
  materialName: string
  category: string
  quantity: string
  location: string
  description: string
  deadline: string
  priceRange: string
  onClose: () => void
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [enhancedTitle, setEnhancedTitle] = useState("")
  const [enhancedDescription, setEnhancedDescription] = useState("")
  const [suggestedTags, setSuggestedTags] = useState<string[]>([])
  const [responseScore, setResponseScore] = useState(0)

  useEffect(() => {
    setIsLoading(true)

    // Simulate AI enhancement
    setTimeout(() => {
      // Generate enhanced title
      const titlePrefix =
        category === "metal"
          ? "Seeking Quality Metal Scrap"
          : category === "plastic"
            ? "Plastic Waste Needed"
            : category === "paper"
              ? "Paper & Cardboard Wanted"
              : category === "wood"
                ? "Wood Materials Required"
                : category === "chemical"
                  ? "Chemical Waste Acquisition"
                  : category === "electronic"
                    ? "Electronic Components Needed"
                    : "Materials Wanted"

      setEnhancedTitle(`${titlePrefix}: ${materialName || "Industrial Materials"} (${quantity || "0"} kg)`)

      // Generate enhanced description
      const enhancedDesc =
        description ||
        `We are looking for high-quality ${materialName || "waste material"} for our manufacturing process. Located in ${location || "our facility"}, we need ${quantity || "a substantial amount"} kg. Our budget is ${priceRange || "competitive"} and we need delivery by ${deadline || "the specified deadline"}.`

      // Add additional details based on category
      const additionalInfo =
        category === "metal"
          ? `

We have the capability to process various grades of metal scrap. Material should be clean and sorted by type if possible. We can arrange pickup or accept delivery based on your preference.`
          : category === "plastic"
            ? `

We're equipped to handle different types of plastic waste. Material should be sorted by polymer type if possible. We're particularly interested in clean, post-industrial plastic waste.`
            : category === "paper"
              ? `

We require clean paper and cardboard waste for our recycling operation. Material should be dry and free from contaminants such as food waste, plastic, or metal fasteners.`
              : category === "wood"
                ? `

We're looking for wood waste that is free from hazardous treatments. We can accept various forms including pallets, offcuts, and sawdust. Material should be relatively clean and sorted.`
                : ""

      setEnhancedDescription(enhancedDesc + additionalInfo)

      // Generate suggested tags
      const baseTags = [category, "wanted", "request"]

      if (category === "metal") {
        baseTags.push("recycling", "manufacturing", "industrial")
      } else if (category === "plastic") {
        baseTags.push("recycling", "polymers", "manufacturing")
      } else if (category === "paper") {
        baseTags.push("recycling", "packaging", "printing")
      } else if (category === "wood") {
        baseTags.push("biomass", "manufacturing", "construction")
      } else if (category === "chemical") {
        baseTags.push("industrial", "processing", "treatment")
      } else if (category === "electronic") {
        baseTags.push("e-waste", "components", "recovery")
      }

      setSuggestedTags(baseTags)

      // Calculate response score
      let score = 50 // Base score

      // Adjust based on material type
      if (category === "metal" || category === "plastic") {
        score += 15
      } else if (category === "electronic" || category === "chemical") {
        score += 10
      }

      // Adjust based on description quality
      if (description && description.length > 100) {
        score += 10
      }

      // Adjust based on price range
      if (priceRange) {
        score += 15
      }

      // Adjust based on deadline
      if (deadline) {
        score += 10
      }

      setResponseScore(Math.min(100, Math.max(0, score)))
      setIsLoading(false)
    }, 1500)
  }, [materialName, category, quantity, location, description, deadline, priceRange])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              AI-Enhanced Request Preview
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>

          {isLoading ? (
            <div className="space-y-4 py-6">
              <div className="h-8 bg-gray-100 animate-pulse rounded-md w-3/4 mx-auto"></div>
              <div className="h-40 bg-gray-100 animate-pulse rounded-md"></div>
              <div className="h-20 bg-gray-100 animate-pulse rounded-md"></div>
            </div>
          ) : (
            <div className="space-y-6">
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
                                  : "Materials Wanted"}
                    </Badge>
                  </div>
                  <CardTitle>{enhancedTitle}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <span>{location || "Location not specified"}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Description & Requirements</h3>
                    <div className="text-sm whitespace-pre-line">{enhancedDescription}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {deadline && (
                      <div className="p-2 bg-gray-50 rounded-md">
                        <div className="text-xs text-muted-foreground">Deadline</div>
                        <div className="font-medium">{new Date(deadline).toLocaleDateString()}</div>
                      </div>
                    )}
                    {priceRange && (
                      <div className="p-2 bg-gray-50 rounded-md">
                        <div className="text-xs text-muted-foreground">Budget</div>
                        <div className="font-medium">{priceRange}</div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {suggestedTags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI-Generated Insights</CardTitle>
                  <CardDescription>How your request will perform in the marketplace</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Predicted Response Rate</h3>
                      <Badge
                        className={
                          responseScore >= 80
                            ? "bg-green-50 text-green-800 border-green-200"
                            : responseScore >= 50
                              ? "bg-blue-50 text-blue-800 border-blue-200"
                              : "bg-yellow-50 text-yellow-800 border-yellow-200"
                        }
                      >
                        {responseScore >= 80 ? "High" : responseScore >= 50 ? "Medium" : "Low"}
                      </Badge>
                    </div>
                    <Progress value={responseScore} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Based on current market conditions and similar requests
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
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Recommendations</h3>
                    <ul className="space-y-2">
                      {!deadline && (
                        <li className="text-sm flex items-start">
                          <ThumbsUp className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                          <span>Add a deadline to increase response rate</span>
                        </li>
                      )}
                      {!priceRange && (
                        <li className="text-sm flex items-start">
                          <ThumbsUp className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                          <span>Add a price range to attract more relevant suppliers</span>
                        </li>
                      )}
                      {(description?.length || 0) < 100 && (
                        <li className="text-sm flex items-start">
                          <ThumbsUp className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                          <span>Expand your description with more details about quality requirements</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

