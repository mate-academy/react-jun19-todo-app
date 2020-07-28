import React from 'react';
import { PropTypes } from 'prop-types';
import cn from 'classnames';
import './TodoItem.css';

export class TodoItem extends React.Component {
  state = {
    editing: false,
    todoEditingValue: this.props.todo.title,
  };

  todoInput = React.createRef();

  componentDidUpdate() {
    if (this.state.editing) {
      this.focusTodoInput();
    }
  }

  focusTodoInput = () => {
    const inputNode = this.todoInput;

    if (inputNode) {
      inputNode.current.focus();
    }
  }

  handleBlur = () => {
    const {
      onSaveEdit,
      todo,
    } = this.props;

    onSaveEdit(this.state.todoEditingValue, todo.id);

    this.setState(prevState => ({
      ...prevState,
      editing: false,
    }));
  }

  handleInputEdit = (event) => {
    const {
      onSaveEdit,
      todo,
    } = this.props;

    if (event.key === 'Escape') {
      this.setState(prevState => ({
        ...prevState,
        todoEditingValue: todo.title,
        editing: false,
      }));
    } else if (event.key === 'Enter') {
      onSaveEdit(this.state.todoEditingValue, todo.id);

      this.setState(prevState => ({
        ...prevState,
        editing: false,
      }));
    }
  };

  onEdit = () => {
    this.setState(prevState => ({
      ...prevState,
      editing: true,
    }));
  };

  onInputTodoTitle = (event) => {
    const { target: { value } } = event;

    this.setState(prevState => ({
      ...prevState,
      todoEditingValue: value,
    }));
  };

  render() {
    const {
      todo,
      onStatus,
      onRemove,
    } = this.props;
    const {
      id,
      title,
      completed,
    } = todo;

    return (
      <li
        className={cn('item', { completed }, { editing: this.state.editing })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={id}
            checked={completed}
            onChange={() => onStatus(id)}
          />
          <label
            htmlFor={id}
            onDoubleClick={this.onEdit}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => onRemove(id)}
          />
        </div>
        <input
          ref={this.todoInput}
          type="text"
          className="input edit"
          value={this.state.todoEditingValue}
          onKeyDown={this.handleInputEdit}
          onChange={this.onInputTodoTitle}
          onBlur={this.handleBlur}
        />
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onStatus: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
};
