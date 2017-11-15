const Api = async (ctx, next) => {
	ctx.body = {
		code: 1000,
		message: '请求成功'
	}
}


module.exports = {
	'GET /api': Api
}