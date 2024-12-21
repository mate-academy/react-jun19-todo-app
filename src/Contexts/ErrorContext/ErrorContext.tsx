import { createContext } from 'react';

type Props = {
  errorMessage: string | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const ErrorContext = createContext<Props>({
  errorMessage: '',
  setErrorMessage: () => {},
});
