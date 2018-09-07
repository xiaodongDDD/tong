/**
 * Created by daidongdong on 2017/11/14.
 */
angular.module('schoolModule')
  .controller('schoolItemListCtrl', ['$scope', '$rootScope', '$state', '$ionicPlatform', '$ionicPopover', 'indexPageService', 'baseConfig', 'hmsHttp', '$timeout','SettingsService','hmsPopup','$ionicScrollDelegate','publicMethod',
    function ($scope, $rootScope, $state, $ionicPlatform, $ionicPopover, indexPageService, baseConfig, hmsHttp, $timeout,SettingsService,hmsPopup,$ionicScrollDelegate,publicMethod) {
      $scope.data = {
        arc :SettingsService.get('arcItem')
      }
      $scope.config = {
        font : true
      }
      $scope.goBack = function () {
        publicMethod.goBack();
      }

      function init(){
        var indexUrl = baseConfig.basePath + "/api/?v="+ baseConfig.version.currentVersion +"&method=Yischool.arcTeacher";
        var data = {
          s_a_id: SettingsService.get('arcItem').s_a_id
        }
        hmsHttp.post(indexUrl, data).success(
          function (response) {
            $scope.data.arcList = response.response;
            for(var i=0;i<$scope.data.arcList.length;i++){
              $scope.data.arcList[i].subjectString = $scope.data.arcList[i].subject_list.join(',');
            }
            console.log();
            $ionicScrollDelegate.$getByHandle('mainScroll').resize();
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }
      init()

    }]);
