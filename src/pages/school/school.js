/**
 * Created by daidongdong on 2017/11/14.
 */
angular.module('schoolModule')
  .controller('schoolCtrl', ['$scope', '$rootScope', '$state', '$ionicPlatform', '$ionicPopover', 'indexPageService', 'baseConfig', 'hmsHttp', '$timeout', 'SettingsService', 'hmsPopup', '$ionicScrollDelegate',
    function ($scope, $rootScope, $state, $ionicPlatform, $ionicPopover, indexPageService, baseConfig, hmsHttp, $timeout, SettingsService, hmsPopup, $ionicScrollDelegate) {
      $scope.data = {
        pageName :'整校用户',
        type: SettingsService.get('timeType').id || 'day',
        names: ['distinct_list', 'arc_percent', 'join_school', 'message_use', 'school_property', 'school_ranges', 'study_section', 'trainer_lists','reached_school'],
        schoolList: [],
        selectList: [
          {
            name: "全部地区",
            select: false,
            id: 0,
            list: []
          },
          {
            name: "达标情况",
            select: false,
            id: 1,
            list: []
          }, {
            name: "负责人",
            select: false,
            id: 2,
            list: []
          }]
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
          study_section: 0,
          trainer_lists: false,
          reached_school: false
        },
      }
      $scope.configList = {
        showPageList: false,
        nextPage: false,
        nextId: '-1',
        showSelectList : false
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
        initPageData('1');
        $scope.$broadcast("scroll.refreshComplete");
      }

      //接口
      function initPageData(item) {
        if (item == '1') {
        } else {
          hmsPopup.showLoadingWithoutBackdrop('正在加载...');
        }
        if (SettingsService.get('timeSelect') && SettingsService.get('timeSelect') != '') {
          $scope.data.type = SettingsService.get('timeSelect');
          for (var i = 0; i < $scope.operating.length; i++) {
            $scope.operating[i].selected = false;
          }
        }
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=xhbtongji.schoolData&type=" + $scope.data.type;
        hmsHttp.get(indexUrl).success(
          function (response) {
            $scope.config = angular.copy($scope.configSp);
            $scope.newViewData = response.response;
            sliceThreeData(response.response);
            SettingsService.set('schoolData', $scope.newViewData);
            SettingsService.set('timeSelect', '');
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
        x.selected = !x.selected;
        $scope.data.type = x.id;
        SettingsService.set('timeType', x);
        $scope.popover.hide();
        if ($scope.configList.showPageList) {
          $scope.data.schoolList = [];
          initPageDataList();
          $scope.selectList();
        } else {
          initPageData();
        }
      }

      //初始化
      initPageData();

      $scope.changePage = function () {
        $scope.configList.nextId = '';
        $scope.configList.showPageList = !$scope.configList.showPageList;
        $scope.configList.showSelectList = false;
        for(var i=0;i<$scope.data.selectList.length;i++){
          $scope.data.selectList[i].select = false;
        }
        if ($scope.configList.showPageList == true) {
          $scope.data.schoolList = [];
          initPageDataList();
          $scope.selectList();
          $scope.data.pageName = '学校列表';
        } else {
          $scope.data.pageName = '整校用户';
        }
      }


      $scope.goSchoolDetail = function (school) {
        SettingsService.set('schoolInfo',school);
        $state.go('schoolDetail');
      }
      //筛选条件
      $scope.selectAny = function (item) {
        var num = 0;
        for (var i = 0; i < $scope.data.selectList.length; i++) {
          if (item.id == $scope.data.selectList[i].id) {
            $scope.data.selectList[i].select = !$scope.data.selectList[i].select;
            $scope.configList.showSelectList = true;
          } else {
            $scope.data.selectList[i].select = false;
          }
          if($scope.data.selectList[i].select == true){
            num++;
          }
        }
        if(num == 1){
          $scope.configList.showSelectList = true;
        }else{
          $scope.configList.showSelectList = false;
        }
      }
      //选择成功
      $scope.selectConfirm = function (item1, item2) {
        console.log(item1);
        console.log(item2);
        switch (item2.id) {
          case 0:
            $scope.data.selectList[0].name = item1;
            $scope.data.selectList[0].province = item1;
            break;
          case 1:
            $scope.data.selectList[1].name = item1.reached_name || item1.section_name;
            $scope.data.selectList[1].is_reached = item1.is_reached;
            break;
          default:
            $scope.data.selectList[2].name = item1.user_name;
            $scope.data.selectList[2].invited_code = item1.invite_code;
        }
        for (var i = 0; i < $scope.data.selectList.length; i++) {
          $scope.data.selectList[i].select = false;
        }
        console.log($scope.data.selectList);
        $scope.configList.showSelectList = false;
        $scope.configList.nextId = '';
        $scope.data.schoolList = [];
        initPageDataList();
      }

      $scope.isLock = false;

      //列表接口
      function initPageDataList(item) {
        if ($scope.isLock) return;
        $scope.isLock = true;
        if (item == '1') {
        } else {
          hmsPopup.showLoadingWithoutBackdrop('正在加载...');
        }
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=Yischool.schoolLists";
        var data = {
          type: $scope.data.type,
          province: $scope.data.selectList[0].province,
          invited_code: $scope.data.selectList[2].invited_code,
          is_reached: $scope.data.selectList[1].is_reached
        }
        console.log(data);
        console.log($scope.data);
        if ($scope.configList.nextId > 0 && item == '1') {
          data.next_id = $scope.configList.nextId;
        }
        hmsHttp.post(indexUrl, data).success(
          function (response) {
            if (item != '1') {
              $scope.data.totle = response.response.totle;
            }
            $scope.data.schoolList = response.response.school_list;
            if(response.response.next_id < 0){
              $scope.configList.nextPage = false
            }else{
              $scope.configList.nextPage = true;
            }
            $scope.isLock = false;
            $scope.configList.nextId = response.response.next_id;
            $ionicScrollDelegate.$getByHandle('mainScrollList').resize();
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }


      //筛选
      $scope.selectList = function () {
        var selectUrl = baseConfig.basePath + "/api/?v=0.1&method=Yischool.schoolContidion&type=" + $scope.data.type;
        hmsHttp.get(selectUrl).success(
          function (response) {
            $scope.data.selectListData = response.response;
            $scope.data.selectList[0].list = response.response.school_address;
            $scope.data.selectList[1].list = response.response.school_reached;
            $scope.data.selectList[2].list = response.response.trainer_list;
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }
      $scope.loadMore = function () {
        initPageDataList('1');
      }

    }]);
