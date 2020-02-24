import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

export class AddNewTaskField extends React.Component {

  state = {
    value: '',
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  sendNewTask = (event) => {
    const { value } = this.state;

    if (event.key === 'Enter' && value.length) {
      const newTask = {
        value,
        complited: false,
        id: v4(),
      };

      this.props.updateInitialTasks(newTask);
      this.setState({
        value: '',
      });
    }
  };

  render() {
    return (
      <>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyUp={this.sendNewTask}
        />

      </>
    );
  }
}

AddNewTaskField.defaultProps = {
  initialTasksList: [],
};

AddNewTaskField.propTypes = {
  updateInitialTasks: PropTypes.func.isRequired,
};
