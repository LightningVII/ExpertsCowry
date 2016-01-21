var request = require('request');
var qs = require('querystring');
var config = require('../../config.js');
exports.index = function(req, res) {
    res.render('qiniu', {
        title: "七牛云上传",
        domain: config.Domain,
        uptoken_url: config.Uptoken_Url
    });
};

