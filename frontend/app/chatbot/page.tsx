"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Menu, Bot } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThinkingAnimation } from "@/components/thinking-animation"
import { Sidebar } from "@/components/sidebar"
import { Space_Mono } from "next/font/google"
type Message = {
    role: "user" | "assistant"
    content: string
}

const spaceMono = Space_Mono({ weight: "400", subsets: ["latin"] })

export default function ChatbotPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isThinking, setIsThinking] = useState(false)
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMessage: Message = { role: "user", content: input }
        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsThinking(true)

        // Simulate API call
        setTimeout(() => {
            const assistantMessage: Message = {
                role: "assistant",
                content: "This is a simulated response from the AI assistant.",
            }
            setMessages((prev) => [...prev, assistantMessage])
            setIsThinking(false)
        }, 2000)
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messagesEndRef]) //Corrected dependency

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar isOpen={true} isMobileOpen={isMobileSidebarOpen} setIsMobileOpen={setIsMobileSidebarOpen} />
            <div className="flex flex-col flex-grow">
                <header className="bg-white shadow-sm py-4 px-4 flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="mr-2 md:hidden"
                        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                    <h1 className={`text-2xl font-bold lowercase ${spaceMono.className}`}>logikxmind AI Assistant</h1>
                </header>
                <main className="flex-grow overflow-auto p-4 bg-gray-50">
                    <div className="max-w-3xl mx-auto space-y-4">
                        <AnimatePresence>
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {message.role === "assistant" && (
                                        <div className="flex-shrink-0 mr-2">
                                            <Bot className="h-6 w-6 text-blue-500" />
                                        </div>
                                    )}
                                    <div
                                        className={`p-3 rounded-lg max-w-[80%] ${message.role === "user" ? "bg-gray-200" : "bg-white shadow-sm"
                                            }`}
                                    >
                                        <p className={`text-sm ${message.role === "user" ? "text-gray-800" : "text-gray-700"}`}>
                                            {message.content}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {isThinking && (
                            <div className="flex justify-start items-center">
                                <div className="flex-shrink-0 mr-2">
                                    <Bot className="h-6 w-6 text-blue-500" />
                                </div>
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <ThinkingAnimation />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </main>
                <footer className="bg-white p-4 border-t border-gray-200">
                    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
                        <Input
                            type="text"
                            placeholder="Type your message here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-grow bg-gray-50 border-gray-300"
                        />
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Send className="w-4 h-4 mr-2" />
                            Send
                        </Button>
                    </form>
                </footer>
            </div>
        </div>
    )
}

