"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  Download,
  Eye,
  FileText,
  MessageSquare,
  MoreHorizontal,
  Upload,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for transactions
const transactions = [
  {
    id: 1,
    title: "Metal Scrap",
    company: "EcoMetals Inc.",
    email: "contact@ecometals.com",
    quantity: "250 kg",
    date: "Apr 15, 2025",
    status: "pending",
    type: "outgoing",
    messages: 3,
    transactionId: "TRX-1001",
    country: "USA",
    amount: "$1,250.00",
  },
  {
    id: 2,
    title: "Plastic Waste",
    company: "GreenPlastics Co.",
    email: "info@greenplastics.com",
    quantity: "180 kg",
    date: "Apr 10, 2025",
    status: "completed",
    type: "outgoing",
    messages: 0,
    transactionId: "TRX-1002",
    country: "Canada",
    amount: "$720.00",
  },
  {
    id: 3,
    title: "Wood Pallets",
    company: "WoodWorks Manufacturing",
    email: "orders@woodworks.com",
    quantity: "120 kg",
    date: "Apr 8, 2025",
    status: "in_progress",
    type: "outgoing",
    messages: 2,
    transactionId: "TRX-1003",
    country: "UK",
    amount: "$360.00",
  },
  {
    id: 4,
    title: "Chemical Waste",
    company: "ChemRecycle Ltd.",
    email: "support@chemrecycle.com",
    quantity: "90 kg",
    date: "Apr 5, 2025",
    status: "in_progress",
    type: "outgoing",
    messages: 1,
    transactionId: "TRX-1004",
    country: "Germany",
    amount: "$540.00",
  },
  {
    id: 5,
    title: "Aluminum Scrap",
    company: "MetalWorks Inc.",
    email: "sales@metalworks.com",
    quantity: "300 kg",
    date: "Apr 2, 2025",
    status: "rejected",
    type: "incoming",
    messages: 0,
    transactionId: "TRX-1005",
    country: "France",
    amount: "$900.00",
  },
  {
    id: 6,
    title: "Cardboard Boxes",
    company: "PackageCo",
    email: "hello@packageco.com",
    quantity: "150 kg",
    date: "Mar 28, 2025",
    status: "completed",
    type: "incoming",
    messages: 0,
    transactionId: "TRX-1006",
    country: "Spain",
    amount: "$225.00",
  },
  {
    id: 7,
    title: "Electronic Waste",
    company: "TechRecycle Inc.",
    email: "info@techrecycle.com",
    quantity: "75 kg",
    date: "Mar 25, 2025",
    status: "archived",
    type: "outgoing",
    messages: 0,
    transactionId: "TRX-1007",
    country: "Italy",
    amount: "$675.00",
  },
]

export default function TransactionsPage() {
  const router = useRouter()
  const [selectedTransactions, setSelectedTransactions] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransactions = transactions.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.transactionId.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 font-medium">
            Pending
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-medium">
            Paid
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 font-medium">
            Declined
          </Badge>
        )
      case "archived":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 font-medium">
            Archived
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getCountryFlag = (country: string) => {
    switch (country) {
      case "USA":
        return "🇺🇸"
      case "Canada":
        return "🇨🇦"
      case "UK":
        return "🇬🇧"
      case "Germany":
        return "🇩🇪"
      case "France":
        return "🇫🇷"
      case "Spain":
        return "🇪🇸"
      case "Italy":
        return "🇮🇹"
      default:
        return "🌐"
    }
  }

  const handleMessageClick = (transactionId: number) => {
    router.push(`/dashboard/messages?transaction=${transactionId}`)
  }

  const toggleTransactionSelection = (id: number) => {
    setSelectedTransactions((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleAllTransactions = () => {
    if (selectedTransactions.length === filteredTransactions.length) {
      setSelectedTransactions([])
    } else {
      setSelectedTransactions(filteredTransactions.map((t) => t.id))
    }
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Transaction List</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div>
          <p className="text-sm mb-1.5 font-medium text-gray-500">Status</p>
          <Select defaultValue="all">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Show All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Show All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-sm mb-1.5 font-medium text-gray-500">Country</p>
          <Select defaultValue="all">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Show All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Show All</SelectItem>
              <SelectItem value="usa">USA</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="uk">UK</SelectItem>
              <SelectItem value="germany">Germany</SelectItem>
              <SelectItem value="france">France</SelectItem>
              <SelectItem value="spain">Spain</SelectItem>
              <SelectItem value="italy">Italy</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-sm mb-1.5 font-medium text-gray-500">Material Type</p>
          <Select defaultValue="all">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Show All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Show All</SelectItem>
              <SelectItem value="metal">Metal</SelectItem>
              <SelectItem value="plastic">Plastic</SelectItem>
              <SelectItem value="wood">Wood</SelectItem>
              <SelectItem value="chemical">Chemical</SelectItem>
              <SelectItem value="paper">Paper</SelectItem>
              <SelectItem value="electronic">Electronic</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-sm mb-1.5 font-medium text-gray-500">Transaction Type</p>
          <Select defaultValue="all">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Show All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Show All</SelectItem>
              <SelectItem value="outgoing">Outgoing</SelectItem>
              <SelectItem value="incoming">Incoming</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-sm mb-1.5 font-medium text-gray-500">Time</p>
          <Button variant="outline" className="w-full justify-start text-left font-normal">
            <Calendar className="mr-2 h-4 w-4" />
            Last Week
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search"
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <FileText className="h-4 w-4" />
                Export as XLSX
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <FileText className="h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3 text-left w-10">
                  <Checkbox
                    checked={
                      selectedTransactions.length === filteredTransactions.length && filteredTransactions.length > 0
                    }
                    onCheckedChange={toggleAllTransactions}
                  />
                </th>
                <th className="p-3 text-left font-medium text-gray-600 text-sm">Transaction ID</th>
                <th className="p-3 text-left font-medium text-gray-600 text-sm">Buyer</th>
                <th className="p-3 text-left font-medium text-gray-600 text-sm">Country</th>
                <th className="p-3 text-left font-medium text-gray-600 text-sm">Material</th>
                <th className="p-3 text-left font-medium text-gray-600 text-sm">Amount</th>
                <th className="p-3 text-left font-medium text-gray-600 text-sm">Status</th>
                <th className="p-3 text-left font-medium text-gray-600 text-sm">Date</th>
                <th className="p-3 text-left font-medium text-gray-600 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                >
                  <td className="p-3">
                    <Checkbox
                      checked={selectedTransactions.includes(transaction.id)}
                      onCheckedChange={() => toggleTransactionSelection(transaction.id)}
                    />
                  </td>
                  <td className="p-3 text-sm font-medium">{transaction.transactionId}</td>
                  <td className="p-3">
                    <div>
                      <div className="font-medium text-sm">{transaction.company}</div>
                      <div className="text-xs text-gray-500">{transaction.email}</div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{getCountryFlag(transaction.country)}</span>
                      <span className="text-sm">{transaction.country}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div>
                      <div className="text-sm">{transaction.title}</div>
                      <div className="text-xs text-gray-500">{transaction.quantity}</div>
                    </div>
                  </td>
                  <td className="p-3 text-sm font-medium">{transaction.amount}</td>
                  <td className="p-3">{getStatusBadge(transaction.status)}</td>
                  <td className="p-3 text-sm">{transaction.date}</td>
                  <td className="p-3">
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative">
                            <MoreHorizontal className="h-4 w-4" />
                            {transaction.messages > 0 && (
                              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                                {transaction.messages}
                              </span>
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuItem onClick={() => handleMessageClick(transaction.id)}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>Messages</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-500">
            1-{filteredTransactions.length} of {transactions.length} shown
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              1
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
            <span>...</span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              10
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

