'use strict';
app.factory('movieService',function ($http,ajaxService) {
    return {
        //首页
        movieHome:function () {
            return $http.get(ajaxService.movieHome())
        },

        //电影详情
        movieDetail:function (id) {
            return $http.get(ajaxService.movieDetail(id))
        },

        //后台电影列表
        adminList:function () {
            return $http.get(ajaxService.movieList())
        },

        //后台电影信息
        adminDetail:function (id) {
            return $http.get(ajaxService.movieAdmin(id))
        },

        //后台电影录入和更新
        adminNewOrUpdate:function (params,id) {
            console.log(params);
            return $http({
                url:ajaxService.movieNewOrUpdate(id),
                method: "post",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: params,
                transformRequest: function (data, headersGetter) {
                    return $.param(data)
                }
            })
        },

        //删除电影
        adminDelete:function (id) {
            return $http.delete(ajaxService.movieDelete(id))
        }
    }

});