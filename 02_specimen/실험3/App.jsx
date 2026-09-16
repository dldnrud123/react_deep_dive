import React, { useState, useEffect } from 'react';

export default function CartBad() {
  const [items, setItems] = useState([
    { id: 1, name: '사과', price: 1000, count: 2 },
    { id: 2, name: '바나나', price: 2000, count: 1 }
  ]);

  // ❌ 안티패턴 1: 계산 가능한 값을 불필요하게 useState로 선언
  // const [totalPrice, setTotalPrice] = useState(0);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.count, 0);

  // ❌ 안티패턴 2: state 동기화를 위해 useEffect를 억지로 사용
  // useEffect(() => {
  //   // items가 바뀔 때마다 다시 계산해서 setTotalPrice 호출
  //   const total = items.reduce((sum, item) => sum + item.price * item.count, 0);
  //   setTotalPrice(total);
  // }, [items]);

  const handleCountUp = (id) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, count: item.count + 1 } : item
    ));
  };

  return (
    <div style={{ border: '2px solid red', padding: '15px', marginBottom: '20px' }}>
      <h3>장바구니</h3>
      {items.map(item => (
        <div key={item.id}>
          {item.name} ({item.price}원) x {item.count}개
          <button onClick={() => handleCountUp(item.id)}>+</button>
        </div>
      ))}
      <hr />
      <h4>총 결제 금액: {totalPrice}원</h4>
    </div>
  );
}