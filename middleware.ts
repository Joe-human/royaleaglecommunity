import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Izinkan halaman /suspended, static assets, dan API tetap bisa dibaca
  if (
    pathname.startsWith('/suspended') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Lempar paksakan SEMUA URL (termasuk /, /admin, dll) ke /suspended
  return NextResponse.redirect(new URL('/suspended', request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};