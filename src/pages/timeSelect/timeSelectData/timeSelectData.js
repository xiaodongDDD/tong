/**
 * Created by daidongdong on 2017/11/14.
 */
angular.module('indexPageModule')
  .controller('timeSelectDataCtrl', ['$scope', '$rootScope', '$state', '$ionicPlatform', '$ionicPopover', 'indexPageService', 'baseConfig', 'hmsHttp', '$timeout', 'SettingsService', 'hmsPopup', '$ionicScrollDelegate', 'publicMethod','tabService',
    function ($scope, $rootScope, $state, $ionicPlatform, $ionicPopover, indexPageService, baseConfig, hmsHttp, $timeout, SettingsService, hmsPopup, $ionicScrollDelegate, publicMethod,tabService) {
      $scope.data = {}
      $scope.config = {
        a: true,
        startShow : SettingsService.get('startShow')
      }
      $scope.tabs = tabService.tabs;

      //返回
      $scope.goBack = function () {
        publicMethod.goBack();
      }

      //接口
      function initPageData(item) {
        if (item == '1') {
        } else {
          hmsPopup.showLoadingWithoutBackdrop('正在加载...');
        }
        $scope.data.type = SettingsService.get('timeSelect');
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=xhbtongji.index&type=" + $scope.data.type;
        hmsHttp.get(indexUrl).success(
          function (response) {
            $scope.newViewData = response.response;
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }

      //初始化
      initPageData();

      //去往其他tab
      $scope.goList = function (item) {
        SettingsService.set('timeSelect',$scope.data.type);
        if(item == '1'){
          SettingsService.set('indexFlag','1');
        }
        for (var i = 0; i < $scope.tabs.length; i++) {
          $scope.tabs[i].isActive = false;
        }
        $scope.tabs[item - 1].isActive = true;
        $state.go("tab");
      }

    }]);
