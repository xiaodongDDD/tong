/**
 * Created by daidongdong on 2018/5/4.
 */

angular.module('settingModule')
  .controller('followCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicLoading', '$timeout', 'hmsPopup', 'publicMethod', '$ionicPopover', 'baseConfig', 'SettingsService', 'hmsHttp',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicLoading, $timeout, hmsPopup, publicMethod, $ionicPopover, baseConfig, SettingsService, hmsHttp) {
      $scope.config = {
        flag: 'ios'
      }
      $scope.data = {
        successSelect1: '',
        successSelect2: '',
        successText: '',
        errorSelect1: '',
        errorSelect2: '',
        errorText: ''
      };
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      $scope.successList1 = [
        {text: "公众号文章", value: "1"},
        {text: "名师介绍", value: "2"},
        {text: "老师推荐", value: "3"},
        {text: "全校使用", value: "4"}
      ];
      $scope.successList2 = [
        {text: "重要资源", value: "1"},
        {text: "潜在资源", value: "2"},
        {text: "无效资源", value: "3"}
      ];
      $scope.errorList1 = [
        {text: "手机关机", value: "1"},
        {text: "手机号不正确", value: "2"},
        {text: "不是本人", value: "3"},
        {text: "电话拒接", value: "4"},
        {text: "其他", value: "5"}
      ];
      $scope.errorList2 = [
        {text: "是", value: "1"},
        {text: "否", value: "2"}
      ];


      $scope.setPlatform = function (p) {
        document.body.classList.remove('platform-ios');
        document.body.classList.remove('platform-android');
        document.body.classList.add('platform-' + p);
        $scope.config.flag = p;
      }

      $scope.submit = function () {
        hmsPopup.showLoadingWithoutBackdrop('正在跟进...');
        if ($scope.config.flag == 'ios') {
          if ($scope.data.successSelect1 == '') {
            hmsPopup.showShortCenterToast('请选择获知晓黑板的渠道');
            return;
          }
          if ($scope.data.successText == '') {
            hmsPopup.showShortCenterToast('请输入跟进记录');
            return;
          }
        } else {
          if ($scope.data.errorSelect1 == '') {
            hmsPopup.showShortCenterToast('请选择失败原因');
            return;
          }
          if ($scope.data.errorSelect2 == '') {
            hmsPopup.showShortCenterToast('请选择是否需要再次联系');
            return;
          }
          if ($scope.data.errorText == '') {
            hmsPopup.showShortCenterToast('请输入跟进记录');
            return;
          }
        }
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=Yi.furcher";
        var obj = {
          "module_id": 22,//模块id（必传）
          "t_a_id": SettingsService.get('t_a_id'),//任务id
          "type": '',//1成功，2失败
          "channel": $scope.data.successSelect1,//1公众号文章，2名师介绍，3老师推荐，4全校使用（成功传）
          "further_record": $scope.data.successText,//更进记录
          "fail_reason": $scope.data.errorSelect1,//失败原因(失败传)
          "resource": $scope.data.successSelect2,//1重要资源，2潜在资源，3无效资源(成功传)
          "touch_again": $scope.data.errorSelect2////1是，2否(失败传)
        }
        if ($scope.config.flag == 'ios') {
          obj.type = 1;
          obj.further_record = $scope.data.successText;
        } else {
          obj.type = 2;
          obj.further_record = $scope.data.errorText;
        }
        if ($scope.data.province) {
          obj.real_province = JSON.parse($scope.data.province).name
        }
        hmsHttp.post(indexUrl, obj).success(
          function (response) {
            if (response.hasOwnProperty('response')) {
              $scope.Toast.show(response.response.msg);
              $scope.goBack()
            }
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }
      $scope.initData = function () {
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=Yi.furcherDetail";
        var obj = {
          "module_id": 22,//模块id（必传）
          "t_a_id": SettingsService.get('t_a_id')//任务id
        }
        hmsHttp.post(indexUrl, obj).success(
          function (response) {
            if (response.hasOwnProperty('response')) {
              var data = response.response.task_apply[0]
              $scope.data = {
                successSelect1: data.channel,
                successSelect2: data.resource,
                successText: data.further_record,
                errorSelect1: data.fail_reason,
                errorSelect2: data.touch_again,
                errorText: data.back_reason
              };
            }
          }
        ).error(
          function (response, status, header, config) {

          }
        );
      }
      $scope.initData();
    }]);
