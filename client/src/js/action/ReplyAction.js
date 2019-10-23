export function addReply(replyContent) {
  return fetch('http://localhost:7101/reply', {
    method: 'post',
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(replyContent)
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

export async function getReplyByCommentId(commentId,pagestart,pagesize) {
  return await fetch('http://localhost:7101/reply/getByCommentId?commentId=' + commentId+'&pagestart=' + pagestart + '&pagesize=' + pagesize, {
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

export async function getAllreplyByArticleId(articleId) {
  return await fetch('http://localhost:7101/reply/getAllByArticleId?articleId=' + articleId, {
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