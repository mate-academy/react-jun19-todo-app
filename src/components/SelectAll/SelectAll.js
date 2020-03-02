import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SelectAll.css';

export class SelectAll extends Component {
  state = {
    isChecked: false,
  };

handleChange = (event) => {
  const { checked } = event.target;

  this.setState({
    isChecked: checked,
  });
  this.props.selectAll(checked);
};

render() {
  const { isChecked } = this.state;
  const { isSelectedAll } = this.props;

  return (
    <>
      <input
        checked={isSelectedAll}
        onChange={this.handleChange}
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
      />
      <label htmlFor="toggle-all">
        { isChecked
          ? <span className="tooltip">Uncheck all</span>
          : <span className="tooltip">Mark all as completed</span>
        }
      </label>
    </>
  );
}
}

SelectAll.propTypes = {
  selectAll: PropTypes.func.isRequired,
  isSelectedAll: PropTypes.bool.isRequired,
};
