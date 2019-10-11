var NewsController = require('../controllers/news.server.controller');

module.exports = function (app) {
	app.route('/news')
		.get(NewsController.list)
		.post(NewsController.create);

	app.route('/news/:nid')
		.get(NewsController.get);

	app.route('/delete')
		.post(NewsController.delete);

	app.route('/update')
		.post(NewsController.update);

	app.route('/allList')
		.get(NewsController.allList);

	app.route('/list/:pageStart')
		.get(NewsController.list)

	app.param('nid',NewsController.getById);
}