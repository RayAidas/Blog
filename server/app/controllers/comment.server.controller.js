var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

module.exports = {
  create: function (req, res, next) {
    var comment = new Comment(req.body);
    comment.save(function (err) {
      if (err) return next(err);

      return res.json(comment);
    })
  },
  getById: function (req, res, next, id) {
    if (!id) return next(new Error('Comment not Found'));

    Comment
      .findOne({
        _id: id
      })
      .exec(function (err, doc) {
        if (err) return next(err);

        req.comment = doc;
        return next();
      })
  },
  allListByArticleId: function (req, res, next) {
    var articleId = req.query.articleId;
    Comment
      .find({
        articleId: articleId
      })
      .exec(function (err, docs) {
        if (err) return next(err);

        return res.json(docs);
      })
  },
  listByArticleId: function (req, res, next) {
    var pagesize = parseInt(req.query.pagesize, 10) || 10;
    var pagestart = parseInt(req.query.pagestart, 10) || 1;
    var articleId = req.query.articleId;
    Comment
      .find({
        articleId: articleId
      })
      .skip((pagestart - 1) * pagesize)
      .limit(pagesize)
      .exec(function (err, docs) {
        if (err) return next(err);

        return res.json(docs);
      })
  },
  updateCommentState: function (req, res, next) {
    var id = req.body.commentId;
    Comment.findById(id, function (err, data) {
      if (err) return next(err);
      data.commentState = false;
      data.save(function (err) {
        return res.json(data);
      })
    })
  },
  updateReplyNum: function (req, res) {
    var id = req.comment._id;
    var num = req.comment.replies + 1;
    Comment
      .updateOne({
        _id: id
      }, {
        $set: {
          replies: num
        }
      }, function (err, result) {
        if (err) {
          throw err;
        }
        return res.json(result);
      })
  },
  delete: function (req, res, doc) {
    var id = req.body.id;
    Comment
      .remove({
        articleId: id
      }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
      });
  },
}