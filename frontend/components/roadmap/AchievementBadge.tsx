"use client"

import React from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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
  onAnimationComplete,
}: AchievementBadgeProps) {
  const [showConfetti, setShowConfetti] = React.useState(isNew)
  const [windowSize, setWindowSize] = React.useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

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
          width={windowSize.width}
          height={windowSize.height}
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
        <Card className="relative overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">{icon}</div>
              <div>
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              {isNew && (
                <Badge variant="secondary" className="absolute top-2 right-2 animate-pulse">
                  New!
                </Badge>
              )}
            </div>
          </CardContent>
          {isNew && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              <div className="absolute inset-0 bg-primary/5 rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg" />
            </motion.div>
          )}
        </Card>
      </motion.div>
    </>
  )
}

