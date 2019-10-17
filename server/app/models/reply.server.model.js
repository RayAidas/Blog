var mongoose = require('mongoose');

var ReplySchema = new mongoose.Schema({
  topicId:String,
  respondent:String,
  replyContent:String,
  fromUserName:String,
  toUserName:String,
  toUserContent:String,
  replyState:{
    type:Boolean,
    default:true
  },
  isLv3:{
    type:Boolean,
    default:false
  },
  createTime:{
    type:Date,
    default:Date.now
}
});

var Reply = mongoose.model('Reply',ReplySchema);
