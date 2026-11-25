const USER_KEY = "evently_users";
const SESSION_KEY = "evently_session";

export function getUsers() {
  const storedUsers = localStorage.getItem(USER_KEY);

  return storedUsers ? JSON.parse(storedUsers) : [];
}

export function saveUsers(users) {
  localStorage.setItem(USER_KEY, JSON.stringify(users));
}

export function getCurrentUser() {
  const session = localStorage.getItem(SESSION_KEY);

  return session ? JSON.parse(session) : null;
}

export function saveCurrentUser(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function removeCurrentUser() {
  localStorage.removeItem(SESSION_KEY);
}