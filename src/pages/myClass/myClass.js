/**
 * Created by daidongdong on 2017/11/14.
 */

angular.module('myClassModule')
  .controller('myClassCtrl', ['$scope', '$rootScope', '$state', '$ionicPlatform', '$ionicPopover', 'indexPageService', 'baseConfig', 'hmsHttp', '$timeout', '$ionicScrollDelegate','SettingsService','hmsPopup',
    function ($scope, $rootScope, $state, $ionicPlatform, $ionicPopover, indexPageService, baseConfig, hmsHttp, $timeout, $ionicScrollDelegate,SettingsService,hmsPopup) {
      $scope.data = {
        type: SettingsService.get('timeType').id || 'day',
        names: ["class_address", "class_type", "class_member", "class_message", "class_found"],
      }
      $scope.config = {
        explainFlag: false,
        status: {
          class_found: false,
          class_message: false,
          class_address: false,
          class_type: false,
          class_member: false
        }
      }
      $scope.configSp = angular.copy($scope.config);
      $scope.newViewData =  {};
      $scope.newViewDataSp = {};
      $scope.operating = indexPageService.operating;
      // for (var i = 0; i < $scope.operating.length; i++) {
      //   if ($scope.operating[i].id == $scope.data.type) {
      //     $scope.operating[i].selected = true;
      //   } else {
      //     $scope.operating[i].selected = false;
      //   }
      // }
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
        initPageData('1');
        $scope.$broadcast("scroll.refreshComplete");
      }
      //接口
      function initPageData(item) {
        if(item == '1'){
        }else{
          hmsPopup.showLoadingWithoutBackdrop('正在加载...');
        }
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=xhbtongji.classData&type=" + $scope.data.type;
        hmsHttp.get(indexUrl).success(
          function (response) {
            $scope.config = angular.copy($scope.configSp);
            $scope.newViewData = response.response;
            sliceThreeData($scope.newViewData);
            SettingsService.set('classData',$scope.newViewData);
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }

      $scope.popover = $ionicPopover.fromTemplateUrl('build/pages/myClass/modal/popover.html', {
        scope: $scope
      });

      // .fromTemplateUrl() 方法
      $ionicPopover.fromTemplateUrl('build/pages/myClass/modal/popover.html', {
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
        $scope.data.type = x.id;
        SettingsService.set('timeType', x);
        x.selected = !x.selected;
        if(x.id == 'time'){
          $state.go('timeSelect');
          $scope.popover.hide();
          return;
        }
        initPageData();
        $scope.popover.hide();
      }


    //初始化
      initPageData();
  }]);
