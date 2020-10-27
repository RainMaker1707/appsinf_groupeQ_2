//npm modules
let express = require('express');
let parser = require('body-parser');
let session = require('express-session');
const multer = require('multer');
const upload = multer({});
let MongoClient = require('mongodb').MongoClient;
let http = require('http');
let https = require('https');
let bcrypt = require('bcrypt');
let fs= require('fs');

// DIY modules
let login = require('./res/login.js');
let sign = require('./res/sign.js');
let report = require('./res/report.js');

// Global variables
let app = express();
let dbUrl = 'mongodb://localhost:27017';

app.use(express.static('static'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(parser.urlencoded({extended: true}));
app.use(session({
    secret : "not_s3cr3t_s3nt3nc3",
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
        console.log("-----------  ERROR  -----------");
        throw err;
    } else {
        console.log("---------- CONNECTED ----------");
        // redirect localhost:8080 to localhost:8080/main.html
        app.get('/', function(req, res){
            db.db('olln').collection('reports').find({}).toArray((err, doc) =>{
                if(err) throw err;
                if(req.session.pseudo === undefined) res.render('../server/views/index', {reports: doc});
                else res.render('../server/views/index', {pseudo: req.session.pseudo, reports: doc});
            });
        });

        app.get('/log', function(req, res, next){
            if(req.session.pseudo !== undefined)res.redirect('/');
            else res.render('../server/views/login', {cookie: req.session.showCookieAlert})
        });

        // pattern for login post method
        app.post('/login', function (req, res) {
            login(req, res, db);
        });

        // pattern for sign up method
        app.post('/sign', function(req, res){
            sign(req, res, db);
        });

        // pre-build function to debug
        app.get('/report', function(req, res){
            if(req.session.pseudo === undefined) res.redirect('/log');
            else res.render('../server/views/report');
        });

        app.post('/postReport', upload.single('image'), function(req, res){
           report(req, res, db);
        });

        app.get('/disconnect', function(req, res){
            delete req.session._id;
            delete req.session.mail;
            delete req.session.pseudo;
            res.redirect('/');
        });

        app.post('/ajaxCookieAlert', (req, res) => {
            if(req.body.showCookieAlert === "false"){
                req.session.showCookieAlert = req.body.showCookieAlert;
                res.status(200).send('Alert will not appear again.');
            }else res.status(400).send('ERROR_SET_showCookieAlert_FALSE');
        });
    }
});

//listen server port
https.createServer({
    key: fs.readFileSync('./server/key.pem'),
    cert: fs.readFileSync('./server/server.crt'),
}, app).listen(443);

// Redirect from http port 80 to https
http.createServer((req, res) => {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);
