import React from 'react';
import PropTypes from 'prop-types';

const ToggleInput = ({ toggleAllCompleted }) => (
  <div>
    <input
      onClick={toggleAllCompleted}
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
    />
    <label htmlFor="toggle-all">Mark all as complete</label>
  </div>
);

ToggleInput.propTypes = {
  toggleAllCompleted: PropTypes.func.isRequired,
};

export default ToggleInput;
