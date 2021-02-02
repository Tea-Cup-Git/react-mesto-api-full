import { getToken } from './token';

class Api {
  constructor({ baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _getHeaders() {
    const token = getToken();

    return {
      ...this._headers,
      'Authorization': `Bearer ${token}`
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
    })
      .then(this._handleResponse)
  }

  addCard({ name, link, alt }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        link,
        alt
      })
    })
      .then(this._handleResponse)
  }

  removeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
      .then(this._handleResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
    })
      .then(this._handleResponse)
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._handleResponse)
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._handleResponse)
  }

  changeLikeCardStatus(cardID, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._getHeaders(),
    })
      .then(this._handleResponse)
  }

  changeLikeCardStatus(cardID, like) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: this._getHeaders(),
    })
      .then(this._handleResponse)
  }
}

const api = new Api({
  baseUrl: 'http://api.lebedeva.students.nomoredomains.work',
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  }
})

export default api;
