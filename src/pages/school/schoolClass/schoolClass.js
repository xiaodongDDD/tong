/**
 * Created by daidongdong on 2017/11/14.
 */
angular.module('schoolModule')
  .controller('schoolClassCtrl', ['$scope', '$rootScope', '$state', '$ionicPlatform', '$ionicPopover', 'indexPageService', 'baseConfig', 'hmsHttp', '$timeout','SettingsService','hmsPopup','$ionicScrollDelegate','publicMethod',
    function ($scope, $rootScope, $state, $ionicPlatform, $ionicPopover, indexPageService, baseConfig, hmsHttp, $timeout,SettingsService,hmsPopup,$ionicScrollDelegate,publicMethod) {
      $scope.data = {
        schoolInfo : SettingsService.get('schoolInfo'),
        classInfo : SettingsService.get('schoolClass')
    }
      $scope.config = {
        headStyleActive : true,
        headShow : false,
        font : true
      }
      //返回
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      console.log($scope.data );
      $scope.selectModules = function(item){
        (item == 'class') ? $scope.config.headStyleActive = true : $scope.config.headStyleActive = false;
      }
      function init(item){
        var indexUrl = baseConfig.basePath + "/api/?v="+ baseConfig.version.currentVersion +"&method=Yischool.classInfo";
        var data = {
          class_id: SettingsService.get('schoolClass').class_id,
          class_type: item
        }
        hmsHttp.post(indexUrl, data).success(
          function (response) {
            if(item == 0){
              $scope.data.teacherList = response.response;
              for(var i=0;i<$scope.data.teacherList.member_list.length;i++){
                $scope.data.teacherList.member_list[i].subjectString = $scope.data.teacherList.member_list[i].subject_name.join(',');
              }
            }else{
              $scope.data.otherList = response.response;
            }
            $ionicScrollDelegate.$getByHandle('mainScroll').resize();
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }
      init(0);
      init(1);
    }]);
