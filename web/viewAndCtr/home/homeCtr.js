app.controller('homeCtr', ['$scope', '$state', 'movieService', function ($scope, $state, movieService) {
    const vm = this;
    (function () {
        movieService.movieHome().then(function (res) {
            if (res.data.code === 200) {
                vm.homeData = res.data.data
            } else {
                alert(res.data.data.message);
            }
        })
    })();

    vm.goDetail = function (id) {
        $state.go('/movieDetail', {id: id})
    }
}]);