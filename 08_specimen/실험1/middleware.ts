import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 쿠키에서 세션 토큰 확인 (PHP의 $_SESSION 체크와 유사)
  const sessionToken = request.cookies.get('session_token')?.value;

  // /admin 으로 시작하는 경로에 접근하는데 토큰이 없다면
  if (request.nextUrl.pathname.startsWith('/admin') && !sessionToken) {
    // 얄짤없이 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};