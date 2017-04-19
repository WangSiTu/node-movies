/**
 * Created by wangsitu on 2017/4/7.
 */
var cheerio = require('cheerio');
var request = require('request');
var async = require('async');
var MovieModel = require('./modules/mongooseModule');

// async.mapLimit(pageUrl, 5, function (page, callback) {})

//电影列表页
var movie = [];
(function () {
    console.log('开始抓取数据...');
    var startUrl = 'http://list.youku.com/category/show/c_96.html?spm=a2hmv.20009921.nav-second.5~1~3!11~A';
    getMovieList(startUrl, function () {
        console.log('开始写入数据库...');
        async.mapLimit(movie, 10, function (data, cb) {
            // console.log(data.title);
            var sendMovie = new MovieModel(data);
            // return
            sendMovie.save(function (err, res) {
                if (err) return console.log(err);
                console.log(res);
                cb()
            })
        }, function () {
            console.log('数据保存成功！');
        });
    });
})();

//获取电影列表
function getMovieList(startUrl, lastCB) {
    //抓取起始页面，获取视频列表的数组信息
    request(startUrl, function (err, res) {
        if (err) return console.log(err);
        var $ = cheerio.load(res.body);
        var reqUrl = [];
        $('.yk-col4.mr1').each(function () {
            reqUrl.push('http:' + $(this).find('a').attr('href'))
        });

        //测试用一个链接
        reqUrl = reqUrl.slice(0, 10);

        //根据数组抓取视频的基本信息，aysunc.mapLimit(arr,并发,单例函数（数组元素，callback）,可选-异步结束执行）)
        async.mapLimit(reqUrl, 2, function (data, cb) {
            // console.log(data, 'data')
            getMovieInfo(data, cb)
        }, function () {
            console.log('页面全部抓取完毕，共计：' + movie.length + '条');
            lastCB()
        });
    });
}

//获取基本信息
function getMovieInfo(reqUrl, cb) {
    var obj = {};
    obj.href = reqUrl;
    request(reqUrl, function (err, res) {
        if (err) return console.log(err);
        var $ = cheerio.load(res.body);
        //电影flash分享链接
        obj.flash = $('div .p1 #link2').val();
        //电影详情链接
        obj.detail = 'http:' + $('.desc-link').attr('href');
        getMovieDetail(obj, cb)
    });
}

//获取电影详情
function getMovieDetail(obj, cb) {
    request(obj.detail, function (err, resDetail) {
        console.log('正在抓取——' + obj.detail);
        if (err) return console.log(err);
        var $ = cheerio.load(resDetail.body);

        obj = {
            poster: $('.p-thumb').find('img').attr('src'),
            title: $('.p-row.p-title').text().slice(3, -6),
            otherName: $('.p-alias').attr('title'),
            year: (function () {
                var year = $('div.p-base span.pub');
                if (year.length > 1) {
                    return year.eq(1).text();
                } else if (year.length === 1) {
                    return year.eq(0).text();
                }
            })(),
            director: $('li:contains(导演：)').find('a').attr('title'),
            country: $('li:contains(地区：)').find('a').text(),
            type: (function () {
                var arr = [];
                $('li:contains(类型：)').find('a').each(function () {
                    arr.push($(this).text())
                });
                return arr;
            })(),
            href: obj.href,
            flash: obj.flash,
            detail: obj.detail,
            summary: $('li.p-row.p-intro').text().slice(3,-4)
        };

        movie.push(obj);
        // console.log(obj.year);
        // return;

        //回调
        cb()
    });

}


