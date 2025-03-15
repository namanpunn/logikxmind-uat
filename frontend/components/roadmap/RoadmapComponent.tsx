// "use client";
// import React, { useState, useEffect, useCallback, JSX } from "react";
// import { motion } from "framer-motion";
// import {
//   BookOpen,
//   Video,
//   Code,
//   CheckCircle,
//   Lock,
//   MenuIcon,
//   Calendar as CalendarIcon,
//   Star,
//   Trophy,
//   Zap,
// } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useQuery } from "@tanstack/react-query";
// import { AchievementBadge } from "./AchievementBadge";

// export type RoadmapNode = {
//   id: string;
//   title: string;
//   description: string;
//   status: "completed" | "in-progress" | "locked";
//   category: "fundamentals" | "advanced" | "specialization";
//   skills: string[];
//   resources: {
//     type: "video" | "article" | "project";
//     title: string;
//     url: string;
//     duration?: string;
//     difficulty?: "beginner" | "intermediate" | "advanced";
//   }[];
//   deadline?: Date;
//   prerequisites: string[];
//   nextSteps: string[];
//   companyRelevance: string[];
//   // These will be computed automatically:
//   computedX?: number;
//   computedY?: number;
// };

// /**
//  * Computes node positions automatically.
//  * Uses a BFS approach to assign levels (X axis) based on prerequisites,
//  * and centers nodes on the Y axis based on the number of nodes in each level.
//  */
// const computeNodePositions = (nodes: RoadmapNode[]): RoadmapNode[] => {
//   const levels: { [key: string]: RoadmapNode[] } = {};
//   const processed = new Set<string>();
//   const queue: RoadmapNode[] = [];

//   // Identify root nodes (nodes with no prerequisites)
//   nodes.forEach((node) => {
//     if (node.prerequisites.length === 0) {
//       queue.push(node);
//       levels["0"] = levels["0"] || [];
//       levels["0"].push(node);
//       processed.add(node.id);
//     }
//   });

//   // BFS to assign subsequent levels based on prerequisites
//   let currentLevel = 1;
//   while (queue.length > 0) {
//     const levelSize = queue.length;
//     for (let i = 0; i < levelSize; i++) {
//       const node = queue.shift()!;
//       // Find nodes that have the current node as a prerequisite
//       const nextNodes = nodes.filter((n) => n.prerequisites.includes(node.id));
//       nextNodes.forEach((nextNode) => {
//         if (!processed.has(nextNode.id)) {
//           queue.push(nextNode);
//           levels[currentLevel.toString()] =
//             levels[currentLevel.toString()] || [];
//           levels[currentLevel.toString()].push(nextNode);
//           processed.add(nextNode.id);
//         }
//       });
//     }
//     currentLevel++;
//   }

//   // Set computed X and Y coordinates for each node
//   const baseX = 400; // Horizontal spacing per level
//   const baseY = 250; // Vertical spacing between nodes in the same level

//   Object.entries(levels).forEach(([level, levelNodes]) => {
//     levelNodes.forEach((node, index) => {
//       // X coordinate based on level index
//       const x = parseInt(level) * baseX;
//       // Center nodes vertically by subtracting half the total level height
//       const y = (index - (levelNodes.length - 1) / 2) * baseY;
//       node.computedX = x;
//       node.computedY = y;
//     });
//   });

//   return nodes;
// };

// // Sample data
// const sampleData: RoadmapNode[] = [
//   {
//     id: "1",
//     title: "Frontend Fundamentals",
//     description: "Master the core concepts of web development",
//     status: "completed",
//     category: "fundamentals",
//     skills: ["HTML5", "CSS3", "JavaScript ES6+"],
//     resources: [
//       {
//         type: "video",
//         title: "Web Development Crash Course",
//         url: "https://example.com/web-dev",
//         duration: "2.5 hours",
//         difficulty: "beginner",
//       },
//     ],
//     prerequisites: [],
//     nextSteps: ["2", "3"],
//     companyRelevance: ["Google", "Meta"],
//   },
//   {
//     id: "2",
//     title: "React Fundamentals",
//     description: "Learn React core concepts",
//     status: "in-progress",
//     category: "fundamentals",
//     skills: ["React", "JSX", "Hooks"],
//     resources: [
//       {
//         type: "video",
//         title: "React Basics",
//         url: "https://example.com/react",
//         duration: "4 hours",
//         difficulty: "intermediate",
//       },
//     ],
//     prerequisites: ["1"],
//     nextSteps: ["4"],
//     companyRelevance: ["Meta", "Netflix"],
//   },
//   {
//     id: "3",
//     title: "TypeScript Basics",
//     description: "Learn TypeScript fundamentals",
//     status: "locked",
//     category: "fundamentals",
//     skills: ["TypeScript", "Types", "Interfaces"],
//     resources: [
//       {
//         type: "article",
//         title: "TypeScript Guide",
//         url: "https://example.com/typescript",
//         difficulty: "intermediate",
//       },
//     ],
//     prerequisites: ["1"],
//     nextSteps: ["4"],
//     companyRelevance: ["Microsoft", "Google"],
//   },
//   {
//     id: "4",
//     title: "TypeScript Basics",
//     description: "Learn TypeScript fundamentals",
//     status: "locked",
//     category: "fundamentals",
//     skills: ["TypeScript", "Types", "Interfaces"],
//     resources: [
//       {
//         type: "article",
//         title: "TypeScript Guide",
//         url: "https://example.com/typescript",
//         difficulty: "intermediate",
//       },
//     ],
//     prerequisites: ["1"],
//     nextSteps: ["4"],
//     companyRelevance: ["Microsoft", "Google"],
//   },
//   {
//     id: "5",
//     title: "TypeScript Basics",
//     description: "Learn TypeScript fundamentals",
//     status: "locked",
//     category: "fundamentals",
//     skills: ["TypeScript", "Types", "Interfaces"],
//     resources: [
//       {
//         type: "article",
//         title: "TypeScript Guide",
//         url: "https://example.com/typescript",
//         difficulty: "intermediate",
//       },
//     ],
//     prerequisites: ["1"],
//     nextSteps: ["4"],
//     companyRelevance: ["Microsoft", "Google"],
//   },
//   {
//     id: "6",
//     title: "TypeScript Basics",
//     description: "Learn TypeScript fundamentals",
//     status: "locked",
//     category: "fundamentals",
//     skills: ["TypeScript", "Types", "Interfaces"],
//     resources: [
//       {
//         type: "article",
//         title: "TypeScript Guide",
//         url: "https://example.com/typescript",
//         difficulty: "intermediate",
//       },
//     ],
//     prerequisites: ["1"],
//     nextSteps: ["4"],
//     companyRelevance: ["Microsoft", "Google"],
//   },
// ];

// const RoadmapComponent: React.FC = () => {
//   const [selectedNode, setSelectedNode] = useState<string | null>(null);
//   const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
//   const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(
//     new Date(),
//   );
//   const [positionedNodes, setPositionedNodes] = useState<RoadmapNode[]>([]);
//   const [achievements, setAchievements] = useState<Achievement[]>([
//     {
//       id: "first-step",
//       title: "First Step",
//       description: "Complete your first learning milestone",
//       icon: <Star className="w-5 h-5" />,
//       unlocked: false,
//     },
//     {
//       id: "fast-learner",
//       title: "Fast Learner",
//       description: "Complete 3 milestones in a week",
//       icon: <Zap className="w-5 h-5" />,
//       unlocked: false,
//     },
//     {
//       id: "master",
//       title: "Master",
//       description: "Complete an entire learning path",
//       icon: <Trophy className="w-5 h-5" />,
//       unlocked: false,
//     },
//   ]);
//   const [newAchievement, setNewAchievement] = useState<string | null>(null);

//   const { data: roadmapNodes = sampleData } = useQuery<RoadmapNode[]>({
//     queryKey: ["/api/roadmap"],
//     enabled: false,
//   });

//   // Compute positions whenever roadmapNodes change.
//   useEffect(() => {
//     setPositionedNodes(computeNodePositions(roadmapNodes));
//   }, [roadmapNodes]);

//   const handleMouseMove = useCallback((e: React.MouseEvent) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     setMousePosition({ x, y });
//   }, []);

//   /**
//    * Renders SVG connection lines between nodes using computed positions.
//    * The lines are animated with Framer Motion.
//    */
//   const renderConnections = useCallback(() => {
//     const connections: JSX.Element[] = [];

//     positionedNodes.forEach((node) => {
//       node.nextSteps.forEach((nextId) => {
//         const nextNode = positionedNodes.find((n) => n.id === nextId);
//         if (
//           nextNode &&
//           node.computedX !== undefined &&
//           nextNode.computedX !== undefined
//         ) {
//           // Center of each card based on a fixed card size (300px width, approx 100px height)
//           const startX = (node.computedX || 0) + 150;
//           const startY = (node.computedY || 0) + 50;
//           const endX = (nextNode.computedX || 0) + 150;
//           const endY = (nextNode.computedY || 0) + 50;
//           // Mid point for smooth curves
//           const midX = (startX + endX) / 2;

//           connections.push(
//             <React.Fragment key={`${node.id}-${nextId}`}>
//               {/* Main connection line with a smooth curve */}
//               <motion.path
//                 d={`M ${startX} ${startY} 
//                     C ${midX} ${startY},
//                       ${midX} ${endY},
//                       ${endX} ${endY}`}
//                 stroke="url(#gradient)"
//                 strokeWidth="3"
//                 fill="none"
//                 initial={{ pathLength: 0, opacity: 0 }}
//                 animate={{ pathLength: 1, opacity: 1 }}
//                 transition={{ duration: 1.5, ease: "easeInOut" }}
//               />
//               {/* Animated pulse effect at the starting point */}
//               <motion.circle
//                 cx={startX}
//                 cy={startY}
//                 r="4"
//                 fill="url(#gradient)"
//                 initial={{ scale: 0 }}
//                 animate={{
//                   scale: [1, 2, 1],
//                   opacity: [1, 0, 1],
//                 }}
//                 transition={{
//                   duration: 2,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//               />
//             </React.Fragment>,
//           );
//         }
//       });
//     });

//     return connections;
//   }, [positionedNodes]);

//   const progress =
//     (roadmapNodes.filter((node) => node.status === "completed").length /
//       roadmapNodes.length) *
//     100;

//   const checkAndUnlockAchievements = useCallback(
//     (nodeId: string) => {
//       const completedNodes = roadmapNodes.filter(
//         (node) => node.status === "completed" || node.id === nodeId,
//       );
//       setAchievements((prev) =>
//         prev.map((achievement) => {
//           if (achievement.unlocked) return achievement;

//           let shouldUnlock = false;
//           switch (achievement.id) {
//             case "first-step":
//               shouldUnlock = completedNodes.length === 1;
//               break;
//             case "fast-learner":
//               shouldUnlock = completedNodes.length >= 3;
//               break;
//             case "master":
//               shouldUnlock = completedNodes.length === roadmapNodes.length;
//               break;
//           }

//           if (shouldUnlock) {
//             setNewAchievement(achievement.id);
//             return { ...achievement, unlocked: true };
//           }
//           return achievement;
//         }),
//       );
//     },
//     [roadmapNodes],
//   );

//   return (
//     <div
//       className="min-h-screen bg-background relative overflow-hidden"
//       onMouseMove={handleMouseMove}
//     >
//       {/* Dynamic radial gradient background following the mouse */}
//       <motion.div
//         className="fixed inset-0 pointer-events-none"
//         animate={{
//           background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
//         }}
//         transition={{ type: "tween", ease: "linear", duration: 0.2 }}
//       />

//       {/* Left Sidebar Toggle */}
//       <div className="fixed top-4 left-4 z-50 space-x-2">
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
//         >
//           <MenuIcon className="h-4 w-4" />
//         </Button>
//       </div>

//       {/* Right Sidebar Toggle */}
//       <div className="fixed top-4 right-4 z-50 space-x-2">
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
//         >
//           <CalendarIcon className="h-4 w-4" />
//         </Button>
//       </div>

//       {/* Left Sidebar */}
//       <motion.div
//         className="fixed left-0 top-0 h-full bg-card/95 backdrop-blur-sm w-80 shadow-xl z-40 overflow-hidden"
//         initial={{ x: -320 }}
//         animate={{ x: leftSidebarOpen ? 0 : -320 }}
//         transition={{ type: "spring", stiffness: 300, damping: 30 }}
//       >
//         <div className="h-full p-6 overflow-y-auto scrollbar-thin">
//           <div className="space-y-6">
//             <h2 className="text-2xl font-bold">Progress</h2>
//             <div>
//               <div className="flex justify-between mb-2">
//                 <span>Overall</span>
//                 <span>{Math.round(progress)}%</span>
//               </div>
//               <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                 <motion.div
//                   className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
//                   initial={{ width: 0 }}
//                   animate={{ width: `${progress}%` }}
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               {(["completed", "in-progress", "locked"] as const).map(
//                 (status) => (
//                   <div key={status} className="flex items-center gap-2">
//                     <div
//                       className={`w-3 h-3 rounded-full ${status === "completed"
//                         ? "bg-green-500"
//                         : status === "in-progress"
//                           ? "bg-blue-500"
//                           : "bg-gray-300"
//                         }`}
//                     />
//                     <span className="capitalize">{status}</span>
//                     <span className="ml-auto">
//                       {roadmapNodes.filter((n) => n.status === status).length}
//                     </span>
//                   </div>
//                 ),
//               )}
//             </div>
//             <div className="mt-6">
//               <h3 className="font-medium mb-4">Achievements</h3>
//               <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
//                 {achievements.map((achievement) => (
//                   <AchievementBadge
//                     key={achievement.id}
//                     title={achievement.title}
//                     description={achievement.description}
//                     icon={achievement.icon}
//                     isNew={newAchievement === achievement.id}
//                     onAnimationComplete={() => setNewAchievement(null)}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Right Sidebar */}
//       <motion.div
//         className="fixed right-0 top-0 h-full bg-card/95 backdrop-blur-sm w-80 shadow-xl z-40 overflow-hidden"
//         initial={{ x: 320 }}
//         animate={{ x: rightSidebarOpen ? 0 : 320 }}
//         transition={{ type: "spring", stiffness: 300, damping: 30 }}
//       >
//         <div className="h-full p-6 overflow-y-auto scrollbar-thin">
//           <div className="space-y-6">
//             <Calendar
//               mode="single"
//               selected={selectedDate}
//               onSelect={setSelectedDate}
//               className="rounded-md border w-full"
//             />
//             <div className="space-y-4">
//               <h3 className="font-medium">Resources</h3>
//               <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
//                 {roadmapNodes.map((node) => (
//                   <div key={node.id} className="space-y-2">
//                     {node.resources.map((resource, i) => (
//                       <Button
//                         key={i}
//                         variant="outline"
//                         className="w-full justify-start gap-2"
//                         asChild
//                       >
//                         <a
//                           href={resource.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           {resource.type === "video" ? (
//                             <Video className="w-4 h-4" />
//                           ) : resource.type === "article" ? (
//                             <BookOpen className="w-4 h-4" />
//                           ) : (
//                             <Code className="w-4 h-4" />
//                           )}
//                           <span className="truncate">{resource.title}</span>
//                         </a>
//                       </Button>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Main Content Container */}
//       <div
//         className={`min-h-screen transition-all duration-300 
//           ${leftSidebarOpen ? "pl-80" : "pl-0"}
//           ${rightSidebarOpen ? "pr-80" : "pr-0"}
//         `}
//       >
//         <div
//           className="container p-8 relative min-h-screen overflow-auto"
//           style={{ minWidth: "1200px", minHeight: "800px" }}
//         >
//           {/* SVG container for connection lines */}
//           <svg
//             className="absolute inset-0 pointer-events-none"
//             style={{ minWidth: "1200px", minHeight: "800px" }}
//           >
//             <defs>
//               <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                 <stop offset="0%" stopColor="#3B82F6" />
//                 <stop offset="100%" stopColor="#8B5CF6" />
//               </linearGradient>
//             </defs>
//             {renderConnections()}
//           </svg>

//           {/* Render each roadmap card based on computed positions */}
//           <div
//             className="relative"
//             style={{ minWidth: "1200px", minHeight: "800px" }}
//           >
//             {positionedNodes.map((node) => (
//               <Dialog key={node.id}>
//                 <DialogTrigger
//                   asChild
//                   onClick={() => {
//                     setSelectedNode(node.id);
//                     checkAndUnlockAchievements(node.id);
//                   }}
//                 >
//                   <motion.div
//                     className="absolute"
//                     style={{
//                       left: node.computedX,
//                       top: node.computedY,
//                     }}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <Card
//                       className={`w-[300px] transition-all duration-300
//                       ${node.status === "locked" ? "opacity-50" : ""}
//                       ${selectedNode === node.id ? "ring-2 ring-blue-500 shadow-lg" : ""}
//                       hover:shadow-xl bg-card/95 backdrop-blur-sm
//                     `}
//                     >
//                       <CardContent className="p-4">
//                         <div className="flex items-center gap-3">
//                           <div
//                             className={`p-2 rounded-full ${node.status === "completed"
//                               ? "bg-green-100 text-green-600"
//                               : node.status === "in-progress"
//                                 ? "bg-blue-100 text-blue-600"
//                                 : "bg-gray-100 text-gray-600"
//                               }`}
//                           >
//                             <motion.div
//                               animate={
//                                 node.status === "in-progress"
//                                   ? {
//                                     scale: [1, 1.2, 1],
//                                     opacity: [1, 0.8, 1],
//                                   }
//                                   : {}
//                               }
//                               transition={{
//                                 duration: 2,
//                                 repeat: Infinity,
//                                 ease: "easeInOut",
//                               }}
//                             >
//                               {node.status === "completed" ? (
//                                 <CheckCircle className="w-5 h-5" />
//                               ) : node.status === "in-progress" ? (
//                                 <Video className="w-5 h-5" />
//                               ) : (
//                                 <Lock className="w-5 h-5" />
//                               )}
//                             </motion.div>
//                           </div>
//                           <div>
//                             <h3 className="font-semibold">{node.title}</h3>
//                             <p className="text-sm text-muted-foreground">
//                               {node.category}
//                             </p>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 </DialogTrigger>

//                 <DialogContent className="max-w-2xl">
//                   <DialogHeader>
//                     <DialogTitle>{node.title}</DialogTitle>
//                     <DialogDescription>{node.description}</DialogDescription>
//                   </DialogHeader>

//                   <div className="mt-4 space-y-4">
//                     <div className="flex flex-wrap gap-2">
//                       {node.skills.map((skill) => (
//                         <Badge key={skill} variant="secondary">
//                           {skill}
//                         </Badge>
//                       ))}
//                     </div>

//                     <div className="grid gap-2">
//                       {node.resources.map((resource, i) => (
//                         <Button
//                           key={i}
//                           variant="outline"
//                           className="justify-start gap-2"
//                           asChild
//                         >
//                           <a
//                             href={resource.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             {resource.type === "video" ? (
//                               <Video className="w-4 h-4" />
//                             ) : resource.type === "article" ? (
//                               <BookOpen className="w-4 h-4" />
//                             ) : (
//                               <Code className="w-4 h-4" />
//                             )}
//                             <div className="flex-1 text-left">
//                               <div>{resource.title}</div>
//                               <div className="text-xs text-muted-foreground">
//                                 {resource.duration &&
//                                   `Duration: ${resource.duration} • `}
//                                 Difficulty: {resource.difficulty}
//                               </div>
//                             </div>
//                           </a>
//                         </Button>
//                       ))}
//                     </div>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// interface Achievement {
//   id: string;
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   unlocked: boolean;
// }

// export default RoadmapComponent;

// "use client";
// import React, { useState, useCallback } from "react";
// import { motion } from "framer-motion";
// import {
//   CheckCircle,
//   Lock,
//   Star,
//   Trophy,
//   Zap,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { AchievementBadge } from "./AchievementBadge";
// import ProgressTracker from "./ProgressTracker";
// import ResourcePanel from "./ResourcePanel";
// import Timeline from "./Timeline";

// export type RoadmapNode = {
//   id: string;
//   title: string;
//   description: string;
//   status: "completed" | "in-progress" | "locked";
//   category: "fundamentals" | "advanced" | "specialization";
//   skills: string[];
//   resources: {
//     type: "video" | "article" | "project";
//     title: string;
//     url: string;
//     duration?: string;
//     difficulty?: "beginner" | "intermediate" | "advanced";
//   }[];
//   deadline?: Date;
//   prerequisites: string[];
//   nextSteps: string[];
//   companyRelevance: string[];
// };

// // Sample data (same as before)
// const sampleData: RoadmapNode[] = [
//   {
//     id: "1",
//     title: "Frontend Fundamentals",
//     description: "Master the core concepts of web development",
//     status: "completed",
//     category: "fundamentals",
//     skills: ["HTML5", "CSS3", "JavaScript ES6+"],
//     resources: [
//       {
//         type: "video",
//         title: "Web Dev Crash Course",
//         url: "https://example.com/web-dev",
//         duration: "2.5 hours",
//         difficulty: "beginner",
//       },
//     ],
//     prerequisites: [],
//     nextSteps: ["2"],
//     companyRelevance: ["Google", "Meta"],
//   },
//   {
//     id: "2",
//     title: "React Fundamentals",
//     description: "Learn React core concepts",
//     status: "in-progress",
//     category: "fundamentals",
//     skills: ["React", "JSX", "Hooks"],
//     resources: [
//       {
//         type: "video",
//         title: "React Basics",
//         url: "https://example.com/react",
//         duration: "4 hours",
//         difficulty: "intermediate",
//       },
//     ],
//     prerequisites: ["1"],
//     nextSteps: ["3"],
//     companyRelevance: ["Meta", "Netflix"],
//   },
//   {
//     id: "3",
//     title: "TypeScript Basics",
//     description: "Learn TypeScript fundamentals",
//     status: "locked",
//     category: "fundamentals",
//     skills: ["TypeScript", "Types", "Interfaces"],
//     resources: [
//       {
//         type: "article",
//         title: "TypeScript Guide",
//         url: "https://example.com/typescript",
//         difficulty: "intermediate",
//       },
//     ],
//     prerequisites: ["2"],
//     nextSteps: [],
//     companyRelevance: ["Microsoft", "Google"],
//   },
// ];

// const RoadmapComponent: React.FC = () => {
//   const [selectedNode, setSelectedNode] = useState<string | null>(null);
//   const [achievements, setAchievements] = useState([
//     {
//       id: "first-step",
//       title: "First Step",
//       description: "Complete your first learning milestone",
//       icon: <Star className="w-5 h-5" />,
//       unlocked: false,
//     },
//     {
//       id: "fast-learner",
//       title: "Fast Learner",
//       description: "Complete 3 milestones in a week",
//       icon: <Zap className="w-5 h-5" />,
//       unlocked: false,
//     },
//     {
//       id: "master",
//       title: "Master",
//       description: "Complete an entire learning path",
//       icon: <Trophy className="w-5 h-5" />,
//       unlocked: false,
//     },
//   ]);
//   const [newAchievement, setNewAchievement] = useState<string | null>(null);

//   const checkAndUnlockAchievements = useCallback(
//     (nodeId: string) => {
//       const completedNodes = sampleData.filter(
//         (node) => node.status === "completed" || node.id === nodeId
//       );
//       setAchievements((prev) =>
//         prev.map((achievement) => {
//           if (achievement.unlocked) return achievement;

//           let shouldUnlock = false;
//           switch (achievement.id) {
//             case "first-step":
//               shouldUnlock = completedNodes.length === 1;
//               break;
//             case "fast-learner":
//               shouldUnlock = completedNodes.length >= 3;
//               break;
//             case "master":
//               shouldUnlock = completedNodes.length === sampleData.length;
//               break;
//           }

//           if (shouldUnlock) {
//             setNewAchievement(achievement.id);
//             return { ...achievement, unlocked: true };
//           }
//           return achievement;
//         })
//       );
//     },
//     []
//   );

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-background text-foreground">
//       {/* Left Sidebar */}
//       <aside className="lg:w-1/4 w-full p-4 space-y-4 bg-card backdrop-blur-sm">
//         <ProgressTracker nodes={sampleData} />

//         <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
//           {achievements.map((achievement) => (
//             <AchievementBadge
//               key={achievement.id}
//               title={achievement.title}
//               description={achievement.description}
//               icon={achievement.icon}
//               isNew={newAchievement === achievement.id}
//               onAnimationComplete={() => setNewAchievement(null)}
//             />
//           ))}
//         </div>
//       </aside>

//       {/* Main Content (Grid Layout + Timeline + Connections) */}
//       <main className="flex-1 p-4 overflow-auto relative">
//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative"
//           initial="hidden"
//           animate="visible"
//           variants={{
//             hidden: {},
//             visible: {
//               transition: {
//                 staggerChildren: 0.2,
//               },
//             },
//           }}
//         >
//           {sampleData.map((node) => (
//             <motion.div
//               key={node.id}
//               variants={{
//                 hidden: { opacity: 0, y: 30 },
//                 visible: { opacity: 1, y: 0 },
//               }}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => {
//                 setSelectedNode(node.id);
//                 checkAndUnlockAchievements(node.id);
//               }}
//               className={`cursor-pointer relative border rounded-xl p-4 transition-all
//                 ${selectedNode === node.id
//                   ? "ring-2 ring-blue-500 shadow-lg"
//                   : "hover:shadow-md"
//                 }
//                 ${node.status === "locked" ? "opacity-50" : ""}
//                 bg-card backdrop-blur-sm`}
//             >
//               <div className="flex items-center gap-3 mb-3">
//                 <div
//                   className={`p-2 rounded-full ${node.status === "completed"
//                       ? "bg-green-100 text-green-600"
//                       : node.status === "in-progress"
//                         ? "bg-blue-100 text-blue-600"
//                         : "bg-gray-100 text-gray-600"
//                     }`}
//                 >
//                   {node.status === "completed" ? (
//                     <CheckCircle className="w-5 h-5" />
//                   ) : node.status === "in-progress" ? (
//                     <Zap className="w-5 h-5" />
//                   ) : (
//                     <Lock className="w-5 h-5" />
//                   )}
//                 </div>
//                 <div>
//                   <h3 className="font-semibold">{node.title}</h3>
//                   <p className="text-sm text-muted-foreground">{node.category}</p>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-2 mb-2">
//                 {node.skills.map((skill) => (
//                   <div
//                     key={skill}
//                     className="text-xs bg-muted rounded-full px-2 py-1"
//                   >
//                     {skill}
//                   </div>
//                 ))}
//               </div>
//               <p className="text-sm">{node.description}</p>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Optional SVG Connections (if required) */}
//         {/* I can add connecting arrows between cards if you confirm */}
//       </main>

//       {/* Right Sidebar */}
//       <aside className="lg:w-1/4 w-full p-4 space-y-4 bg-card backdrop-blur-sm">
//         <ResourcePanel nodes={sampleData} selectedNode={selectedNode} />
//       </aside>
//     </div>
//   );
// };

// export default RoadmapComponent;

// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { motion } from "framer-motion";
// import {
//   CheckCircle,
//   Lock,
//   Zap,
//   // Star,
//   // Trophy,
//   Calendar as CalendarIcon,
//   MenuIcon,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// // import { Badge } from "@/components/ui/badge";
// // import { Card, CardContent } from "@/components/ui/card";

// import ResourcePanel from "./ResourcePanel";
// import ProgressTracker from "./ProgressTracker";
// // import { AchievementBadge } from "./AchievementBadge";

// export type RoadmapNode = {
//   id: string;
//   title: string;
//   description: string;
//   status: "completed" | "in-progress" | "locked";
//   category: "fundamentals" | "advanced" | "specialization";
//   skills: string[];
//   resources: {
//     type: "video" | "article" | "project";
//     title: string;
//     url: string;
//     duration?: string;
//     difficulty?: "beginner" | "intermediate" | "advanced";
//   }[];
//   deadline?: Date;
//   prerequisites: string[];
//   nextSteps: string[];
//   companyRelevance: string[];
// };

// // Sample roadmap nodes
// const sampleData: RoadmapNode[] = [
//   {
//     id: "1",
//     title: "HTML & CSS",
//     description: "Start here with basic web design",
//     status: "completed",
//     category: "fundamentals",
//     skills: ["HTML", "CSS"],
//     resources: [],
//     prerequisites: [],
//     nextSteps: ["2"],
//     companyRelevance: ["Google", "Microsoft"],
//   },
//   {
//     id: "2",
//     title: "JavaScript",
//     description: "Make your website interactive",
//     status: "in-progress",
//     category: "fundamentals",
//     skills: ["JavaScript"],
//     resources: [],
//     prerequisites: ["1"],
//     nextSteps: ["3"],
//     companyRelevance: ["Google", "Meta"],
//   },
//   {
//     id: "3",
//     title: "React",
//     description: "Build UI with components",
//     status: "locked",
//     category: "advanced",
//     skills: ["React", "JSX"],
//     resources: [],
//     prerequisites: ["2"],
//     nextSteps: [],
//     companyRelevance: ["Meta"],
//   },
// ];

// const RoadmapComponent: React.FC = () => {
//   const [selectedNode, setSelectedNode] = useState<string | null>(null);
//   const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
//   const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
//   const [hasMounted, setHasMounted] = useState(false); // Ensures client-side rendering

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   const renderConnections = useCallback(() => {
//     if (!hasMounted) return null; // Ensure rendering only on client

//     const nodePositions: Record<string, HTMLElement | null> = {};
//     sampleData.forEach((node) => {
//       nodePositions[node.id] = document.getElementById(`node-${node.id}`);
//     });

//     return sampleData.flatMap((node) => {
//       return node.nextSteps.map((nextId) => {
//         const fromEl = nodePositions[node.id];
//         const toEl = nodePositions[nextId];
//         if (!fromEl || !toEl) return null;

//         const fromRect = fromEl.getBoundingClientRect();
//         const toRect = toEl.getBoundingClientRect();

//         const startX = fromRect.left + fromRect.width / 2;
//         const startY = fromRect.top + fromRect.height / 2;
//         const endX = toRect.left + toRect.width / 2;
//         const endY = toRect.top + toRect.height / 2;

//         return (
//           <motion.line
//             key={`${node.id}-${nextId}`}
//             x1={startX}
//             y1={startY}
//             x2={endX}
//             y2={endY}
//             stroke="#3B82F6"
//             strokeWidth={2}
//             initial={{ pathLength: 0 }}
//             animate={{ pathLength: 1 }}
//             transition={{ duration: 1 }}
//           />
//         );
//       });
//     });
//   }, [hasMounted]);

//   return (
//     <div className="relative flex min-h-screen bg-background text-foreground">
//       {/* Left Sidebar */}
//       <div className="flex flex-col gap-4">
//         {/* Toggle Button */}
//         <div className="flex justify-start p-4">
//           <Button
//             variant="outline"
//             onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
//           >
//             <MenuIcon className="w-4 h-4" />
//           </Button>
//         </div>

//         {/* Sidebar */}
//         <motion.aside
//           className={`fixed top-0 left-0 h-full bg-card w-72 p-4 z-30 overflow-y-auto transition-transform duration-300 ease-in-out mt-16
//       ${leftSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
//         >
//           <ProgressTracker nodes={sampleData} />
//         </motion.aside>
//       </div>


//       {/* Right Sidebar */}
//       <div className="flex flex-col gap-4">

//         {/* Toggle Button aligned to the right */}
//         <div className="flex justify-start p-4">
//           <Button
//             variant="outline"
//             onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
//           >
//             <CalendarIcon className="w-4 h-4" />
//           </Button>
//         </div>

//         {/* Sidebar slides from the right */}
//         <motion.aside
//           className={`fixed top-0 right-0 h-full bg-card w-72 p-4 z-30 overflow-y-auto transition-transform duration-300 ease-in-out mt-16
//       ${rightSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
//         >
//           <Calendar
//             mode="single"
//             selected={selectedDate}
//             onSelect={setSelectedDate}
//           />

//           <div className="mt-4">
//             <ResourcePanel nodes={sampleData} selectedNode={selectedNode} />
//           </div>
//         </motion.aside>
//       </div>

//       {/* Main Roadmap */}
//       <main className={`flex-1 p-4 transition-all duration-300 ${leftSidebarOpen ? "ml-72" : ""} ${rightSidebarOpen ? "mr-72" : ""}`}>
//         <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 z-10">
//           {sampleData.map((node) => (
//             <motion.div
//               key={node.id}
//               id={`node-${node.id}`}
//               className={`relative border rounded-xl p-4 transition-all bg-card cursor-pointer
//                 ${selectedNode === node.id ? "ring-2 ring-blue-500 shadow-lg" : ""}`}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               onClick={() => setSelectedNode(node.id)}
//             >
//               <div className="flex items-center gap-3 mb-2">
//                 <div className={`p-2 rounded-full ${node.status === "completed" ? "bg-green-200" : node.status === "in-progress" ? "bg-blue-200" : "bg-gray-200"}`}>
//                   {node.status === "completed" ? <CheckCircle /> : node.status === "in-progress" ? <Zap /> : <Lock />}
//                 </div>
//                 <div>
//                   <h3 className="font-semibold">{node.title}</h3>
//                   <p className="text-sm">{node.category}</p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* SVG for connections */}
//         <svg className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
//           {hasMounted && renderConnections()}
//         </svg>
//       </main>
//     </div>
//   );
// };

// export default RoadmapComponent;

"use client"
import type React from "react"
import { useState, useEffect, useRef, JSX } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import {
  CheckCircle,
  Lock,
  Zap,
  CalendarIcon,
  Menu,
  BookOpen,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import ResourcePanel from "./ResourcePanel"
import ProgressTracker from "./ProgressTracker"
import Timeline from "./Timeline"

export type RoadmapNode = {
  id: string
  title: string
  description: string
  status: "completed" | "in-progress" | "locked"
  category: "fundamentals" | "advanced" | "specialization"
  skills: string[]
  resources: {
    type: "video" | "article" | "project"
    title: string
    url: string
    duration?: string
    difficulty?: "beginner" | "intermediate" | "advanced"
  }[]
  deadline?: Date
  prerequisites: string[]
  nextSteps: string[]
  companyRelevance: string[]
}

// Sample roadmap nodes with more detailed data
const sampleData: RoadmapNode[] = [
  {
    id: "1",
    title: "HTML & CSS Fundamentals",
    description: "Learn the building blocks of web design and styling",
    status: "completed",
    category: "fundamentals",
    skills: ["HTML5", "CSS3", "Responsive Design"],
    resources: [
      {
        type: "video",
        title: "HTML & CSS Crash Course",
        url: "https://example.com/html-css",
        duration: "2h 15m",
        difficulty: "beginner",
      },
      {
        type: "article",
        title: "CSS Grid Layout Guide",
        url: "https://example.com/css-grid",
        difficulty: "beginner",
      },
      {
        type: "project",
        title: "Build a Portfolio Website",
        url: "https://example.com/portfolio-project",
        difficulty: "beginner",
      },
    ],
    prerequisites: [],
    nextSteps: ["2"],
    companyRelevance: ["Google", "Microsoft", "Meta"],
  },
  {
    id: "2",
    title: "JavaScript Essentials",
    description: "Master the language that powers interactive web experiences",
    status: "in-progress",
    category: "fundamentals",
    skills: ["JavaScript", "ES6+", "DOM Manipulation"],
    resources: [
      {
        type: "video",
        title: "JavaScript Fundamentals",
        url: "https://example.com/js-fundamentals",
        duration: "3h 45m",
        difficulty: "beginner",
      },
      {
        type: "article",
        title: "Understanding Async/Await",
        url: "https://example.com/async-await",
        difficulty: "intermediate",
      },
      {
        type: "project",
        title: "Build an Interactive Quiz App",
        url: "https://example.com/quiz-app",
        difficulty: "intermediate",
      },
    ],
    prerequisites: ["1"],
    nextSteps: ["3", "4"],
    companyRelevance: ["Google", "Meta", "Amazon"],
  },
  {
    id: "3",
    title: "React Fundamentals",
    description: "Build powerful user interfaces with components",
    status: "locked",
    category: "advanced",
    skills: ["React", "JSX", "Hooks", "State Management"],
    resources: [
      {
        type: "video",
        title: "React for Beginners",
        url: "https://example.com/react-beginners",
        duration: "4h 30m",
        difficulty: "intermediate",
      },
      {
        type: "article",
        title: "Understanding React Hooks",
        url: "https://example.com/react-hooks",
        difficulty: "intermediate",
      },
      {
        type: "project",
        title: "Build a Todo App with React",
        url: "https://example.com/react-todo",
        difficulty: "intermediate",
      },
    ],
    prerequisites: ["2"],
    nextSteps: ["5"],
    companyRelevance: ["Meta", "Netflix", "Airbnb"],
  },
  {
    id: "4",
    title: "Node.js Backend",
    description: "Create server-side applications with JavaScript",
    status: "locked",
    category: "advanced",
    skills: ["Node.js", "Express", "REST APIs"],
    resources: [
      {
        type: "video",
        title: "Node.js Crash Course",
        url: "https://example.com/nodejs-crash",
        duration: "3h 15m",
        difficulty: "intermediate",
      },
      {
        type: "article",
        title: "Building RESTful APIs with Express",
        url: "https://example.com/express-rest",
        difficulty: "intermediate",
      },
      {
        type: "project",
        title: "Create a Blog API",
        url: "https://example.com/blog-api",
        difficulty: "advanced",
      },
    ],
    prerequisites: ["2"],
    nextSteps: ["5"],
    companyRelevance: ["Shopify", "PayPal", "LinkedIn"],
  },
  {
    id: "5",
    title: "Full Stack Development",
    description: "Combine frontend and backend skills for complete applications",
    status: "locked",
    category: "specialization",
    skills: ["MERN Stack", "Authentication", "Deployment"],
    resources: [
      {
        type: "video",
        title: "Full Stack MERN Application",
        url: "https://example.com/mern-stack",
        duration: "6h 45m",
        difficulty: "advanced",
      },
      {
        type: "article",
        title: "Authentication with JWT",
        url: "https://example.com/jwt-auth",
        difficulty: "advanced",
      },
      {
        type: "project",
        title: "Build an E-commerce Platform",
        url: "https://example.com/ecommerce",
        difficulty: "advanced",
      },
    ],
    prerequisites: ["3", "4"],
    nextSteps: [],
    companyRelevance: ["Amazon", "Shopify", "Stripe"],
  },
]

const RoadmapComponent: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [hasMounted, setHasMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  const mainRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  // Mouse spring animation for smoother cursor effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  // const springConfig = { damping: 25, stiffness: 300 }
  // const smoothMouseX = useSpring(mouseX, springConfig)
  // const smoothMouseY = useSpring(mouseY, springConfig)

  // Handle mouse move for gradient effects
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    mouseX.set(clientX)
    mouseY.set(clientY)
    setMousePosition({ x: clientX, y: clientY })
  }

  // Update window size for responsive calculations
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    if (typeof window !== "undefined") {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      window.addEventListener("resize", handleResize)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  // Client-side rendering check
  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Calculate sidebar widths based on screen size
  const sidebarWidth = windowSize.width < 768 ? "100%" : "320px"

  // Calculate main content width based on sidebar states
  const getMainContentWidth = () => {
    if (windowSize.width < 768) return "100%"

    let width = windowSize.width
    if (leftSidebarOpen) width -= 320
    if (rightSidebarOpen) width -= 320
    return `${width}px`
  }

  // Calculate connections between nodes for the SVG lines
  const renderConnections = () => {
    if (!hasMounted || !mainRef.current || !svgRef.current) return null

    const mainRect = mainRef.current.getBoundingClientRect()
    const connections: JSX.Element[] = []

    sampleData.forEach((node) => {
      const fromEl = document.getElementById(`node-${node.id}`)
      if (!fromEl) return

      node.nextSteps.forEach((nextId) => {
        const toEl = document.getElementById(`node-${nextId}`)
        if (!toEl) return

        const fromRect = fromEl.getBoundingClientRect()
        const toRect = toEl.getBoundingClientRect()

        // Calculate positions relative to the SVG
        const startX = fromRect.left + fromRect.width / 2 - mainRect.left
        const startY = fromRect.top + fromRect.height / 2 - mainRect.top
        const endX = toRect.left + toRect.width / 2 - mainRect.left
        const endY = toRect.top + toRect.height / 2 - mainRect.top

        // Create a curved path
        const midX = (startX + endX) / 2
        const midY = (startY + endY) / 2 - 30 // Curve upward
        const path = `M${startX},${startY} Q${midX},${midY} ${endX},${endY}`

        connections.push(
          <motion.path
            key={`${node.id}-${nextId}`}
            d={path}
            stroke="url(#gradient)"
            strokeWidth={3}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />,
        )
      })
    })

    return connections
  }

  // Get status icon for nodes
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in-progress":
        return <Zap className="w-5 h-5 text-blue-500" />
      case "locked":
        return <Lock className="w-5 h-5 text-gray-400" />
    }
  }

  // Get status color for card styling
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "from-green-500/20 to-green-500/5"
      case "in-progress":
        return "from-blue-500/20 to-blue-500/5"
      case "locked":
        return "from-gray-500/20 to-gray-500/5"
    }
  }

  if (!hasMounted) {
    return null // Prevent SSR issues
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Background gradient effect */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-background to-background/80 z-0"
        style={{
          backgroundPosition: `${(mousePosition.x / windowSize.width) * 100}% ${(mousePosition.y / windowSize.height) * 100}%`,
        }}
      />

      {/* Animated background shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            top: "20%",
            left: "10%",
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            top: "50%",
            right: "10%",
          }}
        />
      </div>

      {/* Left Sidebar */}
      <motion.aside
        className={cn(
          "fixed top-0 left-0 h-full z-40 bg-card/80 backdrop-blur-md border-r border-border/50 shadow-lg transition-all duration-300 ease-in-out",
          leftSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
        style={{ width: sidebarWidth }}
        initial={false}
        animate={{
          x: leftSidebarOpen ? 0 : "-100%",
          boxShadow: leftSidebarOpen ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "none",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-between items-center p-4 border-b border-border/50">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Learning Path
          </h2>
          <Button variant="ghost" size="icon" onClick={() => setLeftSidebarOpen(false)} className="md:hidden">
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
          <ProgressTracker nodes={sampleData} />
          <div className="mt-6">
            <Timeline nodes={sampleData} selectedNode={selectedNode} onNodeSelect={setSelectedNode} />
          </div>
        </div>
      </motion.aside>

      {/* Right Sidebar */}
      <motion.aside
        className={cn(
          "fixed top-0 right-0 h-full z-40 bg-card/80 backdrop-blur-md border-l border-border/50 shadow-lg transition-all duration-300 ease-in-out",
          rightSidebarOpen ? "translate-x-0" : "translate-x-full",
        )}
        style={{ width: sidebarWidth }}
        initial={false}
        animate={{
          x: rightSidebarOpen ? 0 : "100%",
          boxShadow: rightSidebarOpen ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "none",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-between items-center p-4 border-b border-border/50">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Resources
          </h2>
          <Button variant="ghost" size="icon" onClick={() => setRightSidebarOpen(false)} className="md:hidden">
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border shadow-sm"
          />
          <div className="mt-6">
            <ResourcePanel nodes={sampleData} selectedNode={selectedNode} />
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        ref={mainRef}
        className={cn(
          "relative min-h-screen transition-all duration-300 ease-in-out pt-16",
          leftSidebarOpen ? "md:ml-[320px]" : "",
          rightSidebarOpen ? "md:mr-[320px]" : "",
        )}
        style={{
          width: getMainContentWidth(),
          marginLeft: leftSidebarOpen && windowSize.width >= 768 ? "320px" : "0",
          marginRight: rightSidebarOpen && windowSize.width >= 768 ? "320px" : "0",
        }}
      >
        {/* Top Navigation Bar */}
        <div className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border/50 z-30 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
              className="relative"
            >
              {leftSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span className="sr-only">Toggle left sidebar</span>
              <motion.span
                className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 bg-primary rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: leftSidebarOpen ? 1 : 0, scale: leftSidebarOpen ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ translateX: "-50%" }}
              />
            </Button>
            <h1 className="text-xl font-bold hidden md:block">Learning Roadmap</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              className="relative"
            >
              {rightSidebarOpen ? <ChevronRight className="w-5 h-5" /> : <CalendarIcon className="w-5 h-5" />}
              <span className="sr-only">Toggle right sidebar</span>
              <motion.span
                className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 bg-primary rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: rightSidebarOpen ? 1 : 0, scale: rightSidebarOpen ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ translateX: "-50%" }}
              />
            </Button>
          </div>
        </div>

        {/* Roadmap Content */}
        <div className="p-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
            {sampleData.map((node) => (
              <motion.div
                key={node.id}
                id={`node-${node.id}`}
                className={cn("relative overflow-hidden", node.status === "locked" ? "opacity-70" : "")}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card
                  className={cn(
                    "h-full border border-border/50 shadow-sm transition-all duration-300",
                    selectedNode === node.id ? "ring-2 ring-primary shadow-lg" : "",
                    "hover:shadow-md cursor-pointer",
                  )}
                  onClick={() => setSelectedNode(node.id)}
                >
                  <CardContent className="p-6">
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30", getStatusColor(node.status))} />

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={cn(
                            "p-2 rounded-full",
                            node.status === "completed"
                              ? "bg-green-100 dark:bg-green-900/30"
                              : node.status === "in-progress"
                                ? "bg-blue-100 dark:bg-blue-900/30"
                                : "bg-gray-100 dark:bg-gray-800/50",
                          )}
                        >
                          {getStatusIcon(node.status)}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{node.title}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{node.category}</p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">{node.description}</p>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {node.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className={cn(
                              "bg-background/50 hover:bg-background/80",
                              node.status === "in-progress" && "animate-pulse",
                            )}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {selectedNode === node.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-border/50"
                        >
                          <h4 className="text-sm font-medium mb-2">Related Companies</h4>
                          <div className="flex flex-wrap gap-2">
                            {node.companyRelevance.map((company) => (
                              <Badge key={company} variant="outline">
                                {company}
                              </Badge>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* SVG for connections */}
          <svg
            ref={svgRef}
            className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {renderConnections()}
          </svg>
        </div>
      </main>

      {/* Mobile Navigation Buttons (Fixed at Bottom) */}
      <div className="md:hidden fixed bottom-4 left-0 right-0 flex justify-center gap-4 z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="rounded-full shadow-lg"
                onClick={() => setLeftSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Learning Path</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="rounded-full shadow-lg"
                onClick={() => setRightSidebarOpen(true)}
              >
                <CalendarIcon className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Resources</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

export default RoadmapComponent

