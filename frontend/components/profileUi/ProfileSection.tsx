import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Upload, Award, ArrowRight, Pencil, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useAuth } from "@/auth/AuthProvider"

export default function ProfileSection() {
  const router = useRouter()
  const { supabase, user } = useAuth()

  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    university: "Tech University",
    graduationYear: "2025",
    avatarUrl: "",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      console.log("No user logged in.")
      return
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (error) {
          console.error("❌ Error fetching profile:", error.message)
        } else {
          setProfileData({
            fullName: data.full_name || "John Doe",
            email: data.email || "john.doe@example.com",
            university: data.university || "Tech University",
            graduationYear: data.graduation_year || "2025",
            avatarUrl: data.avatar_url || "",
          })
        }
      } catch (err) {
        console.error("❌ Unexpected error:", err)
      }
    }

    fetchProfile()
  }, [user, supabase])

  const handleSaveChanges = async () => {
    if (!user) return
    setLoading(true)

    const updates = {
      full_name: profileData.fullName,
      email: profileData.email,
      university: profileData.university,
      graduation_year: profileData.graduationYear,
      updated_at: new Date().toISOString(),
    }

    try {
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id)

      if (error) {
        console.error("❌ Error updating profile:", error.message)
      } else {
        console.log("✅ Profile updated successfully")
        setIsEditing(false)
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

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
              {profileData.avatarUrl ? (
                <img
                  src={profileData.avatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-gray-400" />
              )}
            </div>
            <Button size="sm" className="absolute bottom-0 right-0 rounded-full">
              <Upload className="w-4 h-4" />
            </Button>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profileData.fullName || "No Name"}</h1>
            <p className="text-gray-500 dark:text-gray-400">{profileData.email || "No Email"}</p>
          </div>
        </div>

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
        <Input
          placeholder="Full Name"
          value={profileData.fullName}
          onChange={(e) => handleInputChange("fullName", e.target.value)}
          disabled={!isEditing}
        />
        <Input
          placeholder="Email"
          type="email"
          value={profileData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          disabled={!isEditing}
        />
        <Input
          placeholder="University"
          value={profileData.university}
          onChange={(e) => handleInputChange("university", e.target.value)}
          disabled={!isEditing}
        />
        <Input
          placeholder="Graduation Year"
          type="number"
          value={profileData.graduationYear}
          onChange={(e) => handleInputChange("graduationYear", e.target.value)}
          disabled={!isEditing}
        />
      </motion.div>

      <div className="flex gap-4">
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
            <Pencil className="w-4 h-4" /> Edit Profile
          </Button>
        ) : (
          <Button
            onClick={handleSaveChanges}
            disabled={loading}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <Save className="w-4 h-4" /> {loading ? "Saving..." : "Save Changes"}
          </Button>
        )}
      </div>

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
