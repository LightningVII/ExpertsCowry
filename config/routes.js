var Demand = require('../app/controllers/demand');
var User = require('../app/controllers/user');
var Index = require('../app/controllers/index');
var Qiniu = require('../app/controllers/qiniu');
var qiniu1 = require('qiniu');
var config = require('../config.js');


module.exports = function(app) {
    app.get('/', Index.index);
    //检验校验码是否正确
    app.get('/mac/', Index.verify);
    //获取短信验证码
    app.get('/mac/get/:mobile', Index.get);

    //七牛云上传首页
    app.get('/qiniu/', Qiniu.index);
    //获取所有需求
    app.get('/demand/allList', Demand.getAllList);
    //根据需求ID获取
    app.get('/demand/findById/:id', Demand.findById);
    app.post('/demand/new/', Demand.save);

    app.post('/user/new', User.save);
    app.post('/user/signup', User.signup);
    app.post('/user/signin', User.signin);
    /*  app.get('/signin', User.showSignin)
        app.get('/signup', User.showSignup)
        app.get('/logout', User.logout)*/


    app.get('/uptoken', function(req, res, next) {
        var uptoken = new qiniu1.rs.PutPolicy(config.Bucket_Name);
        var token = uptoken.token();
        res.header("Cache-Control", "max-age=0, private, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        if (token) {
            res.json({
                uptoken: token
            });
        }
        console.log(token);
    });


}
