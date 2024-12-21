import React, { useContext, useEffect } from 'react';

import { ErrorContext } from '../../Contexts/ErrorContext/ErrorContext';

import classNames from 'classnames';

export const Error: React.FC = () => {
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);

  useEffect(() => {
    setTimeout(() => setErrorMessage(''), 3000);
  });

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage('')}
      />
      {errorMessage}
    </div>
  );
};
