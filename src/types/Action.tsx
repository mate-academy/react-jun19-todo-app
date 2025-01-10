import { ActionType } from './ActionType';
import { Todo } from './Todo';

export type Action =
  | { type: ActionType.Add; payload: Todo }
  | { type: ActionType.Delete; payload: number }
  | { type: ActionType.AllCompletedDelete }
  | { type: ActionType.Completed; payload: number }
  | { type: ActionType.AllCompleted }
  | { type: ActionType.UpdateTitle; payload: { id: number; title: string } }
  | { type: ActionType.FilterAll }
  | { type: ActionType.FilterActive }
  | { type: ActionType.FilterCompleted };
