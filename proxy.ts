// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const adminToken = request.cookies.get('admin_token')?.value;
  const { pathname } = request.nextUrl;

  // Admin routes protection
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }
  
  if (pathname.startsWith('/admin-dashboard') || pathname.startsWith('/api/admin')) {
    if (!adminToken) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    try {
      const decoded = jwt.verify(adminToken, JWT_SECRET) as any;
      if (decoded.role !== 'admin') {
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
      
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-admin-id', decoded.userId);
      requestHeaders.set('x-admin-email', decoded.email);
      
      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    } catch (error) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  // Public routes
  const publicRoutes = ['/login', '/register', '/', '/about', '/pricing', '/faq', '/blog', '/guides', '/terms', '/privacy'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPublicApiRoute = pathname.startsWith('/api/auth');

  if (isPublicRoute || isPublicApiRoute) {
    return NextResponse.next();
  }

  // Parent/Student routes protection
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    if (pathname.startsWith('/parent-dashboard') && decoded.userType !== 'parent' && decoded.role !== 'parent') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    if (pathname.startsWith('/student-dashboard') && decoded.userType !== 'student' && decoded.role !== 'student') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.userId || decoded.sub);
    requestHeaders.set('x-user-type', decoded.userType || decoded.role);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (error) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('auth_token');
    return response;
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/admin-dashboard/:path*',
    '/parent-dashboard/:path*',
    '/student-dashboard/:path*',
    '/api/:path*',
  ],
};