var mongoose = require('mongoose');
var User = mongoose.model('User');
var fs = require('fs');

module.exports = {
	create: function (req, res, next) {
		User.findOne({
			name: req.body.name
		}, function (err, user) {
			if (err) return next(new Error('出错了'));
			if (user) return next(new Error('该用户已存在'));
			else {
				var user = new User(req.body);
				user.save(function (err) {
					if (err) return next(err);

					return res.json(user);
				});
			}
		})
	},
	getByNameAndPassword: function (req, res, next) {
		User
			.findOne({
				name: req.body.name,
				password: req.body.password
			})
			.exec(function (err, user) {
				if (err) return next(err);

				if (!user) return next(new Error('密码错误'));

				return res.json(user);
			})
	},
	delete: function (req, res, doc) {
		var id = req.body.id;
		User.remove({
			_id: id
		}, function (err, removed) {
			if (err)
				res.send(err)
			else
				res.json(removed);
		});
	},
	update: function (req, res) {
		var id = req.body.id;
		var user = req.body;
		User.updateOne({
			_id: id
		}, user, function (err, result) {
			if (err) {
				throw err;
			}
			return res.json(result)
		})
	},
	getByName: function (req, res, next, name) {
		if (!name) return next(new Error('User not Found'));

		User
			.findOne({
				name: name
			})
			.exec(function (err, doc) {
				if (err) return next(err);

				if (!doc) return next(new Error('User not Found'));

				req.user = doc;
				return next();
			})
	},
	get: function (req, res, next) {
		return res.json(req.user);
	},
	uploadAvatar: function (req, res) {
		if (req.files === null) {
			return res.status(400).json({
				msg: 'no file uploaded'
			});
		}
		const file = req.files.file;

		file.mv(`${__dirname}/../../../client/public/uploads/${file.name}`, err => {
			if (err) {
				console.error(err);
				return res.status(500).send(err);
			}
			return res.json({
				fileName: file.name,
				filePath: `http://localhost:3001/public/uploads/${file.name}`,
			})
		});
	},
	updateAvatarPath: function (req, res, next) {
		var id = req.body.id;
		User.findById(id, function (err, data) {
			if (err) return next(err);
			if (req.body.oldName !== null) {
				fs.unlink(`${__dirname}/../../../client/public/uploads/${req.body.oldName}`, function (err) {
					if (err) {
						console.log('删除失败')
					} else {
						console.log('上传成功')
					}
				});
			}
			data.avatarPath = req.body.avatarPath;
			data.avatarName = req.body.avatarName;
			data.save(function (err) {
				return res.json(data);
			})
		})
	}
}