/**
 * Created by daidongdong on 2018/08/29.
 */

angular.module('indexPageModule')
  .controller('personalLeaderboardCtrl', ['$scope', '$rootScope', '$state', '$ionicPopover', 'indexPageService', 'hmsHttp', 'baseConfig', 'tabService', 'hmsPopup', 'SettingsService', '$ionicScrollDelegate', '$ionicModal',
    function ($scope, $rootScope, $state, $ionicPopover, indexPageService, hmsHttp, baseConfig, tabService, hmsPopup, SettingsService, $ionicScrollDelegate, $ionicModal) {
      $scope.data = {}
      $scope.config = {}


      $ionicModal.fromTemplateUrl('build/pages/indexPage/modal/search.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.openModal = function () {
        $scope.modal.show();
      };
      $scope.closeModal = function () {
        $scope.modal.hide();
      };
      $scope.searchData = function () {
        $scope.modal.hide();
        $scope.data.messageList = []
        $scope.data.page = 1;
        $scope.initData($scope.data.page);
      };
      //当我们用到模型时，清除它！
      $scope.$on('$destroy', function () {
        $scope.modal.remove();
      });
      // 当隐藏的模型时执行动作
      $scope.$on('modal.hide', function () {
        // 执行动作
      });
      // 当移动模型时执行动作
      $scope.$on('modal.removed', function () {
        // 执行动作
      });
    }]);
