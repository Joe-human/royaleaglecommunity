import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Hanya memastikan route /admin bisa diakses dengan baik
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};