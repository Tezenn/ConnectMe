const Router = require('koa-router');
const router = new Router();

const userController = require('./controllers/userController');

router.get('/', userController.getUsers);
router.post('/nearMe', userController.nearMe);
router.post('/addUser', userController.create);
router.post('/login', userController.login);
router.post('/addMessage', userController.addMessage);
router.post('/getMessages', userController.getMessages);

module.exports = router;
