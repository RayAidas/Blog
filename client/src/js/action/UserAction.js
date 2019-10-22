export async function register(user) {
  return await fetch('http://localhost:7101/createUser', {
    method: 'post',
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(response => {
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
  return await fetch(`http://localhost:7101/findUser`, {
    method: 'post',
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(response => {
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
  return fetch('http://localhost:7101/updateUser', {
    method: 'post',
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(response => {
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
  return await fetch(`http://localhost:7101/user/${name}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      mode: 'cors',
      cache: 'default'
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return new Error('请求错误');
      }
    })
    .then((data) => {
      localStorage.setItem("name",data.name);
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}