var mongoose = require('mongoose');
var Reply = mongoose.model('Reply');

module.exports = {
  create:function(req,res,next){
    var reply = new Reply(req.body);
    reply.save(function(err){
      if(err) return next(err);

      return res.json(reply);
    })
  },
  allListByArticleId:function(req,res,next){
    var articleId = req.query.articleId;
    Reply
      .find({
        articleId:articleId
      })
      .exec(function (err, docs) {
        if (err) return next(err);

        return res.json(docs);
      })
  },
  listByCommentId:function(req,res,next){
    var pagesize = parseInt(req.query.pagesize, 10) || 10;
    var pagestart = parseInt(req.query.pagestart, 10) || 1;
    var commentId = req.query.commentId;
    Reply
      .find({
        topicId:commentId
      })
      .skip((pagestart - 1) * pagesize)
      .limit(pagesize)
      .exec(function (err, docs) {
        if (err) return next(err);

        return res.json(docs);
      })
  },
  delete: function (req, res, doc) {
    var id = req.body.id;
    Reply
      .remove({
        articleId: id
      }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
      });
  },
}