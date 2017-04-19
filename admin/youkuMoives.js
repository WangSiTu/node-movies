/**
 * Created by wangsitu on 2017/4/18.
 */
const cheerio = require('cheerio'),
    superagent = require('superagent'),
    async = require('async'),
    MovieModel = require('./modules/mongooseModule');

(function () {
    var starPage = 1,
        endPage = 30,
        step = starPage - 1,
        setUrlList = Array.apply(null, {length: endPage - starPage + 1}).map(function () {
            step++;
            return 'http://list.youku.com/category/show/c_96_s_1_d_1_p_' + step + '.html?spm=a2h1n.8251845.0.0';
        });

    async.eachLimit(setUrlList, 5, function (resUrl, callback) {
        getMovieList(resUrl, callback);
    }, function (err) {
        if (err) {
            console.log(err);
            console.log('最后回调发生错误')
        }
        console.log('抓取完毕')
    })


})();

//获取电影列表
function getMovieList(resUrl, cb) {
    // http://list.youku.com/category/show/c_96_s_1_d_1_p_1.html?spm=a2h1n.8251845.0.0

    superagent.get(resUrl).end(function (err, res) {
        if (err) {
            console.log('抓取列表出错——跳过');
            cb();
        } else {
            var $ = cheerio.load(res.text);
            var movieUrl = [];
            $('.yk-pack.pack-film').each(function () {
                var that = $(this),
                    goMovieHref = that.find('a').attr('href'),
                    vipFree = that.find('.vip-free').text(),
                    trailer = that.find('.p-time span').text();

                if (!vipFree && trailer === '正片' && goMovieHref.indexOf('list') === -1) {
                    //获取电影链接
                    movieUrl.push(goMovieHref.substr(0, 5).toLowerCase() === 'http:' ? goMovieHref : 'http:' + goMovieHref);
                }
            });

            async.eachLimit(movieUrl, 2, function (res, callback) {
                //获取电影信息
                getMovieInfo(res, callback)
            }, function (err) {
                if (err) {
                    console.log(err);
                    cb();
                } else {
                    console.log('抓取一页进度完成');
                    cb();
                }
            })
        }
    })


}

//获取基本信息
function getMovieInfo(resInfo, callback) {
    var obj = {};
    obj.href = resInfo;
    superagent.get(resInfo).end(function (err, res) {
        var $ = cheerio.load(res.text);
        if (err) {
            console.log(err);
            callback({});
        } else {
            //电影flash分享链接
            obj.flash = $('#link2').attr('value');
            //电影详情链接
            obj.detail = 'http:' + $('.desc-link').attr('href');

            // console.log(obj,'链接');
            getMovieDetail(obj, callback)
        }
    });
}

//获取电影详情
function getMovieDetail(resDetail, callback) {
    superagent.get(resDetail.detail).end(function (err, res) {
        if (err) {
            console.log(err);
        }

        if (res.text !== undefined) {
            var $ = cheerio.load(res.text);
            resDetail = {
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
                starring: (function () {
                    var star = [];
                    $('li:contains(主演：)').find('a').each(function () {
                        star.push($(this).text());
                    });
                    return star.join('/')
                })(),
                country: $('li:contains(地区：)').find('a').text(),
                type: (function () {
                    var arr = [];
                    $('li:contains(类型：)').find('a').each(function () {
                        arr.push($(this).text());
                    });
                    return arr.join('/');
                })(),
                href: resDetail.href,
                flash: resDetail.flash,
                detail: resDetail.detail,
                summary: $('li.p-row.p-intro').text().slice(3, -4)
            };

            // console.log(resDetail);

            var saveMovie = new MovieModel(resDetail);

            saveMovie.save(function (err, res) {
                if (err) return console.log(err);
                console.log(res);
                setTimeout(function () {
                    callback();
                }, parseInt((Math.random() * 30000000) % 4000, 10) + 1000)
            })
        }


    });


}