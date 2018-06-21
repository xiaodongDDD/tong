/**
 * Created by daidongdong on 2018/5/4.
 */

angular.module('settingModule')
  .controller('distributionCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicLoading', '$timeout', 'hmsPopup', 'publicMethod', 'baseConfig', '$ionicScrollDelegate', 'hmsHttp', 'SettingsService',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicLoading, $timeout, hmsPopup, publicMethod, baseConfig, $ionicScrollDelegate, hmsHttp, SettingsService) {
      $scope.config = {}
      $scope.data = {
        clientSide: '',
        selectName: ''
      };
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      $scope.clientSideList = [];
      $scope.submit = function () {
        hmsPopup.showLoadingWithoutBackdrop('正在分派...');
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=Yi.taskAssign";
        var obj = {
          "module_id": 22,//模块id（必传）
          "u_id": $scope.data.clientSide,//被分派的用户id
          "t_a_id": SettingsService.get('t_a_id')//任务
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
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=Yi.taskAssignDetail";
        var obj = {
          "module_id": 22,//模块id（必传）
          "user_name": $scope.data.selectName,//用户名称
          "t_a_id": SettingsService.get('t_a_id')//任务
        }
        hmsHttp.post(indexUrl, obj).success(
          function (response) {
            if (response.hasOwnProperty('response')) {
              $scope.clientSideList = response.response.list
            }
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }

      $scope.serverSideChange = function (item) {
        console.log("Selected Serverside, text:", item.text, "value:", item.value);
      };
      $scope.selectInfo();
    }]);
