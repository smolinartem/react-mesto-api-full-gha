/* const BASE_URL = 'https://auth.nomoreparties.co/' */
const BASE_URL = 'http://localhost:3000'

class Auth {
  constructor(url) {
    this._url = url
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res.status)
    }
  }

  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(this._handleResponse)
  }

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(this._handleResponse)
  }

  getData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include'
    }).then(this._handleResponse)
  }

  signOut() {
    return fetch(`${this._url}/signout`, {
      method: 'GET',
      credentials: 'include'
    }).then(this._handleResponse)
  }
}

export const auth = new Auth(BASE_URL)
