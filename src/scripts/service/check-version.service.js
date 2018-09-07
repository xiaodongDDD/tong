/**
 * Created by daidongdong on 2017/11/28.
 */
(function () {
  //'use strict';

  angular
    .module('utilModule')
    .factory('checkVersionService', checkVersionService);

  checkVersionService.$inject = [
    'hmsPopup',
    'baseConfig',
    '$http', '$timeout', '$ionicLoading', '$cordovaFileTransfer', '$cordovaFileOpener2'];

  function checkVersionService(hmsPopup,
                               baseConfig,
                               $http, $timeout, $ionicLoading, $cordovaFileTransfer, $cordovaFileOpener2) {
    var url = baseConfig.basePath + "/api/?v=0.1&method=xhbtongji.updateVersion",
      checkVersionParams = {
        'platform': ionic.Platform.isAndroid() ? 'Android' : 'iPhone',
        'version': baseConfig.version.currentVersion
      };
    var serveVersionParams = {
      bigVersion: '',
      bigUpdateUrl: '',
      updateContent: '',
      subForceUpdate: '',
      hotUpdate: '',
      hotUrl: ''
    };
    var dealVersionUtil = function (localVersion, serveVersion) {
      if (parseInt(localVersion[0]) < parseInt(serveVersion[0])) {
        // alert(parseInt(localVersion[0]) < parseInt(serveVersion[0]) + 'one')
        return true;
      } else if (parseInt(localVersion[0]) == parseInt(serveVersion[0])) {
        if (parseInt(localVersion[1]) < parseInt(serveVersion[1])) {
          // alert(parseInt(localVersion[1]) < parseInt(serveVersion[1]) + 'two')
          return true;
        } else if (parseInt(localVersion[1]) == parseInt(serveVersion[1])) {
          if (parseInt(localVersion[2]) < parseInt(serveVersion[2])) {
            // alert(parseInt(localVersion[2]) < parseInt(serveVersion[2]) + 'three')
            return true;
          } else {
            // alert('不更新' + 'three')
            return false;
          }
        }
      }
      return false;
    }
    /**
     * 检查app的版本更新
     * -- 分大版本和小版本的update
     */
    return {
      checkAppVersion: function (updateFlag) {


        var promise = $http.post(url, checkVersionParams).success(function (response) {
          try {
            serveVersionParams.bigVersion = response.response.version;
            serveVersionParams.bigUpdateUrl = response.response.update_version_url;
            serveVersionParams.subForceUpdate = response.response.must_update;
            serveVersionParams.hotUpdate = response.response.hot_update;
            serveVersionParams.hotUrl = response.response.hot_version_url;
          } catch (e) {
          }
          try {
            serveVersionParams.updateContent = response.response.update_version_note.replace(/\\n/g, '\r\n');
          } catch (e) {
            serveVersionParams.updateContent = '';
          }

          var serveVersion = response.response.version.split('.');
          var localVersion = baseConfig.version.currentVersion.split('.');
          if (dealVersionUtil(localVersion, serveVersion)) {
            if (serveVersionParams.hotUpdate == 1) {
              var selectAction_min_v2 = function (buttonIndex) { // update from pgy
                //alert('selectAction_min_v2.buttonIndex ' + buttonIndex);
                if (buttonIndex == 0) { //确认按钮
                  hotpatch.updateNewVersion(serveVersionParams.hotUrl);
                }
              }
              hmsPopup.confirmOnly(serveVersionParams.updateContent, "版本更新", selectAction_min_v2);
            } else {
              if (serveVersionParams.subForceUpdate == 1) {
                var selectAction_min_v2 = function (buttonIndex) { // update from pgy
                  //alert('selectAction_min_v2.buttonIndex ' + buttonIndex);
                  if (buttonIndex == 0) { //确认按钮
                    // hotpatch.updateNewVersion(serveVersionParams.bigUpdateUrl);
                    if (ionic.Platform.isAndroid()) {
                      UpdateForAndroid(serveVersionParams.hotUrl)
                    } else {
                      window.open(baseConfig.iosUpdatePath);
                    }
                  }
                }
                hmsPopup.confirmOnly(serveVersionParams.updateContent, "版本更新", selectAction_min_v2);
              } else if (serveVersionParams.subForceUpdate == 0) {
                var selectAction_min = function (buttonIndex) { // update from pgy
                  if (buttonIndex == 1) { //确认按钮
                    // hotpatch.updateNewVersion(serveVersionParams.bigUpdateUrl);

                    if (ionic.Platform.isAndroid()) {
                      UpdateForAndroid(serveVersionParams.bigUpdateUrl)

                    } else {
                      window.open(baseConfig.iosUpdatePath);
                    }
                  } else { //取消按钮
                    return;
                  }
                }

                hmsPopup.confirm(serveVersionParams.updateContent, "版本更新", selectAction_min);
              } else {

              }
            }

          } else {
            if(updateFlag=== 'updateFlag'){
              hmsPopup.showShortCenterToast('您已经是最新版本了');
            }
          }
        });
      }
    }


    function UpdateForAndroid(downloadUrl) {
      $ionicLoading.show({
        template: "已经下载：0%"
      });
      var targetPath = "/sdcard/Download/yitong.apk";
      var trustHosts = true;
      var options = {};
      $cordovaFileTransfer.download(downloadUrl, targetPath, options, trustHosts).then(function (result) {
        $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive'
        ).then(function () {
          // console.log('chenggongle');
          // 成功/Users/daidongdong/Desktop/项目信息
        }, function (err) {
          console.log(err);
        });
        $ionicLoading.hide();
      }, function (err) {
        $ionicLoading.show({
          template: "下载失败"
        });
        $timeout(function () {
          $ionicLoading.hide();
        }, 30000);

      }, function (progress) {
        console.log(progress);
        if (progress.total == 0) {
          progress.total = 10000000;
        }
        $timeout(function () {
          var downloadProgress = (progress.loaded / progress.total) * 100;
          $ionicLoading.show({
            template: "已经下载：" + Math.floor(downloadProgress) + "%"
          });
          if (downloadProgress > 99) {
            $ionicLoading.hide();
          }
        });
      });
    }
  }
})();
