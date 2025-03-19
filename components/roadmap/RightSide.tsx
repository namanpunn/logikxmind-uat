"use client"
import React from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import ResourcePanel from "./ResourcePanel"
import { cn } from "@/lib/utils"

interface RightSidebarProps {
  rightSidebarOpen: boolean
  setRightSidebarOpen: (open: boolean) => void
  sidebarWidth: string | number
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
  sampleData: any[] // Replace 'any[]' with your RoadmapNode[] type if available
  selectedNode: string | null
}

const RightSide: React.FC<RightSidebarProps> = ({
  rightSidebarOpen,
  setRightSidebarOpen,
  sidebarWidth,
  selectedDate,
  setSelectedDate,
  sampleData,
  selectedNode,
}) => {
  return (
    <>
      <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
      <Calendar
  mode="single"
  selected={selectedDate}
  onSelect={setSelectedDate}
  className="rounded-md border shadow-sm"
  classNames={{
    day_selected: "bg-primary text-primary-foreground hover:bg-primary/90" 
  }}
/>
        <div className="mt-6">
          <ResourcePanel nodes={sampleData} selectedNode={selectedNode} />
        </div>
      </div>
      </>
   
  )
}

export default RightSide
