
const Mock = require('mockjs');

let list = async (ctx, next) => {
  let page = Number(ctx.query.current) || 1;
  let count = Number(ctx.query.size) || 10;

  let listNum = `list|${count}`;

  let mockObj = {
     "current": page,
      "size": count,
      "total": 182
    };
    mockObj[listNum] = [{
            "id|+1": 1,
            "age|10-60": 18,
            "status|0-1": 1
        }]
  let listItems = Mock.mock(mockObj);
  listItems.list.map( res => {
    res.date = Mock.Random.date('yyyy-MM-dd'),
    res.name = Mock.Random.cname();
    res.province = Mock.Random.province();
    res.city = Mock.Random.city();
    res.address = Mock.Random.county(true);
    res.zip = Mock.Random.zip();
    res.desc = Mock.Random.csentence(5, 10).replace(/。/g, '')
  })
  ctx.body = {
    code: 1000, 
    message: '请求成功', 
    result: listItems
  }
}


module.exports = {
  'GET /api/list': list
}