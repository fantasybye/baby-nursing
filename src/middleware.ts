import { NextRequest, NextResponse } from 'next/server'
 
export function middleware(request: NextRequest) {
  const authSession = request.cookies.get('gin-session')?.value;

  // if (authSession && !request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url))
  // }
  
  // if (!authSession) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }
}
 
export const config = {
  matcher: '/dashboard/:path*',
}