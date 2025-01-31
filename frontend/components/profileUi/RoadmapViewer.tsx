import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Circle } from "lucide-react"

const milestones = [
  { id: 1, title: "Complete Intro to CS", completed: true },
  { id: 2, title: "Build First Project", completed: true },
  { id: 3, title: "Learn Data Structures", completed: false },
  { id: 4, title: "Master Algorithms", completed: false },
  { id: 5, title: "Internship", completed: false },
]

export default function RoadmapViewer() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Your Career Roadmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              className="flex items-start mb-8 last:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 mr-4">
                {milestone.completed ? (
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{milestone.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {milestone.completed ? "Completed" : "In Progress"}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-emerald-200 dark:bg-emerald-800" />
        </div>
      </CardContent>
    </Card>
  )
}

