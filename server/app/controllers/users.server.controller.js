var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
    create:function(req,res,next){
        User.findOne({name:req.body.name},function(err,user){
            if(err) return next(new Error('出错了'));
            if(user) return next(new Error('该用户已存在'));
            else{
                var user = new User(req.body);
                user.save(function(err){
                    if(err) return next(err);
        
                    return res.json(user);
                });
            }
        })
    },
    getByNameAndPassword:function(req,res,next){
        User
        .findOne({name:req.body.name,password:req.body.password})
        .exec(function(err,user){
            if(err) return next(err);

            if(!user) return next(new Error('密码错误'));

            return res.json(user);
        })
    },
    delete:function(req,res,doc){
        var id = req.body.id;
        User.remove({_id:id},function(err,removed){
            if (err)
                res.send(err)
            else
                res.json(removed);
        });
    },
    update:function(req,res,next){
        var id = req.body.id;
        User.findById(id,function(err,data){
            if(err) return next(err);
            data.name = req.body.name;
            data.password = req.body.password;
            data.description = req.body.description;
            data.age = req.body.age;
            data.sex = req.body.sex;
            data.email = req.body.email;
            data.tel = req.body.tel;
            data.save(function(err){
                return res.json(data);
            })
        })
    },
    getByName:function(req,res,next,name){
        if(!name) return next(new Error('User not Found'));

        User
        .findOne({name:name})
        .exec(function(err,doc){
            if(err) return next(err);

            if(!doc) return next(new Error('User not Found'));

            req.user = doc;
            return next();
        })
    },
    get:function(req,res,next){
        return res.json(req.user);
    },
}