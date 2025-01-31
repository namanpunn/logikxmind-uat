import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Code, Users } from "lucide-react"

const prepAreas = [
  { id: 1, title: "Algorithms", icon: Code, color: "text-blue-500" },
  { id: 2, title: "System Design", icon: Users, color: "text-green-500" },
  { id: 3, title: "Behavioral", icon: BookOpen, color: "text-purple-500" },
]

export default function InterviewPrep() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Interview Preparation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {prepAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <area.icon className={`w-12 h-12 ${area.color} mb-4`} />
                  <h3 className="font-semibold mb-2">{area.title}</h3>
                  <Button variant="outline" size="sm">
                    Start Practice
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

