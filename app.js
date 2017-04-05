var express = require('express');
var app = express();

//端口
var port = process.env.PORT || 3000;

// var path = require('path');

var moment = require('moment');

//路由配置
var routerConfig = require('./routers/routerConfig');

//hbs引擎初始化
var hbs = require('express-handlebars').create({
    defaultLayout: 'main'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//引用目录模块
app.use(express.static(__dirname + '/modules'));
app.use(express.static(__dirname + '/controllers'));
app.use(express.static(__dirname + '/node_modules'));
// app.use(express.static(path.join(__dirname,'modules')));
// app.use(express.static(path.join(__dirname,'node_modules')));

// 中间件URL解码体 res.body
app.use(require('body-parser')());

//路由配置
app.use(routerConfig);

//时间格式化
app.locals.moment = moment;

//启动监听
app.listen(port, function () {
    console.log('localhost: ' + port);
});
