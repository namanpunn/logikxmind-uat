"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import type { SupabaseClient } from "@supabase/supabase-js"

type AuthContextType = {
    user: any | null
    signOut: () => Promise<void>
    supabase: SupabaseClient
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    signOut: async () => { },
    supabase: {} as SupabaseClient,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null)
    const router = useRouter()
    const [supabase] = useState(() =>
        createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!),
    )

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [supabase])

    const signOut = async () => {
        await supabase.auth.signOut()
        setUser(null)
        setTimeout(() => router.push("/login"), 100)
    }

    return <AuthContext.Provider value={{ user, signOut, supabase }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
