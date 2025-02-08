// import { createServerClient, type CookieOptions } from "@supabase/ssr";
// import { NextResponse, type NextRequest } from "next/server";

// const protectedRoutes = ["/dashboard", "/settings"];
// const authRoutes = ["/login", "/signup"];
// const redirectAfterLogin = "/dashboard";

// export async function middleware(request: NextRequest) {
//     const response = NextResponse.next();
//     const requestUrl = new URL(request.url);

//     const supabase = createServerClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL!,
//         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//         {
//             cookies: {
//                 get: (name: string) => request.cookies.get(name)?.value,
//                 set: (name: string, value: string, options: CookieOptions) => {
//                     response.cookies.set({ name, value, ...options });
//                 },
//                 remove: (name: string, options: CookieOptions) => {
//                     response.cookies.set({ name, value: "", ...options });
//                 },
//             },
//         }
//     );

//     const { data: { session } } = await supabase.auth.getSession();
//     const isProtectedRoute = protectedRoutes.some(route => requestUrl.pathname.startsWith(route));
//     const isAuthRoute = authRoutes.some(route => requestUrl.pathname.startsWith(route));

//     if (!session && isProtectedRoute) {
//         // Redirect to login page if accessing a protected route without a session
//         const redirectUrl = new URL("/login", request.url);
//         redirectUrl.searchParams.set("redirectTo", requestUrl.pathname);
//         return NextResponse.redirect(redirectUrl);
//     }

//     if (session) {
//         if (isAuthRoute || requestUrl.pathname === "/") {
//             // Redirect logged-in users trying to access auth routes or homepage
//             return NextResponse.redirect(new URL(redirectAfterLogin, request.url));
//         }
//     }

//     return response;
// }

// export const config = {
//     matcher: [
//         "/((?!_next/static|_next/image|favicon.ico|public).*)",
//     ],
// };

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/settings"];
const authRoutes = ["/login", "/signup"];
const redirectAfterLogin = "/dashboard";

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const requestUrl = new URL(request.url);

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error("Missing Supabase environment variables");
    }

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get: (name: string) => request.cookies.get(name)?.value,
                set: (name: string, value: string, options: CookieOptions) => {
                    response.cookies.set({ name, value, ...options });
                },
                remove: (name: string, options: CookieOptions) => {
                    response.cookies.delete(name);
                },
            },
        }
    );

    const { data: { session } } = await supabase.auth.getSession();
    const isProtectedRoute = protectedRoutes.some(route => requestUrl.pathname.startsWith(route));
    const isAuthRoute = authRoutes.some(route => requestUrl.pathname.startsWith(route));

    if (!session && isProtectedRoute) {
        // Redirect to login page if accessing a protected route without a session
        const redirectUrl = new URL("/login", request.url);
        redirectUrl.searchParams.set("redirectTo", requestUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }

    if (session && isAuthRoute) {
        // Allow user to access login/signup if they are switching accounts
        if (request.nextUrl.searchParams.has("switch")) {
            return response;
        }
        // Otherwise, redirect to the dashboard
        return NextResponse.redirect(new URL(redirectAfterLogin, request.url));
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|public).*)",
    ],
};
