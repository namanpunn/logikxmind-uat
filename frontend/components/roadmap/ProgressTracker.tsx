import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { RoadmapNode } from "./RoadmapComponent"

interface ProgressTrackerProps {
  nodes: RoadmapNode[]
}

export default function ProgressTracker({ nodes }: ProgressTrackerProps) {
  const completedNodes = nodes.filter(node => node.status === "completed").length
  const progress = (completedNodes / nodes.length) * 100

  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Status Breakdown</h3>
            <div className="space-y-2">
              {["completed", "in-progress", "locked"].map((status) => (
                <div key={status} className="flex justify-between items-center">
                  <span className="capitalize text-sm">{status}</span>
                  <span className="text-sm font-medium">
                    {nodes.filter(node => node.status === status).length}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Card>
  )
}
