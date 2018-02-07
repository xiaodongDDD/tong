/**
 * Created by daidongdong on 2017/11/14.
 */
(function () {
  'use strict';

  angular.module('myApp', [
    'ionic',
    'ngCordova',
    'baseConfig',
    'loginModule',
    'myClassModule',
    'schoolModule',
    'indexPageModule',
    'myInfoModule',
    'utilModule',
    'hmsModule',
    'settingModule',
    'jpushModule',
    'passwordModule',
    'directiveModule',
    'oc.lazyLoad'
  ]);

  angular.module('myApp')
    .run(angularRun);

  angularRun.$inject = ['$ionicPlatform', 'checkVersionService', 'jpushService', 'hmsPopup'];

  function angularRun($ionicPlatform, checkVersionService, jpushService, hmsPopup) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        cordova.plugins.Keyboard.disableScroll(true);
      }

      //将页面的导航bar设置成黑色
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      try {
        navigator.splashscreen.hide();
      } catch (e) {
      }

      checkVersionService.checkAppVersion();


      if (ionic.Platform.isWebView()) {
        //推送初始化
        var setTagsWithAliasCallback = function (event) {
          window.alert('result code:' + event.resultCode + ' tags:' + event.tags + ' alias:' + event.alias);
        }
        var openNotificationInAndroidCallback = function (data) {
          var json = data;
          if (typeof data === 'string') {
            json = JSON.parse(data);
          }
          var id = json.extras['cn.jpush.android.EXTRA'].id;
          var alertInfo = json.extras['cn.jpush.android.ALERT'];
          // alert(alertInfo);
          var insertInfo = {time: new Date(), name: alertInfo}
          storedb('normalInfo').insert(insertInfo);
          // alert(angular.toJson(storedb('normalInfo').find()));
        }
        var config = {
          stac: setTagsWithAliasCallback,
          oniac: openNotificationInAndroidCallback
        };

        jpushService.init(config);
        jpushService.resetBadge();
        //启动极光推送服务
        window.plugins.jPushPlugin.init();
        window.plugins.jPushPlugin.setDebugMode(true);
        document.addEventListener("jpush.openNotification", onOpenNotification, false)
        var onOpenNotification = function (event) {
          window.plugins.jPushPlugin.resetBadge()
        }
      } else {
        console.log('网页情况下不开启推送！');
      }

      /*
      * 事件说明：
      * 1.第一次页面加载成功触发 online或offline
      * 2.网络切换 会触发online或offline
      */
      //网络连接
      document.addEventListener('online', function () {
        // hmsPopup.showPopup('网络连接成功!');
        // if (navigator.connection.type == Connection.WIFI) {
        //   hmsPopup.showPopup('已经切换到Wifi网络');
        // }
      }, false);
      //网络断开
      document.addEventListener('offline', function () {
        // hmsPopup.showPopup('网络已经断开!');
      }, false);


    });
  }

  angular.module('myApp')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$httpProvider', 'baseConfig'];

  function config($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider, baseConfig) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the src can be in.
    // Each state's controller can be found in controllers.js

    //$ionicConfigProvider.templates.maxPrefetch(15);
    //$ionicConfigProvider.views.swipeBackEnabled(true);
    $httpProvider.interceptors.push('httpRequestHeader');//注册过滤器
    //$httpProvider.interceptors[0] = $httpProvider.interceptors[0] + "access_token=" + window.localStorage.token;

    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
    //$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');

    $stateProvider
    // setup an abstract state for the tabs directive

      .state('login', {
        url: '/login',
        templateUrl: 'build/pages/login/login.html',
        controller: 'loginCtrl'
      })

      .state('tab', {
        url: '/tab',
        templateUrl: 'build/pages/tab/tab.html',
        controller: 'tabsCtrl'
      })
      //首頁
      .state('indexPage', {
        url: '/indexPage',
        templateUrl: 'build/pages/indexPage/indexPage.html',
        controller: 'indexPageCtrl',
      })
      //注册用戶
      .state('myInfo', {
        url: '/myInfo',
        templateUrl: 'build/pages/myInfo/myInfo.html',
        controller: 'myInfoCtrl',
      })
      //代理商-注册用戶
      .state('agentInfo', {
        url: '/agentInfo',
        templateUrl: 'build/pages/agentInfo/agentInfo.html',
        controller: 'agentInfoCtrl',
      })
      //學校
      .state('school', {
        url: '/school',
        templateUrl: 'build/pages/school/school.html',
        controller: 'schoolCtrl'
      })
      //班級
      .state('myClass', {
        url: '/myClass',
        templateUrl: 'build/pages/myClass/myClass.html',
        controller: 'myClassCtrl'
      })
      //学校列表
      .state('classDetail', {
        url: '/classDetail',
        templateUrl: 'build/pages/myClass/classDetail/classDetail.html',
        controller: 'classDetailCtrl'
      })
      //设置
      .state('setting', {
        url: '/setting',
        templateUrl: 'build/pages/setting/setting.html',
        controller: 'settingCtrl'
      })
      //修改密码
      .state('changePassword', {
        url: '/changePassword',
        templateUrl: 'build/pages/password/changePassword/changePassword.html',
        controller: 'changePasswordCtrl'
      })
      //时间选择
      .state('timeSelect', {
        url: '/timeSelect',
        templateUrl: 'build/pages/timeSelect/timeSelect.html',
        controller: 'timeSelectCtrl'
      })
      //选择时间的数据
      .state('timeSelectData', {
        url: '/timeSelectData',
        templateUrl: 'build/pages/timeSelect/timeSelectData/timeSelectData.html',
        controller: 'timeSelectDataCtrl'
      })

      //学校班级
      .state('schoolClass', {
        url: '/schoolClass',
        templateUrl: 'build/pages/school/schoolClass/schoolClass.html',
        controller: 'schoolClassCtrl'
      })
      //学校列表
      .state('schoolDetail', {
        url: '/schoolDetail',
        templateUrl: 'build/pages/school/schoolDetail/schoolDetail.html',
        controller: 'schoolDetailCtrl'
      })
      //学校详细列表
      .state('schoolItemList', {
        url: '/schoolItemList',
        templateUrl: 'build/pages/school/schoolItemList/schoolItemList.html',
        controller: 'schoolItemListCtrl'
      })
    // if (!window.localStorage.needGuid || window.localStorage.needGuid == "true") {
    //   //if (baseConfig.debug) {
    //   console.log('app.js into guide ');
    //   //}
    //   // $urlRouterProvider.otherwise('/guide');
    //   $urlRouterProvider.otherwise('/login');
    //
    // } else {
    console.log('window.localStorage.token ' + window.localStorage.token);
    if (window.localStorage.token && window.localStorage.token != "") {
      if(window.localStorage.identity && window.localStorage.identity == '1'){
        // $urlRouterProvider.otherwise('/agentInfo');
      }else{
        $urlRouterProvider.otherwise('/tab');
      }
    } else {
      $urlRouterProvider.otherwise('/login');
    }
    // }
  }
})();
