// app/tasks/task-form.tsx
'use client';

import { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addTaskAction, ActionState } from '../../actions/task-actions';

export function TaskForm() {
  const router = useRouter();

  // 1. Server Action용 State
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    addTaskAction,
    null
  );

  // 2. 모드 전환: false = Server Action / true = Route Handler
  const [useRouteHandler, setUseRouteHandler] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isApiLoading, setIsApiLoading] = useState(false);

  // [실험: Route Handler 호출 핸들러]
  async function handleApiSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setApiError(null);
    setIsApiLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get('title') as string;

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      const result = await response.json();

      if (!response.ok) {
        // 검증 에러 표시
        setApiError(result.errors?.title?.[0] || '등록 실패');
      } else {
        form.reset();
        // ★ Route Handler는 revalidatePath를 엮지 않는 한 화면이 자동 갱신되지 않으므로 수동 리프레시 필요!
        router.refresh();
      }
    } catch (err) {
      setApiError('네트워크 오류');
    } finally {
      setIsApiLoading(false);
    }
  }

  return (
    <div style={{ marginBottom: '24px', padding: '16px', background: '#f8f9fa', borderRadius: '6px' }}>
      {/* 방식 선택 토글 */}
      <div style={{ marginBottom: '12px', fontSize: '14px' }}>
        <label style={{ marginRight: '16px', cursor: 'pointer' }}>
          <input
            type="radio"
            name="mode"
            checked={!useRouteHandler}
            onChange={() => setUseRouteHandler(false)}
          />
          {' '}<strong>Server Action</strong> 방식
        </label>
        <label style={{ cursor: 'pointer' }}>
          <input
            type="radio"
            name="mode"
            checked={useRouteHandler}
            onChange={() => setUseRouteHandler(true)}
          />
          {' '}<strong>Route Handler (REST fetch)</strong> 방식
        </label>
      </div>

      {/* 폼 전송 */}
      <form
        action={!useRouteHandler ? formAction : undefined}
        onSubmit={useRouteHandler ? handleApiSubmit : undefined}
        style={{ display: 'flex', gap: '8px' }}
      >
        <input
          name="title"
          placeholder="할 일 입력 (2글자 이상)"
          required
          minLength={2}
          style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button
          type="submit"
          disabled={isPending || isApiLoading}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          {isPending || isApiLoading ? '처리중...' : '추가'}
        </button>
      </form>

      {/* 에러 노출 (Server Action 에러 OR Route Handler 에러) */}
      {!useRouteHandler && state?.errors?.title && (
        <p style={{ color: 'red', fontSize: '13px', marginTop: '6px', marginBottom: 0 }}>
          🚨 [Action 검증 실패] {state.errors.title[0]}
        </p>
      )}
      {useRouteHandler && apiError && (
        <p style={{ color: 'red', fontSize: '13px', marginTop: '6px', marginBottom: 0 }}>
          🚨 [Route Handler 검증 실패] {apiError}
        </p>
      )}
    </div>
  );
}