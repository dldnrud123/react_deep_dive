import React, { useState, useEffect } from 'react';

export default function BadFilterList() {
  const [items] = useState(['사과', '바나나', '포도', '딸기', '수박']);
  const [query, setQuery] = useState('');
  
  // 문제 1: 불필요한 State 선언
  const [filteredItems, setFilteredItems] = useState([]);

  // 문제 2: State를 바꾸기 위해 Effect를 돌림
  useEffect(() => {
    console.log('[Effect 실행] 필터링 연산 및 setState 호출');
    const result = items.filter(item => item.includes(query));
    setFilteredItems(result);
  }, [items, query]);

  console.log('[Render 실행] 화면 그리는 중...');

  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="과일 검색" 
      />
      <ul>
        {filteredItems.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}