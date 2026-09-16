import React, { useState, useEffect } from 'react';

export default function StateComparisonExperiment() {
  // -------------------------------------------------------------
  // [방식 1: Local State (메모리 관리)]
  // -------------------------------------------------------------
  const [localTab, setLocalTab] = useState('all');

  // -------------------------------------------------------------
  // [방식 2: URL State (주소창 쿼리 스트링 관리)]
  // -------------------------------------------------------------
  // 현재 URL(?tab=xxx)에서 초기값을 읽어옴
  const getUrlTab = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') || 'all';
  };

  const [urlTab, setUrlTab] = useState(getUrlTab);

  // 주소창(URL)을 변경하고 상태를 동기화하는 함수
  const changeUrlTab = (newTab) => {
    const params = new URLSearchParams(window.location.search);
    params.set('tab', newTab);
    
    // 브라우저 새로고침 없이 URL만 변경 (?tab=newTab)
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    setUrlTab(newTab);
  };

  // 브라우저 뒤로가기/앞으로가기 감지용 리스너
  useEffect(() => {
    const handlePopState = () => setUrlTab(getUrlTab());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>실험 4. Local State vs URL State 비교</h2>

      {/* 1. Local State UI */}
      <div style={{ border: '2px solid #2196f3', padding: '15px', marginBottom: '20px' }}>
        <h3>1. Local State (메모리 보관)</h3>
        <p>선택된 탭: <strong>{localTab}</strong></p>
        <button onClick={() => setLocalTab('all')}>전체</button>
        <button onClick={() => setLocalTab('tech')} style={{ marginLeft: '5px' }}>기술</button>
        <button onClick={() => setLocalTab('life')} style={{ marginLeft: '5px' }}>일상</button>
      </div>

      {/* 2. URL State UI */}
      <div style={{ border: '2px solid #4caf50', padding: '15px', marginBottom: '20px' }}>
        <h3>2. URL State (주소창 보관: ?tab=...)</h3>
        <p>선택된 탭: <strong>{urlTab}</strong></p>
        <button onClick={() => changeUrlTab('all')}>전체</button>
        <button onClick={() => changeUrlTab('tech')} style={{ marginLeft: '5px' }}>기술</button>
        <button onClick={() => changeUrlTab('life')} style={{ marginLeft: '5px' }}>일상</button>
      </div>

    </div>
  );
}