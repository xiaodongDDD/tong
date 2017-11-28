

# cordova-plugin-hotpatch


这个插件定义了一个全局对象 `hotpatch` object,整个方法当前版本只暴露出一个方法updateNewVersion,调用该方法传入一个 www.zip的下载地址，之后插件会自动下载，并解压

        <script type="text/javascript" src="js/index.js"></script>
        <script type="text/javascript">
				
			        //hotpatch.updateNewVersion("http://10.211.131.232:8080/www.zip");

        		    
        </script>

## Installation

    cordova plugin add xxxxxxxxx


### Supported Platforms

- Android
- iOS



### 安装步骤
    1 添加插件
    2 在需要更新的时候调用更新地址
    3 注意 android平台由于特殊性 ，需要打开主工程的mainActivity 文件，在{
    super.onCreate(savedInstanceState);后面加上一行代码  init();
	将DownLoadTask.java 文件中的import com.hand.download.R;  改为自己主工程MainActivity 文件 所在路径
	如：agelocme-frontend\platforms\android\src\com\nuskin\agelocmeprod\MainActivity.java
	则改为import com.nuskin.agelocmeprod.R;
    4 安卓和ios需要打不同的www.zip包。安卓zip包需要取assets下面的www文件夹，ios的zip包需要取platforms/ios/www

    #### 补充说明
    在android平台上的热更新原理：加了init（）后，当前app会优先执行从服务器下载到手机端的www文件内的代码，若是没有加init（），热更新不会失效，app重启后会执行原来打包的代码。
#### 热更新的优缺点
	优点：避免了繁琐的打包过程
    热更新的www代码不会放到公众服务器上。