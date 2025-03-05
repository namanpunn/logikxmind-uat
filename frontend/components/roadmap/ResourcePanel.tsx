import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, FileText, FolderGit2 } from "lucide-react"
import type { RoadmapNode } from "./RoadmapComponent"

interface ResourcePanelProps {
  nodes: RoadmapNode[]
  selectedNode: string | null
}

export default function ResourcePanel({ nodes, selectedNode }: ResourcePanelProps) {
  const selectedResources = nodes.find(node => node.id === selectedNode)?.resources || []

  const getIcon = (type: 'video' | 'article' | 'project') => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />
      case 'article':
        return <FileText className="w-4 h-4" />
      case 'project':
        return <FolderGit2 className="w-4 h-4" />
    }
  }

  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">Learning Resources</h2>
        
        {selectedNode ? (
          <div className="space-y-4">
            {selectedResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  asChild
                >
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    {getIcon(resource.type)}
                    <span>{resource.title}</span>
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            Select a milestone to view resources
          </div>
        )}
      </motion.div>
    </Card>
  )
}
