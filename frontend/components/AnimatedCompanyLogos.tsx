"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

const companies = [
    { name: "Google", logo: "/images/google-logo.svg" },
    { name: "Amazon", logo: "/images/amazon-logo.svg" },
    { name: "Microsoft", logo: "/images/microsoft-logo.svg" },
    { name: "Apple", logo: "/images/apple-logo.svg" },
    { name: "Meta", logo: "/images/meta-logo.svg" },
    { name: "IBM", logo: "/images/ibm-logo.svg" },
    { name: "Adobe", logo: "/images/adobe-logo.svg" },
    { name: "Intel", logo: "/images/intel-logo.svg" },
    { name: "Infosys", logo: "/images/infosys-logo.svg" },
    { name: "tcs", logo: "/images/tcs-logo.svg" },
]

export default function AnimatedCompanyLogos() {
    const [duplicatedCompanies, setDuplicatedCompanies] = useState(companies)

    useEffect(() => {
        // Duplicate the array to create a seamless loop
        setDuplicatedCompanies([...companies, ...companies])
    }, [])

    return (
        <div className="relative w-full overflow-hidden bg-background py-10">
            <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex">
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{
                        x: [0, "-50%"],
                    }}
                    transition={{
                        x: {
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedCompanies.map((company, index) => (
                        <div key={`${company.name}-${index}`} className="inline-flex items-center justify-center mx-8">
                            <Image
                                src={company.logo || "/placeholder.svg"}
                                alt={`${company.name} logo`}
                                width={100}
                                height={50}
                                className="max-w-[100px] max-h-[50px] object-contain"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

