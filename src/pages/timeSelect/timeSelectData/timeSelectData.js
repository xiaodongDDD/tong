/**
 * Created by daidongdong on 2017/11/14.
 */
angular.module('indexPageModule')
  .controller('timeSelectDataCtrl', ['$scope', '$rootScope', '$state', '$ionicPlatform', '$ionicPopover', 'indexPageService', 'baseConfig', 'hmsHttp', '$timeout','SettingsService','hmsPopup','$ionicScrollDelegate','publicMethod',
    function ($scope, $rootScope, $state, $ionicPlatform, $ionicPopover, indexPageService, baseConfig, hmsHttp, $timeout,SettingsService,hmsPopup,$ionicScrollDelegate,publicMethod) {
      $scope.data = {
      }
      $scope.config = {

      }
      //返回
      $scope.goBack = function () {
        publicMethod.goBack();
      }
    }]);
