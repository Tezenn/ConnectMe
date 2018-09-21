const koa = require('koa');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const app = new koa();
const router = require('./router');

app.use(cors());
app.use(bodyParser());
app.use(router.routes());

app.listen(3100, () => console.log('server on'));
