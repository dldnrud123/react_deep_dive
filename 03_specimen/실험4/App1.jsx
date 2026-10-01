import React, { useState, useEffect } from 'react';

export default function BadCheckout() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderData, setOrderData] = useState(null);

  // 문제: 유저의 '클릭'으로 일어나는 1회성 작업을 Effect에 위임함
  useEffect(() => {
    if (isSubmitting && orderData) {
      console.log('[결제 API 호출]:', orderData);
      
      // 결제 완료 후 플래그 원복
      alert('결제 요청이 완료되었습니다.');
      setIsSubmitting(false);
    }
  }, [isSubmitting, orderData]);

  const handleBuyClick = () => {
    console.log('[유저 클릭 발생]');
    setOrderData({ id: 101, name: '맥북 프로', price: 2000000 });
    setIsSubmitting(true); // "야 Effect야, 일해라" 하고 깃발만 듦
  };

  return (
    <div>
      <button onClick={handleBuyClick}>결제하기</button>
    </div>
  );
}