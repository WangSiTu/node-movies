app.controller('movieDetailCtr', ['$scope', '$stateParams', 'movieService', function ($scope, $stateParams, movieService) {
    const vm = this;
    (function () {
        movieService.movieDetail($stateParams.id).then(function (res) {
            if (res.data.code === 200) {
                vm.movieDetail = res.data.data;
            }else {
                alert(res.data.data.message)
            }
        })
    })()
}]);