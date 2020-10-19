//npm modules
let express = require('express');
let session = require('express-session');
let parser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;

let dbUrl = 'mongodb://localhost:27017';

MongoClient.connect(dbUrl, {useUnifiedTopology: true}, (err, db) => {
    if(err) {
        console.log("-----------ERROR-----------");
        return 1;
    }
    else console.log("----------CONNECTED----------");
});

// DIY modules
let login = require('./res/login.js');
let signUp = require('./res/signin.js');
let report = require('./res/report.js');

let app = express();
app.use(express.static('static'));
app.use(parser.urlencoded({extended: true}));

// redirect localhost:8080 to localhost:8080/main.html
app.get('/', function(req, res){
    res.redirect("/main.html");
});

// pattern for login post method
app.post('/login', function(req, res, next){
    console.log(req.body);// TODO remove debug log
    if(login(req.body.pseudo, req.body.password).rep){
        // TODO add user name and session
        res.redirect("/main.html");
    }else{
        // TODO add message in login.html
        res.redirect("/pages/login.html");
    }
});

// pre-build function to debug
app.post('/signin', function(req, res, next){
    console.log(req.query); // TODO remove debug log
    res.redirect("/main.html");
});

// pre-build function to debug
app.post('/report', function(req, res, next){
    console.log(req.query); // TODO remove debug log
    res.redirect("/main.html");
});

//listen server port
app.listen('443');
app.listen('8080');
