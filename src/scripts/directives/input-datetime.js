angular.module('directiveModule').directive('inputDatetime', ['$compile', '$ocLazyLoad','formatDate', function($compile, $ocLazyLoad,formatDate) {
	return {
		restrict: 'AE',
		require: 'ngModel',
		scope: {
			min:'=',
			max:'=',
			ngModel: '='
		},
		link: function(scope, element, attr, ctrl) {
			$ocLazyLoad.load([
				'/build/lib/mobiscroll/css/mobiscroll.custom-3.0.0-beta6.min.css',
                '/build/lib/mobiscroll/js/mobiscroll.custom-3.0.0-beta6.min.js'
			]).then(function() {
				element = $(element[0]);

				if(!attr.format || attr.format == 'yyyy-MM-dd'){
					var dateInstance;
					var options = {
						theme: 'ios',
            lang: 'zh',
						display:'bottom',
						buttons:[{
							text:'取消',
							handler:'cancel',
							icon:'close'
						},{
							text:'确定',
							handler:'set',
							icon:'checkmark'
						}],
						dateFormat:'yy-mm-dd',
						onInit:function(event, inst){
							dateInstance = inst;
						},
						onSet:function(value, inst) {
							scope.ngModel = value.valueText;
							scope.$apply();
						},
						onClear:function(){
							scope.ngModel = '';
							scope.$apply();
						}
					};
					if(scope.ngModel){
						options.defaultValue = formatDate.parseDate(scope.ngModel);
					}
					var instance = element.mobiscroll();
					instance.date(options);
					scope.$watch('ngModel',function(value){
						if(value){
							dateInstance.setVal(value);
						}
					});
					scope.$watch('min',function(value){
						if(value){
							options.min = formatDate.parseDate(value);
						}else{
							options.min = (function(){
								var date = new Date();
								date.setFullYear(1900);
							})();
						}
						if(scope.ngModel){
							options.defaultValue = formatDate.parseDate(scope.ngModel);
						}
						instance.date(options);
					});
					scope.$watch('max',function(value){
						if(value){
							options.max = formatDate.parseDate(value);
						}else{
							options.max = new Date();
						}
						if(scope.ngModel){
							options.defaultValue = formatDate.parseDate(scope.ngModel);
						}
						instance.date(options);
					});
				}

				if(attr.format == 'yyyy-MM-dd HH:mm'){
					var options = {
						// theme: 'android-holo-light',
            theme: 'ios',
            lang: 'zh',
						display:'bottom',
						buttons:[
						  {
							text:'取消',
							handler:'cancel',
							icon:'close'
						},{
							text:'清空',
							handler:'clear',
							icon:'loop2'
						},{
							text:'确定',
							handler:'set',
							icon:'checkmark'
						}
						],
						dateFormat:'yy-mm-dd',
						timeFormat:'HH:ii',
						onInit:function(event, inst){
							datetimeInstance = inst;
						},
						onSet: function(value, inst) {
							scope.ngModel = value.valueText;
							scope.$apply();
						},
						onClear:function(){
							scope.ngModel = '';
							scope.$apply();
						}
					};
					if(scope.ngModel){
						options.defaultValue = formatDate.parseDate(scope.ngModel,attr.format);
					}
					var instance = element.mobiscroll();
					instance.datetime(options);
					scope.$watch('ngModel',function(value){
						if(value){
							datetimeInstance.setVal(value);
						}
					});
					scope.$watch('min',function(value){
						if(value){
							options.min = formatDate.parseDate(value,attr.format);
						}else{
							options.min = (function(){
								var date = new Date();
								date.setFullYear(1900);
							})();
						}
						if(scope.ngModel){
							options.defaultValue = formatDate.parseDate(scope.ngModel,attr.format);
						}
						instance.datetime(options);
					});
					scope.$watch('max',function(value){
						if(value){
							options.max = formatDate.parseDate(value,attr.format);
						}else{
							options.max = new Date();
						}
						if(scope.ngModel){
							options.defaultValue = formatDate.parseDate(scope.ngModel,attr.format);
						}
						instance.datetime(options);
					});
				}

				if(attr.format == 'HH:mm'){
					var options = {
						theme: 'android-holo-light',
						lang: 'zh',
						display:'bottom',
						buttons:['clear','cancel','set'],
						timeFormat:'HH:ii',
						onSet: function(value, inst) {
							scope.ngModel = value.valueText;
							scope.$apply();
						},
						onClear:function(){
							scope.ngModel = '';
							scope.$apply();
						}
					};
					if(scope.ngModel){
						options.defaultValue = scope.ngModel;
					}
					var instance = element.mobiscroll();
					instance.time(options);
					scope.$watch('min',function(value){
						var date = new Date();
						if(value){
							var array = value.split(':');
							date.setHours(array[0]);
							date.setMinutes(array[1]);
						}else{
							date.setHours(0);
							date.setMinutes(0);
						}
						options.min = date;
						instance.time(options);
					});
					scope.$watch('max',function(value){
						var date = new Date();
						if(value){
							var array = value.split(':');
							date.setHours(array[0]);
							date.setMinutes(array[1]);
						}else{
							date.setHours(23);
							date.setMinutes(59);
						}
						options.max = date;
						instance.time(options);
					});
				}
			});
		}
	};
}]);
