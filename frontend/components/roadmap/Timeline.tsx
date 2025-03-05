import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CheckCircle, Circle, Lock } from "lucide-react"
import type { RoadmapNode } from "./RoadmapComponent"

interface TimelineProps {
  nodes: RoadmapNode[]
  selectedNode: string | null
  onNodeSelect: (id: string) => void
}

export default function Timeline({ nodes, selectedNode, onNodeSelect }: TimelineProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'in-progress':
        return <Circle className="w-5 h-5 text-blue-500" />
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div className="relative">
      {/* Animated connection line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400">
        <motion.div
          className="absolute top-0 left-0 w-full bg-blue-500"
          initial={{ height: "0%" }}
          animate={{ height: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>

      <div className="space-y-8">
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card
                    className={`p-4 ml-6 cursor-pointer transition-all
                      ${node.status === 'locked' ? 'opacity-50' : ''}
                      ${selectedNode === node.id ? 'ring-2 ring-blue-500 shadow-lg' : ''}
                      hover:shadow-md
                    `}
                    onClick={() => onNodeSelect(node.id)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Node indicator with icon */}
                      <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          {getStatusIcon(node.status)}
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold">{node.title}</h3>

                        <div className="flex flex-wrap gap-2">
                          {node.skills.map(skill => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className={`${node.status === 'in-progress' ? 'animate-pulse' : ''}`}
                            >
                              {skill}
                            </Badge>
                          ))}
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
                              <div className="pt-4 border-t mt-4">
                                <h4 className="text-sm font-medium mb-2">Related Companies</h4>
                                <div className="flex flex-wrap gap-2">
                                  {node.companyRelevance.map(company => (
                                    <Badge key={company} variant="outline">
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
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{node.title}</p>
                  <p className="text-sm text-gray-500">Click to view details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        ))}
      </div>
    </div>
  )
}