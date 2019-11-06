import React from 'react';
import classNames from 'classnames/';

function TodoItem({
  item, toDelete, toggled, editText, editEnter, index,
}) {
  return (
    <li
      className={classNames(
        item.done ? 'completed' : '',
        item.editModeItemIndex === index + 1 ? 'editing' : '',
      )}
      onDoubleClick={() => editText(index + 1)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`todo-${item.id}`}
          onChange={() => toggled(item.id)}
          checked={item.done}
        />
        <label htmlFor={`todo-${item.id}`}>{ item.title }</label>
        <button
          type="button"
          className="destroy"
          onClick={() => toDelete(item.id)}
        />
      </div>
      {item.editModeItemIndex
        && (
          <input
            type="text"
            className="edit"
            autoFocus={true}
            defaultValue={item.title}
            onKeyDown={event => editEnter(event)}
            id={`todo-${item.id}`}
          />
        )}
    </li>
  );
}

export default TodoItem;
