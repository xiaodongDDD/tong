/**
 * Created by daidongdong on 2017/11/17.
 */
angular.module('indexPageModule')
  .service('indexPageService', [
    'baseConfig',
    'hmsHttp',
    function (baseConfig,
              hmsHttp) {
      this.operating = [
        {
          id: 'day',
          text: '今日',
          style: {'border-bottom-width': '2px', 'border-bottom-style': 'solid', 'border-bottom-color': '#DCDCDC'},
          selected: true,
        },
        {
          id: 'week',
          text: '本周',
          style: {'border-bottom-width': '2px', 'border-bottom-style': 'solid', 'border-bottom-color': '#DCDCDC'},
          selected: false
        },
        {
          id: 'month',
          text: '本月',
          style: {'border-bottom-width': '2px', 'border-bottom-style': 'solid', 'border-bottom-color': '#DCDCDC'},
          selected: false,
        },
        {
          id: 'time',
          text: '按日期查询',
          selected: false
        }
      ];
    }]);
