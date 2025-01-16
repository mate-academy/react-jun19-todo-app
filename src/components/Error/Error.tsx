import React from 'react';
import cn from 'classnames';

type ErrorProps = {
  error: string | null;
  handleCloseErrorMsg: () => void;
};


const Error: React.FC<ErrorProps> = React.memo(({ error, handleCloseErrorMsg }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        "hidden": !error,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleCloseErrorMsg}
      />
     {error}
      <br />
    </div>
  );
});

Error.displayName = 'Error';
export default Error;
