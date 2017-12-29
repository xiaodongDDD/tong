/**
 * Created by daidongdong on 2017/11/14.
 */

'use strict';
angular.module('loginModule').controller('tabsCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
  '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicActionSheet', 'hmsPopup','tabService','$ionicBackdrop',
  function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicActionSheet, hmsPopup,tabService,$ionicBackdrop) {
    $scope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParam) {
      if (fromState && toState && (fromState.name == 'login') && toState.name == 'tab') {
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
      }
    });

    $scope.config = {
      showSettingModal : false
    }
    $scope.tabs = tabService.tabs;
    $scope.clickTab = function (tab) {
      if (tab.id == '5') {
        $scope.config.showSettingModal = true;
      } else {
        for (var i = 0; i < $scope.tabs.length; i++) {
          $scope.tabs[i].isActive = false;
        }
        tab.isActive = true;
      }
    }

    $scope.exitAccount = function(){
      function loginOut(buttonIndex) {
        console.log(buttonIndex)
        if (buttonIndex == 1) { //确认按钮
          window.localStorage.token = '';
          $state.go('login');
        } else { //取消按钮
          return;
        }
      }
      hmsPopup.confirm('是否确认要退出一统？','提示信息',loginOut);
    }
    //修改密码
    $scope.goChangePassword = function(){
      $scope.config.showSettingModal = false;
      $state.go('changePassword');
    }
  }]);
