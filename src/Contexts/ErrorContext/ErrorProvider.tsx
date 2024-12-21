import React from 'react';
import { ReactNode, useState } from 'react';

import { ErrorContext } from './ErrorContext';

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      {children}
    </ErrorContext.Provider>
  );
};
