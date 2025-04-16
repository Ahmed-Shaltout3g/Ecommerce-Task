const USER_KEY = "users";

export const getUsers = () => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : [];
};

export const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USER_KEY, JSON.stringify(users));
};

export const deleteUser = (id) => {
  const users = getUsers().filter((u) => u.id !== id);
  localStorage.setItem(USER_KEY, JSON.stringify(users));
};
