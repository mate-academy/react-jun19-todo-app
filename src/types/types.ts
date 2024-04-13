export type Todo = {
  id: number;
  title: string;
  isEditing: boolean;
  isCompleted: boolean;
};

export enum Filter {
  All = 'All',
  Completed = 'Completed',
  Active = 'Active',
}
