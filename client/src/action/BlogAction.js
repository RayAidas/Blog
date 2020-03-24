import {
  http
} from '../util/http';

export function addBlog(article) {
  return http.post('article', article)
    .then(response => {
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
  return await http.get('article/allList')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return new Error('请求错误');
      }
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}

export async function getList(pagestart, pagesize) {
  return await http.get('article?pagestart=' + pagestart + '&pagesize=' + pagesize)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return new Error('请求错误');
      }
    })
    .then((data) => {
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}

export async function getAllListByName(author) {
  return await http.get('article/getAllListByName?author=' + author)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return new Error('请求错误');
      }
    })
    .then((data) => {
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}

export async function getListByName(author, pagestart, pagesize) {
  return await http.get('article/getListByName?author=' + author + '&pagestart=' + pagestart + '&pagesize=' + pagesize)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return new Error('请求错误');
      }
    })
    .then((data) => {
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}

export async function getArticleById(id) {
  return await http.get('article/' + id)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return new Error('请求错误');
      }
    })
    .then((data) => {
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}

export function updateBlog(article) {
  return http.post('updateArticle', article)
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

export async function updateCommentNum(articleId) {
  return await http.get(`article/updateCommentNum/${articleId}`)
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

export async function updateViewsNum(articleId) {
  return await http.get(`article/updateViewsNum/${articleId}`)
    .then(response => {
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
  return await http.post(`deleteArticle`, {
      id: id
    })
    .then(response => {
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