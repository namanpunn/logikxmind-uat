"use client"

import { motion } from "framer-motion"
import { BookOpen, Code, Users } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Tailored Learning Paths",
    description: "Customized curricula to match your career goals and the requirements of top tech companies.",
  },
  {
    icon: Code,
    title: "Hands-on Projects",
    description: "Real-world projects that simulate work environments in leading tech firms.",
  },
  {
    icon: Users,
    title: "Mentorship Program",
    description: "Connect with industry professionals for guidance and insider knowledge.",
  },
]

export default function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <feature.icon className="h-12 w-12 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

