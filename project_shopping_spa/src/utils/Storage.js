export const getItem = (key) => {
  const data = localStorage.getItem(key);
  if (!data) return false;
  return JSON.parse(data);
};

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};
