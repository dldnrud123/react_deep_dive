import { notFound } from 'next/navigation';

async function fetchDashboardData(condition: string) {
  // 1. 의도적인 3초 딜레이 (loading.tsx 테스트용)
  await new Promise(resolve => setTimeout(resolve, 3000));

  if (condition === 'error') {
    throw new Error('DB Connection Timeout!');
  }
  if (condition === 'empty') {
    return null;
  }

  // 2. 터져버린 시간 API 대신, 랜덤 강아지 사진 API로 변경!
  // 캐시가 유지되면 항상 같은 강아지가 나오고, 파기되면 다른 강아지가 나옴
  const res = await fetch('https://dog.ceo/api/breeds/image/random', {
    next: { tags: ['dashboard-data'] }
  });
  
  if (!res.ok) {
    throw new Error('API 서버 장애');
  }
  
  return res.json();
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string }>;
}) {
  const params = await searchParams;
  const data = await fetchDashboardData(params.state || 'normal');

  if (!data) {
    notFound(); 
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>관리자 대시보드 👑</h1>
      
      {/* 캐시 시각화 테스트 영역 */}
      <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '10px' }}>
        <h3>🐶 캐시 테스트 (새로고침해도 사진이 똑같아야 정상!)</h3>
        {/* data.message 에 강아지 사진 URL이 들어있음 */}
        <img src={data.message} alt="Random Dog" style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '10px' }} />
      </div>
      
      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc' }}>
        <h3>상태 실험 트리거 (URL 쿼리 변경)</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li><a href="/admin?state=error" style={{ color: 'red' }}>🚨 에러 강제 발생시키기 (error.tsx 테스트)</a></li>
          <li><a href="/admin?state=empty" style={{ color: 'orange' }}>🍃 404 강제 발생시키기 (not-found.tsx 테스트)</a></li>
          <li><a href="/admin" style={{ color: 'blue' }}>✅ 정상 화면으로 돌아오기</a></li>
        </ul>
      </div>

      <form action={async () => {
        'use server';
        const { updatePost } = await import('@/actions/postActions');
        
        // 해커로 찌르면 인가(AuthZ) 에러가 남. 
        // 이걸 통과하는 유저(user_123)로 바꾸면 캐시가 파기되면서 강아지 사진이 바뀔 거임!
        await updatePost('post_1', 'hacker'); 
      }}>
        <button type="submit" style={{ padding: '10px 20px', background: 'black', color: 'white', marginTop: '20px', cursor: 'pointer' }}>
          권한 없는 유저로 DB 업데이트 시도 (인가 실패 테스트)
        </button>
      </form>
    </div>
  );
}