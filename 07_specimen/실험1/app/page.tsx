// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '40px', maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>7주차 코드 실험 목차</h2>
      <ul style={{ lineHeight: '2.2', fontSize: '18px' }}>
        <li>
          <Link href="/before" style={{ color: '#d9534f', textDecoration: 'none' }}>
            🔴 [Before] UI 파일에 DB & 액션이 엉킨 상태
          </Link>
        </li>
        <li>
          <Link href="/task" style={{ color: '#0275d8', textDecoration: 'none' }}>
            🔵 [After] DAL 분리 + Server Action CRUD + 검증
          </Link>
        </li>
      </ul>
    </main>
  );
}