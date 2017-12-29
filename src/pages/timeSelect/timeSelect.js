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
        goPageFlag : true
      }
      var date = new Date();
      date.setMonth(date.getMonth() - 3);
      $scope.data.startDatetime = formatDate.formatDate(date, 'yyyy-MM-dd')
      //返回
      $scope.goBack = function () {
        SettingsService.set('timeSelect', '');
        publicMethod.goBack();
      }

      //查询
      $scope.confirmChange = function () {
        if (new Date($scope.data.endDatetime) < new Date($scope.data.startDatetime)) {
          $scope.Toast.show('截止日期不能早于起始日期，请重新选择');
          return;
        }
        var minDate = new Date($scope.data.endDatetime);
        minDate.setMonth(minDate.getMonth() - 6);

        // if (minDate > new Date($scope.data.startDatetime)) {
        //   $scope.Toast.show('查询数据量过大，日期范围请控制在6个月以内');
        //   return;
        // }
        var typeTime = [];
        typeTime.push(new Date($scope.data.startDatetime).getTime()/1000);
        typeTime.push(new Date($scope.data.endDatetime).getTime()/1000);
        typeTime = angular.toJson(typeTime);
        SettingsService.set('timeSelect', typeTime);
        if($scope.config.goPageFlag == true){
          if($scope.data.endDatetime == formatDate.formatDate(new Date(), 'yyyy-MM-dd')){
            SettingsService.set('startShow',true)
          }else{
            SettingsService.set('startShow',false)
          }
          $state.go('timeSelectData');
        }else{
          publicMethod.goBack();
        }
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
