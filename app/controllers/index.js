var request = require('request');
var qs = require('querystring');
var config = require('../../config.js');
exports.index = function(req, res) {
    res.render('index', {
        title: "HUIMICE"
    });
};


exports.verify = function(req, res, next) {
	var smsData = {
        mobile: req.query.mobile,
        code: req.query.code
    };
	var macUrl = config.SMS.URL.VERIFY + '?' + qs.stringify(smsData);
    request(macUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
        	var body = JSON.parse(body);
            res.json(body);
        }
    })
};
exports.imp = function(req, res, next) {
	console.log("1")
};
/*

exports.codeSend = function(req, res, next) {
    var macUrl = 'http://sms.tehir.cn/code/sms/api/v1/send?srcSeqId=experts' + date + '&account=15221936261&password=920xiao817&mobile=' + req.params.mobile + '&code=' + code() + '&time=10';
    request(macUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    })
};

exports.report = function(req, res, next) {
    var macUrl = 'http://sms.tehir.cn/code/sms/api/v1/report?account=15221936261&password=920xiao817';
    console.log("body");
    request(macUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    })
};*/

exports.get = function(req, res, next) {

    var smsData = {
        account: config.SMS.ACCOUNT,
        password: config.SMS.PASSWORD,
        mobile: req.params.mobile,
        expireTime: '60',
        length: '4'
    };

    var macUrl = config.SMS.URL.GET + '?' + qs.stringify(smsData);
    request(macUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
        	var body = JSON.parse(body);
        	console.log(body.flag);
            if (body.flag === "0") {
            	console.log(body);
                var date = new Date().getTime();
                var smsData = {
                    srcSeqId: 'experts' + date,
                    account: config.SMS.ACCOUNT,
                    password: config.SMS.PASSWORD,
                    mobile: body.mobile,
                    code: body.code,
                    time: 1
                };
                var macUrl = config.SMS.URL.SEND + '?' + qs.stringify(smsData);
                request(macUrl, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body)
                    }
                })

            } else {
                console.log("1"+body);
            }
        }
    })
};
