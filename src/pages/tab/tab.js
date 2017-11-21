/**
 * Created by daidongdong on 2017/11/14.
 */

'use strict';
angular.module('loginModule').controller('tabsCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
  '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicActionSheet', 'hmsPopup','tabService',
  function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicActionSheet, hmsPopup,tabService) {
    $scope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParam) {
      if (fromState && toState && (fromState.name == 'login') && toState.name == 'tab') {
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
      }
    });
    $scope.tabs = tabService.tabs;
    $scope.clickTab = function (tab) {
      if (tab.id == '5') {
        // 显示操作表
        $ionicActionSheet.show({
          buttons: [
            {text: '退出账号'},
          ],
          // destructiveText: 'Delete',
          // titleText: 'Modify your album',
          cancelText: '取消',
          buttonClicked: function (index) {
            if (index == 0) {
              $state.go('login');
            } else {
              return true;
            }
          }
        });
      } else {
        for (var i = 0; i < $scope.tabs.length; i++) {
          $scope.tabs[i].isActive = false;
        }
        tab.isActive = true;
      }
    }
  }]);
