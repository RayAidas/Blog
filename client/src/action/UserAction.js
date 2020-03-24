import {
  http
} from '../util/http';

export async function register(user) {
  return await http.post('createUser', user)
    .then(response => {
      if (response.ok) {
        console.log('register success')
      } else {
        console.log('register failed');
      }
      return response.ok;
    }).catch(error => {
      console.error(error);
    });
}

export async function login(user) {
  return await http.post(`findUser`, user)
    .then(response => {
      if (response.ok) {
        console.log('login success')
      } else {
        console.log('login failed');
      }
      return response.ok;
    }).catch(error => {
      console.error(error);
    });
}

export function updateUser(user) {
  return http.post('updateUser', user)
    .then(response => {
      if (response.ok) {
        console.log('update success')
      } else {
        console.log('update failed');
      }
      return response.ok;
    }).catch(error => {
      console.error(error);
    });
}

export async function findByName(name) {
  return await http.get(`user/${name}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return new Error('请求错误');
      }
    })
    .then((data) => {
      localStorage.setItem("name", data.name);
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}

export async function updateAvatarPath(id, avatarPath, avatarName, oldName) {
  return await http.post(`updateAvatarPath`, {
      id: id,
      avatarPath: avatarPath,
      avatarName: avatarName,
      oldName: oldName
    })
    .then(response => {
      if (response.ok) {
        console.log('save avatarPath success')
      } else {
        console.log('save avatarPath failed');
      }
      return response.ok;
    }).catch(error => {
      console.error(error);
    });
}