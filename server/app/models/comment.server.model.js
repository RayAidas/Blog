var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  userId:String,
  userName:{
    type:String,
    default:'匿名用户'
  },
  articleId:String,
  commentContent:String,
  commentState:{
    type:Boolean,
    default:true
  },
  commentTime:{
    type:Date,
    default:Date.now
  },
});

var Comment = mongoose.model('Comment',CommentSchema);
