/**
 * Created by daidongdong on 2017/11/14.
 */

angular.module('indexPageModule')
  .controller('indexPageCtrl', ['$scope', '$rootScope', '$state', '$ionicPopover', 'indexPageService', 'hmsHttp', 'baseConfig', 'tabService', 'hmsPopup', 'SettingsService', '$ionicScrollDelegate',
    function ($scope, $rootScope, $state, $ionicPopover, indexPageService, hmsHttp, baseConfig, tabService, hmsPopup, SettingsService, $ionicScrollDelegate) {
      $scope.data = {
        type: SettingsService.get('timeType').id || 'day',
        names: ["personal_ranking_team", "leading_ranking_company", "user_ranking_company"],
        typeDesc: SettingsService.get('timeType').text || '今日',
        filterSelect: '',
        selectList: [
          {value: '', desc: '全部'},
          {value: '999', desc: '名师'},
          {value: '666', desc: '运营'},
          {value: '888', desc: '培训师'},
          {value: '777', desc: '代理'},
          {value: 'other', desc: '其他'}
        ]
      }
      $scope.newViewData = {};
      $scope.newViewDataSp = {};
      $scope.config = {
        is_admin:window.localStorage.is_admin,
        status: {
          personal_ranking_team: false,
          leading_ranking_company: false,
          user_ranking_company: false,
        }
      };
      $scope.configSp = angular.copy($scope.config);
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
      $scope.operating = angular.copy(indexPageService.operating)

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
      //查看更多
      $scope.showPartOrAll = function (name) {
        if ($scope.config.status[name]) {
          if (name == 'leading_ranking_company') {
            $scope.newViewDataSp[name].leading_list = this.newViewData[name].leading_list.slice(0, 10);
            $scope.config.status[name] = false;
          } else {
            $scope.newViewDataSp[name].user_list = this.newViewData[name].user_list.slice(0, 10);
            $scope.config.status[name] = false;
          }
        } else {
          if (name == 'leading_ranking_company') {
            $scope.newViewDataSp[name].leading_list = this.newViewData[name].leading_list;
            $scope.config.status[name] = true;
          } else {
            $scope.newViewDataSp[name].user_list = this.newViewData[name].user_list;
            $scope.config.status[name] = true;
          }
        }
        $ionicScrollDelegate.$getByHandle('mainScroll').resize();
      }
      // 截取10条数据
      var sliceThreeData = function (data) {
        for (var i = 0; i < $scope.data.names.length; i++) {
          $scope.newViewDataSp[$scope.data.names[i]] = {};
          if ($scope.data.names[i] == 'leading_ranking_company') {
            $scope.newViewDataSp[$scope.data.names[i]].leading_list = [];
            if (typeof data[$scope.data.names[i]].leading_list != undefined) {
              $scope.newViewDataSp[$scope.data.names[i]].leading_list = data[$scope.data.names[i]].leading_list.length > 10 ? data[$scope.data.names[i]].leading_list.slice(0, 10) : data[$scope.data.names[i]].leading_list;
            } else {
            }
          } else {
            $scope.newViewDataSp[$scope.data.names[i]].user_list = [];
            if (typeof data[$scope.data.names[i]].user_list != undefined) {
              $scope.newViewDataSp[$scope.data.names[i]].user_list = data[$scope.data.names[i]].user_list.length > 10 ? data[$scope.data.names[i]].user_list.slice(0, 10) : data[$scope.data.names[i]].user_list;
            } else {
            }
          }

        }
      }


      //下拉刷新
      $scope.doRefresh = function () {
        initPageData('1');
        $scope.$broadcast("scroll.refreshComplete");
      }

      //接口
      function initPageData(item) {
        if (item == '1') {
        } else {
          hmsPopup.showLoadingWithoutBackdrop('正在加载...');
        }
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=xhbtongji.index&type=" + $scope.data.type;
        if (item == '2') {
          indexUrl = baseConfig.basePath + "/api/?v=0.1&method=xhbtongji.index&type=" + $scope.data.type + "&filter=" + $scope.data.filterSelect;
        }
        hmsHttp.get(indexUrl).success(
          function (response) {
            $scope.config = angular.copy($scope.configSp);
            $scope.newViewData = response.response;
            sliceThreeData(response.response);
            SettingsService.set('timeSelect', '');
            SettingsService.set('indexFlag', '');
            // SettingsService.set('indexData',$scope.newViewData);
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
        $scope.data.typeDesc = x.text;
        SettingsService.set('timeType', x);
        console.log(x);
        initPageData();
        $scope.popover.hide();
      }
      //初始化
      // if ($scope.tabs[0].cache == false) {
      initPageData();
      //   $scope.tabs[0].cache = true;
      // }

      //路由监听事件
      $scope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
          if (fromState.name == "timeSelectData" && SettingsService.get('timeSelect') && SettingsService.get('timeSelect') != '' && SettingsService.get('indexFlag') == '1') {
            $scope.data.type = SettingsService.get('timeSelect');
            for (var i = 0; i < $scope.operating.length; i++) {
              $scope.operating[i].selected = false;
            }
            $scope.operating[3].selected = true;
            initPageData();
            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTo(0, 230, true);


          } else {
          }
        })
      $scope.selectFilterSelect = function (item) {
        initPageData('2');
        console.log(item)
      }
    }]);
