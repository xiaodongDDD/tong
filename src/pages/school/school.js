/**
 * Created by daidongdong on 2017/11/14.
 */
angular.module('schoolModule')
  .controller('schoolCtrl', ['$scope', '$rootScope', '$state', '$ionicPlatform', '$ionicPopover', 'indexPageService', 'baseConfig', 'hmsHttp', '$timeout','SettingsService',
    function ($scope, $rootScope, $state, $ionicPlatform, $ionicPopover, indexPageService, baseConfig, hmsHttp, $timeout,SettingsService) {
      $scope.data = {
        type: '',
        names: ['distinct_list', 'arc_percent', 'join_school', 'message_use', 'school_property', 'school_ranges', 'study_section', 'trainer_lists'],
      }
      $scope.config = {
        explainFlag: false,
        status: {
          distinct_list: false,
          arc_percent: false,
          join_school: false,
          message_use: false,
          school_property: false,
          school_ranges: false,
          study_section: false,
          trainer_lists: false
        },
      }
      $scope.configSp = angular.copy($scope.config);
      $scope.newViewData = {};
      $scope.newViewDataSp = {};
      $scope.operating = indexPageService.operating;
      for (var i = 0; i < $scope.operating.length; i++) {
        if ($scope.operating[i].id == $scope.data.type) {
          $scope.operating[i].selected = true;
        } else {
          $scope.operating[i].selected = false;
        }
      }
      $scope.goPage = function () {
      }

      //提示信息
      $scope.bindClickExplain = function () {
        $scope.config.explainFlag = true;
        $timeout(function () {
          $scope.config.explainFlag = false;
        }, 1500)
      }
      //查看更多
      $scope.showPartOrAll = function (name) {
        if ($scope.config.status[name]) {
          $scope.newViewDataSp[name] = this.newViewData[name].slice(0, 3);
          $scope.config.status[name] = false;
        } else {
          $scope.newViewDataSp[name] = this.newViewData[name];
          $scope.config.status[name] = true;
        }
        ;
        $ionicScrollDelegate.$getByHandle('mainScroll').resize();
      }
      // 截取3条数据
      var sliceThreeData = function (data) {
        for (var i = 0; i < $scope.data.names.length; i++) {
          $scope.newViewDataSp[$scope.data.names[i]] = [];
          if (typeof data[$scope.data.names[i]] != undefined) {
            $scope.newViewDataSp[$scope.data.names[i]] = data[$scope.data.names[i]].length > 3 ? data[$scope.data.names[i]].slice(0, 3) : data[$scope.data.names[i]];
          } else {
          }
          ;
        }
        ;
      }
      //下拉刷新
      $scope.doRefresh = function () {
        initPageData();
        $scope.$broadcast("scroll.refreshComplete");
      }

      //接口
      function initPageData() {
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=xhbtongji.schoolData&type=" + $scope.data.type;
        hmsHttp.get(indexUrl).success(
          function (response) {
            // console.log(JSON.stringify(response));
            $scope.newViewData = response.response;
            sliceThreeData(response.response);
            SettingsService.set('schoolData', $scope.newViewData);
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
        $scope.config = angular.copy($scope.configSp);
        initPageData();
        $scope.popover.hide();
      }

      //初始化
      initPageData();
    }]);
