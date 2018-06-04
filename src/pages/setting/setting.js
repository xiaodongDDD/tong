/**
 * Created by daidongdong on 2017/11/14.
 */

angular.module('settingModule')
  .controller('settingCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicLoading', '$timeout', 'hmsPopup','checkVersionService',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicLoading, $timeout, hmsPopup,checkVersionService) {
      $scope.config = {}
      $scope.exitAccount = function () {
        function loginOut(buttonIndex) {
          console.log(buttonIndex)
          if (buttonIndex == 1) { //确认按钮
            window.localStorage.token = '';
            $state.go('login');
          } else { //取消按钮
            return;
          }
        }
        hmsPopup.confirm('是否确认要退出一统？', '提示信息', loginOut);
      }
      //修改密码
      $scope.goChangePassword = function () {
        $state.go('changePassword');
      }
      $scope.versionDetection = function () {
        checkVersionService.checkAppVersion('updateFlag');
      }
      $scope.userApplication = function () {
        $state.go('userApplicationList');
      }
      $scope.goMessage = function () {
        $state.go('messageList');
      }
    }]);
