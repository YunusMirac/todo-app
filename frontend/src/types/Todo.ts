// frontend/src/types/Todo.ts

export type TodoStatus = 'PENDING' | 'COMPLETED';

export interface Todo {
  id: number; 
  title: string;
  description: string;
  status: TodoStatus; 
}

export interface TodoCreateInput {
  title: string;
  description?: string;
}

export interface TodoUpdateInputTitleDescription {
  title?: string;
  description?: string;
}



