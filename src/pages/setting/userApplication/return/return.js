/**
 * Created by daidongdong on 2018/5/4.
 */

angular.module('settingModule')
  .controller('returnCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicLoading', '$timeout', 'hmsPopup','publicMethod','userApplicationService',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicLoading, $timeout, hmsPopup,publicMethod,userApplicationService) {
      $scope.config = {}
      $scope.data = {
        province: '',
        city: '',
        listCity:[],
        listProvince:userApplicationService.provinces,
        clientSide: '1'
      }
      console.log($scope.data.listProvince)
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      $scope.clientSideList = [
        { text: "我的上级", value: "1" },
        { text: "孙亦寒", value: "2" },
        { text: "我的区域负责人", value: "3" },
      ];

      $scope.selectProvince = function(item) {
        console.log(item)
        $scope.data.listCity = JSON.parse(item).citys
        console.log($scope.data.listCity)
      }
      $scope.serverSideChange = function(item) {
        console.log("Selected Serverside, text:", item.text, "value:", item.value);
      };

    }]);
