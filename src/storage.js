/* global localStorage */

export function saveToken (token) {
  localStorage.setItem('token', token)
}

export function getStoredToken () {
  return localStorage.getItem('token')
}

export function clearUserData () {
  localStorage.removeItem('token')
  localStorage.removeItem('remember')
}
