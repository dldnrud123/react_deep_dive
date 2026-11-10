import Link from 'next/link';

export default function NotFound() {
  // DB에 조회했는데 데이터가 비어있어서 notFound()를 호출했을 때 노출됨
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>요청하신 데이터를 찾을 수 없습니다.</h2>
      <Link href="/admin">
        대시보드 메인으로 돌아가기
      </Link>
    </div>
  );
}