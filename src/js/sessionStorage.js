export const saveToSessionStorage = (name, value) => {
  const data = value instanceof Date ? value.toISOString() : value;
  sessionStorage.setItem(name, data);
};

export const getItemFromSessionStorage = name => {
  return sessionStorage.getItem(name);
};
