/**
 * Created by daidongdong on 2017/11/14.
 */
angular.module('schoolModule')
  .controller('schoolCtrl', ['$scope', '$rootScope', '$state', '$ionicPlatform', '$ionicPopover', 'indexPageService', 'baseConfig', 'hmsHttp',
    function ($scope, $rootScope, $state, $ionicPlatform, $ionicPopover, indexPageService, baseConfig, hmsHttp) {
      $scope.data = {
        type : 'day'
      }
      $scope.config = {}
      $scope.newViewData = {};
      $scope.operating = indexPageService.operating;
      for(var i=0;i<$scope.operating.length;i++){
        if($scope.operating[i].id == 'day'){
          $scope.operating[i].selected = true;
        }else{
          $scope.operating[i].selected = false;
        }
      }
      $scope.goPage = function () {
      }
      //接口
      function init() {
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=xhbtongji.schoolData&type=" + $scope.data.type;
        hmsHttp.get(indexUrl).success(
          function (response) {
            // console.log(JSON.stringify(response));
            $scope.newViewData = response.response
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }

      $scope.popover = $ionicPopover.fromTemplateUrl('build/pages/indexPage/modal/popover.html', {
        scope: $scope
      });

      // .fromTemplateUrl() 方法
      $ionicPopover.fromTemplateUrl('build/pages/indexPage/modal/popover.html', {
        scope: $scope
      }).then(function (popover) {
        $scope.popover = popover;
      });


      $scope.openPopover = function ($event) {
        $scope.popover.show($event);
      };

      $scope.selectPopover = function (x) {
        for (var i = 0; i < $scope.operating.length; i++) {
          $scope.operating[i].selected = false;
        }
        x.selected = !x.selected;
        $scope.data.type = x.id;
        init();
        $scope.popover.hide();
      }

      //初始化
      init();
    }]);
