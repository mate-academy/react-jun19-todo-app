import React from 'react';
import PropTypes from 'prop-types';

class AddTodo extends React.Component {
  state = {
    text: '',
    errorsList: '',
  }

  handleTodoInput = (event) => {
    this.setState({
     text: event.target.value.replace(/[^ \wа-яА-ЯІіЇїЁё]/g, ''),
     errorsList: false,
    });
  };

  handleTodoAdd = (event) => {
    const {handleTodoAdd} = this.props
    let {
      errorsList,
      text,
        } = this.state;
    if (event.key === 'Enter') {
      event.preventDefault();
      this.setState ((prevState => {
        if (!prevState.text) {
          errorsList = true;
        }
        if (errorsList) {
          return { errorsList };
        }
      handleTodoAdd({
        text: text,
        id: Date.now(),
        completed: false,
      });
    }))
      this.resetState();
    }
   };

  resetState() {
    this.setState({
      text: '',

    });
  };

  render () {
    const {
      errorsList,
      text,
          } = this.state;
    return (
      <form>
        <input
          className="new-todo"
          placeholder={ errorsList
            ? "Enter the todo first"
            : "What needs to be done?" }
          value={text}
          onChange={this.handleTodoInput}
          onKeyPress={this.handleTodoAdd}
        />
      </form>
    )
  };
}

AddTodo.propTypes = {
  handleTodoAdd: PropTypes.func.isRequired,
};

export default AddTodo;
