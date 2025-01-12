'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import Image from 'next/image'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Florida Grande's virtual concierge. How can I assist you today?", sender: "bot" }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen && messages.length === 1) {
      setIsTyping(true)
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Feel free to ask about our amenities, rental options, or nearby attractions!", sender: "bot" }])
        setIsTyping(false)
      }, 1500)
    }
  }, [isOpen, messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { text: input, sender: "user" }])
      setInput("")
      setIsTyping(true)
      
      // Simulated bot responses
      setTimeout(() => {
        let botResponse = "I'm not quite sure about that. Could you please rephrase your question?"
        
        if (input.toLowerCase().includes("amenities")) {
          botResponse = "Our resort boasts a range of luxurious amenities! We have a state-of-the-art fitness center, a heated swimming pool and hot tub, a 20,000 sq ft clubhouse, scenic nature trails, and much more. What would you like to know more about?"
        } else if (input.toLowerCase().includes("rental") || input.toLowerCase().includes("lot")) {
          botResponse = "We offer various premium rental options. Our lots are spacious at 26' x 76' and come with full hookups. We have luxury, premium, deluxe, and executive lots available. Would you like to check current availability or hear more about the differences between our lot types?"
        } else if (input.toLowerCase().includes("attraction") || input.toLowerCase().includes("nearby")) {
          botResponse = "You're in luck! We're perfectly situated near Florida's top attractions. Disney World and Universal Studios are just 57 miles away, Busch Gardens is 60 miles, and we're only 15 miles from The Villages. Is there a particular attraction you're interested in visiting?"
        }
        
        setMessages(prev => [...prev, { text: botResponse, sender: "bot" }])
        setIsTyping(false)
      }, 1500)
    }
  }

  return (
    <>
      {!isOpen && (
        <Button
          className="fixed bottom-4 right-4 rounded-full w-16 h-16 bg-[#EFC25D] hover:bg-[#D5AD4E] text-[#1E1E1E] shadow-lg transition-all duration-300 hover:scale-110 z-50"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle size={24} />
        </Button>
      )}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-80 h-[450px] flex flex-col bg-white shadow-xl border border-gray-200 rounded-2xl overflow-hidden z-50">
          <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-[#EFC25D] to-[#D5AD4E] text-[#1E1E1E] p-4">
            <div className="flex items-center">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Florida Grande Logo"
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div>
                <CardTitle className="text-lg">Florida Grande</CardTitle>
                <p className="text-xs font-medium opacity-75">Virtual Concierge</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-[#1E1E1E] hover:bg-[#1E1E1E] hover:bg-opacity-10">
              <X size={24} />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto p-4 bg-white">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-[#EFC25D] text-[#1E1E1E]' 
                    : 'bg-gray-100 text-[#1E1E1E] border border-gray-200 shadow-sm'
                }`}>
                  {message.text}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="text-left mb-4">
                <span className="inline-block p-3 rounded-lg bg-gray-100 text-[#1E1E1E] border border-gray-200 shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          <CardFooter className="bg-white border-t border-gray-200 p-4">
            <div className="flex w-full space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-grow"
              />
              <Button onClick={handleSend} className="bg-[#EFC25D] text-[#1E1E1E] hover:bg-[#D5AD4E] transition-colors duration-300">
                <Send size={18} />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  )
}

