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

export async function getArticleById(id) {
  return await fetch('http://localhost:7101/article/' + id, {
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

export function updateBlog(article) {
  return fetch('http://localhost:7101/updateArticle', {
    method: 'post',
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(article)
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

export async function updateCommentNum(articleId,num) {
  return await fetch('http://localhost:7101/article/updateCommentNum', {
    method: 'post',
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id:articleId,
      num:num
    })
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

export async function updateViewsNum(articleId,num) {
  return await fetch('http://localhost:7101/article/updateViewsNum', {
    method: 'post',
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id:articleId,
      num:num
    })
  }).then(response => {
    if (response.ok) {
      console.log('update views success')
    } else {
      console.log('update views failed');
    }
    return response.ok;
  }).catch(error => {
    console.error(error);
  });
}


export async function deleteBlog(id) {
  return await fetch(`http://localhost:7101/deleteArticle`, {
    method: 'post',
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id,
    })
  }).then(response => {
    if (response.ok) {
      console.log('delete success')
    } else {
      console.log('delete failed');
    }
    return response.ok;
  }).catch(error => {
    console.error(error);
  });
}