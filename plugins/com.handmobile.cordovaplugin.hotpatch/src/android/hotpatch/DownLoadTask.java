package com.handmobile.cordova.hotpatch;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.zip.ZipEntry;
import org.apache.cordova.CordovaWebView;
import android.R.bool;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.DialogInterface.OnKeyListener;
import android.os.AsyncTask;
import android.os.Handler;
import android.os.Message;
import android.view.KeyEvent;
import android.webkit.WebView;
import android.widget.TextView;
import android.content.SharedPreferences; // add by ciwei
import android.preference.PreferenceManager; // add by ciwei
import android.content.pm.PackageManager;// add by ciwei
import android.content.res.Resources;
import android.content.pm.PackageInfo;// add by ciwei
import android.util.Log;

public class DownLoadTask extends AsyncTask<String, String, Boolean>{
    private final static int TIME_OUT = 30 * 1000;
	private String patchAppVersionKey ="patchAppVersion";
    private Context mContext;
    private CordovaWebView mWebView;
    private ProgressDialog mProgressDialog;
    private MyProgressBar mProgressBar;
	private TextView mPercent;
	private String mPercentString;
	private Handler mHandler = new Handler(){
		@Override
		public void handleMessage(Message msg) {
			super.handleMessage(msg);
			mPercent.setText(mPercentString);
		}
	};

	public  DownLoadTask(Context context,CordovaWebView webView) 
	{
		mContext = context;
		mWebView = webView;
		
		mProgressDialog = new ProgressDialog(mContext);
//		mProgressDialog.setTitle("升级文件下载");
//		mProgressDialog.setMessage("文件下载中，请稍候...");
//		mProgressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
		mProgressDialog.setProgress(0);
		mProgressDialog.setMax(100);
		mProgressDialog.setCancelable(false);
		mProgressDialog.show();
		
		mProgressDialog.setOnKeyListener(onKeyListener);
		mProgressDialog.setContentView(getResId("alterlayout"));
		mProgressBar = (MyProgressBar) mProgressDialog.findViewById(getId("progressBar1"));
		mProgressBar.setProgress(0);
		mPercent =(TextView)mProgressDialog.findViewById(getId("tv_percent"));
	}
	
	
	@Override
	protected Boolean doInBackground(String... params) {
		if(params[0] !=null){
			String  url = params[0];
			
			try {
                HttpURLConnection connection = null;
				URL u = new URL(url);
                connection = (HttpURLConnection) u.openConnection();
                connection.setDoInput(true);
                connection.setUseCaches(false);
                connection.setRequestMethod("GET");
                connection.setConnectTimeout(TIME_OUT);
                connection.connect();
                
                int lenghtOfFile = connection.getContentLength();
                InputStream input = new BufferedInputStream(
                		connection.getInputStream());
                mContext.deleteFile("www.zip");
                OutputStream output  =  mContext.openFileOutput("www.zip", Context.MODE_PRIVATE);
                byte data[] = new byte[1024 * 20];
                long total = 0;
                int count;
                while ((count = input.read(data)) != -1) {
                    total += count;
                    output.write(data, 0, count);
                    publishProgress(String.valueOf((total * 100) / lenghtOfFile));
                }
                output.flush();
                output.close();
                input.close();
                
                mContext.deleteFile("www");

				ZipUtil.UnZipFolder(mContext.getFileStreamPath("www.zip").toString(), mContext.getFilesDir().toString().concat("/"));
				//保存版本号
				SharedPreferences mSharedPreferences = PreferenceManager
				.getDefaultSharedPreferences(mContext);
				SharedPreferences.Editor editor = mSharedPreferences.edit();
				PackageManager packageManager = mContext.getPackageManager();
				PackageInfo packageInfo = packageManager.getPackageInfo(
					mContext.getPackageName(), 0);// mod by ciwei +m
				String currentVersion = packageInfo.versionName;
				editor.putString(patchAppVersionKey,currentVersion);
				editor.commit();
			} catch (MalformedURLException e) {

				e.printStackTrace();
				return false;
			} catch (IOException e) {

				e.printStackTrace();
				return false;
			} catch (Exception e) {
				e.printStackTrace();
				return  false;
			}
			
			
			
			
		}else {
			
			return false;
		}
		
		
		return true;
	}
    @Override
    protected void onProgressUpdate(String... values) {
        // TODO Auto-generated method stub
        super.onProgressUpdate(values);
        mProgressDialog.setProgress(Integer.parseInt(values[0]));
        mProgressBar.setProgress(Integer.parseInt(values[0]));
        mPercentString =values[0]+"%";
        mHandler.sendEmptyMessage(100);
    }
    
	@Override
	protected void onPostExecute(Boolean result) {
		// TODO Auto-generated method stub
		super.onPostExecute(result);

        if (mProgressDialog != null && mProgressDialog.isShowing()) {
        	mProgressDialog.dismiss();
        }

		if(true){
			new Handler().postDelayed(new Runnable() {
                      public void run() {
                          mWebView.clearHistory();
                          mWebView.clearCache();
                      }
                  }, 0);
      mWebView.loadUrlIntoView("file://".concat(mContext.getFilesDir().getPath()).concat("/www/index.html"), false);
		}
		else {
		}

	}
	
	
	///////////////////
	 private OnKeyListener onKeyListener = new OnKeyListener() {
		   @Override
	        public boolean onKey(DialogInterface dialog, int keyCode, KeyEvent event) {
	            if (keyCode == KeyEvent.KEYCODE_BACK && event.getAction() == KeyEvent.ACTION_DOWN) {
	            	mProgressDialog.dismiss();
	            	
	            }
	            return false;
	        }
	    };
	
	   ///////////////////////add by fuwei/////////////////////////////////
		private int getResId(String resourceName){
	    	Resources resources = mContext.getResources();
			int resId = resources.getIdentifier(resourceName,"layout",mContext.getPackageName());
//			int resId = resources.getIdentifier(getPackageName() + ":layout/" + resourceName, null, null);
	    	return resId;
	    }
		private int getId(String idName){
	    	Resources resources = mContext.getResources();
			int resId = resources.getIdentifier(idName, "id", mContext.getPackageName());
	    	return resId;
	    }
	   //////////////////////////////////////////////////////////

}
