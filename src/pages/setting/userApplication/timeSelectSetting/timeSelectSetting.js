angular.module('settingModule')
  .controller('timeSelectSettingCtrl', ['$scope', '$rootScope', '$state', '$ionicPlatform', '$ionicPopover', 'baseConfig', 'hmsHttp', '$timeout', '$ionicScrollDelegate', 'SettingsService', 'hmsPopup', '$ionicHistory', '$http', 'publicMethod', 'formatDate',
    function ($scope, $rootScope, $state, $ionicPlatform, $ionicPopover, baseConfig, hmsHttp, $timeout, $ionicScrollDelegate, SettingsService, hmsPopup, $ionicHistory, $http, publicMethod, formatDate) {
    $scope.data = {
        startDatetime: '2016-04-01',
        endDatetime: formatDate.formatDate(new Date(), 'yyyy-MM-dd'),
        nowDatetime: formatDate.formatDate(new Date(), 'yyyy-MM-dd'),
        updateDatetime: '2016-04-01'
      }
      $scope.config = {
        isActive: false,
        goPageFlag : true
      }
      var date = new Date();
      date = new Date((date.getTime()) - 1000 * 60 * 60 * 24 * 7)
      $scope.data.startDatetime = formatDate.formatDate(date, 'yyyy-MM-dd')
      //返回
      $scope.goBack = function () {
        SettingsService.set('timeSelectSetting', '');
        publicMethod.goBack();
      }

      //查询
      $scope.confirmChange = function () {
        if (new Date($scope.data.endDatetime) < new Date($scope.data.startDatetime)) {
          $scope.Toast.show('截止日期不能早于起始日期，请重新选择');
          return;
        }
        var minDate = new Date($scope.data.endDatetime);
        minDate.setMonth(minDate.getMonth() - 3);

        if (minDate > new Date($scope.data.startDatetime)) {
          $scope.Toast.show('查询数据量过大，日期范围请控制在3个月以内');
          return;
        }
        var typeTime = [];
        typeTime.push(new Date($scope.data.startDatetime).getTime()/1000);
        typeTime.push(new Date($scope.data.endDatetime).getTime()/1000);
        typeTime = angular.toJson(typeTime);
        console.log(typeTime);
        SettingsService.set('timeSelectSetting', typeTime);
        publicMethod.goBack();
      }

      //路由监听事件
      $scope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
          if (fromState && toState && (fromState.name == 'login') && toState.name == 'timeSelect') {
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
          }
          if (fromState.name == "agentInfo") {
            $scope.config.goPageFlag = false;
          }else{
            $scope.config.goPageFlag = true;
          }
        })
    }]);
