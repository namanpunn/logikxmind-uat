"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"

type Segment = {
    name: string
    companies: string[]
}

const segments: Segment[] = [
    {
        name: "1-8 LPA",
        companies: ["TCS", "Infosys", "Wipro", "HCL", "Tech Mahindra", "Cognizant"],
    },
    {
        name: "15-30 LPA",
        companies: ["IBM", "Accenture", "Deloitte", "Capgemini", "Oracle", "SAP"],
    },
    {
        name: "50 LPA+ (FAANG)",
        companies: ["Facebook", "Amazon", "Apple", "Netflix", "Google", "Microsoft"],
    },
    {
        name: "Others (Startups)",
        companies: ["Uber", "Airbnb", "Stripe", "Slack", "Zoom", "Twilio"],
    },
]

export default function Dashboard() {
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    const handleCompanySelect = (company: string) => {
        setSelectedCompanies((prev) => {
            if (prev.includes(company)) {
                return prev.filter((c) => c !== company)
            } else {
                const segmentCompanies = segments.find((s) => s.companies.includes(company))?.companies || []
                const segmentSelections = prev.filter((c) => segmentCompanies.includes(c))
                if (segmentSelections.length < 3 && prev.length < 12) {
                    return [...prev, company]
                }
                return prev
            }
        })
    }

    const isNextEnabled = selectedCompanies.length >= 4

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />
            <main className="flex-grow container my-8">
                <motion.div
                    className="absolute z-0"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                    }}
                />
                <Card className="mx-auto max-w-6xl backdrop-blur-md shadow-2xl relative z-10">
                    <CardContent className="p-6">
                        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 relative">Select Your Target Companies</h1>
                        <div className="relative mb-8">
                            <div className="absolute left-1/2 -translate-x-1/2 h-8 w-px bg-gradient-to-b from-blue-400 to-purple-400" />
                            <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400" />
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-4 bg-gradient-to-b from-purple-400 to-transparent" />
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-start space-y-6 md:space-y-0 md:space-x-6 relative">
                            {segments.map((segment, index) => (
                                <div key={segment.name} className="w-full md:w-1/4 relative">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.2 }}
                                        className="relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-purple-200 rounded-lg -z-10" />
                                        <h3 className="text-lg font-semibold mb-4 text-center py-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-t-lg">
                                            {segment.name}
                                        </h3>
                                        <div className="space-y-2 p-4">
                                            {segment.companies.map((company) => (
                                                <Button
                                                    key={company}
                                                    variant={selectedCompanies.includes(company) ? "default" : "outline"}
                                                    className="w-full justify-start transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-md"
                                                    onClick={() => handleCompanySelect(company)}
                                                >
                                                    {company}
                                                </Button>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-between items-center">
                            <p className="text-sm text-gray-600">Selected: {selectedCompanies.length} / 12 (Min: 4)</p>
                            <Button
                                disabled={!isNextEnabled}
                                className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300"
                            >
                                Next
                                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
            <footer className="bg-muted py-6">
                <div className="container mx-auto px-4 text-center text-muted-foreground">
                    © 2025 logikxmind. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

