"use client"

import { motion } from "framer-motion"

export default function CTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-500 dark:bg-blue-600">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center space-y-4 text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Start Your Journey?</h2>
          <p className="mx-auto max-w-[700px] text-white/90 md:text-xl">
            Join LogicMinds today and take the first step towards your dream career in tech.
          </p>
          <a
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-blue-500 shadow transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-300 disabled:pointer-events-none disabled:opacity-50"
          >
            Get Started Now
          </a>
        </motion.div>
      </div>
    </section>
  )
}

