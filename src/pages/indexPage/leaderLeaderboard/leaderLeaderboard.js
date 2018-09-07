/**
 * Created by daidongdong on 2018/08/29.
 */

angular.module('indexPageModule')
  .controller('leaderLeaderboardCtrl', ['$scope', '$rootScope', '$state', '$ionicPopover', 'indexPageService', 'hmsHttp', 'baseConfig', 'tabService', 'hmsPopup', 'SettingsService', '$ionicScrollDelegate',
    function ($scope, $rootScope, $state, $ionicPopover, indexPageService, hmsHttp, baseConfig, tabService, hmsPopup, SettingsService, $ionicScrollDelegate) {
      $scope.data = {}
      $scope.config = {}
    }]);
