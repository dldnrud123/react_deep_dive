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

### why Questions

1. 시대적 개발 흐름이 jquery 같은 DOM을 직접 조작하는 방식에서 개발자는 데이터를 조작하고  React가 DOM 동기화를 직접해주는 방식으로 변화된 원인이 무엇일까?
=> SPA 특징인 UI의 복잡성으로 기존 노드방식의 개발 -> 성형 방식으로 사고 전환

2. Component 실행 시점에 virtualDOM의 생성되고 diffing(비교)을 진행하는데 이후, 두번의 DOM 업데이트가 진행되면 첫번째 virtualDOM은 어떻게 되는가?
=> 새트리로 오버라이트 되거나, GC(가비지컬렉터가) 메모리에서 수거하게됨.

3. useMemo의 정의를 function useMemo(callback, deps = []) 같은 방식으로 안만들고 deps=null이 될수 있게 만들었는지?
=> 패밀리 룩, 최초 한번보다는 매번 계산되는게 덜치명적, 초기 개발시 비난받음.

4. useCallback() 은 실무에서 status의 변화를 포함한 함수에는 다 적용해야하는가?


