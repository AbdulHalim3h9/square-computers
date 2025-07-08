import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Redirect old login route to new auth/login
  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  // Add other redirects as needed
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
