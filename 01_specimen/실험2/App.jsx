import { useState, useRef, useEffect } from 'react'

// 1. 상태(내부 input text)를 가지는 테스트용 기본 컴포넌트 A
function CounterInput({ title, color }) {
  const [text, setText] = useState('')
  const mountRef = useRef(false)

  useEffect(() => {
    console.log(`%c[${title} 마운트됨 (생성)]`, `color: ${color}; font-weight: bold;`)
    return () => {
      console.log(`%c[${title} 언마운트됨 (파괴)]`, 'color: gray;')
    }
  }, [title, color])

  return (
    <div style={{ border: `2px solid ${color}`, padding: '10px', margin: '8px 0', borderRadius: '4px' }}>
      <strong style={{ color }}>{title}</strong>
      <div style={{ marginTop: '5px' }}>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="여기에 글자를 입력해두세요"
          style={{ width: '80%', padding: '4px' }}
        />
      </div>
    </div>
  )
}

// 2. 컴포넌트 타입 변경 실험을 위한 완전히 다른 컴포넌트 B (타입만 다르고 내부 구조는 동일)
function AnotherCounterInput({ title, color }) {
  const [text, setText] = useState('')

  useEffect(() => {
    console.log(`%c[AnotherCounterInput 마운트됨]`, `color: ${color}; font-weight: bold;`)
    return () => console.log(`%c[AnotherCounterInput 언마운트됨]`, 'color: gray;')
  }, [color])

  return (
    <div style={{ border: `2px dashed ${color}`, padding: '10px', margin: '8px 0', borderRadius: '4px' }}>
      <strong style={{ color }}>{title} (완전히 다른 타입)</strong>
      <div style={{ marginTop: '5px' }}>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="타입이 바뀌면 난 어떻게 될까?"
          style={{ width: '80%', padding: '4px' }}
        />
      </div>
    </div>
  )
}

export default function App() {
  // 실험 1: 동일 위치에서 속성만 변경
  const [isStyleToggle, setIsStyleToggle] = useState(false)

  // 실험 2: Component Type 변경
  const [isTypeChange, setIsTypeChange] = useState(false)

  // 실험 3: 트리 구조(위치) 변경 (div 래퍼 추가)
  const [isPositionChange, setIsPositionChange] = useState(false)

  // 실험 4: Key 속성 변경
  const [keyToggle, setKeyToggle] = useState(false)

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>Component Identity & State 보존 실험</h2>
      <p style={{ fontSize: '13px', color: '#666' }}>
        각 인풋창에 아무 글자나 입력해둔 상태에서 아래 버튼들을 눌러봐.
      </p>

      {/* ----------------- 실험 1 ----------------- */}
      <section style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px' }}>
        <h4>실험 1. 동일 위치 + 동일 타입 + props만 변경</h4>
        <button onClick={() => setIsStyleToggle(prev => !prev)}>Props 토글 (색상 변경)</button>
        {isStyleToggle ? (
          <CounterInput title="타입 동일 (빨강)" color="#dc3545" />
        ) : (
          <CounterInput title="타입 동일 (파랑)" color="#0d6efd" />
        )}
      </section>

      {/* ----------------- 실험 2 ----------------- */}
      <section style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px' }}>
        <h4>실험 2. Component Type 변경 (Identity 파괴)</h4>
        <button onClick={() => setIsTypeChange(prev => !prev)}>컴포넌트 타입 변경</button>
        {isTypeChange ? (
          <AnotherCounterInput title="타입 B" color="#198754" />
        ) : (
          <CounterInput title="타입 A" color="#198754" />
        )}
      </section>

      {/* ----------------- 실험 3 ----------------- */}
      <section style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px' }}>
        <h4>실험 3. Render Tree 위치(구조) 변경</h4>
        <button onClick={() => setIsPositionChange(prev => !prev)}>DOM 감싸는 부모 태그 토글</button>
        {isPositionChange ? (
          // div라는 부모 노드가 새로 생겨서 트리의 계층 위치가 바뀜
          <section>
            <CounterInput title="section 태그로 감싸진 인풋" color="#6f42c1" />
          </section>
        ) : (
          <CounterInput title="감싸는 태그 없는 인풋" color="#6f42c1" />
        )}
      </section>

      {/* ----------------- 실험 4 ----------------- */}
      <section style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px' }}>
        <h4>실험 4. 동일 위치 + 동일 타입 + Key만 변경</h4>
        <button onClick={() => setKeyToggle(prev => !prev)}>Key 토글 (Identity 명시적 변경)</button>
        <CounterInput 
          key={keyToggle ? 'user-kim' : 'user-lee'} 
          title={`현재 Key: ${keyToggle ? 'user-kim' : 'user-lee'}`} 
          color="#fd7e14" 
        />
      </section>
    </div>
  )
}