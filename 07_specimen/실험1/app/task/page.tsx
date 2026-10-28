// app/tasks/page.tsx
import { findTasks } from '../../lib/dal/tasks';
import { toggleTaskAction, deleteTaskAction } from '../../actions/task-actions';
import { TaskForm } from './task-form';

export default async function TasksPage() {
  const tasks = await findTasks();

  return (
    <main style={{ padding: '40px', maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>7주차: Server Action CRUD & Validation</h2>

      {/* 폼 컴포넌트 */}
      <TaskForm />

      {/* 목록 */}
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