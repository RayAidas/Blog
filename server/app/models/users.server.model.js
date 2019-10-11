var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name:String,
    password:String,
    description:{
        type:String,
        default:'这个人很懒.'
    },
    age:Number,
    sex:String,
    email:String,
    tel:String,
    createTime:{
        type:Date,
        default:Date.now
    }
});

var User = mongoose.model('User',UserSchema);