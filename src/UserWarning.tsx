import React from 'react';

export const UserWarning: React.FC = () => (
  <section className="section">
    <p className="box is-size-3">
      Please get your <b> userId </b>{' '}
      <a href="https://mate-academy.github.io/react_student-registration">
        here
      </a>{' '}
      and save it in the app <pre>const USER_ID = ...</pre>
      All requests to the API must be sent with this
      <b> userId.</b>
    </p>
  </section>
);
