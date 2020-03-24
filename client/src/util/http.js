import {
  config
} from '../config/config';

export const http = {
  get: function (url) {
    return fetch(config.api_base_url + url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      mode: 'cors',
      cache: 'default'
    })
  },

  post: function (url, data = {}) {
    return fetch(config.api_base_url + url, {
      method: 'POST',
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
}