'use strict';

var express = require('express');
var route = require('./routes');
var config = require('./config');
var path = require('path');
var http = require('http');

var jade = require('jade');

var port = config.get('port');

var app = express();
app.set('port', config.get('port'));
app.set('views', __dirname + "/template")

app.use(express.static(__dirname + '/views'));

app.use('/template', express.static(__dirname + '/template'));
app.set('view engine', 'jade');


route(app);

//userModel(dbConfig.url);

http.createServer(app).listen(app.get('port'), function () {
  console.log('app listening on port: ' + config.get('port'));
});

console.log('end of app.js');
