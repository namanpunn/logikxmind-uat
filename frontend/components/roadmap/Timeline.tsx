"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CheckCircle, Circle, Lock } from "lucide-react"
import type { RoadmapNode } from "./RoadmapComponent"
import { cn } from "@/lib/utils"

interface TimelineProps {
  nodes: RoadmapNode[]
  selectedNode: string | null
  onNodeSelect: (id: string) => void
}

export default function Timeline({ nodes, selectedNode, onNodeSelect }: TimelineProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in-progress":
        return <Circle className="w-5 h-5 text-blue-500" />
      case "locked":
        return <Lock className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div className="relative mt-6">
      {/* Animated connection line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-primary/10">
        <motion.div
          className="absolute top-0 left-0 w-full bg-primary"
          initial={{ height: "0%" }}
          animate={{ height: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>

      <div className="space-y-4">
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card
                    className={cn(
                      "ml-12 cursor-pointer transition-all border border-border/50",
                      node.status === "locked" ? "opacity-70" : "",
                      selectedNode === node.id ? "ring-2 ring-primary shadow-md" : "",
                      "hover:shadow-md",
                    )}
                    onClick={() => onNodeSelect(node.id)}
                  >
                    <CardContent className="p-4">
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        {/* Node indicator with icon */}
                        <div
                          className={cn(
                            "absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card border-2 flex items-center justify-center z-10",
                            node.status === "completed"
                              ? "border-green-500"
                              : node.status === "in-progress"
                                ? "border-blue-500"
                                : "border-gray-300 dark:border-gray-600",
                          )}
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            {getStatusIcon(node.status)}
                          </motion.div>
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                          <h3 className="text-base font-semibold">{node.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{node.description}</p>

                          <div className="flex flex-wrap gap-1 mt-2">
                            {node.skills.slice(0, 3).map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className={cn(
                                  "bg-secondary/30 text-xs",
                                  node.status === "in-progress" ? "animate-pulse" : "",
                                )}
                              >
                                {skill}
                              </Badge>
                            ))}
                            {node.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{node.skills.length - 3} more
                              </Badge>
                            )}
                          </div>

                          <AnimatePresence>
                            {selectedNode === node.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-2 border-t mt-2 border-border/50">
                                  <h4 className="text-xs font-medium mb-1">Related Companies</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {node.companyRelevance.map((company) => (
                                      <Badge key={company} variant="outline" className="text-xs">
                                        {company}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{node.title}</p>
                  <p className="text-xs text-muted-foreground">Click to view details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

