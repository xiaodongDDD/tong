/**
 * Created by daidongdong on 17/11/14.
 */
angular.module('loginModule')
  .controller('smsVerificationCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicLoading', '$timeout', 'hmsPopup', 'checkVersionService', 'jpushService', 'baseConfig', 'hmsHttp', 'publicMethod', '$interval', 'SettingsService', '$http',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicLoading, $timeout, hmsPopup, checkVersionService, jpushService, baseConfig, hmsHttp, publicMethod, $interval, SettingsService, $http) {
      $scope.config = {}
      $scope.data = {
        mobile: window.localStorage.mobile,
        code: ''
      }

      //返回
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      $scope.canClick = false;
      $scope.timeout = 60000;
      $scope.timerCount = $scope.timeout / 1000;
      $scope.description = "获取验证码";

      $scope.onClick = function () {
        // alert('shijian')
        if ($scope.canClick === true) {
          return
        }
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=Yimessage.send_code&mobile=" + window.localStorage.mobile;
        $http.post(indexUrl, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        }).success(
          function (response) {
            if (response.hasOwnProperty('response')) {
              console.log(response)
            }
          }
        ).error(
          function (response, status, header, config) {
          }
        );
        $scope.canClick = true;
        $scope.description = $scope.timerCount + "秒后重新获取";
        var counter = $interval(function () {
          $scope.timerCount = $scope.timerCount - 1;
          $scope.description = $scope.timerCount + "秒后重新获取";
        }, 1000);

        $timeout(function () {
          $scope.description = "获取验证码";
          $scope.canClick = false;
          $scope.timerCount = 60
          $interval.cancel(counter);
        }, $scope.timeout);
      }

      $scope.canClick = false;
      $scope.description = "获取验证码";
      var second = 59;
      var timerHandler;
      $scope.getTestCode = function () {
        if ($scope.canClick === true) {
          return
        }
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=Yimessage.send_code&mobile=" + window.localStorage.mobile;
        $http.post(indexUrl, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        }).success(
          function (response) {
            if (response.hasOwnProperty('response')) {
              console.log(response)
            }
          }
        ).error(
          function (response, status, header, config) {
          }
        );
        timerHandler = $interval(function () {
          if (second <= 0) {
            $interval.cancel(timerHandler);    //当执行的时间59s,结束时，取消定时器 ，cancle方法取消
            second = 59;
            $scope.description = "获取验证码";
            $scope.canClick = false;    //因为 ng-disabled属于布尔值，设置按钮可以点击，可点击发送
          } else {
            $scope.description = second + "s 后重新发送";
            second--;
            $scope.canClick = true;
          }
        }, 1000)   //每一秒执行一次$interval定时器方法
      };
      $scope.obtainCode = function () {

      }

      function loginPost() {//后台采用HAP后更改成包含Content-type的方式，账号密码采用encodeURIComponent()转换，这样可以传特殊符号
        try {
          var data = '&mobile=' + window.localStorage.mobile + '&code=' + $scope.data.code + '&uuid=' + device.uuid;
          var url = baseConfig.basePath + "/api/?v=0.1&method=Xhbtongji.code_login" + data;
        } catch (e) {
          var data = '&mobile=' + window.localStorage.mobile + '&code=' + $scope.data.code + '&uuid=' + '';
          var url = baseConfig.basePath + "/api/?v=0.1&method=Xhbtongji.code_login" + data;
        }
        if (baseConfig.debug) {
          console.log('loginPost.url ' + url);
        }
        return $http.post(url, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        })
      }

      $scope.login = function () {
        loginPost().success(function (result) {
          if (result.hasOwnProperty('error_response')) {
            hmsPopup.showShortCenterToast(result.error_response.msg);
            return
          }
          var alias = 'yt' + result.response.u_id
          if (ionic.Platform.isWebView()) {
            window.JPush.setAlias({sequence: 1, alias: alias}, function (result) {
            })
          } else {
            console.log('网页情况下不开启推送！');
          }
          if (baseConfig.debug) {
            console.log("result success " + angular.toJson(result.response.yitong_token));
          }
          if (result.response.yitong_token && result.response.yitong_token != '') {
            window.localStorage.token = result.response.yitong_token;
            window.localStorage.xhbtoken = result.response.xhb_user_token;
            window.localStorage.empno = $scope.data.mobile;
            // window.localStorage.checkboxSavePwd = $scope.rememberPassword;
            window.localStorage.identity = result.response.is_agent;
            window.localStorage.id = result.response.u_id;
            window.localStorage.is_admin = result.response.is_admin;
            $state.go("tab");
          } else {
            $scope.config.accountPointFlag = false;
            $scope.data.accountPointText = result.response.msg;
          }
          hmsPopup.hideLoading();
        }).error(function (response, status) {
          hmsPopup.hideLoading();
          if (status && status == '401') {
            hmsPopup.showPopup('登录失败,请确认密码是否正确!');
          } else {
            hmsPopup.showPopup('登录失败,请确认网络连接是否正常,或者联系管理员');
            if (baseConfig.debug) {
              console.log("response error " + angular.toJson(response));
            }
          }
        });
      }
    }]);
