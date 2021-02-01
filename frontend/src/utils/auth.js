import { setToken } from './token';

// export const BASE_URL = 'http://api.lebedeva.students.nomoredomains.work';

export const BASE_URL = 'http://localhost:3000';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      if (res.ok) return res.json();
      else return Promise.reject(res.statusText);
    });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      if (res.ok) return res.json();
      else return Promise.reject(res.statusText);
    })
    .then((data) => {
      if (data.token) {
        setToken(data.token);
        return data;
      }
    });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res => {
    let data = res.json();
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return data;
  }))
};