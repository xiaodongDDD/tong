/**
 * Created by daidongdong on 2018/5/4.
 */

angular.module('settingModule')
  .controller('userApplicationListCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicLoading', '$timeout', 'hmsPopup', 'publicMethod',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicLoading, $timeout, hmsPopup, publicMethod) {
      $scope.config = {}
      $scope.goMessageDetail = function () {
        $state.go('messageDetail');
      }
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      $scope.goOperation = function (item) {
        switch (item) {
          case 1:
            $state.go('distribution');
            break;
          case 2:
            $state.go('exchange');
            break;
          case 3:
            $state.go('follow');
            break;
          case 4:
            $state.go('operationLog');
            break;
          case 5:
            $state.go('return');
            break;
        }
      }
    }]);
