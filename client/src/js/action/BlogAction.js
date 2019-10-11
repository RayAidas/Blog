export function addBlog(article) {
  return fetch('http://localhost:7101/article', {
    method: 'post',
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(article)
  }).then(response => {
    if (response.ok) {
      console.log('add success')
    } else {
      console.log('add failed');
    }
    return response.ok;
  }).catch(error => {
    console.error(error);
  });
}

export async function getAllList() {
  return await fetch('http://localhost:7101/article/allList', {
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
      // console.log(data);
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}

export async function getList(pagestart, pagesize) {
  return await fetch('http://localhost:7101/article?pagestart=' + pagestart + '&pagesize=' + pagesize, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      mode: 'cors',
      cache: 'default',
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return new Error('请求错误');
      }
    })
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}

export async function getAllListByName(author) {
  return await fetch('http://localhost:7101/article/getAllListByName?author=' + author, {
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
      // console.log(data);
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}

export async function getListByName(author, pagestart, pagesize) {
  return await fetch('http://localhost:7101/article/getListByName?author=' + author + '&pagestart=' + pagestart + '&pagesize=' + pagesize, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      mode: 'cors',
      cache: 'default',
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return new Error('请求错误');
      }
    })
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}