3주차(26.09.17 ~ 26.09.30)

연구 주제 : React Effect, Closure & Escape Hatches

**핵심 질문** 
React 외부 세계와 언제, 어떻게 동기화해야 하는가?

# 공용 학습 목표
- Pure Rendering / Event Handler / Effect의 역할을 구분한다.
- Effect를 component lifecycle 대체제가 아닌 Synchronization 관점으로 설명한다.
- Effect dependency가 필요한 이유를 closure와 연결하여 설명한다.
- Stale Closure를 재현하고 해결할 수 있다.
- Cleanup이 필요한 외부 리소스를 판단할 수 있다.
- StrictMode에서 개발 중 Effect 재실행의 목적을 설명할 수 있다.
- State와 Ref의 차이를 render trigger 관점에서 설명한다.
- You Might Not Need an Effect 기준으로 불필요한 Effect를 제거할 수 있다.


### Why Questions
- Effect를 componentDidMount 대체품으로 생각하면 왜 문제가 되는가?
- dependency array는 최적화 옵션인가 correctness 조건인가?
- ref 변경이 왜 render를 발생시키지 않는가?
- stale closure는 React 문제인가 JavaScript 문제인가?
- StrictMode가 Effect를 다시 실행해보는 이유는 무엇인가?
