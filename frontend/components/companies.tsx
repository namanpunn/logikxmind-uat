"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const companies = [
  { name: "Google", logo: "/google-logo.svg" },
  { name: "Amazon", logo: "/amazon-logo.svg" },
  { name: "Microsoft", logo: "/microsoft-logo.svg" },
  { name: "Apple", logo: "/apple-logo.svg" },
  { name: "Facebook", logo: "/facebook-logo.svg" },
  { name: "IBM", logo: "/ibm-logo.svg" },
  { name: "Adobe", logo: "/adobe-logo.svg" },
  { name: "Intel", logo: "/intel-logo.svg" },
]

export default function Companies() {
  return (
    <section id="companies" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Top Companies Our Students Work At</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {companies.map((company, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={company.logo || "/placeholder.svg"}
                alt={`${company.name} logo`}
                width={100}
                height={100}
                className="max-w-[100px] max-h-[100px] object-contain"
              />
            </motion.div>
          ))}
        </div>
        <p className="text-center mt-8 text-gray-600 dark:text-gray-400">...and many more!</p>
      </div>
    </section>
  )
}

