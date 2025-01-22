"use client"

import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Alex Johnson",
    company: "Google",
    quote:
      "LogicMinds helped me land my dream job at Google. Their tailored learning paths and mentorship program were invaluable.",
  },
  {
    name: "Samantha Lee",
    company: "Amazon",
    quote:
      "The hands-on projects at LogicMinds gave me the practical experience I needed to stand out in my interviews at Amazon.",
  },
  {
    name: "Michael Chen",
    company: "Microsoft",
    quote:
      "Thanks to LogicMinds, I was well-prepared for the technical interviews at Microsoft. I can't recommend them enough!",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <p className="text-gray-600 dark:text-gray-400 mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{testimonial.company}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

