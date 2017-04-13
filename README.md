# node + mongoose + angular movie
### 前提node环境和mongoDB环境已经配置好
#### 第一版只有普通的增删改查功能（无前后分离,分支v1.0.0）。
#### 第二版增加优酷网爬虫，暂时只能爬取第一页电影（无前后分离,分支v1.2.0）。
#### 第三版使用angular1前后分离（分支v1.3.0）。
#### 1. 下载项目 git clone https://github.com/WangSiTu/node-movies.git
#### 2. 安装项目依赖 npm/cnpm i --save-dev
#### 3. 启动node服务 node/nodemon app.js
#### 4. 启动node优酷爬虫node YoukuMovieCrawler.js
(PS:nodemon 是自动重启node服务，安装nodemon：npm/cnpm i nodemon -g）