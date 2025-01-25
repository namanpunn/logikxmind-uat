"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PlusCircle, MessageSquare, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { useTheme } from "next-themes"

type SidebarProps = {
    isMobileOpen: boolean
    setIsMobileOpen: (isOpen: boolean) => void
}

type Chat = {
    id: string
    title: string
}

export function Sidebar({ isMobileOpen, setIsMobileOpen }: SidebarProps) {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [chats, setChats] = useState<Chat[]>([
        { id: "1", title: "Chat 1" },
        { id: "2", title: "Chat 2" },
        { id: "3", title: "Chat 3" },
    ])
    const [isCollapsed, setIsCollapsed] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const addNewChat = () => {
        const newChat: Chat = {
            id: `${chats.length + 1}`,
            title: `New Chat ${chats.length + 1}`,
        }
        setChats([newChat, ...chats])
    }

    if (!mounted) return null

    const isDark = resolvedTheme === "dark"

    const sidebarContent = (
        <div className={`flex flex-col h-full ${isCollapsed ? "items-center" : ""}`}>
            <div className="flex items-center justify-between w-full mb-4">
                <Button
                    onClick={addNewChat}
                    className={`bg-blue-600 hover:bg-blue-700 text-white ${isCollapsed ? "w-10 h-10 p-0" : "w-full"}`}
                >
                    <PlusCircle className={`w-4 h-4 ${isCollapsed ? "" : "mr-2"}`} />
                    {!isCollapsed && "New Chat"}
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="text-gray-400 hover:text-gray-100 dark:text-gray-400 dark:hover:text-white"
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </Button>
            </div>
            <div className="flex-grow overflow-auto w-full">
                {chats.map((chat) => (
                    <Button
                        key={chat.id}
                        variant="ghost"
                        className={`w-full justify-start mb-2 text-left text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 ${isCollapsed ? "px-2" : ""}`}
                    >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {!isCollapsed && chat.title}
                    </Button>
                ))}
            </div>
            <div className="mt-auto w-full">
                <Button
                    variant="ghost"
                    className={`w-full justify-start mb-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 ${isCollapsed ? "px-2" : ""}`}
                >
                    <Settings className="w-4 h-4 mr-2" />
                    {!isCollapsed && "Settings"}
                </Button>
                <Button
                    variant="ghost"
                    className={`w-full justify-start text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 ${isCollapsed ? "px-2" : ""}`}
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    {!isCollapsed && "Log out"}
                </Button>
            </div>
        </div>
    )

    return (
        <>
            {/* Desktop Sidebar */}
            <div
                className={`hidden md:block shadow-lg transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"} ${isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
            >
                <div className="p-4">{sidebarContent}</div>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={`fixed inset-y-0 left-0 w-64 p-4 shadow-lg z-50 md:hidden ${isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
                    >
                        {sidebarContent}
                    </motion.div>
                )}
            </AnimatePresence>
            {isMobileOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />
            )}
        </>
    )
}

