var mongoose = require('mongoose'),
    //mongoose module模型
    Movie = require('../modules/mongooseModule'),
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

        return res.json({
            code: 200,
            message: 'success',
            data: movieIndex
        })
    });
};

//观看电影详情
exports.movieDetail = function (req, res) {
    const id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movieDetail) {
            if (err) return console.log(err);
            return res.json({
                code: 200,
                message: 'success',
                data: movieDetail
            })
        });
    } else if (!id) {
        return res.json({
            message: '请求错误'
        })
    }
};

//电影列表页查看
exports.moveList = function (req, res) {
    Movie.fetch(function (err, movieList) {
        if (err) return console.log(err);
        return res.json({
            code: 200,
            message: 'success',
            data: movieList
        })
    })
};

//电影后台录入详情
exports.moveAdmin = function (req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movieAdmin) {
            if (err) return console.log(err);
            return res.json({
                code: 200,
                message: 'success',
                data: movieAdmin
            })
        })

     }else if(!id){
        return res.json({
            code: 100,
            message: '请求参数缺少id'
        })
    }


};

//电影录入
exports.movieNew = function (req, res) {
    var resMovie;
    resMovie = new Movie({
        title: req.body.title,
        director: req.body.director,
        language: req.body.language,
        country: req.body.country,
        year: req.body.year,
        flash: req.body.flash,
        poster: req.body.poster,
        summary: req.body.summary,
    });

    resMovie.save(function (err, movies) {
        if (err) return console.log(err);
        return res.json({
            code: 200,
            message: '录入成功',
        })
    })

};


//电影更新
exports.movieUpdate = function (req, res) {
    var id = req.params.id,
        movieObj = req.body,
        resMovie;

    // return console.log(id);
    // if (id !== '') {
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
        if (err) return console.log(err);
        resMovie = underscore.extend(movies, movieObj);
        resMovie.save(function (err, movies) {
            if (err) return console.log(err);
            // console.log(movies);
            res.json({
                code: 200,
                message: '更新成功'
            })
        })
    })

};

//删除电影
exports.movieDelete = function (req, res) {
    var id = req.params.id;
    if (id) {
        Movie.remove({_id: id}, function (err, data) {
            if (err) return console.log(err);
            res.json({
                code: 200,
                message: '删除成功',
            });
        })
    }else if(!id){
        return res.json({
            code: 100,
            message: '请求参数缺少id'
        })
    }


};

