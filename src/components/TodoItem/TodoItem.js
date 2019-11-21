import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false,
      editTask: '',
    };

    this.fieldRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      editTask: this.props.todo.task,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.showEditField && !prevProps.showEditField) {
      this.fieldRef.current.focus();
    }
  }

  selectItem = () => {
    this.setState((prevState) => {
      const { completed } = prevState;
      const status = !completed;
      const { setActive, todo } = this.props;

      setActive(todo.id, !status);

      return {
        completed: status,
      };
    });
  }

  destroyTodo = () => {
    const { deleteTodo, todo } = this.props;

    deleteTodo(todo.id);
  }

  inputChanged = (event) => {
    this.setState({
      editTask: event.target.value,
    });
  }

  doubleClicked = (event, id) => {
    event.preventDefault();
    this.props.editTodo(id);
  }

  focusChanged = () => {
    this.props.onFocusChanged();
  }

  dropChanges = (event) => {
    if (event.keyCode === 27) {
      this.focusChanged();
    }
  }

  render() {
    const { todo, editTodoId, showEditField } = this.props;
    const { editTask } = this.state;

    return (
      <li
        className={`${todo.isActive ? '' : 'completed'}
            ${showEditField ? ' editing' : ''}`}
      >
        <div
          className="view"
          style={
            editTodoId === todo.id
              ? { display: 'none' }
              : { display: 'block' }
          }
        >
          <input
            onChange={this.selectItem}
            type="checkbox"
            checked={!todo.isActive}
            className="toggle"
            id={`todo-${todo.id}`}
          />
          <label
            onClick={this.selectItem}
            htmlFor={`todo-${todo.id}`}
            onDoubleClick={event => this.doubleClicked(event, todo.id)}
          >
            {todo.task}
          </label>
          <button
            onClick={this.destroyTodo}
            type="button"
            className="destroy"
          />
        </div>
        <form onSubmit={event => this.props.submitEditItem(event, editTask)}>
          <input
            onBlur={this.focusChanged}
            className="edit"
            onKeyUp={this.dropChanges}
            ref={this.fieldRef}
            onChange={this.inputChanged}
            value={editTask}
            placeholder="What do you want to change?"
            style={
              editTodoId === todo.id
                ? { display: 'block' }
                : { display: 'none' }
            }
          />
        </form>
      </li>
    );
  }
}

TodoItem.propTypes = {
  setActive: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number,
    isActive: PropTypes.bool,
    task: PropTypes.string,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  showEditField: PropTypes.bool.isRequired,
  editTodoId: PropTypes.number,
  submitEditItem: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  onFocusChanged: PropTypes.func.isRequired,
};

TodoItem.defaultProps = {
  editTodoId: null,
};

export default TodoItem;
