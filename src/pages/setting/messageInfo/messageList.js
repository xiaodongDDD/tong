/**
 * Created by daidongdong on 2018/5/4.
 */

angular.module('settingModule')
  .controller('messageListCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicLoading', '$timeout', 'hmsPopup', 'publicMethod', 'hmsHttp', 'baseConfig', '$ionicScrollDelegate', 'SettingsService',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicLoading, $timeout, hmsPopup, publicMethod, hmsHttp, baseConfig, $ionicScrollDelegate, SettingsService) {
      $scope.config = {
        nextPage: false
      }
      $scope.data = {
        messageList: [],
        page: 1
      }
      $scope.goMessageDetail = function (item) {
        if (item.status == 0) {
          var arr = []
          arr.push(item.n_id)
          $scope.readMessage(arr)
        }
        SettingsService.set('messageId', item.n_id)
        $state.go('messageDetail');
      }
      $scope.goBack = function () {
        publicMethod.goBack();
      }
      $scope.allRead = function () {
        function loginOut(buttonIndex) {
          console.log(buttonIndex)
          if (buttonIndex == 1) { //确认按钮
            var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=Yimessage.news_read_all";
            hmsHttp.get(indexUrl).success(
              function (response) {
                $scope.Toast.show(response.response.msg);
                $scope.data.messageList = [];
                $scope.initData(1)
              }
            ).error(
              function (response, status, header, config) {
              }
            );
          } else { //取消按钮
            return;
          }
        }

        hmsPopup.confirm('是否将全部信息设置为已读？？', '提示信息', loginOut);
      }
      $scope.readMessage = function (arr) {
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=Yimessage.news_read";
        var obj = {
          ids: arr
        }
        hmsHttp.post(indexUrl, obj).success(
          function (response) {
            $scope.data.messageList = [];
            $scope.initData(1)
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }

      $scope.initData = function (page) {
        hmsPopup.showLoadingWithoutBackdrop('正在加载...');
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=Yimessage.news_list";
        var obj = {
          receive_people: window.localStorage.id,
          now_page: page,
          pagesize: 10
        }
        hmsHttp.post(indexUrl, obj).success(
          function (response) {
            $scope.data.messageList = $scope.data.messageList.concat(response.response.list);
            if (response.response.total_page === $scope.data.page) {
              $scope.config.nextPage = false
            } else {
              $scope.config.nextPage = true;
            }
            if (response.response.total_page == 0) {
              $scope.config.nextPage = false
            }
            $ionicScrollDelegate.$getByHandle('mainScrollMessageList').resize();
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }
      $scope.initData(1)
      //下拉刷新
      $scope.doRefresh = function () {
        $scope.data.messageList = []
        $scope.initData(1);
        $scope.$broadcast("scroll.refreshComplete");
      }
      $scope.loadMore = function () {
        $scope.data.page++;
        $scope.initData($scope.data.page);
      }
    }]);
