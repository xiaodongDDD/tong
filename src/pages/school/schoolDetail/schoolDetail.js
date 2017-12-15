/**
 * Created by daidongdong on 2017/11/14.
 */
angular.module('schoolModule')
  .controller('schoolDetailCtrl', ['$scope', '$rootScope', '$state', '$ionicPlatform', '$ionicPopover', 'indexPageService', 'baseConfig', 'hmsHttp', '$timeout','SettingsService','hmsPopup','$ionicScrollDelegate','publicMethod',
    function ($scope, $rootScope, $state, $ionicPlatform, $ionicPopover, indexPageService, baseConfig, hmsHttp, $timeout,SettingsService,hmsPopup,$ionicScrollDelegate,publicMethod) {
      $scope.data = {
      }
      $scope.config = {
        headStyleActive : true,
        headShow : false
      }
      //返回
      $scope.goBack = function () {
        console.log('-----');
        publicMethod.goBack();
      }

      $scope.selectModules = function(item){
        (item == 'class') ? $scope.config.headStyleActive = true : $scope.config.headStyleActive = false;
      }
      $scope.$on('to-parent', function(event, data){
        console.log(data);
        if(data < 44){
          $scope.config.headShow = true;
          console.log('------');
        }else{
          $scope.config.headShow = false;
          console.log('+++++++');
        }
      });

    }]);
