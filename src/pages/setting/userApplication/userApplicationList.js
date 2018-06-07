/**
 * Created by daidongdong on 2018/5/4.
 */

angular.module('settingModule')
  .controller('userApplicationListCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicLoading', '$timeout', 'hmsPopup', 'publicMethod', 'userApplicationService',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicLoading, $timeout, hmsPopup, publicMethod, userApplicationService) {
      $scope.config = {
        showPageList: true,
        showSelectList: false,
      }
      $scope.data = {
        selectList: [
          {
            name: "地区搜索",
            selectSp: false,
            select: false,
            id: 0,
            province: '',
            list: userApplicationService.provinces
          },
          {
            name: "状态",
            select: false,
            id: 1,
            project_id: '-1',
            list: [
              {id: '0', label: '请选择'},
              {id: '1', label: '系统待分配'},
              {id: '2', label: '手机号异常'},
              {id: '3', label: '待处理'},
              {id: '4', label: '已分派'},
              {id: '5', label: '已跟进'},
              {id: '6', label: '已调换'},
              {id: '7', label: '已返回'}
            ]
          }, {
            name: "资质评价",
            select: false,
            id: 2,
            invited_code: '',
            list: [
              {id: '0', label: '请选择'},
              {id: '1', label: '潜在资源'},
              {id: '2', label: '重要资源'},
              {id: '3', label: '无效资源'}
            ]
          }, {
            name: "时间搜索",
            select: false,
            id: 3,
            invited_code: '',
            list: []
          }]
      }
      $scope.goMessageDetail = function () {
        $state.go('messageDetail');
      }
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      $scope.goOperation = function (item) {
        switch (item) {
          case 1:
            $state.go('distribution');
            break;
          case 2:
            $state.go('exchange');
            break;
          case 3:
            $state.go('follow');
            break;
          case 4:
            $state.go('operationLog');
            break;
          case 5:
            $state.go('return');
            break;
        }
      }
      //下拉刷新
      $scope.doRefresh = function () {
        initData('1');
        $scope.$broadcast("scroll.refreshComplete");
      }
      $scope.initData = function () {
        hmsPopup.showLoadingWithoutBackdrop('正在加载...');
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=xhbtongji.userData&type=" + $scope.data.type;
        hmsHttp.get(indexUrl).success(
          function (response) {
            $scope.data.messageList = response.response;
            $ionicScrollDelegate.$getByHandle('mainScrollList').resize();
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }
      //筛选条件
      $scope.selectAny = function (item) {
        if (item.id === 3) {
          $state.go('timeSelect')
          return
        }
        var num = 0;
        for (var i = 0; i < $scope.data.selectList.length; i++) {
          if (item.id == $scope.data.selectList[i].id) {
            $scope.data.selectList[i].select = !$scope.data.selectList[i].select;
            $scope.config.showSelectList = true;
          } else {
            $scope.data.selectList[i].select = false;
          }
          if ($scope.data.selectList[i].select == true) {
            num++;
          }
        }
        if (num == 1) {
          $scope.config.showSelectList = true;
        } else {
          $scope.config.showSelectList = false;
        }
        console.log($scope.config.showSelectList)
        console.log($scope.data.selectList)
      }
      //选择成功
      $scope.selectConfirm = function (item1, item2) {
        switch (item2.id) {
          case 0:
            if($scope.data.selectList[0].selectSp){
              $scope.data.selectList[0].list = userApplicationService.provinces
              $scope.data.selectList[0].name = $scope.data.selectList[0].name + item1;
              if ($scope.data.selectList[0].name.length>6){
                $scope.data.selectList[0].name = $scope.data.selectList[0].name.substring(0,4) + '..'
              }
              $scope.data.selectList[0].selectSp = false;
              for (var i = 0; i < $scope.data.selectList.length; i++) {
                $scope.data.selectList[i].select = false;
              }
              $scope.config.showSelectList = false;
            }else{
              $scope.data.selectList[0].list = item1.citys
              $scope.data.selectList[0].name = item1.name;
              $scope.data.selectList[0].selectSp = true;
            }
            break;
          case 1:
            $scope.data.selectList[1].name = item1.label;
            if ($scope.data.selectList[1].name.length>4){
              $scope.data.selectList[1].name = $scope.data.selectList[1].name.substring(0,4) + '..'
            }
            break;
          case 2:
            $scope.data.selectList[2].name = item1.label;
            break;
          default:
            console.log('error');
        }
        if(item2.id !== 0){
          for (var i = 0; i < $scope.data.selectList.length; i++) {
            $scope.data.selectList[i].select = false;
          }
          $scope.config.showSelectList = false;
        }
      }
      $scope.telphone = function(item){
        console.log(item)
        publicMethod.showphone('18298182058')
      }
    }]);