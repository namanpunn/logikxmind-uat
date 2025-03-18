"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Zap, Lock } from "lucide-react"
import type { RoadmapNode } from "./RoadmapComponent"

interface ProgressTrackerProps {
  nodes: RoadmapNode[]
}

export default function ProgressTracker({ nodes }: ProgressTrackerProps) {
  const completedNodes = nodes.filter((node) => node.status === "completed").length
  const inProgressNodes = nodes.filter((node) => node.status === "in-progress").length
  const lockedNodes = nodes.filter((node) => node.status === "locked").length
  const progress = (completedNodes / nodes.length) * 100

  const statusItems = [
    {
      status: "completed",
      count: completedNodes,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      status: "in-progress",
      count: inProgressNodes,
      icon: Zap,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      status: "locked",
      count: lockedNodes,
      icon: Lock,
      color: "text-gray-500",
      bgColor: "bg-gray-100 dark:bg-gray-800/50",
    },
  ]

  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Progress Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Overall Progress</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary/20">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-base font-medium mb-3">Status Breakdown</h3>
            <div className="space-y-3">
              {statusItems.map((item) => (
                <motion.div
                  key={item.status}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-full ${item.bgColor}`}>
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span className="capitalize text-sm">{item.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.count}</span>
                    <div className="w-16 h-1.5 rounded-full bg-secondary/20 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${item.status === "completed" ? "bg-green-500" : item.status === "in-progress" ? "bg-blue-500" : "bg-gray-400"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.count / nodes.length) * 100}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}

