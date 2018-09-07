/**
 * Created by daidongdong on 2017/11/14.
 */
angular.module('schoolModule')
  .controller('schoolDetailCtrl', ['$scope', '$rootScope', '$state', '$ionicPlatform', '$ionicPopover', 'indexPageService', 'baseConfig', 'hmsHttp', '$timeout', 'SettingsService', 'hmsPopup', '$ionicScrollDelegate', 'publicMethod',
    function ($scope, $rootScope, $state, $ionicPlatform, $ionicPopover, indexPageService, baseConfig, hmsHttp, $timeout, SettingsService, hmsPopup, $ionicScrollDelegate, publicMethod) {
      $scope.data = {
        schoolInfo : SettingsService.get('schoolInfo')
      }
      $scope.config = {
        headStyleActive: true,
        headShow: false
      }
      //返回
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      function init(){
        var indexUrl = baseConfig.basePath + "/api/?v="+ baseConfig.version.currentVersion +"&method=Yischool.classList";
        var data = {
          school_id: SettingsService.get('schoolInfo').school_id
        }
        hmsHttp.post(indexUrl, data).success(
          function (response) {
            $scope.data.classList = response.response;
            $ionicScrollDelegate.$getByHandle('mainScroll').resize();
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }

      function initarc(){
        var indexUrl = baseConfig.basePath + "/api/?v="+ baseConfig.version.currentVersion +"&method=Yischool.arcList";
        var data = {
          school_id: SettingsService.get('schoolInfo').school_id
        }
        hmsHttp.post(indexUrl, data).success(
          function (response) {
            $scope.data.arcList = response.response;
            $ionicScrollDelegate.$getByHandle('mainScroll').resize();
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }

      $scope.selectModules = function (item) {
        (item == 'class') ? $scope.config.headStyleActive = true : $scope.config.headStyleActive = false;
      }

      $scope.goSchoolClass = function (item) {
        SettingsService.set('schoolClass',item);
        $state.go('schoolClass');
      }
      $scope.goSchoolList = function (item) {
        SettingsService.set('arcItem',item);
        $state.go('schoolItemList');
      }


      init();
      initarc();
    }]);
