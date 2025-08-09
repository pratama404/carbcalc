import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Ambil token dari request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Jika user mencoba mengakses '/dashboard' dan TIDAK punya token,
  // maka alihkan (redirect) ke halaman login.
  if (pathname.startsWith('/dashboard') && !token) {
    const loginUrl = new URL('/api/auth/signin', req.url);
    
    // Tambahkan parameter agar setelah login, user kembali ke halaman dashboard
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.href);

    return NextResponse.redirect(loginUrl);
  }

  // Jika punya token atau tidak mengakses dashboard, lanjutkan
  return NextResponse.next();
}

// Konfigurasi ini memastikan middleware hanya berjalan untuk route dashboard
export const config = {
  matcher: ['/dashboard/:path*'],
};