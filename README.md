# 一个简单的播放器，用于专门播放周杰伦的歌曲

> 由于之前把 gitee 当做网盘来用被抓住封了，换了一个方式来解决。

## 思路

1. 基于 [jsososo/MiguMusicApi](https://github.com/jsososo/MiguMusicApi) 获取周杰伦的所有歌曲
2. 将歌曲数据组合成一个大 json 然后上传到 gist 中储存，并且设置为公开
3. 开一个 html 文件，写前端逻辑，直接 fetch gist 的 json 文件
4. 使用 github action 每天定时执行同步

## 本次更新既要

1. 完全重写代码逻辑
2. 前端 UI 重构
3. 前端代码全部为原生（es6）
4. 服务端逻辑重构
5. 完全白嫖

## 目录结构

```
index.html  // 前端界面
client.js   // 前端逻辑脚本
style.css   // 前端样式

server.js   // node 端同步逻辑
```

## 关于我

[Github](https://github.com/lvyueyang)

## 最后

感谢 [jsososo](https://github.com/jsososo) 的项目

## 再最后

战无不胜的毛泽东思想万岁！  
世界人民大团结万岁！
