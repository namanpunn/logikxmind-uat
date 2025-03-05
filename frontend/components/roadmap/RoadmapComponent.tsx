"use client";
import React, { useState, useEffect, useCallback, JSX } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Video,
  Code,
  CheckCircle,
  Lock,
  MenuIcon,
  Calendar as CalendarIcon,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { AchievementBadge } from "./AchievementBadge";

export type RoadmapNode = {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "locked";
  category: "fundamentals" | "advanced" | "specialization";
  skills: string[];
  resources: {
    type: "video" | "article" | "project";
    title: string;
    url: string;
    duration?: string;
    difficulty?: "beginner" | "intermediate" | "advanced";
  }[];
  deadline?: Date;
  prerequisites: string[];
  nextSteps: string[];
  companyRelevance: string[];
  // These will be computed automatically:
  computedX?: number;
  computedY?: number;
};

/**
 * Computes node positions automatically.
 * Uses a BFS approach to assign levels (X axis) based on prerequisites,
 * and centers nodes on the Y axis based on the number of nodes in each level.
 */
const computeNodePositions = (nodes: RoadmapNode[]): RoadmapNode[] => {
  const levels: { [key: string]: RoadmapNode[] } = {};
  const processed = new Set<string>();
  const queue: RoadmapNode[] = [];

  // Identify root nodes (nodes with no prerequisites)
  nodes.forEach((node) => {
    if (node.prerequisites.length === 0) {
      queue.push(node);
      levels["0"] = levels["0"] || [];
      levels["0"].push(node);
      processed.add(node.id);
    }
  });

  // BFS to assign subsequent levels based on prerequisites
  let currentLevel = 1;
  while (queue.length > 0) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      // Find nodes that have the current node as a prerequisite
      const nextNodes = nodes.filter((n) => n.prerequisites.includes(node.id));
      nextNodes.forEach((nextNode) => {
        if (!processed.has(nextNode.id)) {
          queue.push(nextNode);
          levels[currentLevel.toString()] =
            levels[currentLevel.toString()] || [];
          levels[currentLevel.toString()].push(nextNode);
          processed.add(nextNode.id);
        }
      });
    }
    currentLevel++;
  }

  // Set computed X and Y coordinates for each node
  const baseX = 400; // Horizontal spacing per level
  const baseY = 250; // Vertical spacing between nodes in the same level

  Object.entries(levels).forEach(([level, levelNodes]) => {
    levelNodes.forEach((node, index) => {
      // X coordinate based on level index
      const x = parseInt(level) * baseX;
      // Center nodes vertically by subtracting half the total level height
      const y = (index - (levelNodes.length - 1) / 2) * baseY;
      node.computedX = x;
      node.computedY = y;
    });
  });

  return nodes;
};

// Sample data
const sampleData: RoadmapNode[] = [
  {
    id: "1",
    title: "Frontend Fundamentals",
    description: "Master the core concepts of web development",
    status: "completed",
    category: "fundamentals",
    skills: ["HTML5", "CSS3", "JavaScript ES6+"],
    resources: [
      {
        type: "video",
        title: "Web Development Crash Course",
        url: "https://example.com/web-dev",
        duration: "2.5 hours",
        difficulty: "beginner",
      },
    ],
    prerequisites: [],
    nextSteps: ["2", "3"],
    companyRelevance: ["Google", "Meta"],
  },
  {
    id: "2",
    title: "React Fundamentals",
    description: "Learn React core concepts",
    status: "in-progress",
    category: "fundamentals",
    skills: ["React", "JSX", "Hooks"],
    resources: [
      {
        type: "video",
        title: "React Basics",
        url: "https://example.com/react",
        duration: "4 hours",
        difficulty: "intermediate",
      },
    ],
    prerequisites: ["1"],
    nextSteps: ["4"],
    companyRelevance: ["Meta", "Netflix"],
  },
  {
    id: "3",
    title: "TypeScript Basics",
    description: "Learn TypeScript fundamentals",
    status: "locked",
    category: "fundamentals",
    skills: ["TypeScript", "Types", "Interfaces"],
    resources: [
      {
        type: "article",
        title: "TypeScript Guide",
        url: "https://example.com/typescript",
        difficulty: "intermediate",
      },
    ],
    prerequisites: ["1"],
    nextSteps: ["4"],
    companyRelevance: ["Microsoft", "Google"],
  },
  {
    id: "4",
    title: "TypeScript Basics",
    description: "Learn TypeScript fundamentals",
    status: "locked",
    category: "fundamentals",
    skills: ["TypeScript", "Types", "Interfaces"],
    resources: [
      {
        type: "article",
        title: "TypeScript Guide",
        url: "https://example.com/typescript",
        difficulty: "intermediate",
      },
    ],
    prerequisites: ["1"],
    nextSteps: ["4"],
    companyRelevance: ["Microsoft", "Google"],
  },
  {
    id: "5",
    title: "TypeScript Basics",
    description: "Learn TypeScript fundamentals",
    status: "locked",
    category: "fundamentals",
    skills: ["TypeScript", "Types", "Interfaces"],
    resources: [
      {
        type: "article",
        title: "TypeScript Guide",
        url: "https://example.com/typescript",
        difficulty: "intermediate",
      },
    ],
    prerequisites: ["1"],
    nextSteps: ["4"],
    companyRelevance: ["Microsoft", "Google"],
  },
  {
    id: "6",
    title: "TypeScript Basics",
    description: "Learn TypeScript fundamentals",
    status: "locked",
    category: "fundamentals",
    skills: ["TypeScript", "Types", "Interfaces"],
    resources: [
      {
        type: "article",
        title: "TypeScript Guide",
        url: "https://example.com/typescript",
        difficulty: "intermediate",
      },
    ],
    prerequisites: ["1"],
    nextSteps: ["4"],
    companyRelevance: ["Microsoft", "Google"],
  },
];

const RoadmapComponent: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [positionedNodes, setPositionedNodes] = useState<RoadmapNode[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "first-step",
      title: "First Step",
      description: "Complete your first learning milestone",
      icon: <Star className="w-5 h-5" />,
      unlocked: false,
    },
    {
      id: "fast-learner",
      title: "Fast Learner",
      description: "Complete 3 milestones in a week",
      icon: <Zap className="w-5 h-5" />,
      unlocked: false,
    },
    {
      id: "master",
      title: "Master",
      description: "Complete an entire learning path",
      icon: <Trophy className="w-5 h-5" />,
      unlocked: false,
    },
  ]);
  const [newAchievement, setNewAchievement] = useState<string | null>(null);

  const { data: roadmapNodes = sampleData } = useQuery<RoadmapNode[]>({
    queryKey: ["/api/roadmap"],
    enabled: false,
  });

  // Compute positions whenever roadmapNodes change.
  useEffect(() => {
    setPositionedNodes(computeNodePositions(roadmapNodes));
  }, [roadmapNodes]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  }, []);

  /**
   * Renders SVG connection lines between nodes using computed positions.
   * The lines are animated with Framer Motion.
   */
  const renderConnections = useCallback(() => {
    const connections: JSX.Element[] = [];

    positionedNodes.forEach((node) => {
      node.nextSteps.forEach((nextId) => {
        const nextNode = positionedNodes.find((n) => n.id === nextId);
        if (
          nextNode &&
          node.computedX !== undefined &&
          nextNode.computedX !== undefined
        ) {
          // Center of each card based on a fixed card size (300px width, approx 100px height)
          const startX = (node.computedX || 0) + 150;
          const startY = (node.computedY || 0) + 50;
          const endX = (nextNode.computedX || 0) + 150;
          const endY = (nextNode.computedY || 0) + 50;
          // Mid point for smooth curves
          const midX = (startX + endX) / 2;

          connections.push(
            <React.Fragment key={`${node.id}-${nextId}`}>
              {/* Main connection line with a smooth curve */}
              <motion.path
                d={`M ${startX} ${startY} 
                    C ${midX} ${startY},
                      ${midX} ${endY},
                      ${endX} ${endY}`}
                stroke="url(#gradient)"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              {/* Animated pulse effect at the starting point */}
              <motion.circle
                cx={startX}
                cy={startY}
                r="4"
                fill="url(#gradient)"
                initial={{ scale: 0 }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </React.Fragment>,
          );
        }
      });
    });

    return connections;
  }, [positionedNodes]);

  const progress =
    (roadmapNodes.filter((node) => node.status === "completed").length /
      roadmapNodes.length) *
    100;

  const checkAndUnlockAchievements = useCallback(
    (nodeId: string) => {
      const completedNodes = roadmapNodes.filter(
        (node) => node.status === "completed" || node.id === nodeId,
      );
      setAchievements((prev) =>
        prev.map((achievement) => {
          if (achievement.unlocked) return achievement;

          let shouldUnlock = false;
          switch (achievement.id) {
            case "first-step":
              shouldUnlock = completedNodes.length === 1;
              break;
            case "fast-learner":
              shouldUnlock = completedNodes.length >= 3;
              break;
            case "master":
              shouldUnlock = completedNodes.length === roadmapNodes.length;
              break;
          }

          if (shouldUnlock) {
            setNewAchievement(achievement.id);
            return { ...achievement, unlocked: true };
          }
          return achievement;
        }),
      );
    },
    [roadmapNodes],
  );

  return (
    <div
      className="min-h-screen bg-background relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic radial gradient background following the mouse */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.2 }}
      />

      {/* Left Sidebar Toggle */}
      <div className="fixed top-4 left-4 z-50 space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
        >
          <MenuIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Right Sidebar Toggle */}
      <div className="fixed top-4 right-4 z-50 space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
        >
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Left Sidebar */}
      <motion.div
        className="fixed left-0 top-0 h-full bg-card/95 backdrop-blur-sm w-80 shadow-xl z-40 overflow-hidden"
        initial={{ x: -320 }}
        animate={{ x: leftSidebarOpen ? 0 : -320 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="h-full p-6 overflow-y-auto scrollbar-thin">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Progress</h2>
            <div>
              <div className="flex justify-between mb-2">
                <span>Overall</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              {(["completed", "in-progress", "locked"] as const).map(
                (status) => (
                  <div key={status} className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${status === "completed"
                        ? "bg-green-500"
                        : status === "in-progress"
                          ? "bg-blue-500"
                          : "bg-gray-300"
                        }`}
                    />
                    <span className="capitalize">{status}</span>
                    <span className="ml-auto">
                      {roadmapNodes.filter((n) => n.status === status).length}
                    </span>
                  </div>
                ),
              )}
            </div>
            <div className="mt-6">
              <h3 className="font-medium mb-4">Achievements</h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {achievements.map((achievement) => (
                  <AchievementBadge
                    key={achievement.id}
                    title={achievement.title}
                    description={achievement.description}
                    icon={achievement.icon}
                    isNew={newAchievement === achievement.id}
                    onAnimationComplete={() => setNewAchievement(null)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Sidebar */}
      <motion.div
        className="fixed right-0 top-0 h-full bg-card/95 backdrop-blur-sm w-80 shadow-xl z-40 overflow-hidden"
        initial={{ x: 320 }}
        animate={{ x: rightSidebarOpen ? 0 : 320 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="h-full p-6 overflow-y-auto scrollbar-thin">
          <div className="space-y-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border w-full"
            />
            <div className="space-y-4">
              <h3 className="font-medium">Resources</h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {roadmapNodes.map((node) => (
                  <div key={node.id} className="space-y-2">
                    {node.resources.map((resource, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="w-full justify-start gap-2"
                        asChild
                      >
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {resource.type === "video" ? (
                            <Video className="w-4 h-4" />
                          ) : resource.type === "article" ? (
                            <BookOpen className="w-4 h-4" />
                          ) : (
                            <Code className="w-4 h-4" />
                          )}
                          <span className="truncate">{resource.title}</span>
                        </a>
                      </Button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Container */}
      <div
        className={`min-h-screen transition-all duration-300 
          ${leftSidebarOpen ? "pl-80" : "pl-0"}
          ${rightSidebarOpen ? "pr-80" : "pr-0"}
        `}
      >
        <div
          className="container p-8 relative min-h-screen overflow-auto"
          style={{ minWidth: "1200px", minHeight: "800px" }}
        >
          {/* SVG container for connection lines */}
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ minWidth: "1200px", minHeight: "800px" }}
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            {renderConnections()}
          </svg>

          {/* Render each roadmap card based on computed positions */}
          <div
            className="relative"
            style={{ minWidth: "1200px", minHeight: "800px" }}
          >
            {positionedNodes.map((node) => (
              <Dialog key={node.id}>
                <DialogTrigger
                  asChild
                  onClick={() => {
                    setSelectedNode(node.id);
                    checkAndUnlockAchievements(node.id);
                  }}
                >
                  <motion.div
                    className="absolute"
                    style={{
                      left: node.computedX,
                      top: node.computedY,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card
                      className={`w-[300px] transition-all duration-300
                      ${node.status === "locked" ? "opacity-50" : ""}
                      ${selectedNode === node.id ? "ring-2 ring-blue-500 shadow-lg" : ""}
                      hover:shadow-xl bg-card/95 backdrop-blur-sm
                    `}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${node.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : node.status === "in-progress"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-600"
                              }`}
                          >
                            <motion.div
                              animate={
                                node.status === "in-progress"
                                  ? {
                                    scale: [1, 1.2, 1],
                                    opacity: [1, 0.8, 1],
                                  }
                                  : {}
                              }
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              {node.status === "completed" ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : node.status === "in-progress" ? (
                                <Video className="w-5 h-5" />
                              ) : (
                                <Lock className="w-5 h-5" />
                              )}
                            </motion.div>
                          </div>
                          <div>
                            <h3 className="font-semibold">{node.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {node.category}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </DialogTrigger>

                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{node.title}</DialogTitle>
                    <DialogDescription>{node.description}</DialogDescription>
                  </DialogHeader>

                  <div className="mt-4 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {node.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid gap-2">
                      {node.resources.map((resource, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          className="justify-start gap-2"
                          asChild
                        >
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {resource.type === "video" ? (
                              <Video className="w-4 h-4" />
                            ) : resource.type === "article" ? (
                              <BookOpen className="w-4 h-4" />
                            ) : (
                              <Code className="w-4 h-4" />
                            )}
                            <div className="flex-1 text-left">
                              <div>{resource.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {resource.duration &&
                                  `Duration: ${resource.duration} • `}
                                Difficulty: {resource.difficulty}
                              </div>
                            </div>
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
}

export default RoadmapComponent;
