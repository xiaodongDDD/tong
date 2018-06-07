/**
 * Created by daidongdong on 2018/5/4.
 */

angular.module('settingModule')
  .controller('followCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicLoading', '$timeout', 'hmsPopup','publicMethod','$ionicPopover',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicLoading, $timeout, hmsPopup,publicMethod,$ionicPopover) {
      $scope.config = {
        flag : 'ios'
      }
      $scope.data = {
        successSelect1: '',
        successSelect2: '',
        errorSelect1: '',
        errorSelect2: '',
      };
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      $scope.successList1 = [
        { text: "公众号文章", value: "1" },
        { text: "名师介绍", value: "2" },
        { text: "老师推荐", value: "3" },
        { text: "全校使用", value: "4" }
      ];
      $scope.successList2 = [
        { text: "重要资源", value: "1" },
        { text: "潜在资源", value: "2" },
        { text: "无效资源", value: "3" },
      ];
      $scope.errorList1 = [
        { text: "手机关机", value: "1" },
        { text: "手机号不正确", value: "2" },
        { text: "不是本人", value: "3" },
        { text: "电话拒接", value: "4" },
        { text: "其他", value: "5" }
      ];
      $scope.errorList2 = [
        { text: "是", value: "1" },
        { text: "否", value: "2" },
      ];
      $ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope,
      }).then(function(popover) {
        $scope.popover = popover;
      });

      $scope.setPlatform = function(p) {
        document.body.classList.remove('platform-ios');
        document.body.classList.remove('platform-android');
        document.body.classList.add('platform-' + p);
        $scope.config.flag = p;
      }


    }]);
