//npm modules
let express = require('express');
let parser = require('body-parser');
let session = require('express-session');
const multer = require('multer');
const upload = multer({});
let MongoClient = require('mongodb').MongoClient;
let http = require('http');
let https = require('https');
let fs= require('fs');

// DIY modules
let login = require('./res/login.js');
let sign = require('./res/sign.js');
let report = require('./res/report.js');

// Global variables
let app = express();
let dbUrl = 'mongodb://localhost:27017';

// App configs
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

// DB connect and app react in callback
MongoClient.connect(dbUrl, {useUnifiedTopology: true}, (err, db)=>{
    if(err) {
        console.log("-----------  ERROR  -----------");
        throw err;
    } else {
        console.log("---------- CONNECTED ----------");
        // redirect localhost:8080 to localhost:8080/main.html
        app.get('/', (req, res)=>{
            db.db('olln').collection('reports').find({}).toArray((err, doc)=>{
                if(err) throw err;
                if(req.session.pseudo === undefined) res.render('../server/views/index', {
                    reports: doc,
                    cookie: req.session.cookieShow
                });
                else res.render('../server/views/index', {
                    pseudo: req.session.pseudo,
                    reports: doc,
                    cookie: req.session.cookieShow
                });
            });
        });

        app.get('/log', (req, res)=>{
            if(req.session.pseudo !== undefined)res.redirect('/');
            else res.render('../server/views/login', {cookie: req.session.cookieShow})
        });

        app.post('/login', (req, res)=>{
            login(req, res, db);
        });

        app.post('/sign', (req, res)=>{
            sign(req, res, db);
        });

        app.get('/report', (req, res)=>{
            if(req.session.pseudo === undefined) res.redirect('/log');
            else res.render('../server/views/report');
        });

        app.post('/postReport', upload.single('image'), function(req, res){
           report(req, res, db);
        });

        app.get('/disconnect', (req, res)=>{
            delete req.session._id;
            delete req.session.mail;
            delete req.session.pseudo;
            res.redirect('/');
        });

        app.get('/cookieAlert', (req,res)=>{
            req.session.cookieShow = true;
            res.redirect('/');
        });

    }
});

// Server https listen server port 443
https.createServer({
    key: fs.readFileSync('./server/cert.key'),
    cert: fs.readFileSync('./server/cert.crt'),
}, app).listen(443);

// Server http redirect from http port 80 to https port 443
http.createServer((req, res)=>{
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);
