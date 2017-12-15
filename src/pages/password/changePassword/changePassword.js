angular.module('passwordModule')
  .controller('changePasswordCtrl', ['$scope', '$rootScope', '$state', '$ionicPlatform', '$ionicPopover', 'baseConfig', 'hmsHttp', '$timeout', '$ionicScrollDelegate', 'SettingsService', 'hmsPopup', '$ionicHistory', '$http','publicMethod',
    function ($scope, $rootScope, $state, $ionicPlatform, $ionicPopover, baseConfig, hmsHttp, $timeout, $ionicScrollDelegate, SettingsService, hmsPopup, $ionicHistory, $http,publicMethod) {
      $scope.data = {
        nowPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
      }
      $scope.config = {
        isActive: true,
        isfocusF: false,
        isfocusS: false,
        isfocusT: false
      }
      //返回
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      //改变密码的输入框
      $scope.changePassword = function () {
        if ($scope.data.nowPassword == '' || $scope.data.newPassword == '' || $scope.data.newPasswordConfirm == '') {
          $scope.config.isActive = true;
        } else {
          $scope.config.isActive = false;
        }
        console.log($scope.config.isActive);
      }
      //提交修改
      $scope.confirmChange = function () {
        if ($scope.config.isActive == true) {
          return;
        }
        hmsPopup.showLoadingWithoutBackdrop('正在修改...');
        if ($scope.data.newPassword != $scope.data.newPasswordConfirm) {
          hmsPopup.showPopup('两次密码输入不一致，请重新输入!');
          hmsPopup.hideLoading();
          return;
        }

        if (!CheckPassWord($scope.data.nowPassword) || !CheckPassWord($scope.data.newPassword) || !CheckPassWord($scope.data.newPasswordConfirm)) {
          hmsPopup.showPopup('密码至少需要 6 至 16位字符，由数字和字母组成!');
          hmsPopup.hideLoading();
          return;
        }

        var paramter = {
          "original": $scope.data.nowPassword,
          "password": $scope.data.newPassword //客户端需要自行验证两次新密码是否匹配
        }
        var indexUrl = baseConfig.xhbPath + "/api/password/" + window.localStorage.xhbtoken;
        $http.post(indexUrl, paramter, {
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        }, {'timeout': '30000'}).success(function (response) {
          hmsPopup.hideLoading();
          $scope.Toast.show('密码修改成功！');
          $state.go('login');
        }).error(function (response, status, header, config) {
          hmsPopup.hideLoading();
          if (status == '401') {
            window.localStorage.token = '';
            hmsPopup.showShortCenterToast('另一个设备在登陆你的账号,请重新登陆!');
          }
          else if (status == '403') {
            window.localStorage.token = '';
            hmsPopup.showShortCenterToast('用户令牌失效,请重新登陆!');
          }
          else if (status == '404') {
            hmsPopup.showShortCenterToast('后端服务器请求失败,请联系管理员!');
          }
          else {
            hmsPopup.showShortCenterToast('处理请求失败,请确认网络连接是否正常,或者联系管理员!');
          }
        });
      }
      //获取焦点
      $scope.focusInput = function (item) {
        switch (item) {
          case '1':
            $scope.config.isfocusF = true;
            break;
          case '2':
            $scope.config.isfocusS = true;

            break;
          default:
            $scope.config.isfocusT = true;
        }
      }
      //失去焦点
      $scope.blurInput = function (item) {
        switch (item) {
          case '1':
            $scope.config.isfocusF = false;
            break;
          case '2':
            $scope.config.isfocusS = false;
            break;
          default:
            $scope.config.isfocusT = false;
        }
      }
    }]);
