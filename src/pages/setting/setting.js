/**
 * Created by daidongdong on 2017/11/14.
 */

angular.module('settingModule')
  .controller('settingCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicLoading', '$timeout', 'hmsPopup','checkVersionService','jpushService','baseConfig','hmsHttp','SettingsService',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicLoading, $timeout, hmsPopup,checkVersionService,jpushService,baseConfig,hmsHttp,SettingsService) {
      $scope.config = {}
      $rootScope.settingNum = {
        messageNum: '',
        applicationNum: ''
      };
      $scope.data = {
        userInfo : {}
      }
      $scope.exitAccount = function () {
        function loginOut(buttonIndex) {
          if (buttonIndex == 1) { //确认按钮
            window.localStorage.token = '';
            $state.go('login');
          } else { //取消按钮
            return;
          }
        }
        hmsPopup.confirm('是否确认要退出一统？', '提示信息', loginOut);
      }
      //修改密码
      $scope.goChangePassword = function () {
        $state.go('changePassword');
      }
      $scope.versionDetection = function () {
        checkVersionService.checkAppVersion('updateFlag');
      }
      $scope.userApplication = function () {
        $state.go('userApplicationList');
      }
      $scope.goMessage = function () {
        if (ionic.Platform.isWebView()) {
          jpushService.resetBadge();
        }else{
          console.log('网页情况下不开启推送！');
        }
        $state.go('messageList');
      }
      $scope.initData = function () {
        hmsPopup.showLoadingWithoutBackdrop('正在加载...');
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=Yimessage.user_center";
        hmsHttp.get(indexUrl).success(
          function (response) {
            $scope.data.userInfo = response.response;
            $rootScope.settingNum.messageNum = $scope.data.userInfo.message_count
            $rootScope.settingNum.applicationNum = $scope.data.userInfo.apply_count
            console.log($rootScope.settingNum)
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }
      $scope.initData();
      $scope.doRefresh = function(){
        $scope.initData();
        $scope.$broadcast("scroll.refreshComplete");
      }
      $scope.province = function () {
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=Task.address";
        hmsHttp.get(indexUrl).success(
          function (response) {
            if (response.hasOwnProperty('response')) {
              var listProvince = response.response.provinces;
              SettingsService.set('provinces', listProvince)
              var addressData = []
              for (var i = 0; i < listProvince.length; i++) {
                addressData[i] =
                  {
                    value: 10 + i,
                    text: listProvince[i].name,
                    children: []
                  }
                for (var j = 0; j < listProvince[i].citys.length; j++) {
                  var num = 20 + j
                  addressData[i].children[j] = {
                    value: addressData[i].value + '-'+num,
                    text: listProvince[i].citys[j]
                  }
                }
              }
              SettingsService.set('addressData', addressData)
            }
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }
      $scope.province();
    }]);
