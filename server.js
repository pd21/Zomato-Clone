var express = require('express');
var app = express();
var port = process.env.PORT || 3009;
var path = require('path');

var bodyParser = require('body-parser');

//app.use(bodyParser({limit: '50mb'}));
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// files
var home = require('./app/home.js');

// routes
app.use('/zomato', home);

app.get('/', (req, res)=>{
	res.redirect('/zomato');
});

app.listen(port, () => {
	console.log('Server is running on port: ' + port);
});

module.exports = app;
