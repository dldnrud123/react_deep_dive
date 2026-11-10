'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function updatePost(postId: string, userIdTryingToEdit: string) {
  // 1. 미들웨어를 통과했더라도 여기서 실제 세션(쿠키)을 다시 검증
const cookieStore = await cookies(); // await로 쿠키가 다 파싱될 때까지 기다림
const token = cookieStore.get('session_token');
  
  if (!token) {
    throw new Error('Unauthorized');
  }

  // 2. DB 조회 (가정)
  // SELECT author_id FROM posts WHERE id = postId
  const postAuthorId = 'user_123'; // DB에서 가져온 실제 작성자 ID라고 가정

  // 3. 미시적 인가 (AuthZ) 검사 (PHP의 if($write['mb_id'] !== $member['mb_id']) 와 동일)
  if (userIdTryingToEdit !== postAuthorId) {
    throw new Error('Forbidden: 본인이 작성한 글만 수정할 수 있습니다.');
  }

  // 4. 업데이트 로직 실행...
  // UPDATE posts SET ...

  // 5. 업데이트 완료 후 캐시 파기 (실험 2로 이어짐)
  revalidatePath('/admin');
  
  return { success: true };
}