
# 门户种子工程项目

这个一个基于Ionic1的移动门户种子工程，还在完善中

## 目录
 - [如何开始](#如何开始)
 - [功能例子](#功能例子)
 - [App预览](#App预览)
 - [文件结构](#文件结构)


## 如何开始

* 安装cordova `npm -g install cordova`.
* 安装ionic `npm -g install ionic`.
* 安装gulp `npm install`.
* 克隆地址: `svn+ssh://imgcdnsvn@pub.xiaoheiban.cn`.
* gulp构建环境 `npm install`.
* JavaScript依赖包引入 `bower install`.
* 构建运行环境 `gulp run-dev`.
* 监听 `gulp watch`.

**Note:** Is your build slow? Update `npm` to 3.x: `npm install -g npm`.

## 功能例子


## App 预览

App功能预览.



## 文件结构

```
portal-app/
├-- .github/                            * GitHub files
│   ├── CONTRIBUTING.md                 * Documentation on contributing to this repo
│   └── ISSUE_TEMPLATE.md               * Template used to populate issues in this repo
|
|-- resources/
|
|-- app/
|    |-- pages/
|    |    ├── app.component.js
|    |    └── app.module.js
|    |    └── app.template.html
|    |    └── main.js
|    |
|    |-- index.html
|
|-- www/
|    ├── assets/
|    |    ├── data/
|    |    |    └── data.json
|    |    |
|    |    ├── fonts/
|    |    |     ├── ionicons.eot
|    |    |     └── ionicons.svg
|    |    |     └── ionicons.ttf
|    |    |     └── ionicons.woff
|    |    |     └── ionicons.woff2
|    |    |
|    |    ├── img/
|    |
|    └── build/
|    └── index.html
|
├── .editorconfig                       * Defines coding styles between editors
├── .gitignore                          * Example git ignore file
├── LICENSE                             * Apache License
├── README.md                           * This file
├── config.xml                          * Cordova configuration file
├── package.json                        * Defines our JavaScript dependencies
```
//常见问题 
How to fix this Error: spawn EACCES
hooks   ionic add hooks
ionic cordova prepare android

解决ios11的兼容问题
cordova platform add ios@4.5.1
ios打包之后冲突删掉cdvlogger这个文件   cdvlogger

切图icon和splash 运行命令ionic resources


