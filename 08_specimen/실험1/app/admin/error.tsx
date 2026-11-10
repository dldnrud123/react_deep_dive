'use client'; // error 컴포넌트는 무조건 클라이언트 컴포넌트여야 함

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Sentry 같은 에러 로깅 서비스에 리포트하는 로직이 들어갈 자리
    console.error('Captured Error:', error);
  }, [error]);

  return (
    <div style={{ padding: '20px', border: '1px solid red', color: 'red' }}>
      <h2>시스템에 일시적인 오류가 발생했습니다.</h2>
      <p>사유: {error.message}</p>
      <button onClick={() => reset()}>
        다시 시도하기
      </button>
    </div>
  );
}