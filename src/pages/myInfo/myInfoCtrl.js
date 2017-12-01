/**
 * Created by daidongdong on 2017/11/14.
 */

angular.module('myInfoModule')
  .controller('myInfoCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform','$ionicPopover','hmsHttp','baseConfig','indexPageService','SettingsService','hmsPopup',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform,$ionicPopover,hmsHttp,baseConfig,indexPageService,SettingsService,hmsPopup) {
      $scope.data = {
        type : SettingsService.get('timeType').id || 'day',
        names:["teacher_address","user_role","user_type"],
      };
      $scope.config = {
        status : {
          teacher_address : false,
          user_role : false,
          user_type : false,
        }
      };
      $scope.configSp = angular.copy($scope.config);
      $scope.newViewData = {};
      $scope.newViewDataSp = {};
      $scope.operating = indexPageService.operating;
      // for(var i=0;i<$scope.operating.length;i++){
      //   if($scope.operating[i].id == $scope.data.type){
      //     $scope.operating[i].selected = true;
      //   }else{
      //     $scope.operating[i].selected = false;
      //   }
      // }
      $scope.goPage = function () {
      }
      //接口
      function initPageData(item){
        if(item == '1'){
        }else{
          hmsPopup.showLoadingWithoutBackdrop('正在加载...');
        }
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=xhbtongji.userData&type="+$scope.data.type;
        hmsHttp.get(indexUrl).success(
          function (response) {
            $scope.newViewData = response.response;
            sliceThreeData(response.response);
            SettingsService.set('useData',$scope.newViewData);
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }
      //下拉刷新
      $scope.doRefresh=function () {
        initPageData('1');
        $scope.$broadcast("scroll.refreshComplete");
      }
      //查看更多
      $scope.showPartOrAll = function(name){
        if($scope.config.status[name]){
          $scope.newViewDataSp[name]=this.newViewData[name].slice(0, 3);
          $scope.config.status[name]=false;
        }else{
          $scope.newViewDataSp[name]=this.newViewData[name];
          $scope.config.status[name]=true;
        };
        $ionicScrollDelegate.$getByHandle('mainScroll').resize();
      }
      // 截取3条数据
      var sliceThreeData = function(data){
        for(var i = 0; i<$scope.data.names.length;i++){
          $scope.newViewDataSp[$scope.data.names[i]] = [];
          if(typeof data[$scope.data.names[i]] != undefined){
            $scope.newViewDataSp[$scope.data.names[i]] =  data[$scope.data.names[i]].length > 3 ? data[$scope.data.names[i]].slice(0,3) :  data[$scope.data.names[i]];
          }else{
          };
        };
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
        for(var i=0;i<$scope.operating.length;i++){
          $scope.operating[i].selected = false;
        }
        x.selected = !x.selected;
        $scope.data.type = x.id;
        $scope.config = angular.copy($scope.configSp);
        SettingsService.set('timeType', x);
        initPageData();
        $scope.popover.hide();
      }

      //初始化页面
      initPageData();
    }]);
