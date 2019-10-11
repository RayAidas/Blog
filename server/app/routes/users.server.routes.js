var UserController = require('../controllers/users.server.controller');

module.exports = function(app){
    app.route('/createUser')
        .post(UserController.create);

    app.route('/updateUser')
        .post(UserController.update);

    app.route('/findUser')
        .post(UserController.getByNameAndPassword);

    app.route('/deleteUser')
        .post(UserController.delete);

    app.route('/user/:name')
		.get(UserController.get);
        
    app.param('name',UserController.getByName);
}