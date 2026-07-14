import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  if (path.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('admin_session')?.value
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    try {
      await decrypt(sessionCookie)
      return NextResponse.next()
    } catch (e) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
