import { request, BASE_URL } from './api';
import { myUserId } from './user';

const API_URL = 'https://mate.academy/students-api/todos';

export const getMyTodos = () => {
  const URL = `${BASE_URL}/todos?userId=${myUserId}`;

  return fetch(URL)
    .then(res => res.json());
};

export const postNewTodo = (title: string) => {
  const URL = `${API_URL}`;

  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      userId: myUserId,
      completed: false,
      id: +new Date(),
    }),
  })
    .then(res => res.json());
};

export const removeTodo = (todoId: number) => {
  fetch(`${API_URL}/${todoId}`, { method: 'DELETE' });
};

export const editTodo = (url: string, data: {}) => {
  return request(url, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
};
