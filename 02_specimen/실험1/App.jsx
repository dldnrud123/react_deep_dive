import React, { useState } from 'react';

export default function CounterExperiment() {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  // 실험 A: 일반 값 전달 3연타
  const handleDirectUpdate = () => {
    setCountA(countA + 1);
    setCountA(countA + 1);
    setCountA(countA + 1);
  };

  // 실험 B: 함수형 업데이트 3연타
  const handleFunctionalUpdate = () => {
    setCountB((prev) => prev + 1);
    setCountB((prev) => prev + 1);
    setCountB((prev) => prev + 1);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>실험 1. 3연타 비교</h2>
      
      <div>
        <p><strong>A. 일반 업데이트 (현재 값: {countA})</strong></p>
        <button onClick={handleDirectUpdate}>일반 3연타 클릭 (+1 예상)</button>
      </div>

      <hr />

      <div>
        <p><strong>B. 함수형 업데이트 (현재 값: {countB})</strong></p>
        <button onClick={handleFunctionalUpdate}>함수형 3연타 클릭 (+3 예상)</button>
      </div>
    </div>
  );
}