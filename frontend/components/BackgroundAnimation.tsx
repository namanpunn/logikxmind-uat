"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Crack {
    id: number
    x: number
    y: number
    rotation: number
    length: number
    color: string
}

export default function BackgroundAnimation() {
    const [cracks, setCracks] = useState<Crack[]>([])
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const containerRef = useRef<HTMLDivElement>(null)

    const crackCounter = useRef(0)

    const createCrack = useCallback((x: number, y: number): Crack => {
        const id = Date.now() + crackCounter.current++;
        const rotation = Math.random() * 360;
        const length = 100 + Math.random() * 200;
        const color = `hsl(${Math.random() * 60 + 200}, 100%, 70%)`;

        return {
            id,
            x,
            y,
            rotation,
            length,
            color,
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setMousePosition({ x, y });

                if (Math.random() < 0.2) {
                    setCracks((prev) => {
                        const newCrack = createCrack(x, y);
                        return [...prev, newCrack].slice(-20);
                    });
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [createCrack]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (containerRef.current) {
                const x = Math.random() * containerRef.current.offsetWidth;
                const y = Math.random() * containerRef.current.offsetHeight;
                setCracks((prev) => {
                    const newCrack = createCrack(x, y);
                    return [...prev, newCrack].slice(-20);
                });
            }
        }, 1500);

        return () => clearInterval(interval);
    }, [createCrack]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: 0 }}
        >
            <AnimatePresence>
                {cracks.map((crack) => (
                    <motion.div
                        key={crack.id}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            rotate: crack.rotation,
                        }}
                        animate={{
                            opacity: [0, 0.8, 0],
                            scale: 1,
                            rotate: crack.rotation + 45,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 2,
                            filter: "blur(20px)",
                        }}
                        transition={{
                            duration: 2,
                            ease: "easeOut",
                        }}
                        style={{
                            position: "absolute",
                            left: crack.x,
                            top: crack.y,
                            width: crack.length,
                            height: 3,
                            background: `linear-gradient(90deg, transparent, ${crack.color}, transparent)`,
                            transform: `translate(-50%, -50%)`,
                            boxShadow: `0 0 30px ${crack.color}`,
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Mouse follower effect */}
            <motion.div
                className="absolute pointer-events-none"
                style={{
                    x: mousePosition.x - 50,
                    y: mousePosition.y - 50,
                    width: 100,
                    height: 100,
                    background: "radial-gradient(circle, rgba(148, 163, 184, 0.15) 0%, transparent 70%)",
                }}
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                }}
            />
        </div>
    );
}
