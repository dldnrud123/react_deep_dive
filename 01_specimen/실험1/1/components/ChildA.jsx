import { useRef, useEffect } from 'react'

export default function ChildA({ text }) {
  // 1. Render Phase: 함수 자체 실행 횟수
  const renderCount = useRef(0)
  renderCount.current += 1

  const domRef = useRef(null)

  useEffect(() => {
    // 브라우저 실제 DOM 감시자 장착
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        console.log('%c[ChildA DOM Mutation 발생!]', 'color: #0d6efd; font-weight: bold;', {
          type: mutation.type,
          target: mutation.target,
          newValue: mutation.target.textContent
        })
      })
    })

    if (domRef.current) {
      observer.observe(domRef.current, {
        childList: true,
        characterData: true,
        subtree: true
      })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={domRef} style={{ border: '2px solid #0d6efd', padding: '12px', margin: '10px 0' }}>
      <h4 style={{ margin: '0 0 5px', color: '#0d6efd' }}>Child A (Props 수신 컴포넌트)</h4>
      <p style={{ margin: '3px 0' }}>Render Phase (함수 실행): <strong>{renderCount.current}회</strong></p>
      <p style={{ margin: '3px 0' }}>
        실제 텍스트 노드: <span style={{ background: '#e7f1ff', padding: '2px 6px' }}>{text}</span>
      </p>
    </div>
  )
}