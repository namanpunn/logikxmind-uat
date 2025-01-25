"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon, Sun, X, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { Space_Mono } from "next/font/google"
import { motion, AnimatePresence } from "framer-motion"

const spaceMono = Space_Mono({ weight: "400", subsets: ["latin"] })

const Header = () => {
    const { theme, setTheme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <header className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
            <h1 className={`text-xl md:text-2xl font-bold lowercase ${spaceMono.className}`}>logikxmind</h1>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4">
                <Link href="/" className="hover:underline font-semibold">
                    Home
                </Link>
                <Link href="/about" className="hover:underline">
                    About
                </Link>
            </nav>

            {/* Desktop Auth/Theme */}
            <div className="hidden md:flex items-center space-x-4">
                <Link href="/login" className="hover:underline font-semibold">
                    Login
                </Link>
                <span>/</span>
                <Button asChild>
                    <Link href="/signup">Sign up</Link>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    aria-label="Toggle dark mode"
                >
                    {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleMenu}
                aria-label="Open menu"
            >
                <Menu className="h-6 w-6" />
            </Button>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-40"
                            onClick={toggleMenu}
                        />

                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 h-full w-64 bg-background z-50 p-6 shadow-lg"
                        >
                            <div className="flex justify-end mb-8">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleMenu}
                                    aria-label="Close menu"
                                >
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>

                            <nav className="flex flex-col space-y-6">
                                <Link href="/" className="hover:underline font-semibold" onClick={toggleMenu}>
                                    Home
                                </Link>
                                <Link href="/about" className="hover:underline" onClick={toggleMenu}>
                                    About
                                </Link>
                                
                                <div className="pt-6 border-t">
                                    <Link href="/login" className="hover:underline block mb-4" onClick={toggleMenu}>
                                        Login
                                    </Link>
                                    <Button asChild className="w-full">
                                        <Link href="/signup" onClick={toggleMenu}>
                                            Sign up
                                        </Link>
                                    </Button>
                                </div>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="self-start"
                                    onClick={() => {
                                        setTheme(theme === "dark" ? "light" : "dark")
                                        toggleMenu()
                                    }}
                                    aria-label="Toggle dark mode"
                                >
                                    {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                                </Button>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header