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
        offClass: 'main-off',
        cache : false
      }, {
        id: '2',
        name: '用户',
        isActive: false,
        onClass: 'app-on',
        offClass: 'app-off',
        cache : false
      }, {
        id: '3',
        name: '班级',
        isActive: false,
        onClass: 'class-on',
        offClass: 'class-off',
        cache : false
      }, {
        id: '4',
        name: '学校',
        isActive: false,
        onClass: 'school-on',
        offClass: 'school-off',
        cache : false
      }, {
        id: '5',
        name: '我的',
        isActive: false,
        onClass: 'setting-on',
        offClass: 'setting-off',
        cache : false
      }];
    }]);
