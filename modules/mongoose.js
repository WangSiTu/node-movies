var mongoose = require('mongoose'),
    MovieSchema = require('../schemas/movieSchema'),
    //连接数据库
    db = mongoose.connect('mongodb://127.0.0.1:27017/movie');

//监控失败
db.connection.on('error', function (error) {
    console.log('数据库连接失败：' + error);
});

//监控链接
db.connection.on('open', function () {
    console.log('——数据库连接成功！——');
});

//创建模型写入数据库
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;



