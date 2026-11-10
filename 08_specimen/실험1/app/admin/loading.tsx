export default function Loading() {
  // page.tsx의 fetchDashboardData가 3초간 대기할 때 화면에 노출됨
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h2>데이터를 불러오는 중입니다... 잠시만 기다려주세요.</h2>
      {/* 여기에 스켈레톤 UI나 로딩 스피너 디자인을 적용 */}
    </div>
  );
}