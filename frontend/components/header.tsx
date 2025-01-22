"use client"
import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
const header = () => {
    const { theme, setTheme } = useTheme()
    return (
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">LogicMinds</h1>
            <nav className="space-x-4">
                <Link href="/" className="hover:underline font-semibold">
                    Home
                </Link>
                <Link href="/about" className="hover:underline">
                    About
                </Link>
            </nav>
            <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle dark mode"
            >
                {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
        </header>
    )
}

export default header
