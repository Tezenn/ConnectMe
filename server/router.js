const Router = require('koa-router');
const router = new Router();

const userController = require('./controllers/userController');

let counter = 0;
let users = [
  {
    position: { lat: 45.84, lng: 9.66 },
    visible: true,
    showInfo: false,
    name: 'Tez'
  },
  {
    position: { lat: 45.86, lng: 9.61 },
    visible: true,
    showInfo: false,
    name: 'julia'
  },
  {
    position: { lat: 45.84, lng: 9.56 },
    visible: true,
    showInfo: false,
    name: 'Mao'
  }
];

//just a try
router.get('/', async ctx => {
  counter++;
  console.log('request incoming ', counter);
  ctx.body = users;
});

router.post('/addUser', userController.create);

module.exports = router;
