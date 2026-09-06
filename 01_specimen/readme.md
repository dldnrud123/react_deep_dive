연구 주제 : React Rendering Mental Model

**핵심 질문:** 
React는 어떤 과정을 통해 UI를 업데이트하는가?

### 공용 학습 목표

- Declarative UI의 의미를 설명할 수 있다.
- Component 실행과 DOM 업데이트를 구분할 수 있다.
- Render Trigger → Render Phase → Commit Phase 흐름을 설명할 수 있다.
- Reconciliation이 무엇을 비교하고 왜 필요한지 설명할 수 있다.
- Component Identity와 Render Tree의 관계를 이해한다.
- `key`가 단순 warning 제거용이 아닌 이유를 설명할 수 있다.
- Re-render와 실제 DOM mutation이 같은 개념이 아님을 설명할 수 있다.

### Why Questions

1. 부모가 render되면 왜 자식 함수도 다시 실행될 수 있는가?
2. 자식 함수가 다시 실행돼도 왜 DOM 전체가 다시 만들어지지 않는가?
3. React에서 component identity는 무엇으로 결정되는가?
4. 왜 `key`가 state preservation에 영향을 주는가?
5. Virtual DOM을 React의 핵심 본질이라고 설명하면 무엇이 부족한가?

### 주간 산출물

- React Mental Model #1 — Render에서 Commit까지 1페이지 정리
- 코드 실험 결과 및 예상과 달랐던 점 기록


