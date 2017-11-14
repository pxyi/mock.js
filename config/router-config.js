const fs = require('fs');

const path = require('path');
const join = path.join;

/* 获取文件夹下所有文件 */
function findSync(startPath) {
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

let addControllers = (router) => {
  console.log(__dirname)
  let files = findSync(path.resolve(__dirname, '../routes'));
  let fileJS = files.filter( (res) => {
    return !res.startsWith('route_config') && res.endsWith('.js')
  });
  for(let res of fileJS){
    let mapping = require(`${res}`);
    addMapping(router, mapping);
  }
  /* 定义 404页面 */
  router.get('*', async (ctx, next) => {
    ctx.body = {
      code: 1010,
      message: '请求地址不存在'
    }
  });
}


let addMapping = (router, mapping) => {
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


module.exports = () => {
  let router = require('koa-router')();
  addControllers(router);
  return router.routes();
}