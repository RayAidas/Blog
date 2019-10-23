var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require("cors");  


module.exports  =function(){
  console.log('init expesss...');
  var app = express();

  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, "../../client")));

  app.use(cors()); 

  require('../app/routes/users.server.routes')(app);
  require('../app/routes/article.server.routes')(app);
  require('../app/routes/comment.server.routes')(app);
  require('../app/routes/reply.server.routes')(app);

  // 处理所有未知的请求
  app.use(function(req, res, next){
    res.status(404);
    try {
      return res.json('Not Found');
    } catch(e) {
      console.error('404 set header after sent');
    } 
  });

  // 统一处理出错的情况
  app.use(function(err, req, res, next){
    if(!err) {return next()}
    res.status(500);
    try {
      return res.json(err.message || 'server error');
    } catch(e) {
      console.error('500 set header after sent');
    }
  });

  return app;
};