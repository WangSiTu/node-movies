/**
 * Created by wangsitu on 2017/4/12.
 */
app.controller('adminDetailCtr', ['$scope', '$stateParams', 'movieService', function ($scope, $stateParams, movieService) {
    const vm = this;
    (function () {
        if ($stateParams.id === '') return false;
        movieService.adminDetail($stateParams.id).then(function (res) {
            if (res.data.code === 200) {
                vm.adminDetail = res.data.data;
            }
        })
    })();

    //录入和更新
    vm.newOrUpdate = function (data) {
        if (!data._id) {
            movieService.adminNewOrUpdate(data).then(function (res) {
                if (res.data.code === 200) {
                    console.log(res.data);
                }
            })
        } else if (data._id) {
            movieService.adminNewOrUpdate(data,data._id).then(function (res) {
                if (res.data.code === 200) {
                    console.log(res.data);
                }
            })
        }

    }

}]);
