/**
 * Created by daidongdong on 2017/11/14.
 */

angular.module('myClassModule')
  .controller('myClassCtrl', ['$scope', '$rootScope', '$state', '$ionicPlatform', '$ionicPopover', 'indexPageService', 'baseConfig', 'hmsHttp', '$timeout', '$ionicScrollDelegate', 'SettingsService', 'hmsPopup', '$ionicBackdrop',
    function ($scope, $rootScope, $state, $ionicPlatform, $ionicPopover, indexPageService, baseConfig, hmsHttp, $timeout, $ionicScrollDelegate, SettingsService, hmsPopup, $ionicBackdrop) {
      $scope.data = {
        type: SettingsService.get('timeType').id || 'day',
        names: ["class_address", "class_type", "class_member", "class_message", "class_found"],
        schoolList: [],
        totle: '',
        selectList: [
          {
            name: "全部地区",
            select: false,
            id: 0,
            province: '',
            list: []
          },
          {
            name: "项目",
            select: false,
            id: 1,
            project_id: '-1',
            list: []
          }, {
            name: "创建身份",
            select: false,
            id: 2,
            invited_code: '',
            list: []
          }],
        pageName: '班级情况统计'
      }
      $scope.config = {
        is_admin:window.localStorage.is_admin,
        showContent: true,
        explainFlag: false,
        status: {
          class_found: false,
          class_message: false,
          class_address: false,
          class_type: false,
          class_member: false
        }
      }
      $scope.configList = {
        showPageList: false,
        nextPage: false,
        nextId: '-1',
        showSelectList: false
      }
      $scope.configParam = {}
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
        if($scope.config.showContent){
          var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=Statics.class_static&type=" + $scope.data.type;
        }else{
          var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=xhbtongji.classData&type=" + $scope.data.type;
        }
        hmsHttp.get(indexUrl).success(
          function (response) {
            $scope.config.status = angular.copy($scope.configSp).status;
            $scope.config.explainFlag = angular.copy($scope.configSp).explainFlag;
            $scope.newViewData = response.response;
            sliceThreeData($scope.newViewData);
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
        $scope.data.type = x.id;
        SettingsService.set('timeType', x);
        x.selected = !x.selected;
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
      if($scope.config.is_admin == 0){
        $scope.config.showContent = false
      }
      initPageData();


      $scope.changePage = function () {
        $scope.configList.nextId = '';
        $scope.configList.showPageList = !$scope.configList.showPageList;
        $scope.configList.showSelectList = false;
        for (var i = 0; i < $scope.data.selectList.length; i++) {
          $scope.data.selectList[i].select = false;
        }
        if ($scope.configList.showPageList == true) {
          $scope.data.schoolList = [];
          initPageDataList();
          $scope.selectList();
          $scope.data.pageName = '班级列表';
        } else {
          $scope.data.pageName = '班级情况统计';
        }
      }


      $scope.goSchoolDetail = function (item) {
        SettingsService.set('classDetail', item)
        $state.go('classDetail');
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
          if ($scope.data.selectList[i].select == true) {
            num++;
          }
        }
        if (num == 1) {
          $scope.configList.showSelectList = true;
        } else {
          $scope.configList.showSelectList = false;
        }
      }
      //选择成功
      $scope.selectConfirm = function (item1, item2) {
        switch (item2.id) {
          case 0:
            $scope.data.selectList[0].name = item1;
            $scope.data.selectList[0].province = item1;
            break;
          case 1:
            $scope.data.selectList[1].name = item1.project_name;
            $scope.data.selectList[1].project_id = item1.project_id;
            break;
          default:
            $scope.data.selectList[2].name = item1.user_name;
            $scope.data.selectList[2].invited_code = item1.invited_code;
        }
        for (var i = 0; i < $scope.data.selectList.length; i++) {
          $scope.data.selectList[i].select = false;
        }
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
        // hmsPopup.showLoadingWithoutBackdrop('正在加载...');

        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=Yiclass.classLists";
        var data = {
          type: $scope.data.type,
          province: $scope.data.selectList[0].province,
          project_id: $scope.data.selectList[1].project_id,
          invited_code: $scope.data.selectList[2].invited_code,
        }
        if ($scope.configList.nextId > 0 && item == '1') {
          data.next_id = $scope.configList.nextId;
        }
        hmsHttp.post(indexUrl, data).success(
          function (response, status, header, config) {
            if (item != '1') {
              $scope.data.totle = response.response.totle;
            }
            $scope.data.schoolList = $scope.data.schoolList.concat(response.response.class_list);
            if (response.response.next_id < 0) {
              $scope.configList.nextPage = false
            } else {
              $scope.configList.nextPage = true;
            }
            $scope.isLock = false;
            $scope.configList.nextId = response.response.next_id;
            $ionicScrollDelegate.$getByHandle('mainScrollList').resize();
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }
        ).error(
          function (response, status, header, config) {
            $scope.isLock = false;
          }
        );
      }

      //筛选
      $scope.selectList = function () {
        var selectUrl = baseConfig.basePath + "/api/?v=0.1&method=Yiclass.classContidion&type=" + $scope.data.type;
        hmsHttp.get(selectUrl).success(
          function (response) {
            $scope.data.selectListData = response.response;
            $scope.data.selectList[0].list = response.response.city_list;
            $scope.data.selectList[1].list = response.response.project_type;
            $scope.data.selectList[2].list = response.response.user_list;
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }
      $scope.loadMore = function () {
        initPageDataList('1');
      }

      $scope.selectSubHead = function (item) {
        if (item === 1) {
          $scope.config.showContent = true;
        } else {
          $scope.config.showContent = false;
        }
        $scope.newViewData = {};
        initPageData();
        console.log($scope.config.showContent);
      }
    }]);
