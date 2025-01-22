"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">LogicMinds</h1>
      </div>
      <nav className="hidden md:flex space-x-4">
        <a href="#features" className="hover:underline">
          Features
        </a>
        <a href="#companies" className="hover:underline">
          Top Companies
        </a>
        <a href="#testimonials" className="hover:underline">
          Success Stories
        </a>
      </nav>
      <div className="flex items-center">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button className="md:hidden ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-md py-2 md:hidden">
          <a href="#features" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            Features
          </a>
          <a href="#companies" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            Top Companies
          </a>
          <a href="#testimonials" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            Success Stories
          </a>
        </div>
      )}
    </header>
  )
}

