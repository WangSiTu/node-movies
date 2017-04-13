'use strict';
app.factory('ajaxService',function () {
   return {
       //电影首页列表
       movieHome:function () {
           return 'http://localhost:3000/'
       },

       //电影web详情
       movieDetail:function (id) {
           if(id) return 'http://localhost:3000/movie/' + id;
           return console.log('Must need id')
       },

       //电影后台列表
       movieList:function () {
            return 'http://localhost:3000/admin/list'
       },

       //电影后台信息详情
       movieAdmin:function (id) {
           if(id) return  'http://localhost:3000/admin/movie/' + id;
           return console.log('Must need id')
       },

       //电影后台新录入和更新
       movieNewOrUpdate:function (id) {
           if(id) return 'http://localhost:3000/admin/movie/upDate/' + id;
           return 'http://localhost:3000/admin/movie/new'
       },

       //电影后台删除
       movieDelete:function (id) {
           if(id) return 'http://localhost:3000/admin/movie/delete/' + id;
           return console.log('Must need id')
       }

   }
});