var CommentController = require('../controllers/comment.server.controller');

module.exports = function (app) {
  app.route('/comment')
    .post(CommentController.create);

  app.route('/comment/getByArticleId')
    .get(CommentController.listByArticleId)

  app.route('/comment/getAllByArticleId')
    .get(CommentController.allListByArticleId)

  app.route('/comment/updateCommentState')
    .post(CommentController.updateCommentState)

  app.route('/comment/updateReplyNum/:id')
    .get(CommentController.updateReplyNum)

  app.route('/deleteComment')
    .post(CommentController.delete);

  app.param('id', CommentController.getById);
}