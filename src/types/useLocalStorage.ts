import { Todo } from './Todo';
import { ManageTodos } from './ManageTodos';

export type ReturnValue = [
  Todo[],
  () => void,
  ({ action, id, newItem, newTitle }: ManageTodos) => void,
];
