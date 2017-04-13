const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    routerConfig = require('./routers/routerConfig');

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 中间件URL解码体 res.body
app.use(require('body-parser')());

//路由配置
app.use(routerConfig);

//启动监听
app.listen(port, function () {
    console.log('localhost: ' + port);
});






