import { useState, useRef } from 'react'
import ChildA from './components/ChildA'
import ChildB from './components/ChildB'

// [State Down 대상]
// 카운터 상태(count)를 부모에게서 뺏어와 자기 내부에 완전히 가둬버린 독립 컴포넌트
function CounterSection() {
  const [count, setCount] = useState(0)
  
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
      <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
        CounterSection 내부 Render: <strong>{renderCount.current}회</strong>
      </p>
      <button 
        onClick={() => setCount(prev => prev + 1)}
        style={{ padding: '6px 12px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        카운트 증가 (+1) : {count}
      </button>
    </div>
  )
}

// [부모 컴포넌트]
// 이제 더 이상 카운트 관련 상태가 없음! (상태 격리 완료)
export default function App() {
  const [text, setText] = useState('초기 데이터')

  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div style={{ border: '2px solid #212529', padding: '20px', maxWidth: '500px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h3 style={{ margin: '0 0 10px' }}>Parent Controller</h3>
      <p style={{ margin: '0 0 15px', color: '#0d6efd' }}>
        부모(App) Render Phase 실행: <strong>{renderCount.current}회</strong>
      </p>

      {/* 1. 카운터 영역 (상태가 격리된 자식 컴포넌트) */}
      <CounterSection />

      {/* 2. Child A 전용 Props 입력창 */}
      <div style={{ marginBottom: '15px' }}>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Child A props 텍스트 변경"
          style={{ padding: '6px', width: '90%' }}
        />
      </div>

      <hr />

      <ChildA text={text} />
      <ChildB />
    </div>
  )
}