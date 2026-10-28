// app/api/tasks/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { insertTask } from '../../../lib/dal/tasks';

// Server Action에서 썼던 것과 동일한 Zod 검증 스키마
const TaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: '제목은 최소 2글자 이상이어야 합니다.' }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. 유효성 검사 (Spring의 @Valid)
    const validated = TaskSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { errors: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // 2. DAL 호출 (DAO 재사용!)
    const newTask = await insertTask(validated.data.title);

    // 3. 순수 JSON 응답 (Spring의 ResponseEntity.status(201).body(...))
    return NextResponse.json({ success: true, data: newTask }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: '서버 내부 오류' }, { status: 500 });
  }
}