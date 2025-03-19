"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Award, Plus, Trash2, Calendar, Link2, ExternalLink } from "lucide-react"
import FileUpload from "./file-upload"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expirationDate?: string
  credentialUrl?: string
  credentialId?: string
  file?: File
}

export default function LicensesCertifications() {
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      issueDate: "2023-06",
      expirationDate: "2026-06",
      credentialId: "AWS-123456",
      credentialUrl: "https://aws.amazon.com/verification",
    },
    {
      id: "2",
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      issueDate: "2022-11",
      credentialId: "PSM-123456",
    },
  ])

  const [newCertification, setNewCertification] = useState<Partial<Certification>>({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddCertification = () => {
    if (newCertification.name && newCertification.issuer && newCertification.issueDate) {
      setCertifications([
        ...certifications,
        {
          id: Date.now().toString(),
          name: newCertification.name,
          issuer: newCertification.issuer,
          issueDate: newCertification.issueDate,
          expirationDate: newCertification.expirationDate,
          credentialUrl: newCertification.credentialUrl,
          credentialId: newCertification.credentialId,
          file: newCertification.file,
        },
      ])
      setNewCertification({})
      setIsDialogOpen(false)
    }
  }

  const handleDeleteCertification = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id))
  }

  const handleFileSelect = (file: File) => {
    setNewCertification({
      ...newCertification,
      file,
    })
  }

  const handleInputChange = (field: keyof Certification, value: string) => {
    setNewCertification({
      ...newCertification,
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
    <Card className="w-full mx-auto">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <CardTitle>Licenses & Certifications</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 w-full sm:w-auto">
              <Plus className="w-4 h-4" /> Add Certification
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto w-[95vw] p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle>Add Certification</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Certification Name*</Label>
                <Input
                  id="name"
                  value={newCertification.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g. AWS Certified Solutions Architect"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="issuer">Issuing Organization*</Label>
                <Input
                  id="issuer"
                  value={newCertification.issuer || ""}
                  onChange={(e) => handleInputChange("issuer", e.target.value)}
                  placeholder="e.g. Amazon Web Services"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Issue Date*</Label>
                  <div className="flex flex-col xs:flex-row gap-2">
                    <Select
                      onValueChange={(value) => {
                        const currentDate = newCertification.issueDate?.split("-") || ["", ""]
                        handleInputChange("issueDate", `${currentDate[0]}-${value}`)
                      }}
                    >
                      <SelectTrigger className="w-full">
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
                        const currentDate = newCertification.issueDate?.split("-") || ["", ""]
                        handleInputChange("issueDate", `${value}-${currentDate[1]}`)
                      }}
                    >
                      <SelectTrigger className="w-full">
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

                <div className="grid gap-2">
                  <Label>Expiration Date</Label>
                  <div className="flex flex-col xs:flex-row gap-2">
                    <Select
                      onValueChange={(value) => {
                        const currentDate = newCertification.expirationDate?.split("-") || ["", ""]
                        handleInputChange("expirationDate", `${currentDate[0]}-${value}`)
                      }}
                    >
                      <SelectTrigger className="w-full">
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
                        const currentDate = newCertification.expirationDate?.split("-") || ["", ""]
                        handleInputChange("expirationDate", `${value}-${currentDate[1]}`)
                      }}
                    >
                      <SelectTrigger className="w-full">
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
              </div>

              <div className="grid gap-2">
                <Label htmlFor="credentialId">Credential ID</Label>
                <Input
                  id="credentialId"
                  value={newCertification.credentialId || ""}
                  onChange={(e) => handleInputChange("credentialId", e.target.value)}
                  placeholder="e.g. AWS-123456"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="credentialUrl">Credential URL</Label>
                <Input
                  id="credentialUrl"
                  value={newCertification.credentialUrl || ""}
                  onChange={(e) => handleInputChange("credentialUrl", e.target.value)}
                  placeholder="e.g. https://aws.amazon.com/verification"
                />
              </div>

              <div className="grid gap-2">
                <Label>Upload Certificate</Label>
                <FileUpload onFileSelect={handleFileSelect} accept=".pdf,.jpg,.jpeg,.png" />
              </div>
            </div>
            <div className="flex flex-col xs:flex-row justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full xs:w-auto">
                Cancel
              </Button>
              <Button onClick={handleAddCertification} className="w-full xs:w-auto">
                Add
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {certifications.length === 0 ? (
            <div className="text-center py-8">
              <Award className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
              <p className="text-gray-500 dark:text-gray-400">No certifications added yet</p>
            </div>
          ) : (
            certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Award className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg">{cert.name}</h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Issued {formatDate(cert.issueDate)}</span>
                        </div>
                        {cert.expirationDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Expires {formatDate(cert.expirationDate)}</span>
                          </div>
                        )}
                      </div>
                      {cert.credentialId && (
                        <p className="text-xs sm:text-sm mt-1 text-gray-600 dark:text-gray-400">
                          Credential ID: {cert.credentialId}
                        </p>
                      )}
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-xs sm:text-sm mt-1"
                        >
                          <Link2 className="w-3 h-3" />
                          <span>See credential</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCertification(cert.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 h-8 w-8 mt-2 sm:mt-0 ml-auto sm:ml-0"
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