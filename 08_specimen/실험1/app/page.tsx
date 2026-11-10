import { Suspense } from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

// 1. 알맹이 (동적 구역): 쿠키를 읽고 화면을 그리는 부분을 별도 컴포넌트로 분리
async function AuthStatus() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;

  async function login() {
    'use server';
    const cookieStore = await cookies();
    cookieStore.set('session_token', '우경대장_토큰', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });
    redirect('/');
  }

  async function logout() {
    'use server';
    const cookieStore = await cookies();
    cookieStore.delete('session_token');
    redirect('/');
  }

  return (
    <>
      <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc' }}>
        <h2>현재 상태: {token ? '🟢 로그인 됨' : '🔴 비로그인 상태 (Token 없음)'}</h2>
        {token && <p style={{ color: 'green' }}>발급된 토큰 값: {token}</p>}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        {!token ? (
          <form action={login}>
            <button type="submit" style={{ padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>
              임시 로그인 (HttpOnly 쿠키 굽기)
            </button>
          </form>
        ) : (
          <form action={logout}>
            <button type="submit" style={{ padding: '10px 20px', background: '#ff4081', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>
              로그아웃 (쿠키 삭제)
            </button>
          </form>
        )}
      </div>
    </>
  );
}

// 2. 뼈대 (정적 구역): 껍데기는 정적으로 굽고, 동적 데이터 구역은 Suspense로 감싸기
export default function IndexPage() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>우경이형의 8주차 Next.js 실험실 🧪</h1>
      <p>이곳은 Root Index (/) 페이지입니다.</p>

      {/* 여기가 핵심! 서버 렌더링(Prerendering)을 막지 않고 비동기 쿠키 파싱을 기다려줌 */}
      <Suspense fallback={<p style={{ color: 'gray' }}>인증 상태 확인 중... ⏳</p>}>
        <AuthStatus />
      </Suspense>

      <hr />

      <div style={{ marginTop: '30px' }}>
        <h3>🛡️ 미들웨어(Middleware) 테스트 링크</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li>
            <Link href="/admin" style={{ color: '#0070f3', fontWeight: 'bold', textDecoration: 'underline' }}>
              관리자 대시보드 (/admin) 진입해보기
            </Link>
            <br/>
            <small style={{ color: '#666' }}>
              * 비로그인 상태로 클릭하면 middleware.ts가 멱살 잡고 튕겨냅니다.<br/>
              * 로그인(쿠키 굽기) 후 클릭하면 무사 통과합니다.
            </small>
          </li>
        </ul>
      </div>
    </div>
  );
}