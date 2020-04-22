### UI组件-视频上传功能

#### 使用
1、安装npm包文件
```
npm install / yarn install
```

2、开启服务
```
npm run serve / yarn serve
```


##### 实现功能点
假设我们需要在前端设计一个UI, 它是用户用来上传一段视频文件的. 用户需要在 UI 中输入视频的标题(Title), 描述(Description) 和需要上传的视频.

#### 需求: 
1、请使用原生的 JavaScript 语言(TypeScript 也可以), 编写出一段程序, 该段程序具备以下的功能:
- 用户输入内容的校验: title 和 description 不许为空, 视频文件只支持MP4, 大小不超过 50M
- 文件上传过程中页面不跳转
- 需要显示文件上传的进度

2、请同时设计并编写在整个提交开始到文件上传完毕期间, 所需要的和服务器端通信所需要调用的 API 接口文档, 
每个接口需要详细描述提交的请求和返回的响应数据的设计.

——————————————————————————————————

#### API接口文档
- 视频上传接口路径: /upload/video

- 请求参数
title: 类型(String) 必填
content: 类型(String) 必填
file: 二进制文件 必填

- 请求头格式
Content-Type: multipart/form-data

- 响应参数
code: 0(请求成功)/ -1(错误提示)
message: 消息提示
img_url: 上传后获取的url

#### 源文件代码注释
- serve.js 服务端开启的接口文件
- src 前端部分的源码
- build 打包后的前端文件夹
- upload 上传存储的文件夹
