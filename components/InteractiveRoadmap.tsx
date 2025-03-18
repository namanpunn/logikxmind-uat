"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Circle } from "lucide-react"

interface RoadmapStep {
    id: string
    title: string
    description: string
    completed: boolean
}

interface InteractiveRoadmapProps {
    selectedCompanies: string[]
    selectedSkills: string[]
    currentProgress: number // 0 to 100
}

const InteractiveRoadmap: React.FC<InteractiveRoadmapProps> = ({
    selectedCompanies,
    selectedSkills,
    currentProgress,
}) => {
    const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>([])
    const [activeStep, setActiveStep] = useState<number>(0)

    useEffect(() => {
        // Generate roadmap steps based on selected companies and skills
        const steps: RoadmapStep[] = [
            { id: "start", title: "Start Your Journey", description: "Begin your path to your dream job", completed: true },
            ...selectedSkills.map((skill, index) => ({
                id: `skill-${index}`,
                title: `Master ${skill}`,
                description: `Develop proficiency in ${skill}`,
                completed: currentProgress > (index + 1) * (100 / (selectedSkills.length + 2)),
            })),
            {
                id: "interview",
                title: "Interview Preparation",
                description: "Practice for technical interviews",
                completed: currentProgress > 90,
            },
            {
                id: "job",
                title: "Land Your Dream Job",
                description: `Get hired at ${selectedCompanies[0] || "your dream company"}`,
                completed: currentProgress === 100,
            },
        ]
        setRoadmapSteps(steps)
        setActiveStep(Math.floor(currentProgress / (100 / steps.length)))
    }, [selectedCompanies, selectedSkills, currentProgress])

    return (
        <div className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Your Career Roadmap</h2>
            <div className="relative">
                {roadmapSteps.map((step, index) => (
                    <motion.div
                        key={step.id}
                        className="flex items-center mb-8 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <motion.div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? "bg-green-500" : "bg-gray-300"
                                }`}
                            whileHover={{ scale: 1.1 }}
                        >
                            {step.completed ? (
                                <CheckCircle className="text-white" size={20} />
                            ) : (
                                <Circle className="text-gray-500" size={20} />
                            )}
                        </motion.div>
                        <div className="ml-4 flex-grow">
                            <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                            <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                        {index === activeStep && (
                            <motion.div
                                className="absolute left-0 top-0 w-8 h-8 bg-blue-400 rounded-full opacity-75"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.7, 0.3, 0.7],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                }}
                            />
                        )}
                    </motion.div>
                ))}
                <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gray-300 -z-10" />
            </div>
        </div>
    )
}

export default InteractiveRoadmap

