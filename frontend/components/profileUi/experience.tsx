"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Briefcase, Plus, Trash2, Calendar, MapPin } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import FileUpload from "./file-upload"

interface Experience {
  id: string
  title: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  description?: string
  file?: File
}

export default function ExperienceTab() {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      title: "Software Engineer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      startDate: "2022-06",
      endDate: "2023-12",
      current: false,
      description:
        "Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    },
    {
      id: "2",
      title: "Frontend Developer",
      company: "Digital Innovations",
      location: "Remote",
      startDate: "2021-03",
      endDate: "2022-05",
      current: false,
      description:
        "Built responsive user interfaces using modern JavaScript frameworks. Implemented UI/UX designs and optimized application performance.",
    },
  ])

  const [newExperience, setNewExperience] = useState<Partial<Experience>>({
    current: false,
  })
  const [isChecked, setIsChecked] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddExperience = () => {
    if (newExperience.title && newExperience.company && newExperience.startDate) {
      setExperiences([
        ...experiences,
        {
          id: Date.now().toString(),
          title: newExperience.title,
          company: newExperience.company,
          location: newExperience.location,
          startDate: newExperience.startDate,
          endDate: newExperience.current ? undefined : newExperience.endDate,
          current: newExperience.current || false,
          description: newExperience.description,
          file: newExperience.file,
        },
      ])
      setNewExperience({ current: false })
      setIsDialogOpen(false)
    }
  }

  const handleDeleteExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id))
  }

  const handleCheckboxChange = (checked: boolean) => {
    const value = Boolean(checked)
    setIsChecked(value)
    handleInputChange("current", value)

    if (value) {
      handleInputChange("endDate", undefined)
    }
  }

  const handleFileSelect = (file: File) => {
    setNewExperience({
      ...newExperience,
      file,
    })
  }

  const handleInputChange = (field: keyof Experience, value: any) => {
    setNewExperience({
      ...newExperience,
      [field]: value,
    })
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i)

  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    const [year, month] = dateString.split("-")
    const monthIndex = Number.parseInt(month) - 1
    return `${months[monthIndex]} ${year}`
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Experience</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Experience</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title*</Label>
                <Input
                  id="title"
                  value={newExperience.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g. Software Engineer"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="company">Company*</Label>
                <Input
                  id="company"
                  value={newExperience.company || ""}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="e.g. Tech Solutions Inc."
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newExperience.location || ""}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="e.g. San Francisco, CA"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Start Date*</Label>
                  <div className="flex gap-2">
                    <Select
                      onValueChange={(value) => {
                        const currentDate = newExperience.startDate?.split("-") || ["", ""]
                        handleInputChange("startDate", `${currentDate[0]}-${value}`)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month, index) => (
                          <SelectItem key={month} value={(index + 1).toString().padStart(2, "0")}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      onValueChange={(value) => {
                        const currentDate = newExperience.startDate?.split("-") || ["", ""]
                        handleInputChange("startDate", `${value}-${currentDate[1]}`)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {!newExperience.current && (
                  <div className="grid gap-2">
                    <Label>End Date</Label>
                    <div className="flex gap-2">
                      <Select
                        onValueChange={(value) => {
                          const currentDate = newExperience.endDate?.split("-") || ["", ""]
                          handleInputChange("endDate", `${currentDate[0]}-${value}`)
                        }}
                        disabled={newExperience.current}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month, index) => (
                            <SelectItem key={month} value={(index + 1).toString().padStart(2, "0")}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        onValueChange={(value) => {
                          const currentDate = newExperience.endDate?.split("-") || ["", ""]
                          handleInputChange("endDate", `${value}-${currentDate[1]}`)
                        }}
                        disabled={newExperience.current}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={handleCheckboxChange}
                />
                <label
                  htmlFor="current"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I am currently working in this role
                </label>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newExperience.description || ""}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your responsibilities and achievements..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid gap-2">
                <Label>Upload Supporting Document</Label>
                <FileUpload onFileSelect={handleFileSelect} accept=".pdf,.jpg,.jpeg,.png" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddExperience}>Add</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {experiences.length === 0 ? (
            <div className="text-center py-8">
              <Briefcase className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
              <p className="text-gray-500 dark:text-gray-400">No experience added yet</p>
            </div>
          ) : (
            experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <Briefcase className="w-10 h-10 text-blue-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">{exp.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                      {exp.location && (
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">{exp.description}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteExperience(exp.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 h-8 w-8"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

