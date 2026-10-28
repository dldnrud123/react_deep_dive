// lib/dal/tasks.ts

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

// 메모리 DB (실무에서는 Prisma나 MySQL 쿼리가 실행되는 자리)
let tasksTable: Task[] = [
  { id: '1', title: '7주차 스터디 시작', completed: false },
  { id: '2', title: '운동 가기', completed: true },
];

// 1. 조회 (Read)
export async function findTasks(): Promise<Task[]> {
  return [...tasksTable];
}

// 2. 추가 (Create)
export async function insertTask(title: string): Promise<Task> {
  const newTask: Task = {
    id: Date.now().toString(),
    title,
    completed: false,
  };
  tasksTable.push(newTask);
  return newTask;
}

// 3. 상태 토글 (Update)
export async function toggleTask(id: string): Promise<Task | null> {
  const task = tasksTable.find((t) => t.id === id);
  if (!task) return null;
  task.completed = !task.completed;
  return task;
}

// 4. 삭제 (Delete)
export async function deleteTask(id: string): Promise<boolean> {
  const prevLength = tasksTable.length;
  tasksTable = tasksTable.filter((t) => t.id !== id);
  return tasksTable.length !== prevLength;
}