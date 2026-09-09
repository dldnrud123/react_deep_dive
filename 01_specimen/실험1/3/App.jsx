import { useState, useRef } from 'react'
import ChildA from './components/ChildA'
import ChildB from './components/ChildB'

// 1. 상태(state)를 가지고 렌더링을 일으키는 컨테이너
function ParentController({ children }) {
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

      {/* ChildA는 부모 상태(text)를 써야 하므로 내부에 그대로 배치 */}
      <ChildA text={text} />

      {/* ChildB 자리에 껍데기(children)만 뚫어놓음 */}
      {children}
    </div>
  )
}

// 2. 최상위 조립부: ChildB를 밖에서 꽂아줌
export default function App() {
  return (
    <ParentController>
      {/* 여기서 만들어져서 children으로 전달됨 */}
      <ChildB />
    </ParentController>
  )
}