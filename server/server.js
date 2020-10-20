//npm modules
let express = require('express');
let session = require('express-session');
let parser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;

let dbUrl = 'mongodb://localhost:27017';

// DIY modules
let login = require('./res/login.js');
let sign = require('./res/sign.js');
let report = require('./res/report.js');

let app = express();
app.use(express.static('static'));
app.use(parser.urlencoded({extended: true}));

MongoClient.connect(dbUrl, {useUnifiedTopology: true}, (err, db) => {
    if(err) {
        console.log("-----------ERROR-----------"); // TODO remove after debug
        throw err;
    }
    else {
        console.log("----------CONNECTED TO DB----------"); // TODO remove after debug

        // redirect localhost:8080 to localhost:8080/main.html
        app.get('/', function(req, res){
            res.redirect("/main.html");
        });

        // pattern for login post method
        app.post('/login', function (req, res, next) {
            login(req.body.pseudo, req.body.password, db, res);
        });

        // pre-build function to debug
        app.post('/sign', function(req, res, next){
            if(req.body.password !== req.body.passwordConfirmation) console.log("password don't match");//TODO display message on html pages
            else sign(req, res, db);
        });

        // pre-build function to debug
        app.post('/report', function(req, res, next){
            console.log(req.query); // TODO remove debug log
            res.redirect("/");
        });

    }
});

//listen server port
//app.listen('443');
app.listen('8080');
