/**
 * Created by daidongdong on 2017/11/14.
 */
angular.module('myClassModule')
  .controller('classDetailCtrl', ['$scope', '$rootScope', '$state', '$ionicPlatform', '$ionicPopover', 'indexPageService', 'baseConfig', 'hmsHttp', '$timeout','SettingsService','hmsPopup','$ionicScrollDelegate','publicMethod',
    function ($scope, $rootScope, $state, $ionicPlatform, $ionicPopover, indexPageService, baseConfig, hmsHttp, $timeout,SettingsService,hmsPopup,$ionicScrollDelegate,publicMethod) {
      $scope.data = {
        classDetail : SettingsService.get('classDetail'),
        classListData : {},
        userListData : {}
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

      $scope.selectModules = function(item){
        (item == 'class') ? $scope.config.headStyleActive = true : $scope.config.headStyleActive = false;
      }

      //接口
      $scope.selectList = function(item){
        var selectUrl = baseConfig.basePath + "/api/?v="+ baseConfig.version.currentVersion +"&method=Yiclass.classInfo";
        var data = {
          type : $scope.data.type,
          class_token :  $scope.data.classDetail.class_token,
          class_type : item
        }
        hmsHttp.post(selectUrl,data).success(
          function (response) {
            if(item == 0){
              $scope.data.classListData = response.response;
            }else{
              $scope.data.userListData = response.response;
              for(var i=0;i<$scope.data.userListData.member_list.length;i++){
                if($scope.data.userListData.member_list[i].speak_stype == '可发言'){
                  $scope.data.userListData.member_list[i].font = true;
                }
              }
            }
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }

      //初始化
      $scope.selectList(0);
      $scope.selectList(1);
    }]);
