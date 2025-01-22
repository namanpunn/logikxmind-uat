"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import Header from "@/components/header"

export default function AboutPage() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="container mx-auto px-4">
                <section className="py-20 text-center">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        About LogicMinds
                    </motion.h1>
                    <motion.p
                        className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Empowering college students to build successful careers in the tech industry through personalized guidance
                        and cutting-edge resources.
                    </motion.p>
                </section>

                <section className="py-16">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                At LogicMinds, we believe that every student has the potential to thrive in the tech industry. Our
                                mission is to bridge the gap between academic learning and industry requirements, providing students
                                with the tools, knowledge, and support they need to launch successful careers in top tech companies.
                            </p>
                            <p className="text-lg text-muted-foreground">
                                We're committed to fostering a diverse and inclusive tech workforce by empowering students from all
                                backgrounds to pursue their dreams and make a lasting impact in the world of technology.
                            </p>
                        </motion.div>
                        <motion.div
                            className="bg-muted rounded-lg p-8"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h3 className="text-2xl font-semibold mb-4">What We Offer</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <ChevronRight className="mr-2 h-5 w-5 text-primary" />
                                    <span>Personalized career guidance and mentorship</span>
                                </li>
                                <li className="flex items-start">
                                    <ChevronRight className="mr-2 h-5 w-5 text-primary" />
                                    <span>Industry-aligned skill development programs</span>
                                </li>
                                <li className="flex items-start">
                                    <ChevronRight className="mr-2 h-5 w-5 text-primary" />
                                    <span>Mock interviews and resume building workshops</span>
                                </li>
                                <li className="flex items-start">
                                    <ChevronRight className="mr-2 h-5 w-5 text-primary" />
                                    <span>Networking opportunities with tech professionals</span>
                                </li>
                                <li className="flex items-start">
                                    <ChevronRight className="mr-2 h-5 w-5 text-primary" />
                                    <span>Access to exclusive job openings and internships</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </section>

                <section className="py-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Jane Doe",
                                role: "Founder & CEO",
                                bio: "Former tech executive with 15+ years of experience in Silicon Valley.",
                            },
                            {
                                name: "John Smith",
                                role: "Head of Career Services",
                                bio: "Certified career coach with a passion for helping students succeed.",
                            },
                            {
                                name: "Emily Chen",
                                role: "Lead Technical Instructor",
                                bio: "Software engineer with experience at top tech companies.",
                            },
                        ].map((member, index) => (
                            <motion.div
                                key={member.name}
                                className="bg-card text-card-foreground p-6 rounded-lg shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <h4 className="text-xl font-semibold mb-2">{member.name}</h4>
                                <p className="text-primary mb-4">{member.role}</p>
                                <p className="text-muted-foreground">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="py-20 text-center">
                    <h3 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h3>
                    <p className="text-xl text-muted-foreground mb-8">
                        Join LogicMinds today and take the first step towards your dream tech career
                    </p>
                    <Button size="lg" asChild>
                        <Link href="/">
                            Get Started
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </section>
            </main>

            <footer className="bg-muted py-6 mt-16">
                <div className="container mx-auto px-4 text-center text-muted-foreground">
                    © 2025 LogicMinds. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

