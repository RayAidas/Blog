export function addComment(comment) {
  return fetch('http://localhost:7101/comment', {
    method: 'post',
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(response => {
    if (response.ok) {
      console.log('add comment success')
    } else {
      console.log('add comment failed');
    }
    return response.ok;
  }).catch(error => {
    console.error(error);
  });
}

export async function getCommentByArticleId(articleId,pagestart,pagesize) {
  return await fetch('http://localhost:7101/comment/getByArticleId?articleId=' + articleId+'&pagestart=' + pagestart + '&pagesize=' + pagesize, {
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

export async function getAllCommentByArticleId(articleId) {
  return await fetch('http://localhost:7101/comment/getAllByArticleId?articleId=' + articleId, {
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

export async function deleteComment(commentId) {
  return await fetch('http://localhost:7101/comment/updateCommentState', {
    method: 'post',
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      commentId:commentId
    })
  }).then(response => {
    if (response.ok) {
      console.log('update commentState success')
    } else {
      console.log('update commentState failed');
    }
    return response.ok;
  }).catch(error => {
    console.error(error);
  });
}

 export async function updateReplyNum(commentId,num) {
  return await fetch('http://localhost:7101/comment/updateReplyNum', {
    method: 'post',
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id:commentId,
      num:num
    })
  }).then(response => {
    if (response.ok) {
      console.log('update reply success')
    } else {
      console.log('update reply failed');
    }
    return response.ok;
  }).catch(error => {
    console.error(error);
  });
}

export async function deleteCommentByArticleId(ArticleId) {
  return await fetch(`http://localhost:7101/deleteComment`, {
    method: 'post',
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: ArticleId,
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