import React, { useState } from 'react';

export default function GoodFilterList() {
  const [items] = useState(['사과', '바나나', '포도', '딸기', '수박']);
  const [query, setQuery] = useState('');

  console.log('🎨 [Render 실행] 화면 그리는 중...');

  //  Effect 없이 렌더링 본문에서 순수 변수로 즉시 계산!
  const filteredItems = items.filter(item => item.includes(query));

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