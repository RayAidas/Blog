var mongoose = require('mongoose');
var config = require('./config');

module.exports = function(){
  var db = mongoose.connect(config.mongodb,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // 导入 model
  require('../app/models/users.server.model');
  require('../app/models/article.server.model');
  require('../app/models/comment.server.model');
  require('../app/models/reply.server.model');
  return db;
};