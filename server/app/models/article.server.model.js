var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
  title: String,
  author:String,
  authorId:String,
  fav_User:{
    type:Array,
    default:[]
  },
  fav_nums:{
    type:Number,
    default:0
  },
  views:{
    type:Number,
    default:0
  },
  comment:{
    type:Number,
    default:0
  },
  tag: {
    type:Array,
    default:[]
  },
  content:String,
  type:String,
  description:String,
  createTime: {
    type: Date,
    default: Date.now
  },
  statement:{
    type:String,
    default:'#原创'
  }
});

var Article = mongoose.model('Article',ArticleSchema)