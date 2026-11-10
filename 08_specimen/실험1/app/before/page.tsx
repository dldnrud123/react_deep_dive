// app/before/page.tsx
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

// [Before 문제점 1] DB 역할을 하는 데이터 저장소가 UI 파일 안에 직접 존재함
let tasks = [
  { id: '1', title: '7주차 스터디 시작', completed: false },
  { id: '2', title: '등 운동 가기', completed: true },
];

export default function BeforePage() {
  // [Before 문제점 2] 등록 액션이 UI 컴포넌트 내부에서 인라인으로 선언되고 배열을 직접 건드림
  async function addTask(formData: FormData) {
    'use server';

    const title = formData.get('title') as string;
    if (!title || title.trim() === '') return;

    tasks.push({
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
    });

    revalidatePath('/before');
  }

  // [Before 문제점 3] 완료 토글 액션도 UI 파일 안에서 인라인으로 직접 배열 탐색/수정
  async function toggleTask(id: string) {
    'use server';

    const target = tasks.find((t) => t.id === id);
    if (target) {
      target.completed = !target.completed;
    }

    revalidatePath('/before');
  }

  // [Before 문제점 4] 삭제 액션도 UI 파일 안에서 인라인으로 직접 배열 필터링
  async function deleteTask(id: string) {
    'use server';

    tasks = tasks.filter((t) => t.id !== id);

    revalidatePath('/before');
  }

  return (
    <main style={{ padding: '40px', maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <p style={{ marginBottom: '16px' }}>
        <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>
          ← 목차로 돌아가기
        </Link>
      </p>

      <h2 style={{ color: '#d9534f' }}>🔴 [Before] UI + DB + 액션 엉킨 상태</h2>
      <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.4' }}>
        * UI 컴포넌트 파일 안에 DB 배열, 등록/수정/삭제 로직이 전부 한 덩어리로 묶여 있는 구조
      </p>

      {/* 1. 할 일 등록 폼 */}
      <form action={addTask} style={{ display: 'flex', gap: '8px', margin: '20px 0' }}>
        <input
          name="title"
          placeholder="할 일을 입력하세요"
          required
          style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
          추가
        </button>
      </form>

      {/* 2. 할 일 목록 및 토글/삭제 */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              padding: '10px',
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </span>

            <div style={{ display: 'flex', gap: '6px' }}>
              {/* 완료 토글 버튼 */}
              <form action={toggleTask.bind(null, task.id)}>
                <button type="submit" style={{ cursor: 'pointer' }}>
                  {task.completed ? '취소' : '완료'}
                </button>
              </form>

              {/* 삭제 버튼 */}
              <form action={deleteTask.bind(null, task.id)}>
                <button type="submit" style={{ color: 'red', cursor: 'pointer' }}>
                  삭제
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}