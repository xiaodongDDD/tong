/**
 * Created by daidongdong on 2017/11/14.
 */

angular.module('indexPageModule')
  .controller('indexPageCtrl', ['$scope', '$rootScope', '$state', '$ionicPopover', 'indexPageService', 'hmsHttp', 'baseConfig', 'tabService', 'hmsPopup','SettingsService',
    function ($scope, $rootScope, $state, $ionicPopover, indexPageService, hmsHttp, baseConfig, tabService, hmsPopup,SettingsService) {
      $scope.data = {
        type:  ''
      }
      $scope.newViewData = SettingsService.get('indexData') || {};
      $scope.newViewDataSp = {};
      $scope.config = {};
      $scope.tabs = tabService.tabs;

      $scope.goPage = function () {
      }

      //去往其他tab
      $scope.goOtherTab = function (item) {
        for (var i = 0; i < $scope.tabs.length; i++) {
          $scope.tabs[i].isActive = false;
        }
        $scope.tabs[item - 1].isActive = true;
        $state.go("tab");
      }

      $scope.operating = indexPageService.operating;
      var type;
      for (var i = 0; i < $scope.operating.length; i++) {
        if ($scope.operating[i].id == SettingsService.get('indexType')) {
          $scope.operating[i].selected = true;
        } else {
          $scope.operating[i].selected = false;
        }
      }
      //下拉刷新
      $scope.doRefresh = function () {
        initPageData();
        $scope.$broadcast("scroll.refreshComplete");
      }
      //接口
      function initPageData() {
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=xhbtongji.index&type=" + $scope.data.type;
        hmsHttp.get(indexUrl).success(
          function (response) {
            $scope.newViewData = response.response
            SettingsService.set('indexData',$scope.newViewData);
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }

      $scope.popover = $ionicPopover.fromTemplateUrl('build/pages/indexPage/modal/popover.html', {
        scope: $scope
      });

      // .fromTemplateUrl() 方法
      $ionicPopover.fromTemplateUrl('build/pages/indexPage/modal/popover.html', {
        scope: $scope
      }).then(function (popover) {
        $scope.popover = popover;
      });


      $scope.openPopover = function ($event) {
        $scope.popover.show($event);
      };

      $scope.selectPopover = function (x) {
        for (var i = 0; i < $scope.operating.length; i++) {
          $scope.operating[i].selected = false;
        }
        x.selected = !x.selected;
        $scope.data.type = x.id;
        SettingsService.set('indexType', $scope.data.type);
        initPageData();
        $scope.popover.hide();
      }


      //初始化
      if ($scope.tabs[0].cache == false) {
        initPageData();
        $scope.tabs[0].cache = true;
      }
    }]);
