import { motion } from "framer-motion"
import { User, Upload, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function ProfileSection() {
  const router = useRouter()
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
              <User className="w-16 h-16 text-gray-400" />
            </div>
            <Button size="sm" className="absolute bottom-0 right-0 rounded-full">
              <Upload className="w-4 h-4" />
            </Button>
          </div>
          <div>
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-gray-500 dark:text-gray-400">Computer Science Student</p>
          </div>
        </div>

        {/* Animated "Go to Dashboard" Button */}
        <motion.button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          whileHover="hover"
        >
          Go to Dashboard
          <motion.div
            initial={{ x: 0 }}
            variants={{
              hover: { x: 6 },
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <Input placeholder="Full Name" defaultValue="John Doe" />
        <Input placeholder="Email" type="email" defaultValue="john.doe@example.com" />
        <Input placeholder="University" defaultValue="Tech University" />
        <Input placeholder="Graduation Year" type="number" defaultValue="2025" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Roadmap Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Award className="w-8 h-8 text-emerald-500" />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
