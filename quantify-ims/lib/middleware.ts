// // middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function middleware(request: NextRequest) {
//   const accessToken = request.cookies.get('sb-access-token')?.value;
//   const { pathname } = request.nextUrl;

//   if (!accessToken && pathname.startsWith('/dashboard')) {
//     return NextResponse.redirect(new URL('/auth', request.url));
//   }

//   // // If logged in but trying to access auth pages
//   // if (accessToken && ['/login', '/auth/register'].includes(pathname)) {
//   //   return NextResponse.redirect(new URL('/dashboard', request.url));
//   // }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/dashboard/:path*', '/auth', '/auth/register'],
// };
