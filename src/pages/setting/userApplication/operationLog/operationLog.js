/**
 * Created by daidongdong on 2018/5/4.
 */

angular.module('settingModule')
  .controller('operationLogCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicLoading', '$timeout', 'hmsPopup', 'publicMethod', 'SettingsService', 'hmsHttp', 'baseConfig',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicLoading, $timeout, hmsPopup, publicMethod, SettingsService, hmsHttp, baseConfig) {
      $scope.config = {}
      $scope.data = {
        messageList: []
      }
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      $scope.initData = function () {
        hmsPopup.showLoadingWithoutBackdrop('正在加载...');
        var indexUrl = baseConfig.basePath + "/api/?v="+ baseConfig.version.currentVersion +"&method=Yi.taskLog";
        var obj = {
          "module_id": 22,//模块id（必传）
          "t_a_id": SettingsService.get('t_a_id')//任务id
        }
        hmsHttp.post(indexUrl, obj).success(
          function (response) {
            $scope.data.messageList = response.response.list;
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }
      $scope.initData();
    }]);
