import { Todo } from './Todo';

export type ManageTodos = {
  action: 'add' | 'delete' | 'updateTitle' | 'updateStatus' | 'updateStatusAll';
  id?: number | undefined;
  newItem?: Todo;
  newTitle?: string;
};
