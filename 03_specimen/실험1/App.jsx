import React, { useState, useEffect } from 'react';

export default function BadTimer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 1초마다 count를 1씩 올리고 싶음
    const timerId = setInterval(() => {
      console.log('인터벌 내부에서 바라본 count:', count);
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []); // 의존성 배열을 빈 배열([])로 둠

  return <h1>현재 카운트: {count}</h1>;
}