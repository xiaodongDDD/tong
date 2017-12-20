angular.module('indexPageModule')
  .controller('timeSelectCtrl', ['$scope', '$rootScope', '$state', '$ionicPlatform', '$ionicPopover', 'baseConfig', 'hmsHttp', '$timeout', '$ionicScrollDelegate', 'SettingsService', 'hmsPopup', '$ionicHistory', '$http', 'publicMethod', 'formatDate',
    function ($scope, $rootScope, $state, $ionicPlatform, $ionicPopover, baseConfig, hmsHttp, $timeout, $ionicScrollDelegate, SettingsService, hmsPopup, $ionicHistory, $http, publicMethod, formatDate) {
      $scope.data = {
        startDatetime: '2016-04-01',
        endDatetime: formatDate.formatDate(new Date(), 'yyyy-MM-dd'),
        nowDatetime: formatDate.formatDate(new Date(), 'yyyy-MM-dd'),
        updateDatetime: '2016-04-01'
      }
      $scope.config = {
        isActive: false,
      }
      var date = new Date();
      date.setMonth(date.getMonth() - 3);
      $scope.data.startDatetime = formatDate.formatDate(date, 'yyyy-MM-dd')
      //返回
      $scope.goBack = function () {
        publicMethod.goBack();
      }

      //查询
      $scope.confirmChange = function () {
        if (new Date($scope.data.endDatetime) < new Date($scope.data.startDatetime)) {
          $scope.Toast.show('截止日期不能早于起始日期，请重新选择');
          return;
        }
        SettingsService.set('timeSelect', $scope.data);
        $state.go('timeSelectData');
      }

    }]);
