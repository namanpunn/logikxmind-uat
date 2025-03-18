"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, FileText, FolderGit2, Clock, BarChart } from "lucide-react"
import type { RoadmapNode } from "./RoadmapComponent"
import { cn } from "@/lib/utils"

interface ResourcePanelProps {
  nodes: RoadmapNode[]
  selectedNode: string | null
}

export default function ResourcePanel({ nodes, selectedNode }: ResourcePanelProps) {
  const selectedNodeData = nodes.find((node) => node.id === selectedNode)
  const selectedResources = selectedNodeData?.resources || []

  const getIcon = (type: "video" | "article" | "project") => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />
      case "article":
        return <FileText className="w-4 h-4" />
      case "project":
        return <FolderGit2 className="w-4 h-4" />
    }
  }

  const getDifficultyColor = (difficulty?: "beginner" | "intermediate" | "advanced") => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedNode || "empty"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold">
              {selectedNodeData ? `Resources for ${selectedNodeData.title}` : "Learning Resources"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedNode ? (
              <div className="space-y-4">
                {selectedResources.length > 0 ? (
                  selectedResources.map((resource, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="group"
                    >
                      <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-md border border-border/50">
                        <CardContent className="p-0">
                          <Button variant="ghost" className="w-full justify-start gap-3 p-4 h-auto text-left" asChild>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                                    {getIcon(resource.type)}
                                  </div>
                                  <span className="font-medium">{resource.title}</span>
                                </div>

                                <div className="flex items-center gap-2 ml-10 text-sm text-muted-foreground">
                                  {resource.duration && (
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      <span>{resource.duration}</span>
                                    </div>
                                  )}

                                  {resource.difficulty && (
                                    <Badge
                                      variant="outline"
                                      className={cn("text-xs", getDifficultyColor(resource.difficulty))}
                                    >
                                      <BarChart className="w-3 h-3 mr-1" />
                                      {resource.difficulty}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No resources available for this milestone</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p className="text-lg">Select a milestone to view resources</p>
                  <p className="text-sm mt-2">Click on any card in the roadmap to see related learning materials</p>
                </motion.div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

