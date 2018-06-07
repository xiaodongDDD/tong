/**
 * Created by daidongdong on 2018/5/4.
 */

angular.module('settingModule')
  .controller('distributionCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicLoading', '$timeout', 'hmsPopup','publicMethod',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicLoading, $timeout, hmsPopup,publicMethod) {
      $scope.config = {}
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      $scope.clientSideList = [
        { text: "Backbone", value: "bb" },
        { text: "Angular", value: "ng" },
        { text: "Ember", value: "em" },
        { text: "Knockout", value: "ko" }
      ];

      $scope.data = {
        clientSide: 'ng'
      };

      $scope.serverSideChange = function(item) {
        console.log("Selected Serverside, text:", item.text, "value:", item.value);
      };

    }]);
