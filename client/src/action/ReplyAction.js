import {
  http
} from '../util/http';

export function addReply(replyContent) {
  return http.post('reply', replyContent)
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

export async function getReplyByCommentId(commentId, pagestart, pagesize) {
  return await http.get('reply/getByCommentId?commentId=' + commentId + '&pagestart=' + pagestart + '&pagesize=' + pagesize)
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

export async function getAllreplyByArticleId(articleId) {
  return await http.get('reply/getAllByArticleId?articleId=' + articleId)
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

export async function deleteReplyByArticleId(ArticleId) {
  return await http.post(`deleteReply`, {
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