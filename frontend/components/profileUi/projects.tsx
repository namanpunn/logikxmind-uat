"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FolderGit2, Plus, Trash2, Calendar, ExternalLink, Github } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import FileUpload from "./file-upload"

interface Project {
  id: string
  name: string
  type: string
  startDate: string
  endDate?: string
  ongoing: boolean
  description?: string
  technologies?: string[]
  repoUrl?: string
  demoUrl?: string
  file?: File
}

export default function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "E-commerce Platform",
      type: "Web Application",
      startDate: "2023-01",
      endDate: "2023-04",
      ongoing: false,
      description:
        "Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Implemented user authentication, product catalog, shopping cart, and payment processing.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      repoUrl: "https://github.com/username/ecommerce-platform",
      demoUrl: "https://ecommerce-demo.example.com",
    },
    {
      id: "2",
      name: "AI Image Generator",
      type: "Machine Learning",
      startDate: "2023-06",
      ongoing: true,
      description:
        "Developing an AI-powered image generation tool using Python and TensorFlow. Implementing various GAN architectures for high-quality image synthesis.",
      technologies: ["Python", "TensorFlow", "PyTorch", "GANs"],
      repoUrl: "https://github.com/username/ai-image-generator",
    },
  ])

  const [newProject, setNewProject] = useState<Partial<Project>>({
    ongoing: false,
    technologies: [],
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [techInput, setTechInput] = useState("")

  const handleAddProject = () => {
    if (newProject.name && newProject.type && newProject.startDate) {
      setProjects([
        ...projects,
        {
          id: Date.now().toString(),
          name: newProject.name,
          type: newProject.type,
          startDate: newProject.startDate,
          endDate: newProject.ongoing ? undefined : newProject.endDate,
          ongoing: newProject.ongoing || false,
          description: newProject.description,
          technologies: newProject.technologies || [],
          repoUrl: newProject.repoUrl,
          demoUrl: newProject.demoUrl,
          file: newProject.file,
        },
      ])
      setNewProject({ ongoing: false, technologies: [] })
      setTechInput("")
      setIsDialogOpen(false)
    }
  }

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((proj) => proj.id !== id))
  }

  const handleFileSelect = (file: File) => {
    setNewProject({
      ...newProject,
      file,
    })
  }

  const handleCheckboxChange = (checked: boolean) => {
    const value = Boolean(checked)
    setIsChecked(value)
    handleInputChange("ongoing", checked);

    if (value) {
      handleInputChange("endDate", undefined)
    }
  }

  const handleInputChange = <K extends keyof Project>(field: K, value: Project[K]) => {
    setNewProject({
      ...newProject,
      [field]: value,
    })
  }

  const handleAddTechnology = () => {
    if (techInput && !newProject.technologies?.includes(techInput)) {
      setNewProject({
        ...newProject,
        technologies: [...(newProject.technologies || []), techInput],
      })
      setTechInput("")
    }
  }

  const handleRemoveTechnology = (tech: string) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies?.filter((t) => t !== tech),
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

  const projectTypes = [
    "Web Application",
    "Mobile App",
    "Desktop Application",
    "Machine Learning",
    "Data Analysis",
    "Game Development",
    "IoT",
    "Blockchain",
    "Other",
  ]

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Projects</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Project</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Project Name*</Label>
                <Input
                  id="name"
                  value={newProject.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g. E-commerce Platform"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Project Type*</Label>
                <Select onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Start Date*</Label>
                  <div className="flex gap-2">
                    <Select
                      onValueChange={(value) => {
                        const currentDate = newProject.startDate?.split("-") || ["", ""]
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
                        const currentDate = newProject.startDate?.split("-") || ["", ""]
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

                {!newProject.ongoing && (
                  <div className="grid gap-2">
                    <Label>End Date</Label>
                    <div className="flex gap-2">
                      <Select
                        onValueChange={(value) => {
                          const currentDate = newProject.endDate?.split("-") || ["", ""]
                          handleInputChange("endDate", `${currentDate[0]}-${value}`)
                        }}
                        disabled={newProject.ongoing}
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
                          const currentDate = newProject.endDate?.split("-") || ["", ""]
                          handleInputChange("endDate", `${value}-${currentDate[1]}`)
                        }}
                        disabled={newProject.ongoing}
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

              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => handleCheckboxChange(!isChecked)}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={handleCheckboxChange}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="text-sm font-medium leading-none">
                  This is an ongoing project
                </span>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProject.description || ""}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your project, its purpose, and your role..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid gap-2">
                <Label>Technologies Used</Label>
                <div className="flex gap-2">
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="e.g. React"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTechnology()
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTechnology} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {newProject.technologies?.map((tech) => (
                    <div
                      key={tech}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                    >
                      {tech}
                      <button
                        onClick={() => handleRemoveTechnology(tech)}
                        className="text-blue-500 hover:text-blue-700 ml-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="repoUrl">Repository URL</Label>
                <Input
                  id="repoUrl"
                  value={newProject.repoUrl || ""}
                  onChange={(e) => handleInputChange("repoUrl", e.target.value)}
                  placeholder="e.g. https://github.com/username/project"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="demoUrl">Demo URL</Label>
                <Input
                  id="demoUrl"
                  value={newProject.demoUrl || ""}
                  onChange={(e) => handleInputChange("demoUrl", e.target.value)}
                  placeholder="e.g. https://project-demo.example.com"
                />
              </div>

              <div className="grid gap-2">
                <Label>Upload Project Image/Screenshot</Label>
                <FileUpload onFileSelect={handleFileSelect} accept=".jpg,.jpeg,.png,.gif" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProject}>Add</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.length === 0 ? (
            <div className="text-center py-8">
              <FolderGit2 className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
              <p className="text-gray-500 dark:text-gray-400">No projects added yet</p>
            </div>
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <FolderGit2 className="w-10 h-10 text-orange-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">{project.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{project.type}</p>
                      <div className="flex items-center gap-1 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDate(project.startDate)} - {project.ongoing ? "Present" : formatDate(project.endDate)}
                        </span>
                      </div>
                      {project.description && (
                        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">{project.description}</p>
                      )}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-4 mt-3">
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm"
                          >
                            <Github className="w-4 h-4" />
                            <span>Repository</span>
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteProject(project.id)}
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

