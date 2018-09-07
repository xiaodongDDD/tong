/**
 * Created by daidongdong on 2018/5/4.
 */

angular.module('settingModule')
  .controller('exchangeCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicLoading', '$timeout', 'hmsPopup', 'publicMethod', 'userApplicationService', 'baseConfig', '$ionicScrollDelegate', 'hmsHttp', 'SettingsService',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicLoading, $timeout, hmsPopup, publicMethod, userApplicationService, baseConfig, $ionicScrollDelegate, hmsHttp, SettingsService) {
      $scope.config = {
        showInput: true
      }
      $scope.data = {
        clientSide: '',
        selectName: '',
        province: '',
        city: '',
        exchang_reason: '',
        clientSide: '',
        address: '',
        addressData: SettingsService.get('addressData')
      }
      $scope.clientSideList = []
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      $scope.submit = function () {
        for (var i = 0; i < $scope.data.addressData.length; i++) {
          for (var j = 0; j < $scope.data.addressData[i].children.length; j++) {
            if ($scope.data.address === $scope.data.addressData[i].children[j].value) {
              $scope.data.province = $scope.data.addressData[i].text
              $scope.data.city = $scope.data.addressData[i].children[j].text
            }
          }
        }
        hmsPopup.showLoadingWithoutBackdrop('正在调换...');
        if ($scope.data.province == '') {
          hmsPopup.showShortCenterToast('请选择实际归属地');
          return;
        }
        if ($scope.data.city == '') {
          hmsPopup.showShortCenterToast('请选择实际归属地');
          return;
        }
        if ($scope.data.clientSide == '') {
          hmsPopup.showShortCenterToast('请选择调换人员');
          return;
        }
        var indexUrl = baseConfig.basePath + "/api/?v="+ baseConfig.version.currentVersion +"&method=Yi.exchange";
        var obj = {
          "module_id": 22,//模块id（必传）
          "user_name": '',//用户名称
          "t_a_id": SettingsService.get('t_a_id'),//任务
          "u_id": $scope.data.clientSide,//调换的用户id
          "real_province": $scope.data.province,//省份
          "real_city": $scope.data.city,//城市
          "exchang_reason": $scope.data.exchang_reason//调换的理由
        }
        hmsHttp.post(indexUrl, obj).success(
          function (response) {
            if (response.hasOwnProperty('response')) {
              $scope.Toast.show(response.response.msg);
              $scope.goBack()
            }
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }

      $scope.selectInfo = function (item) {
        hmsPopup.showLoadingWithoutBackdrop('正在搜索...');
        var indexUrl = baseConfig.basePath + "/api/?v="+ baseConfig.version.currentVersion +"&method=Yi.exchangeUserSearch";
        console.log($scope.data.province)
        var obj = {
          "module_id": 22,//模块id（必传）
          "user_name": $scope.data.selectName,//用户名称
          "t_a_id": SettingsService.get('t_a_id'),//任务
          // "t_a_id":SettingsService.get('t_a_id'),//任务
          "real_province": '',//省份
          "real_city": $scope.data.city//城市
        }
        if ($scope.data.province) {
          obj.real_province = JSON.parse($scope.data.province).name
        }
        hmsHttp.post(indexUrl, obj).success(
          function (response) {
            $scope.clientSideList = response.response.list
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }
      $scope.changeHead = function () {
        $scope.config.showInput = false;
      }

      $scope.goCancle = function () {
        $scope.config.showInput = true;
      }
    }]);
