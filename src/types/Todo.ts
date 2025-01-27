export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export enum Filters {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export enum Actions {
  AddTodo,
  UpdateTodo,
  DeleteTodo,
  ClearCompleted,
  ToggleTodo,
  ToggleAllTodos,
  Filter,
  RenameTodo,
}
