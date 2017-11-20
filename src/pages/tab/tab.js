/**
 * Created by daidongdong on 2017/11/14.
 */

'use strict';
angular.module('loginModule').controller('tabsCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
  '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicActionSheet', 'hmsPopup',
  function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicActionSheet) {
    $scope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParam, hmsPopup) {
      if (fromState && toState && (fromState.name == 'login') && toState.name == 'tab') {
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
      }
    });
    $scope.tabs = [{
      id: '1',
      name: '首页',
      isActive: true,
      onClass: 'main-on',
      offClass: 'main-off'
    }, {
      id: '2',
      name: '用户',
      isActive: false,
      onClass: 'app-on',
      offClass: 'app-off'
    }, {
      id: '3',
      name: '班级',
      isActive: false,
      onClass: 'class-on',
      offClass: 'class-off'
    }, {
      id: '4',
      name: '学校',
      isActive: false,
      onClass: 'school-on',
      offClass: 'school-off'
    }, {
      id: '5',
      name: '设置',
      isActive: false,
      onClass: 'setting-on',
      offClass: 'setting-off'
    }];
    $scope.clickTab = function (tab) {
      console.log(tab);
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
