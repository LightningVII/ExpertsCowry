var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var ejs = require('ejs');
var qiniu = require('qiniu');
var path = require('path');
var app = express();
var config = require('./config.js');
var dbUrl = config.DBUrl;

mongoose.connect(dbUrl);

app.set('views', './app/views/pages');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.urlencoded());




qiniu.conf.ACCESS_KEY = config.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.SECRET_KEY;




app.listen(config.Port, function() {
    console.log('Listening on port %d', config.Port);
});


if ('development' === app.get('env')) {
    app.set('showStackError', true);
    app.use(morgan(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug', true);
}

require('./config/routes')(app);




