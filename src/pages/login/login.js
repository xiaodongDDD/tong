/**
 * Created by daidongdong on 17/11/14.
 */
(function () {
  'use strict';
  angular
    .module('loginModule')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = [
    '$scope',
    '$state',
    'baseConfig',
    '$ionicLoading',
    '$http',
    '$timeout',
    '$ionicHistory',
    '$ionicPlatform',
    '$ionicScrollDelegate',
    'checkVersionService',
    'hmsPopup',
    '$rootScope','$ionicBackdrop','jpushService'];

  function loginCtrl($scope,
                     $state,
                     baseConfig,
                     $ionicLoading,
                     $http,
                     $timeout,
                     $ionicHistory,
                     $ionicPlatform,
                     $ionicScrollDelegate,
                     checkVersionService,
                     hmsPopup,
                     $rootScope,jpushService) {
    //将页面的导航bar设置成白色
    $ionicPlatform.ready(function () {
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

      /////////////////////////////////////
    $timeout(function () {
      $scope.loginScroll = $ionicScrollDelegate.$getByHandle('loginScroll');
      $scope.lockScroll(true);
    }, 300);
    $scope.loginInfo = {
      username: "",
      password: ""
    };//登录信息
    //配置信息
    $scope.config = {
      inputFocusUser: false,
      inputFocusPwd: false,
      eyeOpenFlag: false,
      inputType: 'password',
      accountPointFlag: true,
      psdPointFlag: false
    }
    $scope.data = {
      accountPointText: '',
      version : baseConfig.version.currentVersion
    }
    //获取焦点
    $scope.inputFocus = function (item) {
      if (item == 'user') {
        $scope.config.inputFocusUser = true;
      } else {
        $scope.config.inputFocusPwd = true;
      }
      // $ionicScrollDelegate.$getByHandle('login-contianer').resize();
    }
    //失去焦点
    $scope.inputBlur = function (item) {
      if (item == 'user') {
        $scope.config.inputFocusUser = false;
      } else {
        $scope.config.inputFocusPwd = false;
      }
    }
    $scope.eyeOpen = function () {
      $scope.config.eyeOpenFlag = !$scope.config.eyeOpenFlag;
      if ($scope.config.eyeOpenFlag == false) {
        $scope.config.inputType = 'password';
      } else {
        $scope.config.inputType = 'text';
      }
    }
    $scope.rememberPassword = false;//是否记住密码
    if (window.localStorage.empno) {
      $scope.loginInfo.username = window.localStorage.empno;
    }
    if (window.localStorage.checkboxSavePwd == "") {
      $scope.rememberPassword = false;
    }

    if (window.localStorage.checkboxSavePwd == "true") {
      $scope.rememberPassword = true;
      $scope.loginInfo.password = window.localStorage.password;
      if ((typeof($scope.loginInfo.password) !== "undefined") && ($scope.loginInfo.password != "")) {//如果拿到的密码是undefined的话，则默认为没有存密码
      } else if (typeof($scope.loginInfo.password) === "undefined") {
        $scope.loginInfo.password = "";
      }
    } else {
      $scope.rememberPassword = false;
    }
    $scope.lockScroll = function (bool) {
      $scope.loginScroll.freezeScroll(bool);//锁死Android平台上的滚动条
    };
    $scope.backTop = function () {
      $scope.loginScroll.scrollTop(false);
    };


    $scope.clearUsername = function () {//清空用户名
      $scope.loginInfo.username = "";
    };

    $scope.clearPassword = function () {//清空密码
      $scope.loginInfo.password = "";
    };

    $scope.savePassword = function () {//记住密码
      $scope.rememberPassword = !$scope.rememberPassword;
      if (baseConfig.debug) {
        console.log("此时密码框的状态为 :", angular.toJson($scope.rememberPassword));
      }
      if ($scope.rememberPassword == true) {
        window.localStorage.checkboxSavePwd = "true";
      } else if ($scope.rememberPassword == false) {
        window.localStorage.checkboxSavePwd = "";
      }
      if ($scope.loginInfo.password !== "") {
        if ($scope.rememberPassword == true) {
          window.localStorage.password = $scope.loginInfo.password;
        } else {
          window.localStorage.password = "";
        }
      }
    };
    function toIPhoneModel(model) {
      var dictionary = {
        "i386": "Simulator",
        "x86_64": "Simulator",
        "iPod1,1": "iPod Touch",         // (Original)
        "iPod2,1": "iPod Touch 2",       // (Second Generation)
        "iPod3,1": "iPod Touch 3",       // (Third Generation)
        "iPod4,1": "iPod Touch 4",       // (Third Generation)
        "iPod7,1": "iPod Touch 6",       // (6th Generation)
        "iPhone1,1": "iPhone",           // (Original)
        "iPhone1,2": "iPhone 3G",        // (3G)
        "iPhone2,1": "iPhone 3GS",       // (3GS)
        "iPad1,1": "iPad",               // (Original)
        "iPad2,1": "iPad 2",             // (2nd Generation)
        "iPad3,1": "new iPad",           // (3rd Generation)
        "iPhone3,1": "iPhone 4",         // (GSM)
        "iPhone3,3": "iPhone 4",         // (CDMA/Verizon/Sprint)
        "iPhone4,1": "iPhone 4S",
        "iPhone5,1": "iPhone 5",         // (model A1428, AT&T/Canada)
        "iPhone5,2": "iPhone 5",         // (model A1429, everything else)
        "iPad3,4": "iPad 4th Generation",// (4th Generation)
        "iPad2,5": "iPad Mini",          // (Original)
        "iPhone5,3": "iPhone 5c",        // (model A1456, A1532 | GSM)
        "iPhone5,4": "iPhone 5c",        // (model A1507, A1516, A1526 (China), A1529 | Global)
        "iPhone6,1": "iPhone 5s",        // (model A1433, A1533 | GSM)
        "iPhone6,2": "iPhone 5s",        // (model A1457, A1518, A1528 (China), A1530 | Global)
        "iPhone7,1": "iPhone 6 Plus",
        "iPhone7,2": "iPhone 6",
        "iPhone8,1": "iPhone 6S",
        "iPhone8,2": "iPhone 6S Plus",
        "iPhone8,4": "iPhone SE",
        "iPhone9,1": "iPhone 7",
        "iPhone9,3": "iPhone 7",
        "iPhone9,2": "iPhone 7 Plus",
        "iPhone9,4": "iPhone 7 Plus",
        "iPad4,1": "iPad Air",           // 5th Generation iPad (iPad Air) - Wifi
        "iPad4,2": "iPad Air",           // 5th Generation iPad (iPad Air) - Cellular
        "iPad4,4": "iPad Mini",          // (2nd Generation iPad Mini - Wifi)
        "iPad4,5": "iPad Mini",          // (2nd Generation iPad Mini - Cellular)
        "iPad4,7": "iPad Mini",          // (3rd Generation iPad Mini - Wifi (model A1599))
        "iPad6,7": "iPad Pro (12.9\")",  // iPad Pro 12.9 inches - (model A1584)
        "iPad6,8": "iPad Pro (12.9\")",  // iPad Pro 12.9 inches - (model A1652)
        "iPad6,3": "iPad Pro (9.7\")",   // iPad Pro 9.7 inches - (model A1673)
        "iPad6,4": "iPad Pro (9.7\")"    // iPad Pro 9.7 inches - (models A1674 and A1675)
      };
      if (dictionary[model]) {
        return dictionary[model];
      } else {
        return "Unknown IOS model";
      }
    }

    function loginPost() {//后台采用HAP后更改成包含Content-type的方式，账号密码采用encodeURIComponent()转换，这样可以传特殊符号
      var deviceInfo = "";
      if (ionic.Platform.isAndroid()) {
        deviceInfo = "Android"
      } else if (ionic.Platform.isIOS()) {
        deviceInfo = "iOS";
      } else {
        deviceInfo = "PC";
      }

      try {
        if (deviceInfo == 'iOS') {
          var model = toIPhoneModel(device.model);
        } else {
          model = device.model;
        }
        var data = '&username=' + $scope.loginInfo.username + '&password=' + $scope.loginInfo.password;
        var url = baseConfig.basePath + "/api/?v=0.1&method=xhbtongji.login" + data;
      } catch (e) {
        var data = '&username=' + $scope.loginInfo.username + '&password=' + $scope.loginInfo.password;
        var url = baseConfig.basePath + "/api/?v=0.1&method=xhbtongji.login" + data;
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

    $scope.login = function () {//登录功能
      $scope.config.psdPointFlag = false;
      $scope.config.accountPointFlag = true;
      if (window.localStorage.empno != $scope.loginInfo.username) {
        localStorage.removeItem('key_history1');
        localStorage.removeItem('common_linkman2');
      }
      hmsPopup.showLoading('登录中...');
      $timeout(function () {

        window.localStorage.empno = $scope.loginInfo.username;
        window.localStorage.password = $scope.loginInfo.password;
        if ($scope.rememberPassword == true) {
          window.localStorage.password = $scope.loginInfo.password;
        } else if ($scope.rememberPassword == false) {
          window.localStorage.password = "";
        }
        if (!$scope.loginInfo.username || $scope.loginInfo.username == '' || !phoneNumber($scope.loginInfo.username)) {
          hmsPopup.hideLoading();
          $scope.config.accountPointFlag = false;
          $scope.data.accountPointText = '手机号码错误';
          return;
        }
        if (!$scope.loginInfo.password || $scope.loginInfo.password == '') {
          hmsPopup.hideLoading();
          $scope.config.psdPointFlag = true;
          return;
        }



        loginPost().success(function (result) {
          var alias = 'yt'+result.response.u_id
          if (ionic.Platform.isWebView()) {
            window.JPush.setAlias({ sequence: 1, alias: alias },function(result){
              // alert('success')
              // alert(result.alias)
            })
          }else{
            console.log('网页情况下不开启推送！');
          }
          if (baseConfig.debug) {
            console.log("result success " + angular.toJson(result.response.yitong_token));
          }
          if (result.response.yitong_token && result.response.yitong_token != '') {
            window.localStorage.token = result.response.yitong_token;
            window.localStorage.xhbtoken = result.response.xhb_user_token;
            window.localStorage.empno = $scope.loginInfo.username;
            window.localStorage.checkboxSavePwd = $scope.rememberPassword;
            window.localStorage.identity = result.response.is_agent;
            window.localStorage.id = result.response.u_id;
            // if(result.response.is_agent == 0){
              $state.go("tab");
            // }else{
            //   $state.go("agentInfo");
            // }
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
      }, 700);
    };

    $scope.$on('$ionicView.enter', function (e) {
      if (baseConfig.debug) {
        console.log('loginCtrl.$ionicView.enter');
      }
      $scope.loginInfo = {
        username: "",
        password: ""
      };//登录信息
      $scope.rememberPassword = false;//是否记住密码
      if (window.localStorage.empno) {
        $scope.loginInfo.username = window.localStorage.empno;
      }
      if (window.localStorage.checkboxSavePwd == "") {
        $scope.rememberPassword = false;
      }

      if (window.localStorage.checkboxSavePwd == "true") {
        $scope.rememberPassword = true;
        $scope.loginInfo.password = window.localStorage.password;
      } else {
        $scope.rememberPassword = false;
      }
    });

    $scope.$on('$ionicView.afterEnter', function () {
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
    });
    $scope.$on('$ionicView.loaded', function () {
    });

    $scope.$on('$destroy', function (e) {
      if (baseConfig.debug) {
        console.log('loginCtrl.$destroy');
      }
    });
  }
})();
