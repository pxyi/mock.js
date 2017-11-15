const fs = require('fs');
const path = require('path');
const join = path.join;

/* ---------------- 获取文件夹下所有文件 ---------------- */
const FindSync = (startPath) => {
	let result = [];
	function finder(path) {
		let files = fs.readdirSync(path);
		files.forEach((val, index) => {
			let fPath = join(path, val);
			let stats = fs.statSync(fPath);
			if(stats.isDirectory()) finder(fPath);
			if(stats.isFile()) result.push(fPath);
		});
	}
	finder(startPath);
	return result;
}

/* ------------ 根据文件配置路由地址并定义404 ------------ */
const AddControllers = (router) => {
  let files = FindSync(path.resolve(__dirname, '../routes'));
  let fileJS = files.filter( (res) => {
    return res.endsWith('.js')
  });
  for(let res of fileJS){
    let mapping = require(`${res}`);
    AddMapping(router, mapping);
  }
  router.get('*', async (ctx, next) => {
    ctx.body = {
      code: 1010,
      message: '请求地址不存在'
    }
  });
}

/* -------------- 根据文件导出对象配置路由 -------------- */
const AddMapping = (router, mapping) => {
  for(let url in mapping) {
    if(url.startsWith('GET ')){
      let path = url.substring(4);
      router.get(path, mapping[url]);
    }else if(url.startsWith('POST ')){
      let path = url.substring(5);
      router.post(path, mapping[url])
    }else if(url.startsWith('ALL ')){
      let path = url.substring(4);
      router.use(path, mapping[url]);
    }else{
      console.log(`invalid URL: ${url}`);
    }
  }
}


/* ----------------- 导出路由配置信息 ----------------- */
module.exports = () => {
  let router = require('koa-router')();
  AddControllers(router);
  return router.routes();
}