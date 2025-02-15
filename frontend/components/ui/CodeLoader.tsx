"use client";

import React, { useEffect, useState } from "react";
import { Code2 } from "lucide-react";

export const CodeLoader = () => {
    const [text, setText] = useState("");
    const codeSnippet = "> const future = await student.getDreamJob();";

    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= codeSnippet.length) {
                setText(codeSnippet.slice(0, currentIndex));
                currentIndex++;
            } else {
                currentIndex = 0;
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <div className="relative">
                <div className="mb-6 animate-bounce">
                    <Code2 className="w-12 h-12 text-primary" />
                </div>
                <div className="bg-card p-6 rounded-lg shadow-xl max-w-md w-full border border-border">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-destructive"></div>
                        <div className="w-3 h-3 rounded-full bg-chart-4"></div>
                        <div className="w-3 h-3 rounded-full bg-chart-1"></div>
                    </div>
                    <div className="font-mono text-primary">
                        {text}
                        <span className="inline-block w-2 h-5 ml-1 bg-primary animate-pulse"></span>
                    </div>
                </div>
            </div>
            <p className="mt-6 text-lg font-medium text-muted-foreground">
                Loading your path to success...
            </p>
        </div>
    );
};
