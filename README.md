# React ToDo App

Implement a simple [TODO app](https://mate-academy.github.io/react_todo-app/) that functions as described below.

> If you are unsure about how a feature should work, open the real TodoApp and observe its behavior.

![todoapp](./description/todoapp.gif)

1. Learn the markup in `App.tsx`.
2. Show only a field to create a new todo if there are no todos yet.
3. Use React Context to manage todos.
4. Each todo should have an `id` (you can use `+new Date()`), a `title`, and a `completed` status (`false` by default).
5. Save `todos` to `localStorage` using `JSON.stringify` after each change.
6. Display the number of not completed todos in `TodoApp`.
7. Implement filtering by status (`All`/`Active`/`Completed`).
8. Add the ability to delete a todo using the `x` button.
9. Implement the `clearCompleted` button (disabled if there are no completed todos).
10. Implement individual todo status toggling.
11. Implement the `toggleAll` checkbox (checked only when all todos are completed).
12. Enable inline editing for the `TodoItem`:
    - Double-clicking on the todo title shows a text field instead of the title and `deleteButton`.
    - Form submission saves changes (press `Enter` to save).
    - Trim the saved text.
    - Delete the todo if the title is empty.
    - Save changes `onBlur`.
    - Pressing `Escape` cancels editing (use `onKeyUp` and check if `event.key === 'Escape'`).

![todoedit](./description/edittodo.gif)

## Instructions

- Install the Prettier Extension and use these [VSCode settings](https://mate-academy.github.io/fe-program/tools/vscode/settings.json) to enable format on save.
- Implement a solution following the [React task guidelines](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open another terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your GitHub username in the [DEMO LINK](https://minimal005.github.io/react_todo-app/) and add it to the PR description.
