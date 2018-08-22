/**
 * Created by daidongdong on 2018/5/4.
 */

angular.module('settingModule')
  .controller('userApplicationListCtrl', ['$scope', '$rootScope', '$state', '$ionicConfig', '$ionicHistory', '$templateCache',
    '$ionicSlideBoxDelegate', '$ionicPlatform', '$ionicLoading', '$timeout', 'hmsPopup', 'publicMethod', 'userApplicationService', 'baseConfig', '$ionicScrollDelegate', 'hmsHttp', 'SettingsService', '$ionicPopover', '$ionicModal',
    function ($scope, $rootScope, $state, $ionicConfig, $ionicHistory, $templateCache, $ionicSlideBoxDelegate, $ionicPlatform, $ionicLoading, $timeout, hmsPopup, publicMethod, userApplicationService, baseConfig, $ionicScrollDelegate, hmsHttp, SettingsService, $ionicPopover, $ionicModal) {
      $scope.config = {
        showPageList: true,
        showSelectList: false,
        nextPage: false
      }
      $scope.data = {
        page: 1,
        messageList: [],
        school_name: '',
        selectList: [
          {
            name: "地区搜索",
            selectSp: false,
            select: false,
            id: 0,
            province: '',
            city: '',
            list: SettingsService.get('provinces')
          },
          {
            name: "状态",
            select: false,
            id: 1,
            status: '',
            list: [
              {id: '0', label: '未跟进'},
              {id: '5', label: '已跟进'}
            ]
          }, {
            name: "资质评价",
            select: false,
            id: 2,
            resource: '',
            list: [
              {id: '1', label: '重要资源'},
              {id: '2', label: '潜在资源'},
              {id: '3', label: '无效资源'}
            ]
          }, {
            name: "时间搜索",
            nameSP:[],
            select: false,
            id: 3,
            invited_code: '',
            list: ['', '']
          }, {
            name: "当前处理人",
            select: false,
            id: 4,
            invited_code: '',
            list: []
          }, {
            name: "项目类型",
            select: false,
            id: 5,
            invited_code: '',
            list: [{id: '2', label: '邀请码申请'}, {id: '3', label: '校园认证'}, {id: '1', label: '讲座申请'}]
          }, {
            name: "继续跟进",
            select: false,
            id: 6,
            invited_code: '',
            list: [{id: '1', label: '是'}, {id: '2', label: '否'}]
          }]
      }
      $scope.selectListCopy = angular.copy($scope.data.selectList)
      $scope.goMessageDetail = function () {
        $state.go('messageDetail');
      }
      $scope.goBack = function () {
        hmsPopup.showLoadingWithoutBackdrop('正在加载...');
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=Yimessage.user_center";
        hmsHttp.get(indexUrl).success(
          function (response) {
            $scope.data.userInfo = response.response;
            $rootScope.settingNum.messageNum = $scope.data.userInfo.message_count
            $rootScope.settingNum.applicationNum = $scope.data.userInfo.apply_count
            console.log($rootScope.settingNum)
          }
        ).error(
          function (response, status, header, config) {
          }
        );
        publicMethod.goBack();
      }
      $scope.goOperation = function (id, item) {
        SettingsService.set('t_a_id', item.t_a_id)
        switch (id) {
          case 1:
            $state.go('distribution');
            break;
          case 2:
            $state.go('exchange');
            break;
          case 3:
            $state.go('follow');
            break;
          case 4:
            $state.go('operationLog');
            break;
          case 5:
            $state.go('return');
            break;
        }
      }
      //下拉刷新
      $scope.doRefresh = function () {
        $scope.data.messageList = []
        $scope.data.page = 1;
        $scope.initData($scope.data.page);
        $scope.$broadcast("scroll.refreshComplete");
      }
      $scope.initData = function (page) {
        // hmsPopup.showLoadingWithoutBackdrop('正在加载...');
        var indexUrl = baseConfig.basePath + "/api/?v=0.1&method=Yi.applyList";
        var obj = {
          "module_id": 22,
          "province": $scope.data.selectList[0].province,//省份
          "city": $scope.data.selectList[0].city,//城市
          "status": [],//1机号异常,2系统待分派，3待处理，4已分派，5已更进，6已返回，7已调换
          "resource": $scope.data.selectList[2].resource, //1重要资源，2潜在资源，3无效资源
          "start_time": $scope.data.selectList[3].list[0],//开始时间
          "end_time": $scope.data.selectList[3].list[1],//结束时间
          "now_page": page,
          "pagesize": 10,
          "school_name":$scope.data.school_name,//学校姓名搜索
          "mobile_phone":"",//手机号搜索
          "touch_again":$scope.data.selectList[6].touch_again,//1是，2否
          "direct_manager":$scope.data.selectList[4].direct_manager,//当前执行人
          "apply_type":$scope.data.selectList[5].apply_type,//1培训申请，2邀请码申请3加入校园
        }
        console.log($scope.data.selectList[1].status)
        if ($scope.data.selectList[1].status === '5') {
          obj.status = [5]
        } else if ($scope.data.selectList[1].status === '') {
          obj.status = []
        } else {
          obj.status = [0, 1, 2, 3, 4, 6, 7]
        }
        hmsHttp.post(indexUrl, obj).success(
          function (response) {
            $scope.data.messageList = $scope.data.messageList.concat(response.response.list);
            $scope.data.selectList[4].list = []
            for(var i=0;i<response.response.children.length;i++){
              $scope.data.selectList[4].list.push({
                id: response.response.children[i].u_id, label: response.response.children[i].user_name
              })
            }
            if (response.response.total_page === $scope.data.page) {
              $scope.config.nextPage = false
            } else {
              $scope.config.nextPage = true;
            }
            if (response.response.total_page == 0) {
              $scope.config.nextPage = false
            }
            $ionicScrollDelegate.$getByHandle('mainScrollList').resize();
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }
        ).error(
          function (response, status, header, config) {
          }
        );
      }
      //筛选条件
      $scope.selectAny = function (item) {
        if (item.id === 3) {
          $state.go('timeSelectSetting')
          return
        }
        var num = 0;
        for (var i = 0; i < $scope.data.selectList.length; i++) {
          if (item.id == $scope.data.selectList[i].id) {
            $scope.data.selectList[i].select = !$scope.data.selectList[i].select;
            $scope.config.showSelectList = true;
          } else {
            $scope.data.selectList[i].select = false;
          }
          if ($scope.data.selectList[i].select == true) {
            num++;
          }
        }
        if (num == 1) {
          $scope.config.showSelectList = true;
        } else {
          $scope.config.showSelectList = false;
        }
      }
      //选择成功
      $scope.selectConfirm = function (item1, item2) {
        switch (item2.id) {
          case 0:
            if ($scope.data.selectList[0].selectSp) {
              $scope.data.selectList[0].list = userApplicationService.provinces
              $scope.data.selectList[0].name = $scope.data.selectList[0].name + item1;
              $scope.data.selectList[0].city = item1;
              if ($scope.data.selectList[0].name.length > 6) {
                $scope.data.selectList[0].name = $scope.data.selectList[0].name.substring(0, 4) + '..'
              }
              $scope.data.selectList[0].selectSp = false;
              for (var i = 0; i < $scope.data.selectList.length; i++) {
                $scope.data.selectList[i].select = false;
              }
              $scope.config.showSelectList = false;
            } else {
              $scope.data.selectList[0].list = item1.citys
              $scope.data.selectList[0].name = item1.name;
              $scope.data.selectList[0].province = item1.name;
              $scope.data.selectList[0].selectSp = true;
            }
            break;
          case 1:
            $scope.data.selectList[1].name = item1.label;
            $scope.data.selectList[1].status = item1.id
            if ($scope.data.selectList[1].name.length > 4) {
              $scope.data.selectList[1].name = $scope.data.selectList[1].name.substring(0, 4) + '..'
            }
            break;
          case 2:
            $scope.data.selectList[2].name = item1.label;
            $scope.data.selectList[2].resource = item1.id;
            break;
          case 4:
            $scope.data.selectList[4].name = item1.label;
            $scope.data.selectList[4].direct_manager = item1.id;
            break;
          case 6:
            $scope.data.selectList[6].name = item1.label;
            $scope.data.selectList[6].touch_again = item1.id;
            break;
          case 5:
            $scope.data.selectList[5].name = item1.label;
            $scope.data.selectList[5].apply_type = item1.id;
            break;
          default:
            console.log('error');
        }
        if (item2.id !== 0) {
          for (var i = 0; i < $scope.data.selectList.length; i++) {
            $scope.data.selectList[i].select = false;
          }
          $scope.config.showSelectList = false;
        }
        if (!$scope.data.selectList[0].selectSp) {
          $scope.data.messageList = [];
          $scope.data.page = 1;
          $scope.initData($scope.data.page);
        }
      }
      $scope.telphone = function (item) {
        publicMethod.showphone(item.mobile_phone)
      }
      //路由监听事件
      $scope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
          if (fromState && toState && (fromState.name == 'timeSelectSetting') && toState.name == 'userApplicationList') {
            $scope.data.selectList[3].list = SettingsService.get('timeSelectSetting')
            $scope.data.selectList[3].name = SettingsService.get('timeSelectSettingSp')[0] + SettingsService.get('timeSelectSettingSp')[1]
            $scope.data.selectList[3].nameSP.push(SettingsService.get('timeSelectSettingSp')[0])
            $scope.data.selectList[3].nameSP.push(SettingsService.get('timeSelectSettingSp')[1])
            console.log($scope.data.selectList[3].list)
            console.log(SettingsService.get('timeSelectSettingSp')[0] + SettingsService.get('timeSelectSettingSp')[1])
            console.log($scope.data.selectList[3].nameSP)
            if ($scope.data.selectList[3].name.length > 6) {
              $scope.data.selectList[3].name = $scope.data.selectList[3].name.substring(0, 4) + '..'
            }
            $scope.data.messageList = []
            $scope.data.page = 1;
            $scope.initData($scope.data.page);
          } else if (fromState.name === 'tab') {

          }
          // else if (fromState.name !== 'userApplicationList') {
          //   $scope.data.messageList = [];
          //   $scope.data.page = 1;
          //   $scope.initData($scope.data.page)
          // }
        })
      $scope.reset = function () {
        $scope.config.showSelectList = false;
        $scope.data.selectList = angular.copy($scope.selectListCopy)
        $scope.data.messageList = []
        $scope.data.page = 1;
        $scope.data.school_name = '';
        $scope.initData($scope.data.page);
      }
      $scope.initData(1);
      $scope.loadMore = function () {
        $scope.data.page++;
        $scope.initData($scope.data.page);
      }
      $scope.operating = [
        {
          id: 'reset',
          text: '重置条件',
          style: {'border-bottom-width': '2px', 'border-bottom-style': 'solid', 'border-bottom-color': '#DCDCDC'},
          selected: false,
        },
        {
          id: 'manager',
          text: '管理',
          style: {},
          selected: false
        }
      ];
      $scope.popover = $ionicPopover.fromTemplateUrl('build/pages/setting/userApplication/modal/popover.html', {
        scope: $scope
      });

      // .fromTemplateUrl() 方法
      $ionicPopover.fromTemplateUrl('build/pages/setting/userApplication/modal/popover.html', {
        scope: $scope
      }).then(function (popover) {
        $scope.popover = popover;
      });
      $scope.openPopover = function ($event) {
        $scope.popover.show($event);
      };
      $scope.selectPopover = function (x) {
        console.log(x)
        $scope.popover.hide();
        if (x.id === 'reset') {
          $scope.reset();
        }
      }


      $ionicModal.fromTemplateUrl('build/pages/setting/userApplication/modal/search.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.openModal = function () {
        $scope.modal.show();
      };
      $scope.closeModal = function () {
        $scope.modal.hide();
      };
      $scope.searchData = function () {
        $scope.modal.hide();
        $scope.data.messageList = []
        $scope.data.page = 1;
        $scope.initData($scope.data.page);
      };
      //当我们用到模型时，清除它！
      $scope.$on('$destroy', function () {
        $scope.modal.remove();
      });
      // 当隐藏的模型时执行动作
      $scope.$on('modal.hide', function () {
        // 执行动作
      });
      // 当移动模型时执行动作
      $scope.$on('modal.removed', function () {
        // 执行动作
      });
    }]);
