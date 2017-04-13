app.controller('adminListCtr', ['$scope', '$state', 'movieService', function ($scope, $state, movieService) {
    const vm = this;
    //获取列表
    (function () {
        movieService.adminList().then(function (res) {
            if (res.data.code === 200) {
                vm.adminList = res.data.data;
            } else {
                alert(res.data.data.message);
            }
        })
    })();

    //新增电影
    vm.goAddMovie = function () {
        $state.go('/adminDetail')
    };

    //查看电影详情
    vm.checkMovie = function (id) {
        $state.go('/adminDetail', {id: id})
    };

    //删除电影
    vm.deleteMovie = function (id) {
        movieService.adminDelete(id).then(function (res) {
            if (res.data.code === 200) {
                console.log('删除成功');
            }
        })
    }

}]);