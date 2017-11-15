const GetAPI = async (ctx, next) => {
	ctx.body = {
		code: 1000,
		message: 'get请求成功'
	}
}

const PostAPI = async (ctx, next) => {
	ctx.body = {
		code: 1000,
		message: 'post请求成功'
	}
}

const AllAPI = async (ctx, next) => {
	ctx.body = {
		code: 1000,
		message: 'get/post均可请求成功'
	}
}

/**
 *	@module 可以定义以下三种方法								<空格不可缺少>
 *	@param	GET + 空格 +	请求地址							<可使用get方法请求>
 *	@param	POST + 空格 +	请求地址  					<可使用post方法请求>
 *	@param	ALL + 空格 +	请求地址 							<get/post均可以>
 *  ----------------------------------------------------------
 *	@description: 变量必须为 async 函数
 */
module.exports = {
	'GET /get/api': GetAPI,
	'POST /post/api': PostAPI,
	'ALL /all/api': AllAPI
}