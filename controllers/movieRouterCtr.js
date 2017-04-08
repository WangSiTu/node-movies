var mongoose = require('mongoose'),
    //mongoose module模型
    Movie = require('../modules/mongoose'),
    movieData = require('../modules/movies_json'),
    moment = require('moment'),
// Underscore 是一个 JavaScript 工具库   http://www.bootcss.com/p/underscore/   API
   underscore = require('underscore');

//登录
exports.signIn = function (req, res) {
    res.render('signIn', {
        title: '登录'
    })
};

// 注册
exports.signUp = function (req, res) {
    res.render('signUp', {
        title: '注册'
    })
};

//退出登录
exports.signOut = function (req, res) {
    res.render('signOut', {
        title: '退出登录'
    })
};

//电影首页列表查看
exports.moveIndex = function (req, res) {
    Movie.fetch(function (err, movieIndex) {
        if (err) {
            console.log(err);
        }

        res.render('index', {
            // title: '电影首页',
            movieIndex: movieIndex
        });
        // console.log(movies)
    });
};

//观看电影详情
exports.movieDetail = function (req, res) {
    var id = req.query.id;

    Movie.findById(id, function (err, movieDetail) {
        if (err) return console.log(err);
        res.render('detail', {
            title: '电影详情',
            movieDetail: movieDetail
        });
        // console.log(movieDetail)
    });

};

//电影列表页查看
exports.moveList = function (req, res) {
    Movie.fetch(function (err, movieList) {
        if (err) return console.log(err);
        res.render('list', {
            title: '电影列表页',
            movieList: movieList
        });

    })
};

//电影后台录入详情
exports.moveAdmin = function (req, res) {
    var id = req.query.id;
    // console.log(id);
    if (id) {
        Movie.findById(id, function (err, movieAdmin) {
            if (err) return console.log(err);
            res.render('admin', {
                title: '电影后台录入更新',
                button: '更新',
                movieAdmin: movieAdmin
                //     movieList.map(function (item) {
                //     item.meta.createAt = moment(item.meta.createAt).format('YYYY年-MM月-DD日 h时:mm分:ss秒');
                //     item.meta.updateAt = moment(item.meta.updateAt).format('YYYY年-MM月-DD日 h时:mm分:ss秒');
                //     return item
                // }),
            });
            // console.log(movieAdmin)
        })

    } else if (!id) {
        res.render('admin', {
            title: '电影后台录入',
            button: '录入',
            movieAdmin: movieData.admin
        })
    }

};

//电影后台录入，更新
exports.movieNew = function (req, res) {
    var id = req.body.id,
        movieObj = req.body,
        resMovie;

    if (id !== '') {
        // 更新 es6
        // Movie.findOneAndUpdate({_id: id}, movieObj, (err, movie) => {
        //     if (err) return console.log(err);
        //     res.redirect('/movie?id=' + movie._id);
        //     // console.log(movie)
        // })

        //es5
        // Movie.findOneAndUpdate({_id: id}, movieObj, function (err, movie) {
        //     if (err) return console.log(err);
        //     res.redirect('/movie?id=' + movie._id);
        //     // console.log(movie)
        // })

        //更新数据
        Movie.findById(id, function (err, movies) {
            console.log(movies, 'object');
            if (err) return console.log(err);
            resMovie = underscore.extend(movies, movieObj);
            resMovie.save(function (err, movies) {
                if (err) return console.log(err);
                res.redirect('/movie?id=' + movies.id)
            })
        })

    } else {
        //新录入
        resMovie = new Movie({
            title: movieObj.title,
            director: movieObj.director,
            language: movieObj.language,
            country: movieObj.country,
            year: movieObj.year,
            flash: movieObj.flash,
            poster: movieObj.poster,
            summary: movieObj.summary,
        });

        resMovie.save(function (err, movies) {
            if (err) return console.log(err);
            res.redirect('/movie?id=' + movies._id)
        })

    }
};

//删除电影
exports.movieDelete = function (req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({_id: id}, function (err, data) {
            if (err) return console.log(err);
            res.json({success: 1});
            // console.log(data)
        })
    }
};

