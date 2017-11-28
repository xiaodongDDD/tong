package com.handmobile.cordova.hotpatch;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.webkit.WebView;
import android.content.SharedPreferences; // add by ciwei
import android.preference.PreferenceManager; // add by ciwei
import android.content.pm.PackageManager;// add by ciwei
import android.content.pm.PackageInfo;// add by ciwei
import android.text.TextUtils;//add by ciwei
import android.util.Log;

import com.handmobile.cordova.hotpatch.DownLoadTask;

import java.io.File;
import java.lang.reflect.Field;


public class HotPatchPlugin extends CordovaPlugin {

	private CordovaActivity mCordovaActivity;
	private String patchAppVersionKey ="patchAppVersion";
	private String version ="";
	private String currentVersion = "";
	public  HotPatchPlugin() {

	}

	@Override
	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		// TODO Auto-generated method stub
		super.initialize(cordova, webView);
		
		mCordovaActivity  = (CordovaActivity)cordova.getActivity();
		//获取上次保存的版本号
		SharedPreferences mSharedPreferences = PreferenceManager
				.getDefaultSharedPreferences(webView.getContext());
		version = mSharedPreferences.getString(patchAppVersionKey,"0.0.0");


		//获取版本号  //add try by ciwei
		try{
		    PackageManager packageManager = webView.getContext().getPackageManager();
            PackageInfo packageInfo = packageManager.getPackageInfo(webView.getContext().getPackageName(), 0);// mod by ciwei add webView
            currentVersion = packageInfo.versionName;
		 }catch (Exception e) {
            e.printStackTrace();
         }

        //判断版本号大小
		if(version.compareTo(currentVersion) < 0){
			String mFilePath = webView.getContext().getFilesDir().toString().concat("/www");
			File file = new File(mFilePath);
			if(file.exists()){
			  boolean result = deleteDir(file);
              if(!result){
            	 PluginUtil.showErrorMessage("安装失败,权限不够",cordova.getActivity());
               }
			}
		}
		
		String targetFilePath = webView.getContext().getFilesDir().toString().concat("/www/index.html");
		File targetFile = new File(targetFilePath);
		if(targetFile.exists()){
			Class userCla = (Class) CordovaActivity.class;
			Field[] fs = userCla.getDeclaredFields();

			for(int i = 0 ; i < fs.length; i++){
				Field f = fs[i];
				if(f.getName().equals("launchUrl")){
					try {
						f.setAccessible(true); //设置些属性是可以访问的
						f.set(mCordovaActivity,"file://".concat(targetFilePath));
					} catch (IllegalAccessException e) {
						e.printStackTrace();
					}
				}
			}
		}
	}



    private boolean deleteDir(File dir) {
        if (dir.isDirectory()) {
            String[] children = dir.list();
            //递归删除目录中的子目录下
            for (int i=0; i<children.length; i++) {
                boolean success = deleteDir(new File(dir, children[i]));
                if (!success) {
                    return false;
                }
            }
        }
        // 目录此时为空，可以删除
        return dir.delete();
    }

	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		if ("updateNewVersion".equals(action)) {
		  	String updateUrl = args.getString(0);
			if(updateUrl ==null || updateUrl.equals("")){
				PluginUtil.showErrorMessage("热更新url 为空",cordova.getActivity());
			}else {
				updateNewVersion(updateUrl);
			}
		}
		else {
			return false;
		}
		return true;
	}
	
	public  void updateNewVersion(String updateUrl)
	{
		DownLoadTask downLoadTask = new DownLoadTask(webView.getContext(),webView);
		downLoadTask.execute(updateUrl);
	}
}
