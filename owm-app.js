    angular.module('OWMApp', ['ngRoute'])
    .value('owmCities', 
      ['New York', 'Dallas', 'Chicago'])
    .run(function($rootScope, $location) {
      $rootScope.$on('$routeChangeError', function() {
        $location.path('/error');
      });
    }).config(function($routeProvider){
      $routeProvider.when('/', {
        templateUrl: '/home.html',
        controller : 'HomeCtrl'
      })
      .when('/cities/:city', {
        templateUrl : '/city.html',
        controller : 'CityCtrl',
        resolve : {
          city: function(owmCities, $route, $location) {
            console.log(owmCities);

            var city = $route.current.params.city;
            console.log(city);
            if(owmCities.indexOf(city) == -1 ) {
              $location.path('/error');
              return;
            }
            return city;
          }
        }
      })
      .when('/error', {
        template : '<p>Error Page Not Found</p>'
      });
    })
    .controller('HomeCtrl', function($scope) {
            //empty for now
          })
    .controller('CityCtrl', function($scope, city) {


      $scope.city = city;
      console.log($scope.city);
    });