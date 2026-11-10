// app/tasks/page.tsx
import { findTasks } from '@/lib/dal/tasks';
import { addTaskAction, toggleTaskAction, deleteTaskAction } from '@/actions/task-actions';

export default async function TasksPage() {
  // 1. Read: DAL을 직접 호출해서 데이터 가져옴 (Server Component)
  const tasks = await findTasks();

  return (
    <main style={{ padding: '40px', maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>7주차: Server Action CRUD</h2>

      {/* 2. Create: form의 action 속성에 Server Action을 직접 바인딩 */}
      <form action={addTaskAction} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
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

      {/* 3. Read & Update & Delete 목록 */}
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
              <form action={toggleTaskAction.bind(null, task.id)}>
                <button type="submit" style={{ cursor: 'pointer' }}>
                  {task.completed ? '취소' : '완료'}
                </button>
              </form>

              {/* Delete: bind로 task.id 전달 */}
              <form action={deleteTaskAction.bind(null, task.id)}>
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