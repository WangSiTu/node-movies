var router = require('express').Router(),
    movie = require('../modules/movies_json').movieJson,
    // mongoose = require('mongoose'),
    user = require('../controllers/movieRouterCtr');

//首页展示
router.get('/', user.moveIndex);

//电影详情
router.get('/movie?:id', user.movieDetail);

//电影列表
router.get('/admin/list', user.moveList);

//电影 录入，更新
router.get('/admin/movie?:id', user.moveAdmin);

//电影录入和更新提交处理
router.post('/admin/movie/new', user.movieNew);

//电影删除处理
router.delete('/admin/movie/delete', user.movieDelete);

module.exports = router;