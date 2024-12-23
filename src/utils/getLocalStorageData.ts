export function getLocalStorage<T>(key: string, value: T) {
  const data = localStorage.getItem(key);

  if (!data) {
    localStorage.setItem(key, JSON.stringify(value));

    return value;
  }

  try {
    return JSON.parse(data);
  } catch {
    localStorage.removeItem(key);

    return value;
  }
}
