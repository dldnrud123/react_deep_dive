// app/tasks/task-form.tsx
'use client';

import { useActionState } from 'react';
import { addTaskAction, ActionState } from '@/actions/task-actions';

export function TaskForm() {
  // Spring 폼 바인딩 결과 받듯, 서버 액션의 에러/성공 상태를 추적
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    addTaskAction,
    null
  );

  return (
    <div style={{ marginBottom: '24px' }}>
      <form action={formAction} style={{ display: 'flex', gap: '8px' }}>
        {/* [실험 대상] 브라우저 클라이언트 방어선: required, minLength */}
        <input
          name="title"
          placeholder="할 일 입력 (2글자 이상)"
          required
          minLength={2}
          style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button
          type="submit"
          disabled={isPending}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          {isPending ? '등록중...' : '추가'}
        </button>
      </form>

      {/* 서버 검증(Zod) 실패 시 빨간색 에러 메시지 출력 */}
      {state?.errors?.title && (
        <p style={{ color: 'red', fontSize: '13px', marginTop: '6px', marginBottom: 0 }}>
          🚨 {state.errors.title[0]}
        </p>
      )}
    </div>
  );
}