// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function proxy(request: NextRequest) {
	 console.log('Proxy:', request.method, request.url)
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/', '/about', '/pricing', '/faq', '/blog', '/guides', '/terms', '/privacy'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // API routes that don't require auth
  const isPublicApiRoute = pathname.startsWith('/api/auth');

  if (isPublicRoute || isPublicApiRoute) {
    return NextResponse.next();
  }

  // Check for token in protected routes
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Check user type for route access
    if (pathname.startsWith('/parent-dashboard') && decoded.userType !== 'parent') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    if (pathname.startsWith('/student-dashboard') && decoded.userType !== 'student') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Add user info to headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.userId);
    requestHeaders.set('x-user-type', decoded.userType);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('Token verification failed:', error);
    
    // Clear invalid token
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('auth_token');
    
    return response;
  }
}

export const config = {
  matcher: [
    '/parent-dashboard/:path*',
    '/student-dashboard/:path*',
    '/api/:path*',
  ],
};