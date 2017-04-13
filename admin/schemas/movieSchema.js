var mongoose = require('mongoose');
//定义模式
var MovieSchema = new mongoose.Schema({
    title: {type: String, default: ''},
    otherName: {type: String, default: ''},
    director: {type: String, default: ''},
    language: {type: String, default: ''},
    year: {type: String, default: ''},
    country: {type: String, default: ''},
    type: [],
    href: {type: String, default: ''},
    poster: {type: String, default: ''},
    flash: {type: String, default: ''},
    detail: {type: String, default: ''},
    summary: {type: String, default: '暂无简介'},
    meta: {
        createAt: {
            type: Date,
            default: Date.now
        },
        updateAt: {
            type: Date,
            default: Date.now
        }
    },

}, {collection: 'movie'});

//在保存以前调用的方法
MovieSchema.pre('save', function (next) {
    // console.log(this.isNew);
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
});

//静态方法 statics
MovieSchema.statics = {
    //取出数据库所有数据
    fetch: function (cb) {
        return this
        //查找
            .find({})
            //排序
            .sort('meta.updateAt')
            //最后执行
            .exec(cb)
    },

    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    }
};

module.exports = MovieSchema;