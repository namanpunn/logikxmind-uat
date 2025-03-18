"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MoveLeft, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-accent flex items-center justify-center p-4">
            <div className="max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Rocket className="w-24 h-24 mx-auto text-primary mb-8" />
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
                    <h2 className="text-3xl font-semibold text-primary mb-4">
                        Houston, we have a problem!
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        The page you&apos;re looking for has drifted off into space. Let&apos;s get you back to safety.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <Button
                        onClick={() => router.push("/")}
                        size="lg"
                        className="gap-2 bg-primary hover:bg-primary/90"
                    >
                        <MoveLeft className="w-4 h-4" />
                        Return Home
                    </Button>
                </motion.div>

                <motion.div
                    className="mt-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Error Details
                            </span>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                        The requested page could not be found. This might be because:
                        <br />
                        - The URL might be misspelled
                        <br />
                        - The page might have been moved or deleted
                        <br />
                        - You might not have permission to view this page
                    </p>
                </motion.div>
            </div>
        </div>
    );
}