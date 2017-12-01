/**
 * Created by daidongdong on 2017/11/14.
 */

(function () {
  'use strict';

  angular
    .module('utilModule')
    .factory('hmsHttp', ['$log',
      '$http',
      'hmsPopup',
      '$state',
      'baseConfig',
      '$rootScope',
      function ($log,
                $http,
                hmsPopup,
                $state,
                baseConfig,
                $rootScope) {
        var serivieName = "HmsHttp";
        var isSucessfullName = "isSucessfull";
        var noAuthorPostName = serivieName + ".noAuthorPost";
        var noAuthorGetName = serivieName + ".noAuthorGet";
        var postName = serivieName + ".post";
        var getName = serivieName + ".get";
        var procedure;

        var init = function (procedure) {
          procedure = procedure;
        };
        var debug = function (text) {
          if (baseConfig.debug) {
            console.log(procedure + " success");
          }
        };
        //如果登录令牌失效，跳转会登录界面
        var goBackLogin = function (state) {
          hmsPopup.hideLoading();
          $rootScope.$broadcast("REFRESH_LOGIN");
          state.go('login');
        };

        var request = {
          goBackLogin: function (state) {
            goBackLogin(state);
          },
          isSuccessfull: function (status) {
            if (baseConfig.debug) {
              console.log(isSucessfullName + " Start!");
              console.log(noAuthorPostName + " status " + status);
            }
            if (status == "S" || status == "SW") {
              return true;
            } else {
              return false;
            }
          },
          post: function (url, paramter) {
            if (baseConfig.debug) {
              console.log(postName + " Start!");
              console.log(postName + " url " + url);
              console.log(postName + " paramter " + angular.toJson(paramter));
            }
            var destUrl = url + "&yitong_token=" + window.localStorage.token;
            var startTime = new Date().getTime();
            var post = $http.post(destUrl, paramter, {
              headers: {'Content-Type': 'application/x-www-form-application;charset=utf-8'}
            }, {'timeout': '30000'}).success(function (response) {
              if (baseConfig.debug) {
                console.log(postName + " success");
                // console.log(postName + " response " + angular.toJson(response));
                console.log(postName + " End!");
              }
              hmsPopup.hideLoading();
            }).error(function (response, status, header, config) {
              var respTime = new Date().getTime() - startTime;
              //超时之后返回的方法
              if (respTime >= config.timeout) {
                console.log('HTTP timeout');
                if (ionic.Platform.isWebView()) {
                  hmsPopup.showShortCenterToast('请求超时, 请重试!');
                }
              }
              if (baseConfig.debug) {
                console.log(postName + " error");
                console.log(postName + " response " + response);
                console.log(postName + " status " + status);
                console.log(postName + " End!");
              }
              hmsPopup.hideLoading();
              if (status == '401') {
                window.localStorage.token = '';
                goBackLogin($state);
                hmsPopup.showShortCenterToast('另一个设备在登陆你的账号,请重新登陆!');
              }
              else if (status == '403') {
                window.localStorage.token = '';
                goBackLogin($state);
                hmsPopup.showShortCenterToast('用户令牌失效,请重新登陆!');
              }
              else if (status == '404') {
                hmsPopup.showShortCenterToast('后端服务器请求失败,请联系管理员!');
              }
              else {
                hmsPopup.showShortCenterToast('处理请求失败,请确认网络连接是否正常,或者联系管理员!');
              }
            });
            return post;
          },
          get: function (url) {
            if (baseConfig.debug) {
              console.log(getName + " Start!");
              console.log(getName + " url " + url);
            }
            var destUrl = url + "&yitong_token=" + window.localStorage.token;
            var startTime = new Date().getTime();
            var get = $http.get(destUrl, {
              headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
            },{'timeout': '30000'}).success(function (response) {
              if (baseConfig.debug) {
                console.log(getName + " success");
                // console.log(getName + " response " + angular.toJson(response));
                console.log(getName + " End!");
              }
              hmsPopup.hideLoading()
            }).error(function (response, status,header, config) {
              console.log('-----------');
              var respTime = new Date().getTime() - startTime;
              //超时之后返回的方法
              if (respTime >= config.timeout) {
                console.log('HTTP timeout');
                if (ionic.Platform.isWebView()) {
                  hmsPopup.showShortCenterToast('请求超时, 请重试!');
                }
              }
              if (baseConfig.debug) {
                console.log(getName + " error");
                console.log(getName + " response " + response);
                console.log(getName + " status " + status);
                console.log(getName + " End!");
              }
              hmsPopup.hideLoading();
              if (status == '401') {
                window.localStorage.token = '';
                goBackLogin($state);
                hmsPopup.showShortCenterToast('另一个设备在登陆你的账号,请重新登陆!');
              }
              else if (status == '403') {
                window.localStorage.token = '';
                goBackLogin($state);
                hmsPopup.showShortCenterToast('用户令牌失效,请重新登陆!');
              }
              else if (status == '404') {
                hmsPopup.showShortCenterToast('后端服务器请求失败,请联系管理员!');
              }
              else {
                hmsPopup.showShortCenterToast('处理请求失败,请确认网络连接是否正常,或者联系管理员!');
              }
            });
            return get;
          }
        };
        return request;
      }])
    .directive('repeatDone', function () {
      return function (scope, element, attrs) {
        if (scope.$last) { // all are rendered
          scope.$eval(attrs.repeatDone);
        }
      }
    }).service('publicMethod', ['$filter', '$ionicLoading', '$ionicPopup', '$ionicHistory', '$cordovaDialogs',
    function ($filter, $ionicLoading, $ionicPopup, $ionicHistory, $cordovaDialogs) {
      return {
        //调用电话
        showphone: function (types) {
          return $ionicActionSheet.show({
            buttons: [
              {text: '确定'},
            ],
            titleText: '是否拨打电话',
            cancelText: '取消',
            buttonClicked: function (index) {
              if (index == 0) {
                $window.location.href = "tel:" + types;
                return true;
              }
            }
          })
        },
        //返回上一页
        goBack: function () {
          $ionicHistory.goBack();
        },


        //时间的转换 年月日
        getDateString: function (date) {
          return $filter('date')(date, 'yyyy-MM-dd');
        },

        //时间的转换 年月日时分
        getDateTimeString: function (date) {
          return $filter('date')(date, 'yyyy-MM-dd HH:mm');
        },


        //温度转换  symbol当前温度单位°C或°F
        temperatureConv: function (x, symbol) {

          if (symbol == '°C') {

            return 32 + 1.8 * x;//返回华氏度
          }
          else {  //°F
            return (x - 32) / 1.8;//返回摄氏度
          }
        }
      };

    }]).//页面间的传值
  service('SettingsService', function () {
    var _variables = {};
    return {
      get: function (varname) {
        return (typeof _variables[varname] !== 'undefined') ? _variables[varname] : false;
      },
      set: function (varname, value) {
        _variables[varname] = value;
      }
    };
  })
    .controller("AppSpCtrl", ["$scope", "$timeout", function ($scope, $timeout) {
      if (ionic.Platform.isAndroid()) {
        $scope.bodyHeight = {
          "height": screen.height - 18 + "px"
        };
      } else {
        $scope.bodyHeight = {
          "height": screen.height + "px"
        };
      }
      console.log($scope.bodyHeight);
      var ToastFlag = false;
      $scope.Toast = {
        show: function (msg, time) {
          if (ToastFlag == true) {
            $scope.Toast.hide();
          }
          ;
          $scope.isVisible = 'visible animated bounceInUp';
          $scope.isActive = 'active';
          ToastFlag = true;
          $scope.msg = msg;
          if (time == undefined) {
            time = 2000
          }
          $scope.showToast = $timeout(function () {
            $scope.isActive = 'active fadeOut';
          }, time)
        },
        hide: function () {
          $scope.isVisible = '';
          $scope.isActive = '';
          $timeout.cancel($scope.showToast);
        }
      };
    }])
    .service('hmsPopup', hmsPopup);

  hmsPopup.$inject = [
    '$ionicLoading', '$cordovaToast', '$ionicPopup', 'baseConfig'];

  function hmsPopup($ionicLoading, $cordovaToast, $ionicPopup, baseConfig) {
    this.showLoading = function (content) {
      content = !content ? '加载中' : content;
      $ionicLoading.show({
        template: '<ion-spinner icon="ios" class="spinner spinner-ios spinner-stable"></ion-spinner>' +
        '<div style="color: white;font-size: 12px;text-align: center;height:25px;line-height: 25px;">' + content + '</div>'
      });
    };
    this.showLoadingWithoutBackdrop = function (content) {
      $ionicLoading.show({
        template: '<ion-spinner icon="ios" class="spinner spinner-ios spinner-stable"></ion-spinner>' +
        '<div style="color: white;font-size: 12px;text-align: center;height:25px;line-height: 25px;">' + content + '</div>',
        noBackdrop: true
      });
    };
    this.hideLoading = function () {
      $ionicLoading.hide();
    };
    this.showShortCenterToast = function (content) {//长时间底部提示toast
      if (!baseConfig.nativeScreenFlag) {
        $ionicLoading.show({
          template: (angular.isDefined(content) ? content : "操作失败"),
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          duration: 1500
        });
      } else {
        $cordovaToast.showLongBottom((angular.isDefined(content) ? content : "操作失败")).then(function (success) {
        }, function (error) {
        });
      }
    };
    this.showVeryShortCenterToast = function (content) {
      if (!baseConfig.nativeScreenFlag) {
        $ionicLoading.show({
          template: (angular.isDefined(content) ? content : "操作失败"),
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          duration: 1000
        });
      } else {
        $cordovaToast.showShortBottom((angular.isDefined(content) ? content : "操作失败")).then(function (success) {
        }, function (error) {
        });
      }
    };
    this.showLongCenterToast = function (content) {
      if (!baseConfig.nativeScreenFlag) {
        $ionicLoading.show({
          template: (angular.isDefined(content) ? content : "操作失败"),
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          duration: 3000
        });
      } else {
        $cordovaToast.showLongBottom((angular.isDefined(content) ? content : "操作失败")).then(function (success) {
        }, function (error) {
        });
      }
    };
    //弹出确认弹出框
    this.showPopup = function (template, title) {
      if (!baseConfig.nativeScreenFlag) {
        $ionicPopup.show({
          title: "提示",
          template: template,
          buttons: [{
            text: '确定',
            type: 'button button-cux-popup-confirm'
          }]
        });
      } else {
        var alertDismissed = function () {
        };
        navigator.notification.alert(
          template, // myClass
          alertDismissed, // callback
          "提示", // title
          '确定' // buttonName
        );
      }
    };
    this.confirmNoTitle = function (message, onConfirm) {
      /*      if (!baseConfig.nativeScreenFlag) {*/
      var confirmPopup = $ionicPopup.confirm({
        template: message,
        cancelText: '取消',
        cancelType: 'button-cux-popup-cancel',
        okText: '确定',
        okType: 'button-cux-popup-confirm'
      });
      confirmPopup.then(function (res) {
        if (res) {
          onConfirm(res);
        } else {

        }
      });
      /*        } else {
       navigator.notification.confirm(
       myClass, // myClass
       function (index) {
       onConfirm(index-1);
       }, // callback to invoke with index of button pressed
       title, // title
       ['取消' , '确定'] // buttonLabels
       );
       }*/
    };
    //弹出是否确认的窗口
    this.prompt = function (myscope, title, popup, pluginPopup) {
      if (!baseConfig.nativeScreenFlag) {
        var myPopup = $ionicPopup.show({
          template: '<input type="type" ng-model="myScope.data.city">',
          title: title,
          subTitle: title,
          scope: myscope,
          buttons: [
            {text: '取消'},
            {
              text: '<b>确定</b>',
              type: 'button-positive',
              onTap: function (e) {
                if (!myscope.myScope.data.city) {
                  e.preventDefault();
                } else {
                  return myscope.myScope.data.city;
                }
              }
            },
          ]
        });
        myPopup.then(popup);
      } else {

        navigator.notification.prompt(
          title,  // myClass
          pluginPopup,          // callback to invoke
          '填写信息',           // title
          ['确定', '退出'],    // buttonLabels
          ''                 // defaultText
        );
      }
    };
    //检测客户是否重名
    this.showPopupCustomer = function (template, customerName, approveStatus, saleArea, saleTeam, saleEmployeeName, saleEmployeeCode, title) {
      /*    if (!baseConfig.nativeScreenFlag) {*/
      $ionicPopup.show({
        title: title,
        template: template + '</br></br><div class="crm-customer-popup" >匹配客户: ' + customerName +
        '</div><div class="crm-customer-popup">客户状态: ' + approveStatus + '</div>' +
        '<div class="crm-customer-popup">所属大区: ' + saleArea + '</div><div class="crm-customer-popup">所属团队: ' + saleTeam +
        '</div><div class="crm-customer-popup">负责人: ' + saleEmployeeName + '(' + saleEmployeeCode + ')</div>',
        buttons: [{
          text: '确定',
          type: 'button button-cux-popup-confirm'
        }]
      });
      /*        } else {
       var alertDismissed = function () {
       };
       navigator.notification.alert(
       template, // myClass
       alertDismissed, // callback
       title, // title
       '确定' // buttonName
       );
       }*/
    };
    //检测客户税号和统一社会信用代码
    this.showPopupCustomerAdd = function (template, flagMsg, customerName, approveStatus, saleArea, saleTeam, saleEmployeeName, saleEmployeeCode, title) {
      /* if (!baseConfig.nativeScreenFlag) {*/
      $ionicPopup.show({
        title: title,
        template: template + '</br></br><div class="crm-customer-popup">' + flagMsg + '</div><div class="crm-customer-popup" >匹配客户: ' + customerName +
        '</div><div class="crm-customer-popup">客户状态: ' + approveStatus + '</div>' +
        '<div class="crm-customer-popup">所属大区: ' + saleArea + '</div><div class="crm-customer-popup">所属团队: ' + saleTeam +
        '</div><div class="crm-customer-popup">负责人: ' + saleEmployeeName + '(' + saleEmployeeCode + ')</div>',
        buttons: [{
          text: '确定',
          type: 'button button-cux-popup-confirm'
        }]
      });
      /*    } else {
       var alertDismissed = function () {
       };
       navigator.notification.alert(
       template, // myClass
       alertDismissed, // callback
       title, // title
       '确定' // buttonName
       );
       }*/
    };

    this.confirmCrmCheck = function (message, $scope, onConfirm, data) {
      /*    if (!baseConfig.nativeScreenFlag) {*/
      var confirmPopup = $ionicPopup.confirm({
        scope: $scope,
        template: message,
        cancelText: '取消',
        cancelType: 'button-cux-popup-cancel',
        okText: '确定',
        okType: 'button-cux-popup-confirm'
      });
      confirmPopup.then(function (res) {
        onConfirm(res, data);

      });
      /*        } else {
       navigator.notification.confirm(
       myClass, // myClass
       function (index) {
       onConfirm(index-1);
       }, // callback to invoke with index of button pressed
       title, // title
       ['取消' , '确定'] // buttonLabels
       );
       }*/
    };

    this.confirmOnly = function (message, title, onConfirm) {
      if (!baseConfig.nativeScreenFlag) {
        var confirmPopup = $ionicPopup.confirm({
          title: (angular.isDefined(title) ? title : "提示"),
          template: message,
          okText: '确定',
          okType: 'button-cux-popup-confirm'
        });
        confirmPopup.then(function (res) {
          if (baseConfig.debug) {
            console.log('this.confirm.res ' + angular.toJson(res))
          }
          var index = 0;
          if (res) {
            index = 1;
          }
          onConfirm(index);
        });
      } else {
        navigator.notification.confirm(
          message, // myClass
          function (index) {
            onConfirm(index - 1);
          }, // callback to invoke with index of button pressed
          title, // title
          ['确定'] // buttonLabels
        );
      }
    };

    this.confirm = function (message, title, onConfirm) {
      if (!baseConfig.nativeScreenFlag) {
        var confirmPopup = $ionicPopup.confirm({
          title: (angular.isDefined(title) ? title : "提示"),
          template: message,
          cancelText: '取消',
          cancelType: 'button-cux-popup-cancel',
          okText: '确定',
          okType: 'button-cux-popup-confirm'
        });
        confirmPopup.then(function (res) {
          if (baseConfig.debug) {
            console.log('this.confirm.res ' + angular.toJson(res))
          }
          var index = 0;
          if (res) {
            index = 1;
          }
          onConfirm(index);
        });
      } else {
        navigator.notification.confirm(
          message, // myClass
          function (index) {
            onConfirm(index - 1);
          }, // callback to invoke with index of button pressed
          title, // title
          ['取消', '确定'] // buttonLabels
        );
      }
    };


    this.confirmDIY = function (message, title, okText, cancelText, onConfirm, onBack) {
      /*    if (!baseConfig.nativeScreenFlag) {*/
      var confirmPopup = $ionicPopup.confirm({
        title: (angular.isDefined(title) ? title : "提示"),
        template: message,
        cancelText: cancelText,
        cancelType: 'button-cux-popup-cancel',
        okText: okText,
        okType: 'button-cux-popup-confirm'
      });
      confirmPopup.then(function (res) {
        if (res) {
          onConfirm(res);
        } else {
          onBack(res)
        }
      });
      /*  } else {
       navigator.notification.confirm(
       myClass, // myClass
       function (index) {
       onConfirm(index-1);
       }, // callback to invoke with index of button pressed
       title, // title
       ['取消' , '确定'] // buttonLabels
       );
       }*/
    };

    this.confirmShare = function (title, message, shareConfirm) {
      if (!baseConfig.nativeScreenFlag) {
        var confirmSharePopup = $ionicPopup.confirm({
          title: title,
          template: message,
          cancelText: '直接分享',
          cancelType: 'button-cux-popup-cancel',
          okText: '继续返回',
          okType: 'button-cux-popup-confirm'
        });
        confirmSharePopup.then(function (res) {
          if (baseConfig.debug) {
            console.log('this.confirm.res ' + angular.toJson(res))
          }
          console.log(index);
          var index = 0;
          if (res) {
            index = 1;
          }
          shareConfirm(index);
        });
      } else {
        navigator.notification.confirm(
          message, // myClass
          function (index) {
            shareConfirm(index - 1);
          }, // callback to invoke with index of button pressed
          title, // title
          ['直接分享', '继续返回'] // buttonLabels
        );
      }
    };
  }

})();

