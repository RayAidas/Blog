import {
  http
} from '../util/http';

export function addComment(comment) {
  return http.post('comment', comment)
    .then(response => {
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

export async function getCommentByArticleId(articleId, pagestart, pagesize) {
  return await http.get('comment/getByArticleId?articleId=' + articleId + '&pagestart=' + pagestart + '&pagesize=' + pagesize)
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

export async function getAllCommentByArticleId(articleId) {
  return await http.get('comment/getAllByArticleId?articleId=' + articleId)
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

export async function deleteComment(commentId) {
  return await http.post('comment/updateCommentState', {
      commentId: commentId
    })
    .then(response => {
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

export async function updateReplyNum(commentId) {
  return await http.get(`comment/updateReplyNum/${commentId}`)
    .then(response => {
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
  return await http.post(`deleteComment`, {
      id: ArticleId,
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