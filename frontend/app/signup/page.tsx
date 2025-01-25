"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Eye, EyeOff, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import Header from "@/components/header"

export default function Signup() {
    const [mounted, setMounted] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({})
    const router = useRouter()
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: { name?: string; email?: string; password?: string } = {}
        if (!name) newErrors.name = "Name is required"
        if (!email) newErrors.email = "Email is required"
        if (!password) newErrors.password = "Password is required"
        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            try {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name,
                        },
                    },
                })
                if (error) throw error
                router.push("/dashboard")
            } catch (error) {
                alert("Error signing up")
                console.error(error)
            }
        }
    }

    const handleGithubSignup = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "github",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            })
            if (error) throw error
        } catch (error) {
            alert("Error signing up with GitHub")
            console.error(error)
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
                <motion.div
                    className="w-full max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold mb-6 text-center">Sign Up for logikxmind</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            id="name"
                            type="text"
                            label="Full Name"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={errors.name}
                            required
                        />
                        <Input
                            id="email"
                            type="email"
                            label="Email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={errors.email}
                            required
                        />
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={errors.password}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        <Button type="submit" className="w-full">
                            Sign Up
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-muted-foreground">Or sign up with</p>
                        <div className="mt-2 flex justify-center space-x-4">
                            <Button variant="outline" size="icon" onClick={handleGithubSignup}>
                                <Github className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                    <p className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary hover:underline">
                            Log in
                        </Link>
                    </p>
                </motion.div>
            </main>

            <footer className="bg-muted py-6">
                <div className="container mx-auto px-4 text-center text-muted-foreground">
                    © 2025 logikxmind. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

