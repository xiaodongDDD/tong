/**
 * Created by daidongdong on 2017/11/14.
 */
(function () {
  'use strict';
  angular
    .module('indexPageModule')
    .service('guideService', guideService);

  guideService.$inject = [
    'baseConfig'];

  function guideService(baseConfig) {
    var screenSize = {}
    this.setScreenSize = function (result) {
      screenSize = result;
    };

    this.getScreenSize = function () {
      return screenSize;
    }
  }
})();
