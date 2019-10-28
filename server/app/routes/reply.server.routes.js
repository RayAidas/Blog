var ReplyController = require('../controllers/reply.server.controller');

module.exports = function(app){
  app.route('/reply')
    .post(ReplyController.create);
  
  app.route('/reply/getByCommentId')
    .get(ReplyController.listByCommentId)

  app.route('/reply/getAllByArticleId')
    .get(ReplyController.allListByArticleId)

  app.route('/deleteReply')
    .post(ReplyController.delete);
}