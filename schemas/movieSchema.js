var mongoose = require('mongoose'),
    moment = require('moment');
//定义模式
var MovieSchema = new mongoose.Schema({
    title: String,
    doctor: String,
    language: String,
    country: String,
    year: Number,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    },
    flash: String,
    poster: String,
    summary: String
});

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