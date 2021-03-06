var ArticleController = require('../controllers/article.server.controller');

module.exports = function(app){
  app.route('/article')
    .get(ArticleController.list)
    .post(ArticleController.create);

  app.route('/article/getAllListByName')
    .get(ArticleController.getAllListByName);

  app.route('/article/getListByName')
    .get(ArticleController.getListByName);

  app.route('/deleteArticle')
    .post(ArticleController.delete);

  app.route('/updateArticle')
    .post(ArticleController.update);

  app.route('/article/allList')
    .get(ArticleController.allList);

  app.route('/article/:id')
    .get(ArticleController.get);

  app.route('/article/updateCommentNum/:id')
    .get(ArticleController.updateCommentNum)

  app.route('/article/updateViewsNum/:id')
    .get(ArticleController.updateViewsNum)

  app.param('id',ArticleController.getById);
}