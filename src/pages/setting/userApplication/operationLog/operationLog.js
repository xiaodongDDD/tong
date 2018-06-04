/**
 * Created by daidongdong on 2018/5/4.
 */

angular.module('settingModule')
  .controller('operationLogCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicLoading', '$timeout', 'hmsPopup','publicMethod',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicLoading, $timeout, hmsPopup,publicMethod) {
      $scope.config = {}
      $scope.goBack = function () {
        publicMethod.goBack();
      }
    }]);
