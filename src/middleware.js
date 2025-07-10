import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  
  // Redirect old login route to new auth/login
  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Performance headers
  response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  
  // Preconnect to external domains
  if (pathname === '/') {
    response.headers.set('Link', 
      '<https://fonts.gstatic.com>; rel=preconnect; crossorigin, ' +
      '<https://images.unsplash.com>; rel=preconnect; crossorigin'
    );
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot)$).*)',
  ],
};
