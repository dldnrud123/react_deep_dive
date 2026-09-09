import { useState, useRef } from 'react'
import ChildA from './components/ChildA'
import ChildB from './components/ChildB'

export default function App() {
  const [parentCount, setParentCount] = useState(0)
  const [text, setText] = useState('초기 데이터')

  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div style={{ border: '2px solid #212529', padding: '20px', maxWidth: '500px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h3 style={{ margin: '0 0 10px' }}>Parent Controller</h3>
      <p style={{ margin: '0 0 10px' }}>부모 Render Phase 실행: <strong>{renderCount.current}회</strong></p>

      {/* 트리거 1: 부모 카운트만 변경 */}
      <div style={{ marginBottom: '10px' }}>
        <button 
          onClick={() => setParentCount(prev => prev + 1)}
          style={{ padding: '6px 12px', cursor: 'pointer' }}
        >
          1. 부모 State만 변경 (+1): {parentCount}
        </button>
      </div>

      {/* 트리거 2: Child A의 Props 변경 */}
      <div style={{ marginBottom: '15px' }}>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="2. Child A props 텍스트 변경"
          style={{ padding: '6px', width: '90%' }}
        />
      </div>

      <hr />

      <ChildA text={text} />
      <ChildB />
    </div>
  )
}