
import React, { useState, useEffect } from 'react';

// 자식 컴포넌트: 열렸다 닫혔다 할 모달/패널
function KeyLogger() {
  useEffect(() => {
    console.log('[KeyLogger] 이벤트 리스너 등록됨!');

    const handleKeyDown = (e) => {
      console.log(`[키 입력 감지]: ${e.key} (현재 활성 리스너)`);
    };

    // 브라우저 window 전역에 리스너 등록
    window.addEventListener('keydown', handleKeyDown);

    //  만약 이 return Cleanup을 주석 처리한다면?
    // return () => {
    //   console.log(' [KeyLogger] 이벤트 리스너 해제(Clean-up) 완료');
    //   window.removeEventListener('keydown', handleKeyDown);
    // };
  }, []);

  return <div style={{ border: '1px solid green', padding: 10 }}>키 로거 활성화됨 (아무 키나 눌러보세요)</div>;
}

// 부모 컴포넌트: 토글로 컴포넌트를 마운트/언마운트 시킴
export default function ListenerTest() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(prev => !prev)}>
        {show ? '컴포넌트 닫기(언마운트)' : '컴포넌트 열기(마운트)'}
      </button>
      <hr />
      {show && <KeyLogger />}
    </div>
  );
}