const Koa = require('koa');
const router = require('koa-router')();
const koaStatic = require('koa-static');
const koaBody = require('koa-body');
const cors = require('koa2-cors')
const bodyParse = require('koa-bodyparser')

const path = require('path');
const app = new Koa();

/*
app.use(
    cors({
        origin: function(ctx) { //设置允许来自指定域名请求
            const whiteList = ['https://joinmouse.github.io', 'http://localhost:3000']; //可跨域白名单
            let url = ctx.header.referer.substr(0, ctx.header.referer.length - 1);
            if(whiteList.includes(url)){
                return url //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
            }
            return 'http://localhost:3000' //默认允许本地请求3000端口可跨域
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
)
*/



// 设置文件上传
app.use(koaBody({
    multipart:true, // 支持文件上传
    encoding:'gzip',
    formidable:{
        uploadDir: path.join(__dirname,'upload/'), // 设置文件上传目录
        keepExtensions: true,    // 保持文件的后缀
        maxFieldsSize: 50 * 1024 * 1024, // 文件上传大小
        onFileBegin:(name,file) => { // 文件上传前的设置
            console.log(`name: ${name}`);
            console.log(file);
        },
    }
}));

// 解析请求参数
app.use(bodyParse())

router.post('/upload/video', async (ctx, next) => {
    console.log()
    console.log()
    console.log(ctx.response)
    let json = {
        code: 0,
        message: '上传成功',
        img_url: ctx.request.files.file.path
    }
    if(ctx.request.body.title && ctx.request.body.content) {
        return ctx.body = json
    }else {
        return ctx.body = {
            code: -1,
            message: '请检查上传参数或联系接口开发者'
        }
    }
})
app.use(router.routes());

// 静态服务器
app.use(koaStatic(path.join(__dirname, 'build')))

app.listen(5000, () => {
    console.log('80端口启动啦啦啦, 阿拉斯加的山巅')
    console.log('请访问localhost:5000')
})