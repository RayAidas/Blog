var mongoose = require('mongoose');
var News = mongoose.model('News');

module.exports = {
    create: function (req, res, next) {
        var news = new News(req.body);
        news.save(function (err) {
            if (err) return next(err);

            return res.json(news);
        });
    },
    allList: function (req, res, next) {
        News
            .find()
            .exec(function (err, docs) {
                if (err) return next(err);

                return res.json(docs);
            })
    },
    list: function (req, res, next) {
        var pagesize = parseInt(req.query.pagesize, 10) || 10;
        var pagestart = parseInt(req.query.pagestart, 10) || 1;

        News
            .find()
            .skip((pagestart - 1) * pagesize)
            .limit(pagesize)
            .exec(function (err, docs) {
                if (err) return next(err);

                return res.json(docs);
            })
    },
    getById: function (req, res, next, id) {
        if (!id) return next(new Error('News not Found'));

        News
            .findOne({
                _id: id
            })
            .exec(function (err, doc) {
                if (err) return next(err);

                if (!doc) return next(new Error('News not Found'));

                req.news = doc;
                return next();
            })
    },
    get: function (req, res, next) {
        return res.json(req.news);
    },
    delete: function (req, res, doc) {
        var id = req.body.id;
        News.remove({
            _id: id
        }, function (err, removed) {
            if (err)
                res.send(err)
            else
                res.json(removed);
        });
    },
    update: function (req, res, next) {
        var id = req.body.id;
        News.findById(id, function (err, data) {
            if (err) return next(err);
            data.title = req.body.title;
            data.content = req.body.content;
            data.save(function (err) {
                return res.json(data);
            })
        })
    }
}