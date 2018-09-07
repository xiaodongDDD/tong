/**
 * Created by daidongdong on 2018/5/4.
 */

angular.module('settingModule')
  .controller('messageDetailCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicLoading', '$timeout', 'hmsPopup', 'publicMethod','baseConfig','SettingsService','hmsHttp',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicLoading, $timeout, hmsPopup, publicMethod,baseConfig,SettingsService,hmsHttp) {
      $scope.config = {
      }
      $scope.data = {
        messageDetail:{
        }
      }
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      $scope.goApplication = function(){
        $state.go('userApplicationList')
      }
      $scope.initData = function () {
        hmsPopup.showLoadingWithoutBackdrop('正在加载...');
        var indexUrl = baseConfig.basePath + "/api/?v="+ baseConfig.version.currentVersion +"&method=Yimessage.news_detail";
        var obj = {
          n_id: SettingsService.get('messageId')
        }
        hmsHttp.post(indexUrl,obj).success(
          function (response) {
            $scope.data.messageDetail = response.response.detail;
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }
      $scope.initData()
    }]);
