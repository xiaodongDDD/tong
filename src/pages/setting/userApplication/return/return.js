/**
 * Created by daidongdong on 2018/5/4.
 */

angular.module('settingModule')
  .controller('returnCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicLoading', '$timeout', 'hmsPopup', 'publicMethod', 'userApplicationService', 'baseConfig', 'SettingsService', 'hmsHttp',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicLoading, $timeout, hmsPopup, publicMethod, userApplicationService, baseConfig, SettingsService, hmsHttp) {
      $scope.config = {}
      $scope.data = {
        text: '',
        province: '',
        city: '',
        listCity: [],
        listProvince: userApplicationService.provinces,
        clientSide: ''
      }
      console.log($scope.data.listProvince)
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      $scope.clientSideList = [
        {text: "我的上级", value: "1"},
        {text: "孙亦寒", value: "2"},
        {text: "我的区域负责人", value: "3"},
      ];

      $scope.selectProvince = function (item) {
        console.log(item)
        $scope.data.listCity = JSON.parse(item).citys
        console.log($scope.data.listCity)
      }
      $scope.serverSideChange = function (item) {
        console.log("Selected Serverside, text:", item.text, "value:", item.value);
      };
      $scope.submit = function () {
        hmsPopup.showLoadingWithoutBackdrop('正在返回...');
        if ($scope.data.clientSide == '') {
          hmsPopup.showShortCenterToast('请选择返回的人员');
          return;
        }
        if ($scope.data.text == '') {
          hmsPopup.showShortCenterToast('请选择返回缘由');
          return;
        }
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=Yi.back";
        var obj = {
          "module_id": 22,//模块id（必传）
          "t_a_id": SettingsService.get('t_a_id'),//任务id
          "real_province": "",//省份
          "real_city": $scope.data.city,//城市
          "type": $scope.data.clientSide,//1我的上级，2梁老大，3我的区域负责人（单选）
          "back_reason": $scope.data.text
        }
        if ($scope.data.province) {
          obj.real_province = JSON.parse($scope.data.province).name
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
    }]);
