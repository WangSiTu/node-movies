const app = angular.module('app', ['ui.router', 'oc.lazyLoad']);

app.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
})
    //注册组件
    .config(registerComponents)


    .config(function ($stateProvider, $urlRouterProvider) {
        //懒加载
        const lazyLoad = function (ocLazyLoad) {
            return function ($ocLazyLoad) {
                return $ocLazyLoad.load(ocLazyLoad);
            }
        };

        //默认页面
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            //主页
            .state('/home', {
                url: '/home',
                templateUrl: './viewAndCtr/home/home.html',
                controller: 'homeCtr',
                controllerAs: 'vm',
                resolve: {
                    loadFile: lazyLoad([
                        './viewAndCtr/home/homeCtr.js',
                    ])
                }
            })

            //电影详情
            .state('/movieDetail',{
                url:'/movieDetail/:id',
                templateUrl:'./viewAndCtr/movieDetail/movieDetail.html',
                controller: 'movieDetailCtr',
                controllerAs: 'vm',
                resolve: {
                    loadFile: lazyLoad([
                        './viewAndCtr/movieDetail/movieDetailCtr.js'
                    ])
                }
            })

            //后台电影列表
            .state('/adminList',{
                url:'/adminList',
                templateUrl:'./viewAndCtr/adminList/adminList.html',
                controller: 'adminListCtr',
                controllerAs: 'vm',
                resolve: {
                    loadFile: lazyLoad([
                        './viewAndCtr/adminList/adminListCtr.js',
                        './viewAndCtr/adminList/adminList.css'
                    ])
                }
            })

            //后台电影详情
            .state('/adminDetail',{
                url:'/adminDetail/:id',
                templateUrl:'./viewAndCtr/adminDetail/adminDetail.html',
                controller: 'adminDetailCtr',
                controllerAs: 'vm',
                resolve: {
                    loadFile: lazyLoad([
                        './viewAndCtr/adminDetail/adminDetailCtr.js'
                    ])
                }
            })

    });


function registerComponents($controllerProvider, $compileProvider, $filterProvider, $provide) {
    'use strict';
    // 将Angular的组件，指令等等的注册接口挂到app对象上，可以在应用程序启动之后任然可以添加功能
    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;

}