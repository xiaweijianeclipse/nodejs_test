const express = require('express');
const app = express();
const router = require('./luyou');
var cs = require('cookie-session');

app.use(cs({
    name: "sessionid",
    keys: ['hfsajfksjdfalsjfss']
}));

//静态资源目录
app.use(express.static('public'));
//引入模板引擎
app.engine('html', require('express-art-template'));
//设置模板路径
app.set('views', __dirname);
//分发路径
app.use(router);

app.listen(8888, function () {
    console.log("请求访问 127.0.0.1:8888");
});