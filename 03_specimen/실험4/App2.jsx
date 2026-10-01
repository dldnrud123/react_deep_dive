import React, { useState } from 'react';

export default function GoodCheckout() {
  const [loading, setLoading] = useState(false);

  // 유저의 액션 시점에 정확히 1회 직접 실행
  const handleBuyClick = async () => {
    console.log('[유저 클릭 발생] -> 즉시 결제 파이프라인 가동');
    
    const payload = { id: 101, name: '맥북 프로', price: 2000000 };

    try {
      setLoading(true);
      console.log('[결제 API 직접 호출]:', payload);
      // await axios.post('/api/pay', payload);
      
      alert('결제 요청이 완료되었습니다.');
    } catch (err) {
      console.error('결제 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleBuyClick} disabled={loading}>
        {loading ? '결제 진행 중...' : '결제하기'}
      </button>
    </div>
  );
}