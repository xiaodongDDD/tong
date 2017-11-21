/**
 * Created by daidongdong on 2017/11/20.
 */
angular.module('indexPageModule')
  .service('tabService', [
    function () {
      this.tabs = [{
        id: '1',
        name: '首页',
        isActive: true,
        onClass: 'main-on',
        offClass: 'main-off'
      }, {
        id: '2',
        name: '用户',
        isActive: false,
        onClass: 'app-on',
        offClass: 'app-off'
      }, {
        id: '3',
        name: '班级',
        isActive: false,
        onClass: 'class-on',
        offClass: 'class-off'
      }, {
        id: '4',
        name: '学校',
        isActive: false,
        onClass: 'school-on',
        offClass: 'school-off'
      }, {
        id: '5',
        name: '设置',
        isActive: false,
        onClass: 'setting-on',
        offClass: 'setting-off'
      }];
    }]);
