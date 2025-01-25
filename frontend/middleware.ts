import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function middleware(req: Request) {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'], // Protect dashboard and other private pages
};
