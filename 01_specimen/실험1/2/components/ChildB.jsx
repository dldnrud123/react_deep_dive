import { useRef, useEffect, memo } from 'react'

const ChildB = memo(function ChildB() {
  // 1. Render Phase: 함수 자체 실행 횟수
  const renderCount = useRef(0)
  renderCount.current += 1

  const domRef = useRef(null)
console.log('%c[B렌더링 횟수]', 'color: #dc3545; font-weight: bold;', renderCount.current)
  useEffect(() => {
    // 브라우저 실제 DOM 감시자 장착
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // ChildB는 내용이 안 바뀌므로 이 로그가 절대 안 찍혀야 정상
        console.log('%c[ChildB DOM Mutation 감지]', 'color: #dc3545; font-weight: bold;', renderCount.current)
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
    <div ref={domRef} style={{ border: '2px solid #6c757d', padding: '12px', margin: '10px 0' }}>
      <h4 style={{ margin: '0 0 5px', color: '#6c757d' }}>Child B (순수 정적 컴포넌트)</h4>
      <p style={{ margin: '3px 0' }}>Render Phase (함수 실행): <strong>콘솔확인</strong></p>
      <p style={{ margin: '3px 0', color: '#888' }}>
        고정 텍스트 (Diffing 결과 항상 일치)
      </p>
    </div>
  )
})

export default ChildB