const USERS_KEY = 'popx_users';
const SESSION_KEY = 'popx_session';

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUser(email, password) {
  return getUsers().find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
}

export function emailExists(email) {
  return getUsers().some((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function setSession(email) {
  localStorage.setItem(SESSION_KEY, email);
}

export function getSession() {
  const email = localStorage.getItem(SESSION_KEY);
  if (!email) return null;
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
