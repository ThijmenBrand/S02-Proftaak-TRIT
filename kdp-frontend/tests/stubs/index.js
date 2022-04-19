var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var tribe = require('./tribe.js');
var articles = require('./article.js');

app.use('/api/tribe', tribe);
app.use('/api/article', articles);

app.listen(3000, () => {console.log('Mock api running')});