import { createContext, ReactNode, useState } from 'react';

type EditContextType = {
  editedTodoId: number | null;
  setEditedTodoId: (id: number | null) => void;
};

export const EditContext = createContext<EditContextType>({
  editedTodoId: null,
  setEditedTodoId: () => {},
});

export const EditProvider = ({ children }: { children: ReactNode }) => {
  const [editedTodoId, setEditedTodoId] = useState<number | null>(null);

  return (
    <EditContext.Provider value={{ editedTodoId, setEditedTodoId }}>
      {children}
    </EditContext.Provider>
  );
};
