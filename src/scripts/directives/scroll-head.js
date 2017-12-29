(function () {
  angular.module('directiveModule').directive('elasticImage', ['$compile', '$ocLazyLoad', function ($compile, $ocLazyLoad) {

    return {
      restrict: 'A',
      link: function ($scope, $scroller, $attr) {
        var idArr = $attr.elasticImage.split(',')
        var image = document.getElementById(idArr[0]);
        var head = document.getElementById(idArr[1]);
        var content = document.getElementById(idArr[2]);

        var imageHeight = image.offsetHeight;
        $scroller.bind('scroll', function (e) {
          // console.log(e);
          if (ionic.Platform.isAndroid()) {
            var scrollTop = content.scrollTop;
          } else if (ionic.Platform.isIOS()) {
            var scrollTop = e.detail.scrollTop;
          } else {
          }
          var newImageHeight = imageHeight - scrollTop;
          $scope.$emit('to-parent', newImageHeight);
          if (newImageHeight < 44) {
            image.style.height = 0 + 'px';
            head.style.display = 'block';
            // $(idArr[1]).fadeIn();
            image.style.display = 'none';
            // $(idArr[0]).fadeOut();
          } else {
            image.style.height = newImageHeight + 'px';
            head.style.display = 'none';
            image.style.display = 'block';
          }
        });
      }
    }
  }]);

})();
