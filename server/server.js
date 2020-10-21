//npm modules
let express = require('express');
let parser = require('body-parser');
let session = require('express-session');
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
app.use(session({
    secret : "SECRET PHRASE HERE",
    resave : false,
    saveUninitialized : true,
    cookie : {
        path: '/',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 , //One week cookies lifetime
        secure: true
    }
}));

MongoClient.connect(dbUrl, {useUnifiedTopology: true}, (err, db) => {
    if(err) {
        console.log("-----------  ERROR  -----------"); // TODO remove after debug
        throw err;
    }
    else {
        console.log("---------- CONNECTED ----------"); // TODO remove after debug
        // redirect localhost:8080 to localhost:8080/main.html
        app.get('/', function(req, res){
            res.redirect("/main.html");
        });

        app.get('/log', function(req, res, next){
            if(session.pseudo !== undefined){
                console.log('Already connected as %s', session.pseudo);
                res.redirect('/');
            }else res.redirect('/pages/login.html');
        });

        // pattern for login post method
        app.post('/login', function (req, res) {
            login(req, res, db, session);
        });

        // pattern for sign up method
        app.post('/sign', function(req, res){
            if(req.body.password !== req.body.passwordConfirmation) console.log("password don't match");//TODO display message on html pages
            else sign(req, res, db, session);
        });

        // pre-build function to debug
        app.get('/reportAccess', function(req, res){
            if(session.pseudo === undefined){
                console.log('you have to be connected');
                res.redirect('/log');
            }else res.redirect('/pages/report.html');
        });

    }
});

//listen server port
app.listen('8080');
