import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Star } from "lucide-react"

const achievements = [
  { id: 1, title: "First Project Completed", xp: 100, unlocked: true },
  { id: 2, title: "Coding Streak: 7 Days", xp: 50, unlocked: true },
  { id: 3, title: "Algorithm Master", xp: 200, unlocked: false },
  { id: 4, title: "Open Source Contributor", xp: 150, unlocked: false },
]

export default function Achievements() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={achievement.unlocked ? "bg-emerald-50 dark:bg-emerald-900" : "bg-gray-100 dark:bg-gray-800"}
              >
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${achievement.unlocked ? "bg-emerald-500" : "bg-gray-400"}`}>
                    {achievement.unlocked ? (
                      <Trophy className="w-6 h-6 text-white" />
                    ) : (
                      <Star className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {achievement.unlocked ? `${achievement.xp} XP Earned` : "Locked"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

