/**
 * Created by daidongdong on 2017/11/14.
 */

angular.module('myClassModule')
  .controller('myClassCtrl', ['$scope', '$rootScope', '$state', '$ionicPlatform', '$ionicPopover', 'indexPageService', 'baseConfig', 'hmsHttp', '$timeout', '$ionicScrollDelegate','SettingsService','hmsPopup',
    function ($scope, $rootScope, $state, $ionicPlatform, $ionicPopover, indexPageService, baseConfig, hmsHttp, $timeout, $ionicScrollDelegate,SettingsService,hmsPopup) {
      $scope.data = {
        type: SettingsService.get('timeType').id || 'day',
        names: ["class_address", "class_type", "class_member", "class_message", "class_found"],
        schoolList: [],
        selectList: [
          {
            name: "全部地区",
            select: false,
            id: 1,
            list: []
          },
          {
            name: "担当人员",
            select: false,
            id: 2,
            list: []
          }, {
            name: "学段",
            select: false,
            id: 3,
            list: []
          }]
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
      $scope.configList = {
        showPageList: false,
        nextPage: false,
        nextId: '-1',

      }
      $scope.configSp = angular.copy($scope.config);
      $scope.newViewData =  {};
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
        if(item == '1'){
        }else{
          hmsPopup.showLoadingWithoutBackdrop('正在加载...');
        }
        if (SettingsService.get('timeSelect') && SettingsService.get('timeSelect') != '') {
          $scope.data.type = SettingsService.get('timeSelect');
          for (var i = 0; i < $scope.operating.length; i++) {
            $scope.operating[i].selected = false;
          }
        }
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=xhbtongji.classData&type=" + $scope.data.type;
        hmsHttp.get(indexUrl).success(
          function (response) {
            $scope.config = angular.copy($scope.configSp);
            $scope.newViewData = response.response;
            sliceThreeData($scope.newViewData);
            SettingsService.set('classData',$scope.newViewData);
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
        initPageData();
        $scope.popover.hide();
      }


    //初始化
      initPageData();


      $scope.changePage = function () {
        $scope.configList.showPageList = !$scope.configList.showPageList;
        if ($scope.configList.showPageList == true) {
          initPageDataList();
        }
      }


      $scope.goSchoolDetail = function () {
        console.log('---');
        $state.go('classDetail');
      }
      //筛选条件
      $scope.selectAny = function (item) {
        for (var i = 0; i < $scope.data.selectList.length; i++) {
          $scope.data.selectList[i].select = false;
          if (item.id == $scope.data.selectList[i].id) {
            $scope.data.selectList[i].select = true;
          }
        }
      }
      //选择成功
      $scope.selectConfirm = function (item1, item2) {
        console.log(item1);
        console.log(item2);
        for (var i = 0; i < $scope.data.selectList.length; i++) {
          $scope.data.selectList[i].select = false;
        }
      }


      //列表接口
      function initPageDataList(item) {
        if (item == '1') {
        } else {
          hmsPopup.showLoadingWithoutBackdrop('正在加载...');
        }

        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=Yischool.schoolLists";
        var data = {
          type: 'day',
          province: '上海',
          invited: '888888',
          study_section: '1'
        }
        if ($scope.configList.nextId != '-1') {
          data.next_id == scope.configList.nextId;
        }
        hmsHttp.post(indexUrl, data).success(
          function (response) {
            $scope.data.schoolList = response.response.school_list;
            (response.response.next_id == '-1') ? $scope.configList.nextPage = false : $scope.configList.nextPage = true;
            $scope.configList.nextId = response.response.next_id;
            var selectUrl = baseConfig.basePath + "/api/?v=0.1&method=Yischool.schoolContidion&type=" + $scope.data.type;
            hmsHttp.get(selectUrl).success(
              function (response) {
                console.log(response);
                $scope.data.selectListData = response.response;
                $scope.data.selectList[0].list = response.response.school_address;
                $scope.data.selectList[1].list = response.response.trainer_list;
                $scope.data.selectList[2].list = response.response.section_list;
              }
            ).error(
              function (response, status, header, config) {
              }
            );
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }

    }]);
