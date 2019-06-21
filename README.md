# 一个简单的播放器，从数据爬取处理到上传至七牛云再到前端页面展示  

## 在这里你能了解(或者学习)到：
1. Puppeteer 的基本使用  
2. nodejs 的简单应用  
3. 如何实现一个简易的多文件下载队列函数  
4. 七牛云储存文件上传的入门姿势  
5. 使用gulp来协助开发传统前端页面（sass编译，自动刷新）  
6. 周杰伦的所有歌曲  
> 其实我并不是周杰伦的歌迷，只是因为偶尔想听，却发现都收费了（qiong bi）。。。  
如果侵权，请联系我，我将会全部删除。

## 言归正传  
简单的介绍一下歌曲从获取到展示的过程 

1. `getJsonData.js`
使用 Puppeteer 在歌曲网站中拉取的数据，进行了相关处理转化为了歌曲列表的json数据
2. `downloadMusic.js`
使用`request`将歌曲下载到了本地，上面说的多文件下载相关的函数就是在这里。
3. `uploadMusicQiNiu.js`
使用七牛的sdk将文件上传至了七牛云进行了储存   
> 因为直接使用引用的连接会经常出现连接失效，无法正常使用的问题，上次维护使用时是在在服务端定时的获取更新的方式，但是仍然会出现失效的问题，本次直接将全部歌曲上传至七牛云中供大家使用。还会自己最靠谱。。。

**七牛的配置项 `CONFIG.js` 请自行建立，格式如下**
``` js
module.exports = {
    ACCESS_KEY: '',
    SECRET_KEY: '',
    bucket: ''
}
```
**在下载音乐到本地时，记得新建 `downloadFiles` 文件夹**  
**代码并不是很多，详细了解请直接查看源码**

## 相关连接
[我的博客](http://www.lvyueyang.top/)  
[我的掘金主页](https://juejin.im/user/585407be61ff4b0063af58be)  
[GitHub](https://github.com/lvyueyang)  
[Puppeteer](https://zhaoqize.github.io/puppeteer-api-zh_CN/#/)  
[gulp](https://www.gulpjs.com.cn/)    
[sass](https://www.sass.hk/)    
[七牛云](https://www.qiniu.com/)    
[歌曲源地址](http://music.wandhi.com/?name=%E5%91%A8%E6%9D%B0%E4%BC%A6&type=netease)    

