/* global localStorage */

export function saveToken (token) {
  localStorage.setItem('token', token)
}

export function getStoredToken () {
  return localStorage.getItem('token')
}

export function setRemember () {
  localStorage.setItem('remember', 1)
}

export function shouldRemember () {
  return localStorage.getItem('remember')
}

export function clearUserData () {
  localStorage.removeItem('token')
  localStorage.removeItem('remember')
}
