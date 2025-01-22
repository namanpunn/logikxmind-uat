"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

export default function HOME() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const companies = ["Google", "Amazon", "IBM", "Adobe", "Microsoft", "Apple", "Facebook", "Netflix", "Tesla", "Uber"]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4">
        <section className="py-20 text-center">
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Shape Your Future in Tech
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Guiding college students to land their dream jobs in top tech companies
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg">
              Get Started
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </section>

        <section className="py-16">
          <h3 className="text-2xl font-semibold text-center mb-8">Prepare for Top Companies</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {companies.map((company, index) => (
              <motion.div
                key={company}
                className="bg-muted text-muted-foreground px-4 py-2 rounded-full"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {company}
              </motion.div>
            ))}
            <motion.div
              className="bg-muted text-muted-foreground px-4 py-2 rounded-full"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: companies.length * 0.1 }}
            >
              And many more...
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <h3 className="text-2xl font-semibold text-center mb-8">How We Help You Succeed</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Career Guidance", description: "Personalized advice to help you choose the right path" },
              { title: "Skill Development", description: "Curated resources to build in-demand tech skills" },
              { title: "Interview Preparation", description: "Mock interviews and tips from industry experts" },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-card text-card-foreground p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h4 className="text-xl font-semibold mb-4">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-20 text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Launch Your Tech Career?</h3>
          <p className="text-xl text-muted-foreground mb-8">
            Join LogicMinds today and take the first step towards your dream job
          </p>
          <Button size="lg">
            Start Your Journey
            <ChevronRight className="ml-2 h-4 w-4" />
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

