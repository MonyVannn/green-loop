"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Factory,
  Leaf,
  MapPin,
  MessageSquare,
  Mic,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Truck,
  Wand2,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

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

// Mock data for available materials
const availableMaterials = [
  {
    id: 1,
    title: "Aluminum Scrap",
    category: "Metal Scrap",
    quantity: 500,
    distance: 12,
    company: "MetalWorks Inc.",
    location: "Chicago, IL",
    description: "Clean aluminum scrap from manufacturing process. Available for immediate pickup.",
    postedDate: "2 days ago",
    images: ["https://i.pinimg.com/736x/c9/3b/7e/c93b7e35ae6870b58e862c4dcdce5089.jpg"],
    aiVerified: true,
    qualityScore: 92,
    demandScore: "High",
    carbonSavings: 450,
    estimatedDelivery: "2-3 days",
    tags: ["recyclable", "manufacturing", "high-purity"],
  },
  {
    id: 2,
    title: "Plastic Packaging Waste",
    category: "Plastic Waste",
    quantity: 350,
    distance: 8,
    company: "PackageCo",
    location: "Evanston, IL",
    description: "Mixed plastic packaging waste, primarily HDPE and LDPE. Sorted and cleaned.",
    postedDate: "5 days ago",
    images: ["https://i.pinimg.com/736x/7e/d4/72/7ed47252fc732a4feae09e298812a2b1.jpg"],
    aiVerified: true,
    qualityScore: 85,
    demandScore: "Medium",
    carbonSavings: 280,
    estimatedDelivery: "1-2 days",
    tags: ["packaging", "HDPE", "LDPE"],
  },
  {
    id: 3,
    title: "Cardboard Boxes",
    category: "Paper & Cardboard",
    quantity: 800,
    distance: 15,
    company: "ShippingPro",
    location: "Oak Park, IL",
    description: "Used cardboard boxes in good condition. Various sizes available.",
    postedDate: "1 week ago",
    images: ["https://i.pinimg.com/736x/3b/5f/7d/3b5f7d37daf936e2d2365e7e77c41a33.jpg"],
    aiVerified: true,
    qualityScore: 88,
    demandScore: "High",
    carbonSavings: 320,
    estimatedDelivery: "2-3 days",
    tags: ["packaging", "shipping", "recyclable"],
  },
  {
    id: 4,
    title: "Wood Pallets",
    category: "Wood Waste",
    quantity: 120,
    distance: 20,
    company: "LogisticsPlus",
    location: "Naperville, IL",
    description: "Standard wood pallets, some minor damage but mostly in good condition.",
    postedDate: "3 days ago",
    images: ["https://i.pinimg.com/736x/f8/e5/4a/f8e54a853c5618f72149e54deba07c5b.jpg"],
    aiVerified: false,
    qualityScore: 75,
    demandScore: "Medium",
    carbonSavings: 180,
    estimatedDelivery: "3-4 days",
    tags: ["shipping", "reusable", "logistics"],
  },
  {
    id: 5,
    title: "Electronic Components",
    category: "Electronic Waste",
    quantity: 200,
    distance: 25,
    company: "TechRecycle",
    location: "Schaumburg, IL",
    description: "Various electronic components including circuit boards and connectors.",
    postedDate: "1 day ago",
    images: ["https://i.pinimg.com/736x/6a/75/b4/6a75b4c8392aca32e532758e9cc88d38.jpg"],
    aiVerified: true,
    qualityScore: 90,
    demandScore: "High",
    carbonSavings: 520,
    estimatedDelivery: "2-3 days",
    tags: ["electronics", "precious-metals", "recyclable"],
  },
  {
    id: 6,
    title: "Steel Scrap from Automotive Parts",
    category: "Metal Scrap",
    quantity: 750,
    distance: 18,
    company: "AutoRecyclers",
    location: "Joliet, IL",
    description: "High-quality steel scrap from automotive parts. Clean and sorted by type.",
    postedDate: "4 days ago",
    images: ["https://i.pinimg.com/736x/4a/a8/c6/4aa8c622f06a89b3a77edb2a7726e76d.jpg"],
    aiVerified: true,
    qualityScore: 94,
    demandScore: "High",
    carbonSavings: 680,
    estimatedDelivery: "2-3 days",
    tags: ["automotive", "steel", "high-grade"],
  },
  {
    id: 7,
    title: "PET Bottles",
    category: "Plastic Waste",
    quantity: 420,
    distance: 10,
    company: "BeverageRecyclers",
    location: "Skokie, IL",
    description: "Clean PET bottles from beverage production. Crushed and ready for processing.",
    postedDate: "6 days ago",
    images: ["https://i.pinimg.com/736x/fe/41/df/fe41dfac22b98c366ba46da026ee4da7.jpg"],
    aiVerified: true,
    qualityScore: 89,
    demandScore: "Medium",
    carbonSavings: 310,
    estimatedDelivery: "1-2 days",
    tags: ["beverage", "PET", "food-grade"],
  },
]

// Mock data for search suggestions
const searchSuggestions = [
  "aluminum scrap",
  "recyclable plastic",
  "cardboard boxes",
  "wood pallets",
  "electronic waste",
  "metal from automotive",
  "HDPE plastic",
  "clean paper waste",
  "industrial packaging",
  "steel scrap",
]

// Mock data for personalized recommendations
const personalizedRecommendations = [
  {
    id: 101,
    title: "High-Grade Copper Wire",
    category: "Metal Scrap",
    match: 95,
    company: "ElectroCycle",
    distance: 15,
    carbonSavings: 580,
  },
  {
    id: 102,
    title: "Clean HDPE Containers",
    category: "Plastic Waste",
    match: 92,
    company: "PlastiPure",
    distance: 8,
    carbonSavings: 320,
  },
  {
    id: 103,
    title: "Sorted Office Paper",
    category: "Paper & Cardboard",
    match: 88,
    company: "PaperWorks",
    distance: 12,
    carbonSavings: 240,
  },
]

export default function FindMaterialsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchSuggestionOpen, setSearchSuggestionOpen] = useState(false)
  const [category, setCategory] = useState<string>("")
  const [distance, setDistance] = useState<number[]>([50])
  const [filteredMaterials, setFilteredMaterials] = useState(availableMaterials)
  const [isSearching, setIsSearching] = useState(false)
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [showAIChat, setShowAIChat] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatResponses, setChatResponses] = useState<string[]>([])
  const [aiOptimizationEnabled, setAiOptimizationEnabled] = useState(true)
  const [showSustainabilityInsights, setShowSustainabilityInsights] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState<number | null>(null)

  // Filter materials based on active tab
  const tabFilteredMaterials =
    activeTab === "all"
      ? filteredMaterials
      : activeTab === "recommended"
        ? filteredMaterials.filter((m) => m.demandScore === "High" || m.qualityScore > 85)
        : activeTab === "nearby"
          ? filteredMaterials.filter((m) => m.distance <= 15)
          : activeTab === "verified"
            ? filteredMaterials.filter((m) => m.aiVerified)
            : filteredMaterials

  const handleSearch = () => {
    setIsSearching(true)

    // Simulate AI-powered search with a delay
    setTimeout(() => {
      const filtered = availableMaterials.filter((material) => {
        // Simulate semantic search by checking for partial matches in title, description, and tags
        const matchesSearch =
          searchTerm === "" ||
          material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          material.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesCategory =
          category === "all" ||
          category === "" ||
          material.category === wasteCategories.find((c) => c.value === category)?.label

        const matchesDistance = material.distance <= distance[0]

        return matchesSearch && matchesCategory && matchesDistance
      })

      setFilteredMaterials(filtered)
      setIsSearching(false)
    }, 800)
  }

  const handleVoiceSearch = () => {
    setIsVoiceSearchActive(true)

    // Simulate voice recognition
    setTimeout(() => {
      setSearchTerm("recyclable aluminum from car parts")
      setIsVoiceSearchActive(false)
      handleSearch()
    }, 2000)
  }

  const handleChatSend = () => {
    if (!chatMessage.trim()) return

    // Add user message to chat
    setChatResponses([...chatResponses, `You: ${chatMessage}`])

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (chatMessage.toLowerCase().includes("price") || chatMessage.toLowerCase().includes("cost")) {
        response =
          "Based on current market rates, aluminum scrap is trading at $0.85-0.95 per kg. Would you like me to find the best deals for you?"
      } else if (chatMessage.toLowerCase().includes("quality") || chatMessage.toLowerCase().includes("grade")) {
        response =
          "I can help you find high-quality materials. Our AI quality verification system rates materials from 1-100. Would you like to see only materials with a score above 85?"
      } else if (chatMessage.toLowerCase().includes("delivery") || chatMessage.toLowerCase().includes("shipping")) {
        response =
          "I can filter materials by estimated delivery time. Would you prefer materials available for immediate pickup or those that can be delivered within 1-2 days?"
      } else {
        response =
          "I can help you find the materials you need. Would you like me to recommend materials based on your previous transactions or current search?"
      }

      setChatResponses([...chatResponses, `You: ${chatMessage}`, `AI Assistant: ${response}`])
      setChatMessage("")
    }, 1000)
  }

  const handleMaterialSelect = (id: number) => {
    setSelectedMaterial(id === selectedMaterial ? null : id)
    if (id !== selectedMaterial) {
      setShowSustainabilityInsights(true)
    } else {
      setShowSustainabilityInsights(false)
    }
  }

  const handleContactClick = (materialId: number) => {
    router.push(`/dashboard/messages?material=${materialId}`)
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
        <h1 className="text-2xl font-semibold">Find Materials</h1>
      </div>

      <Card className="border-0 shadow-sm mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Smart Search</CardTitle>
              <CardDescription>Find available waste materials that match your needs.</CardDescription>
            </div>
            <Badge className="bg-blue-50 text-blue-800 border-blue-200">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Smart Search</Label>
              <div className="relative">
                <Popover open={searchSuggestionOpen && searchTerm.length > 0} onOpenChange={setSearchSuggestionOpen}>
                  <PopoverTrigger asChild>
                    <div className="flex">
                      <Input
                        id="search"
                        placeholder="Search by keyword or natural language..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="rounded-r-none"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-l-none border-l-0"
                        onClick={handleVoiceSearch}
                      >
                        <Mic className={cn("h-4 w-4", isVoiceSearchActive && "text-red-500 animate-pulse")} />
                        <span className="sr-only">Voice Search</span>
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <Command>
                      <CommandList>
                        <CommandGroup heading="AI Suggestions">
                          {searchSuggestions
                            .filter((suggestion) => suggestion.toLowerCase().includes(searchTerm.toLowerCase()))
                            .slice(0, 5)
                            .map((suggestion, index) => (
                              <CommandItem
                                key={index}
                                onSelect={() => {
                                  setSearchTerm(suggestion)
                                  setSearchSuggestionOpen(false)
                                }}
                              >
                                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                                {suggestion}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-muted-foreground mt-1">
                  <Sparkles className="inline h-3 w-3 mr-1" />
                  Try natural language like "recyclable aluminum from car parts"
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Material Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {wasteCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="distance">Maximum Distance</Label>
                <span className="text-sm text-muted-foreground">{distance[0]} km</span>
              </div>
              <Slider id="distance" min={5} max={100} step={5} value={distance} onValueChange={setDistance} />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="ai-optimization"
                    checked={aiOptimizationEnabled}
                    onCheckedChange={setAiOptimizationEnabled}
                  />
                  <Label htmlFor="ai-optimization" className="text-xs">
                    AI-optimized logistics
                  </Label>
                </div>
                <span className="text-xs text-green-600">
                  {aiOptimizationEnabled && (
                    <>
                      <Truck className="inline h-3 w-3 mr-1" />
                      Saving ~15% on transport
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setShowAIChat(!showAIChat)}>
            <Wand2 className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
          <Button onClick={handleSearch} disabled={isSearching}>
            {isSearching ? (
              <>Searching...</>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Search
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* AI Recommendations Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-primary" />
          AI-Powered Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {personalizedRecommendations.map((rec) => (
            <Card key={rec.id} className="border-0 shadow-sm overflow-hidden">
              <div className="bg-primary/5 p-3 flex items-center justify-between border-b">
                <Badge className="bg-primary/10 text-primary border-primary/20">{rec.match}% Match</Badge>
                <Badge variant="outline" className="text-xs">
                  {rec.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">{rec.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Factory className="h-3 w-3 mr-1" />
                    <span>{rec.company}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{rec.distance} km</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center text-green-600 text-sm">
                    <Leaf className="h-3 w-3 mr-1" />
                    <span>{rec.carbonSavings} kg CO₂ saved</span>
                  </div>
                  <Button size="sm" onClick={() => handleContactClick(rec.id)}>
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Materials</TabsTrigger>
          <TabsTrigger value="recommended">
            <Sparkles className="h-3 w-3 mr-1" />
            Recommended
          </TabsTrigger>
          <TabsTrigger value="nearby">
            <MapPin className="h-3 w-3 mr-1" />
            Nearby
          </TabsTrigger>
          <TabsTrigger value="verified">
            <Check className="h-3 w-3 mr-1" />
            AI-Verified
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Available Materials ({tabFilteredMaterials.length})</h2>

        {tabFilteredMaterials.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <p className="text-muted-foreground mb-4">No materials found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setCategory("")
                  setDistance([50])
                  setFilteredMaterials(availableMaterials)
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          tabFilteredMaterials.map((material) => (
            <Card
              key={material.id}
              className={cn(
                "border-0 shadow-sm transition-all",
                selectedMaterial === material.id ? "ring-2 ring-primary" : "",
              )}
              onClick={() => handleMaterialSelect(material.id)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div className="space-y-2 md:w-2/3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-semibold">{material.title}</h3>
                      <Badge variant="outline">{material.category}</Badge>
                      {material.aiVerified && (
                        <Badge className="bg-green-50 text-green-800 border-green-200">
                          <Check className="h-3 w-3 mr-1" />
                          AI-Verified
                        </Badge>
                      )}
                      <Badge
                        className={cn(
                          material.demandScore === "High"
                            ? "bg-green-50 text-green-800 border-green-200"
                            : material.demandScore === "Medium"
                              ? "bg-blue-50 text-blue-800 border-blue-200"
                              : "bg-yellow-50 text-yellow-800 border-yellow-200",
                        )}
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {material.demandScore} Demand
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Factory className="h-4 w-4" />
                        <span>{material.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {material.location} ({material.distance} km)
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Truck className="h-4 w-4" />
                        <span>Est. delivery: {material.estimatedDelivery}</span>
                      </div>
                    </div>
                    <p className="text-sm mt-2">{material.description}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge variant="secondary">{material.quantity} kg</Badge>
                      <span className="text-xs text-muted-foreground">Posted {material.postedDate}</span>
                      {material.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Quality Score */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">AI Quality Score</span>
                        <span className="text-xs font-medium">{material.qualityScore}/100</span>
                      </div>
                      <Progress
                        value={material.qualityScore}
                        className="h-1.5"
                        indicatorClassName={
                          material.qualityScore > 85
                            ? "bg-green-600"
                            : material.qualityScore > 70
                              ? "bg-yellow-600"
                              : "bg-red-600"
                        }
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 md:w-1/3">
                    <div className="aspect-video rounded-md overflow-hidden">
                      <img
                        src={material.images[0] || "/placeholder.svg"}
                        alt={material.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                   
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Sustainability Insights */}
      {showSustainabilityInsights && selectedMaterial && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 bg-white rounded-lg shadow-lg border p-4 z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium flex items-center">
              <Leaf className="h-4 w-4 mr-2 text-green-600" />
              Sustainability Insights
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setShowSustainabilityInsights(false)}
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Environmental Impact</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 p-3 rounded-md">
                  <div className="text-green-800 text-xs mb-1">CO₂ Emissions Saved</div>
                  <div className="text-green-900 text-xl font-bold">
                    {tabFilteredMaterials.find((m) => m.id === selectedMaterial)?.carbonSavings || 0} kg
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-md">
                  <div className="text-blue-800 text-xs mb-1">Water Saved</div>
                  <div className="text-blue-900 text-xl font-bold">
                    {Math.round(
                      (tabFilteredMaterials.find((m) => m.id === selectedMaterial)?.carbonSavings || 0) * 2.5,
                    )}{" "}
                    L
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Market Insights</h4>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <div>
                  <div className="text-gray-800 text-xs mb-1">Current Market Value</div>
                  <div className="text-gray-900 font-bold">
                    ${((tabFilteredMaterials.find((m) => m.id === selectedMaterial)?.quantity || 0) * 0.85).toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600 text-sm">+5% this week</span>
                </div>
              </div>
            </div>

            <Button className="w-full">
              <Star className="h-4 w-4 mr-2" />
              Save for Later
            </Button>
          </div>
        </div>
      )}

      {/* AI Chat Assistant */}
      {showAIChat && (
        <div
          className="fixed bottom-4 right-4 w-80 md:w-96 bg-white rounded-lg shadow-lg border z-20 flex flex-col"
          style={{ height: "400px" }}
        >
          <div className="flex items-center justify-between p-3 border-b">
            <h3 className="font-medium flex items-center">
              <Wand2 className="h-4 w-4 mr-2 text-primary" />
              AI Assistant
            </h3>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowAIChat(false)}>
              <XCircle className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {chatResponses.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-2">How can I help you find materials?</p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setChatMessage("What's the current price for aluminum scrap?")
                      handleChatSend()
                    }}
                  >
                    What's the current price for aluminum scrap?
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setChatMessage("Find high-quality plastic waste near me")
                      handleChatSend()
                    }}
                  >
                    Find high-quality plastic waste near me
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setChatMessage("What's the estimated delivery time?")
                      handleChatSend()
                    }}
                  >
                    What's the estimated delivery time?
                  </Button>
                </div>
              </div>
            ) : (
              chatResponses.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-2 rounded-lg max-w-[85%]",
                    msg.startsWith("You:") ? "bg-primary/10 ml-auto" : "bg-gray-100 mr-auto",
                  )}
                >
                  <p className="text-sm">{msg}</p>
                </div>
              ))
            )}
          </div>

          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleChatSend()
                  }
                }}
              />
              <Button size="icon" onClick={handleChatSend} disabled={!chatMessage.trim()}>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

