/**
 * Created by daidongdong on 2017/11/14.
 */

angular.module('myInfoModule')
  .controller('agentInfoCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicPopover', 'hmsHttp', 'baseConfig', 'indexPageService', 'SettingsService', 'hmsPopup', '$ionicScrollDelegate',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicPopover, hmsHttp, baseConfig, indexPageService, SettingsService, hmsPopup, $ionicScrollDelegate) {
      $scope.data = {
        type: SettingsService.get('timeType').id || 'day',
        names: ["teacher_address", "user_address", "user_role", "user_type"]
      };
      $scope.config = {
        status: {
          teacher_address: false,
          user_address: false,
          user_role: false,
          user_type: false
        }
      };
      $scope.configSp = angular.copy($scope.config);
      $scope.newViewData = {};
      $scope.newViewDataSp = {};
      $scope.operating = angular.copy(indexPageService.operating);
      $scope.operating.push({
        id: 'time',
        text: '按日期查询',
        selected: false
      });
      $scope.operating[2].style = {
        'border-bottom-width': '2px',
        'border-bottom-style': 'solid',
        'border-bottom-color': '#DCDCDC'
      };

      for (var i = 0; i < $scope.operating.length; i++) {
        if ($scope.operating[i].id == $scope.data.type) {
          $scope.operating[i].selected = true;
        } else {
          $scope.operating[i].selected = false;
        }
      }
      $scope.goPage = function () {
      }

      //接口
      function initPageData(item) {
        if (item == '1') {
        } else {
          hmsPopup.showLoadingWithoutBackdrop('正在加载...');
        }
        var indexUrl = baseConfig.basePath + "/api/?v="+ baseConfig.version.currentVersion +"&method=xhbtongji.indexRegion&type=" + $scope.data.type;
        hmsHttp.get(indexUrl).success(
          function (response) {
            console.log(response);
            $scope.config = angular.copy($scope.configSp);
            $scope.newViewData = response.response;
            for (var i = 0; i < $scope.newViewData.region_list.length; i++) {
              $scope.newViewData.region_list[i].show = false;
            }
            // sliceThreeData(response.response);
            // SettingsService.set('useData',$scope.newViewData);
            SettingsService.set('timeSelect','')
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }


      //右上角popover
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
        if (x.id == 'time') {
          $state.go('timeSelect');
          $scope.popover.hide();
          return;
        }
        for (var i = 0; i < $scope.operating.length; i++) {
          $scope.operating[i].selected = false;
        }
        x.selected = !x.selected;
        $scope.data.type = x.id;
        SettingsService.set('timeType', x);

        initPageData();
        $scope.popover.hide();

      }

      //初始化页面
      initPageData();


      $scope.toggleGroup = function (group) {
        console.log(group);
        // var groupSP = angular.copy(group);
        // for(var i=0;i<$scope.newViewData.region_list.length;i++){
        //   $scope.newViewData.region_list[i].show = false;
        // }
        group.show = !group.show;
        $ionicScrollDelegate.$getByHandle('mainScroll').resize();

      };
      $scope.isGroupShown = function (group) {
        return group.show;
      };


      //路由监听事件
      $scope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
          if (fromState.name == "timeSelect") {
            $scope.data.type = SettingsService.get('timeSelect');
            if($scope.data.type){
              for (var i = 0; i < $scope.operating.length; i++) {
                $scope.operating[i].selected = false;
              }
              $scope.operating[3].selected = true;
              initPageData();
            }
          } else {
          }
        })

      $scope.loginOut = function(){
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
    }]);
