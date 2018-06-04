/**
 * Created by daidongdong on 2018/5/4.
 */

angular.module('settingModule')
  .controller('messageListCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicLoading', '$timeout', 'hmsPopup', 'publicMethod',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicLoading, $timeout, hmsPopup, publicMethod) {
      $scope.config = {}
      $scope.goMessageDetail = function () {
        $state.go('messageDetail');
      }
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      $scope.allRead = function () {
        function loginOut(buttonIndex) {
          console.log(buttonIndex)
          if (buttonIndex == 1) { //确认按钮
            alert('真的成功了')
          } else { //取消按钮
            return;
          }
        }
        hmsPopup.confirm('是否将全部信息设置为已读？？', '提示信息', loginOut);
      }
    }]);
