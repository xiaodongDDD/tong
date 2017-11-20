/**
 * Created by daidongdong on 2017/11/14.
 */

(function () {
  'use strict';

  angular
    .module('utilModule')
    .factory('httpRequestHeader', httpRequestHeader);

  httpRequestHeader.$inject = [
    'baseConfig'];

  function httpRequestHeader(baseConfig) {
    var interceptor = {
      'request': function (config) {
        if (window.localStorage.userToken && window.localStorage.empno) {
          config.headers.authorization = 'Bearer ' + window.localStorage.userToken
          config.headers.appVersion = baseConfig.version.currentVersion + '.' + baseConfig.version.currentSubVersion;
          config.headers["Content-Type"] = 'indexPage/json;charset=UTF-8';
          config.headers['X-Requested-With'] = 'XMLHttpRequest';
          config.headers['X-hmapfront-client'] = 'APP';
          config.headers['X-hmapfront-version'] = baseConfig.version.currentVersion + '.' + baseConfig.version.currentSubVersion;
        }
        return config;
      }
    };

    return interceptor;
  }

})();
