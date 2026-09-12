import { useState } from 'react'

// 1. Render Phase 비용이 큰 컴포넌트 (CPU 연산 지연 유발)
function SlowComputeChild({ count }) {
  // 의도적인 렌더링 지연 (Profiler의 Flamegraph에서 렌더 바가 길게 늘어남)
  const startTime = performance.now()
  while (performance.now() - startTime < 30) {
    // 30ms 동안 CPU 점유 (Render Phase 연장)
  }

  return (
    <div style={{ border: '2px solid #fd7e14', padding: '10px', margin: '8px 0' }}>
      <strong>SlowComputeChild</strong>
      <p style={{ margin: '4px 0' }}>부모 카운트: {count} (30ms 렌더 연산 포함)</p>
    </div>
  )
}

// 2. DOM Mutation이 일어나는 컴포넌트 (Commit Phase에서 실제 DOM 노드 변경)
function MutatingChild({ text }) {
  return (
    <div style={{ border: '2px solid #0d6efd', padding: '10px', margin: '8px 0' }}>
      <strong>MutatingChild</strong>
      <p style={{ margin: '4px 0' }}>실제 변경 텍스트: <span style={{ color: '#0d6efd' }}>{text}</span></p>
    </div>
  )
}

// 3. Render는 돌지만 DOM Mutation은 없는 정적 컴포넌트 (낭비된 렌더링)
function WastedRenderChild() {
  return (
    <div style={{ border: '2px solid #6c757d', padding: '10px', margin: '8px 0' }}>
      <strong>WastedRenderChild</strong>
      <p style={{ margin: '4px 0', color: '#888' }}>내용이 바뀌지 않는 완전 고정 UI</p>
    </div>
  )
}

export default function App() {
  const [parentCount, setParentCount] = useState(0)
  const [text, setText] = useState('초기 텍스트')

  return (
    <div style={{ padding: '20px', maxWidth: '520px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h3>Profiler 관찰 실험실</h3>

      <div style={{ marginBottom: '10px' }}>
        <button 
          onClick={() => setParentCount(prev => prev + 1)}
          style={{ padding: '6px 12px', marginRight: '8px', cursor: 'pointer' }}
        >
          카운트 증가 (전체 트리 렌더 트리거)
        </button>

        <button 
          onClick={() => setText(prev => prev === '초기 텍스트' ? '수정된 텍스트' : '초기 텍스트')}
          style={{ padding: '6px 12px', cursor: 'pointer' }}
        >
          텍스트 토글 (MutatingChild 대상)
        </button>
      </div>

      <hr />

      <SlowComputeChild count={parentCount} />
      <MutatingChild text={text} />
      <WastedRenderChild />
    </div>
  )
}