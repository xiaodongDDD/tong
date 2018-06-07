/**
 * Created by daidongdong on 2018/5/4.
 */

angular.module('settingModule')
  .controller('exchangeCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicLoading', '$timeout', 'hmsPopup','publicMethod','userApplicationService',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicLoading, $timeout, hmsPopup,publicMethod,userApplicationService) {
      $scope.config = {}
      $scope.data = {
        province: '',
        city: '',
        listCity:[],
        listProvince:userApplicationService.provinces
      }
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      $scope.selectProvince = function(item) {
        console.log(item)
        $scope.data.listCity = JSON.parse(item).citys
        console.log($scope.data.listCity)
      }
    }]);
