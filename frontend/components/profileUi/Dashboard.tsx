"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VerticalNav from "./VerticalNav";
import ProfileSection from "./ProfileSection";
import RoadmapViewer from "./RoadmapViewer";
import SkillsMatrix from "./SkillsMatrix";
import Achievements from "./Achievements";
import InterviewPrep from "./InterviewPrep";
import Settings from "./Settings";
import ThemeToggle from "./ThemeToggle";
import * as Icons from "lucide-react";

type Tab = {
  id: string;
  label: string;
  icon: keyof typeof Icons;
};

const tabs: Tab[] = [
  { id: "profile", label: "Profile", icon: "User" },
  { id: "roadmap", label: "Roadmap", icon: "Map" },
  { id: "skills", label: "Skills Matrix", icon: "BarChart2" },
  { id: "achievements", label: "Achievements", icon: "Award" },
  { id: "interview", label: "Interview Prep", icon: "MessageSquare" },
  { id: "settings", label: "Settings", icon: "Settings" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "roadmap":
        return <RoadmapViewer />;
      case "skills":
        return <SkillsMatrix />;
      case "achievements":
        return <Achievements />;
      case "interview":
        return <InterviewPrep />;
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-900">
      <VerticalNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 flex flex-col overflow-hidden h-screen">
        <div className="flex justify-end p-4">
          <ThemeToggle />
        </div>
        <div className="flex-1 overflow-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
        <footer className="bg-muted py-6 mt-16">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            © 2025 logikxmind. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
}
