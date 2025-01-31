import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Settings() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="flex flex-col space-y-1">
              <span>Email Notifications</span>
              <span className="font-normal text-sm text-gray-500 dark:text-gray-400">
                Receive email updates about your progress
              </span>
            </Label>
            <Switch id="notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="public-profile" className="flex flex-col space-y-1">
              <span>Public Profile</span>
              <span className="font-normal text-sm text-gray-500 dark:text-gray-400">
                Allow others to see your profile
              </span>
            </Label>
            <Switch id="public-profile" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-assistant" className="flex flex-col space-y-1">
              <span>AI Learning Assistant</span>
              <span className="font-normal text-sm text-gray-500 dark:text-gray-400">
                Enable AI-powered learning recommendations
              </span>
            </Label>
            <Switch id="ai-assistant" />
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}

