/**
 * Created by daidongdong on 2017/11/14.
 */
angular.module('schoolModule')
  .controller('schoolClassCtrl', ['$scope', '$rootScope', '$state', '$ionicPlatform', '$ionicPopover', 'indexPageService', 'baseConfig', 'hmsHttp', '$timeout','SettingsService','hmsPopup','$ionicScrollDelegate','publicMethod',
    function ($scope, $rootScope, $state, $ionicPlatform, $ionicPopover, indexPageService, baseConfig, hmsHttp, $timeout,SettingsService,hmsPopup,$ionicScrollDelegate,publicMethod) {
      $scope.data = {
      }
      $scope.config = {
        headStyleActive : true,
        headShow : false,
        font : true
      }
      //返回
      $scope.goBack = function () {
        publicMethod.goBack();
      }

      $scope.selectModules = function(item){
        (item == 'class') ? $scope.config.headStyleActive = true : $scope.config.headStyleActive = false;
      }


    }]);
