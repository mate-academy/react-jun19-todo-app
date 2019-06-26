import React from "react";

const ToDoItem = props => {
  return (
    <section className="main" style={{ display: "block" }}>
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {props.items.map(item => {
          return (
            <li key={item.id} className={item.isCompleted && "completed"}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={item.isCompleted}
                  onClick={() => {
                    props.toggleItem(item.id);
                  }}
                />
                <label>{item.text}</label>
                <button
                  className="destroy"
                  onClick={() => props.deleteToDoItem(item.id)}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ToDoItem;
