(function () {
  angular.module('directiveModule').directive('inputTreelist', ['$compile', function ($compile) {
    return {
      restrict: 'AE',
      require: 'ngModel',
      replace: true,
      template:
      '<ul style="display:none;">' +
      '<li data-val="{{item.value}}" data-text="{{item.text}}" ng-repeat="item in selectData">{{item.text}}' +
      '<ul>' +
      '<li data-val="{{item2.value}}" data-text="{{item2.text}}" ng-repeat="item2 in item.children">{{item2.text}}' +
      '</li>' +
      '</ul>' +
      '</li>' +
      '</ul>',
      scope: {
        selectData: '=',
        ngModel: '='
      },
      link: function (scope, element, attr, ctrl) {
          element = $(element[0]);
          var treelistInstance;
          var options = {
            theme: 'ios',
            lang: 'zh',
            display: 'bottom',
            showLabel: true,
            height: 30,
            circular: false,
            filter: true,
            layout: attr.layout,
            labels: attr.labels ? attr.labels.split(',') : ['　', '　', '　'],
            placeholder: '请选择',
            headerText: attr.headerText || function (value) {
              var dataArray = value.split(' ');
              var item1 = $('#' + element.attr('id') + ' [data-val=' + dataArray[0] + ']').attr('data-text');
              var item2 = $('#' + element.attr('id') + ' [data-val=' + dataArray[1] + ']').attr('data-text');
              if (item1 && item2) {
                return item2;
              } else {
                return '　';
              }
            },
            buttons: [{
              text: '取消',
              handler: 'cancel',
              icon: 'close'
            },  {
              text: '确定',
              handler: 'set',
              icon: 'checkmark'
            }],
            onInit: function (event, inst) {
              treelistInstance = inst;
              if (scope.ngModel) {
                var item1 = $('#' + element.attr('id') + ' [data-val=' + scope.ngModel.substr(0, 2) + ']').attr('data-text');
                var item2 = $('#' + element.attr('id') + ' [data-val=' + scope.ngModel.substr(0, 4) + ']').attr('data-text');
                $('#' + element.attr('id') + '_dummy').val(item1 + item2);
              }

            },
            onSet: function (event, inst) {
              var value = '';
              var text = '';
              $('.mbsc-sc-itm-sel').each(function () {
                value = $(this).attr('data-val');
                text += $(this).html();
              });
              scope.ngModel = value;
              $('#' + element.attr('id') + '_dummy').val(text);
              scope.$apply();
            },
            onChange: function (event, inst) {
              console.log(event);
            }
          };

          if (scope.ngModel) {
            options.defaultValue = [scope.ngModel.substr(0, 2), scope.ngModel.substr(0, 4), scope.ngModel];
          }

          setTimeout(function () {
            element.mobiscroll().treelist(options);
            scope.$watch('ngModel', function (value) {
              if (value) {
                treelistInstance.setVal([value.substr(0, 2), value.substr(0, 4), value], true, false, false);
                var item1 = $('#' + element.attr('id') + ' [data-val=' + value.substr(0, 2) + ']').attr('data-text');
                var item2 = $('#' + element.attr('id') + ' [data-val=' + value.substr(0, 4) + ']').attr('data-text');
                $('#' + element.attr('id') + '_dummy').val(item1 + item2);
              }
            });
          });
        // });
      }
    };
  }]);
})();
