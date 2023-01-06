import { withClerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default withClerkMiddleware(() => NextResponse.next());

// Stop Middleware running on static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next|static|favicon.ico).*)',
  ],
};
