var SMSUrl = 'http://sms.tehir.cn/code';

module.exports = {
    'ACCESS_KEY': '3kpt23kEYXzoxodBU2Lb0TIp4wlAqrEmC1t_LrvT',
    'SECRET_KEY': 'qA7h6spIUhHKK785vgJmmpaMbwtyy5DkV1PHCKP_',
    'Bucket_Name': 'expertscowry',
    'Port': process.env.PORT || 3004,
    'Uptoken_Url': '/uptoken',
    'Domain': 'http://7xpwuf.com1.z0.glb.clouddn.com/',
    'DBUrl': 'mongodb://localhost/experts',
    'SMS': {
        'ACCOUNT': '15221936261',
        'PASSWORD': '920xiao817',
        'URL': {
        	'SEND': SMSUrl + '/sms/api/v1/send/',
        	'GET': SMSUrl + '/rcode/v1/get/',
        	'VERIFY': SMSUrl + '/rcode/v1/verify/'
        }
    }
};
