import { useState, useRef, useMemo } from 'react'
import ChildA from './components/ChildA'
import ChildB from './components/ChildB'

export default function App() {
  const [parentCount, setParentCount] = useState(0)
  const [text, setText] = useState('초기 데이터')

  const renderCount = useRef(0)
  renderCount.current += 1

  // 핵심 포인트: ChildB 엘리먼트 객체 자체를 useMemo로 얼려둠
  // 의존성 배열이 빈 배열([])이므로 최초 1회만 생성되고 이후엔 캐시된 객체 재활용
  const memoizedChildB = useMemo(() => {
    return <ChildB />
  }, [])

  return (
    <div style={{ border: '2px solid #212529', padding: '20px', maxWidth: '500px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h3 style={{ margin: '0 0 10px' }}>Parent Controller (useMemo 테스트)</h3>
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

      {/* ChildA는 일반 호출 (부모 바뀔 때마다 매번 다시 실행됨) */}
      <ChildA text={text} />

      {/* useMemo로 캐싱해둔 ChildB 객체 주입 */}
      {memoizedChildB}
    </div>
  )
}