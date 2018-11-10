var express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose');
var app = express();
//var router = express.Router();
var port = process.env.PORT || 3000;
var Book = require('./models/bookModel');
mongoose.connect('mongodb://localhost/bookAPI');
mongoose.Promise = global.Promise;



app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

bookRouter = require('./routes/bookrouters')(Book);


app.use('/api', bookRouter);
//app.use('router', router);

app.get('/', function(req, res){
    res.send("Welcome to my API!");
});

app.listen(port, function(){
    console.log("Gulp is Running on PORT: "+port);
})