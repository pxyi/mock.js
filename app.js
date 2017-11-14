const Koa = require('koa');
const app = new Koa();

/* ---------------- 记录URL以及页面执行时间 ---------------- */
app.use(async (ctx, next) => {
	let start = new Date().getTime();
	await next();
	let execTime = new Date().getTime() - start;
	ctx.response.set('X-Response-Time', `${execTime}ms`);
});


/* --------------------- 是否为开发环境 -------------------- */
const isProduction = process.env.NODE_ENV === 'production';


/* --------------------- 启用gzip压缩 --------------------- */
let gzip = require('koa-gzip');
app.use(gzip());


/* --------------- 设置获取post请求参数中间件 --------------- */
const bodyparser = require('koa-bodyparser');
app.use(bodyparser());


/* ----------------------- 允许跨域 ----------------------- */
const cors = require('koa2-cors');
app.use(cors());


/* ----------------------- 设置路由 ----------------------- */
const routes = require('./config/router-config');
app.use(routes());


/* --------------------- 2800端口启动 --------------------- */
let port = process.env.NODE_PORT || 2800;
let server = app.listen(port, () => {
	console.log(`Server at running http://localhost:${port}`)
});