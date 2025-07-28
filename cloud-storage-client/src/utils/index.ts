import Cookies from 'js-cookie';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.get('isAuthenticated')?.value;

  const pathname = req.nextUrl.pathname;

  if (!isAuthenticated && pathname !== '/login' && pathname !== '/register') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*'], // adjust as needed
};

export const checkIfAuthenticated = () => {
  console.log(window.document.location.pathname);
  const isAuthenticated = ['/login', '/register'].includes(window.document.location.pathname)
    ? false
    : true;
  Cookies.set('isAuthenticated', JSON.stringify(isAuthenticated));
};
