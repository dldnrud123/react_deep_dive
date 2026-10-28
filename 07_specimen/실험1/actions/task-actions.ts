// actions/task-actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { insertTask, toggleTask, deleteTask } from '../lib/dal/tasks';

// 1. 서버 검증 스키마 (DTO Validation 규격: 공백 제외 최소 2글자 이상)
const TaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: '제목은 최소 2글자 이상이어야 합니다.' }),
});

// 클라이언트와 주고받을 응답 State 타입
export type ActionState = {
  success?: boolean;
  errors?: {
    title?: string[];
  };
};

// 2. 등록 액션 (검증 실패 시 에러 객체를 프론트로 리턴)
export async function addTaskAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const rawTitle = formData.get('title') as string;

  // Spring의 @Valid처럼 서버 측 검증 실행
  const validated = TaskSchema.safeParse({ title: rawTitle });

  // 검증 실패 시 바로 튕겨냄 (Spring의 BindingResult.hasErrors() 처리)
  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  // 검증 통과 시 DAO(DAL) 호출
  await insertTask(validated.data.title);
  revalidatePath('/tasks');

  return { success: true };
}

// 3. 상태 변경 액션
export async function toggleTaskAction(id: string) {
  await toggleTask(id);
  revalidatePath('/tasks');
}

// 4. 삭제 액션
export async function deleteTaskAction(id: string) {
  await deleteTask(id);
  revalidatePath('/tasks');
}