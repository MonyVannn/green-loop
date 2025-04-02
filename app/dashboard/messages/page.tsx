"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ChevronRight, FileText, Image, Paperclip, Search, Send } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    company: "EcoMetals Inc.",
    avatar: "EM",
    lastMessage: "Yes, we can arrange pickup for next Tuesday.",
    timestamp: "10:42 AM",
    unread: 2,
    transactionId: "TRX-1001",
    material: "Metal Scrap",
  },
  {
    id: 2,
    company: "GreenPlastics Co.",
    avatar: "GP",
    lastMessage: "The transaction has been completed. Thank you for your business!",
    timestamp: "Yesterday",
    unread: 0,
    transactionId: "TRX-1002",
    material: "Plastic Waste",
  },
  {
    id: 3,
    company: "WoodWorks Manufacturing",
    avatar: "WW",
    lastMessage: "Can you provide more details about the wood pallets?",
    timestamp: "Yesterday",
    unread: 0,
    transactionId: "TRX-1003",
    material: "Wood Pallets",
  },
  {
    id: 4,
    company: "ChemRecycle Ltd.",
    avatar: "CR",
    lastMessage: "We need to discuss the chemical composition before proceeding.",
    timestamp: "Mon",
    unread: 0,
    transactionId: "TRX-1004",
    material: "Chemical Waste",
  },
  {
    id: 5,
    company: "PaperWorks",
    avatar: "PW",
    lastMessage: "Is the cardboard free from contaminants?",
    timestamp: "Apr 12",
    unread: 0,
    transactionId: "TRX-1005",
    material: "Paper & Cardboard",
  },
]

// Mock data for messages in a conversation
const mockMessages = [
  {
    id: 1,
    senderId: "them",
    text: "Hello, I'm interested in your Metal Scrap listing. Is it still available?",
    timestamp: "Apr 15, 10:05 AM",
  },
  {
    id: 2,
    senderId: "me",
    text: "Yes, it's still available. We have 250kg of aluminum scrap ready for pickup or delivery.",
    timestamp: "Apr 15, 10:12 AM",
  },
  {
    id: 3,
    senderId: "them",
    text: "Great! What's the purity level of the aluminum?",
    timestamp: "Apr 15, 10:18 AM",
  },
  {
    id: 4,
    senderId: "me",
    text: "It's 98% pure aluminum, cleaned and sorted. Would you like to see some photos?",
    timestamp: "Apr 15, 10:25 AM",
  },
  {
    id: 5,
    senderId: "them",
    text: "Yes, please send photos. Also, what's your availability for pickup next week?",
    timestamp: "Apr 15, 10:30 AM",
  },
  {
    id: 6,
    senderId: "me",
    text: "Here are some photos of the material:",
    timestamp: "Apr 15, 10:35 AM",
    attachments: [
      { type: "image", url: "/placeholder.svg?height=200&width=300" },
      { type: "image", url: "/placeholder.svg?height=200&width=300" },
    ],
  },
  {
    id: 7,
    senderId: "me",
    text: "We're available for pickup Monday through Friday, 9 AM to 5 PM. Would Tuesday work for you?",
    timestamp: "Apr 15, 10:36 AM",
  },
  {
    id: 8,
    senderId: "them",
    text: "The material looks good. Yes, we can arrange pickup for next Tuesday.",
    timestamp: "Apr 15, 10:42 AM",
  },
]

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState<number | null>(1) // Default to first conversation
  const [conversations, setConversations] = useState(mockConversations)
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.material.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Mark messages as read when conversation is selected
  useEffect(() => {
    if (activeConversation) {
      setConversations((prevConversations) =>
        prevConversations.map((conv) => (conv.id === activeConversation ? { ...conv, unread: 0 } : conv)),
      )
    }
  }, [activeConversation])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg = {
      id: messages.length + 1,
      senderId: "me",
      text: newMessage,
      timestamp: new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    }

    setMessages((prevMessages) => [...prevMessages, newMsg])
    setNewMessage("")

    // Update last message in conversation list using functional update
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === activeConversation
          ? {
              ...conv,
              lastMessage: newMessage,
              timestamp: "Just now",
            }
          : conv,
      ),
    )

    // Simulate reply after 2 seconds
    setTimeout(() => {
      const replyMsg = {
        id: messages.length + 2,
        senderId: "them",
        text: "Thanks for your message. I'll get back to you soon.",
        timestamp: new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      }

      setMessages((prevMessages) => [...prevMessages, replyMsg])

      // Update conversation with functional update
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === activeConversation
            ? {
                ...conv,
                lastMessage: replyMsg.text,
                timestamp: "Just now",
              }
            : conv,
        ),
      )
    }, 2000)
  }

  const getActiveConversation = () => {
    return conversations.find((conv) => conv.id === activeConversation)
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
        <h1 className="text-2xl font-semibold">Messages</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[calc(100vh-180px)]">
        {/* Conversations List */}
        <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No conversations found
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={cn(
                    "flex items-start gap-3 p-3 cursor-pointer hover:bg-muted/50 transition-colors",
                    activeConversation === conversation.id && "bg-muted",
                  )}
                  onClick={() => setActiveConversation(conversation.id)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{conversation.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{conversation.company}</h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1">
                      <Badge variant="outline" className="text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        {conversation.transactionId}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Thread */}
        <div className="md:col-span-2 lg:col-span-3 border rounded-lg overflow-hidden flex flex-col">
          {activeConversation ? (
            <>
              {/* Conversation Header */}
              <div className="p-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{getActiveConversation()?.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{getActiveConversation()?.company}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {getActiveConversation()?.material}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {getActiveConversation()?.transactionId}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/transactions`}>
                    View Transaction <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex", message.senderId === "me" ? "justify-end" : "justify-start")}
                  >
                    <div className={cn("max-w-[80%]", message.senderId === "me" ? "order-1" : "order-1")}>
                      <div
                        className={cn(
                          "rounded-lg p-3",
                          message.senderId === "me" ? "bg-primary text-primary-foreground" : "bg-muted",
                        )}
                      >
                        <p className="text-sm">{message.text}</p>
                        {message.attachments && (
                          <div className="mt-2 grid grid-cols-2 gap-2">
                            {message.attachments.map((attachment, index) => (
                              <div key={index} className="rounded-md overflow-hidden">
                                <img
                                  src={attachment.url || "/placeholder.svg"}
                                  alt="Attachment"
                                  className="w-full h-auto"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div
                        className={cn(
                          "text-xs text-muted-foreground mt-1",
                          message.senderId === "me" ? "text-right" : "text-left",
                        )}
                      >
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-3 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Image className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={newMessage.trim() === ""}
                    size="icon"
                    className="rounded-full"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

