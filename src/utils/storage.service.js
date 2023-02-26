const setItem = (key, value) => {
  localStorage.setItem(key, value);
};

const getItem = (key) => localStorage.getItem(key) || false;

const removeItem = (key) => getItem(key) === false ? false : localStorage.removeItem(key);
// const removeItem = (key: string): void | boolean => {
//   return localStorage.removeItem(key) || false;
// };

const clearStorage = () => {
  localStorage.clear();
};

export { setItem, getItem, removeItem, clearStorage };