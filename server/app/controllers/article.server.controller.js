var mongoose = require('mongoose');
var Article = mongoose.model('Article');

module.exports = {
  create: function (req, res, next) {
    var article = new Article(req.body);
    article.save(function (err) {
      if (err) return next(err);

      return res.json(article);
    })
  },
  allList: function (req, res, next) {
    Article
      .find()
      .exec(function (err, docs) {
        if (err) return next(err);

        return res.json(docs);
      })
  },
  list: function (req, res, next) {
    var pagesize = parseInt(req.query.pagesize, 10) || 10;
    var pagestart = parseInt(req.query.pagestart, 10) || 1;

    Article
      .find()
      .skip((pagestart - 1) * pagesize)
      .limit(pagesize)
      .exec(function (err, docs) {
        if (err) return next(err);

        return res.json(docs);
      })
  },
  getById: function (req, res, next, id) {
    if (!id) return next(new Error('Article not Found'));

    Article
      .findOne({
        _id: id
      })
      .exec(function (err, doc) {
        if (err) return next(err);

        req.article = doc;
        return next();
      })
  },
  get: function (req, res, next) {
    return res.json(req.article);
  },
  delete: function (req, res, doc) {
    var id = req.body.id;
    Article
      .remove({
        _id: id
      }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
      });
  },
  update: function (req, res, next) {
    var id = req.body.id;
    var article = req.body;
    Article
      .findById(id, function (err, doc) {
        if (err) return next(err);
        article
          .save(function (err) {
            return res.json(user);
          });
      });
  },
  getAllListByName: function (req, res, next) {
    var author = req.query.author;
    Article
      .find({author:author})
      .exec(function (err, docs) {
        if (err) return next(err);

        return res.json(docs);
      })
  },
  getListByName: function(req,res,next){
    var pagesize = parseInt(req.query.pagesize, 10) || 10;
    var pagestart = parseInt(req.query.pagestart, 10) || 1;
    var author = req.query.author;
    Article
      .find({author:author})
      .skip((pagestart - 1) * pagesize)
      .limit(pagesize)
      .exec(function (err, docs) {
        if (err) return next(err);

        return res.json(docs);
      })
  }
}