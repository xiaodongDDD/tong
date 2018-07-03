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
        SettingsService.set('timeSelectSetting', ['', '']);
        SettingsService.set('timeSelectSettingSp', ['时间搜索', '']);
        publicMethod.goBack();
      }

      //查询
      $scope.confirmChange = function () {
        console.log($scope.data.endDatetime)
        console.log($scope.data.startDatetime)
        $scope.data.startDatetime = $scope.data.startDatetime + ' 08:00:00'
        $scope.data.endDatetime = $scope.data.endDatetime + ' 23:59:59'
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
        var typeTimeSp = []
        typeTime.push(new Date($scope.data.startDatetime.replace(/-/g,"/")).getTime()/1000);
        typeTime.push(new Date($scope.data.endDatetime.replace(/-/g,"/")).getTime()/1000);
        typeTimeSp.push($scope.data.startDatetime);
        typeTimeSp.push($scope.data.startDatetime);
        SettingsService.set('timeSelectSetting', typeTime);
        SettingsService.set('timeSelectSettingSp', typeTimeSp);
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
