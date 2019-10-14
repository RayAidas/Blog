var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

module.exports = {
  create: function(req,res,next){
    var comment = new Comment(req.body);
    comment.save(function(err){
      if(err) return next(err);

      return res.json(comment);
    })
  },
  allListByArticleId: function(req,res,next){
    var articleId = req.query.articleId;
    Comment
      .find({articleId:articleId})
      .exec(function(err,docs){
        if(err) return next(err);

        return res.json(docs);
      })
  },
  listByArticleId: function(req,res,next){
    var pagesize = parseInt(req.query.pagesize, 10) || 10;
    var pagestart = parseInt(req.query.pagestart, 10) || 1;
    var articleId = req.query.articleId;
    Comment
      .find({articleId:articleId})
      .skip((pagestart - 1) * pagesize)
      .limit(pagesize)
      .exec(function (err, docs) {
        if (err) return next(err);

        return res.json(docs);
      })
  }
}