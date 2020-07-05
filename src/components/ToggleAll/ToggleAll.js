import React from 'react';
import PropTypes from 'prop-types';

const ToggleAll = ({ items, toggleAllCompleted }) => {
  const isAllCompleted = items.every(item => item.completed);

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={isAllCompleted}
        onChange={() => toggleAllCompleted(isAllCompleted)}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};

export default ToggleAll;

ToggleAll.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  toggleAllCompleted: PropTypes.func.isRequired,
};
