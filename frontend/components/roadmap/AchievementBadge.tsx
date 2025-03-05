import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import ReactConfetti from "react-confetti"

interface AchievementBadgeProps {
  title: string
  description: string
  icon: React.ReactNode
  isNew?: boolean
  onAnimationComplete?: () => void
}

export function AchievementBadge({ 
  title, 
  description, 
  icon, 
  isNew = false,
  onAnimationComplete 
}: AchievementBadgeProps) {
  const [showConfetti, setShowConfetti] = React.useState(isNew)

  React.useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => {
        setShowConfetti(false)
        onAnimationComplete?.()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isNew, onAnimationComplete])

  return (
    <>
      {showConfetti && (
        <ReactConfetti
          recycle={false}
          numberOfPieces={200}
          tweenDuration={5000}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}
      <motion.div
        initial={isNew ? { scale: 0.8, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <Card className="relative overflow-hidden">
          <div className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              {icon}
            </div>
            <div>
              <h4 className="font-semibold">{title}</h4>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            {isNew && (
              <Badge variant="secondary" className="absolute top-2 right-2">
                New!
              </Badge>
            )}
          </div>
        </Card>
      </motion.div>
    </>
  )
}
