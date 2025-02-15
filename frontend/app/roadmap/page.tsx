"use client"

import { useState } from "react"
import InteractiveRoadmap from "@/components/InteractiveRoadmap"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function Roadmap() {
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>(["Google"])
    const [selectedSkills, setSelectedSkills] = useState<string[]>(["React", "Node.js", "Python", "Machine Learning"])
    const [currentProgress, setCurrentProgress] = useState<number>(0)

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Interactive Roadmap Demo</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Adjust Progress</h2>
                <Slider value={[currentProgress]} onValueChange={(value) => setCurrentProgress(value[0])} max={100} step={1} />
                <p className="mt-2 text-sm text-gray-600">Current Progress: {currentProgress}%</p>
            </div>

            <InteractiveRoadmap
                selectedCompanies={selectedCompanies}
                selectedSkills={selectedSkills}
                currentProgress={currentProgress}
            />

            <div className="mt-8 flex justify-center">
                <Button onClick={() => setCurrentProgress(0)}>Reset Progress</Button>
            </div>
        </div>
    )
}

