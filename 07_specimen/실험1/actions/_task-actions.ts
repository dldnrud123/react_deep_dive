// actions/task-actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { insertTask, toggleTask, deleteTask } from '@/lib/dal/tasks';

// 1. 등록 액션 (Create)
export async function addTaskAction(formData: FormData) {
  const title = formData.get('title') as string;

  if (!title || title.trim() === '') {
    return;
  }

  // DAL 함수 호출해서 데이터 추가
  await insertTask(title.trim());

  // 데이터가 변경되었으니 /tasks 페이지를 다시 렌더링하도록 캐시 무효화
  revalidatePath('/tasks');
}

// 2. 상태 변경 액션 (Update)
export async function toggleTaskAction(id: string) {
  await toggleTask(id);
  revalidatePath('/tasks');
}

// 3. 삭제 액션 (Delete)
export async function deleteTaskAction(id: string) {
  await deleteTask(id);
  revalidatePath('/tasks');
}