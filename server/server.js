//npm modules
let express = require('express');
let parser = require('body-parser');
let session = require('express-session');
const multer = require('multer');
const upload = multer({});
let MongoClient = require('mongodb').MongoClient;

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
    }
    else {
        console.log("---------- CONNECTED ----------");
        // redirect localhost:8080 to localhost:8080/main.html
        app.get('/', function(req, res){
            let dbo = db.db('olln');
            dbo.collection('reports').find({}).toArray((err, doc) =>{
                if(err) throw err;
                if(session.pseudo === undefined) res.render('../server/views/index', {reports: doc});
                else res.render('../server/views/index', {pseudo: session.pseudo, reports: doc});
            });
        });

        app.get('/log', function(req, res, next){
            if(session.pseudo !== undefined)res.redirect('/');
            else res.render('../server/views/login')
        });

        // pattern for login post method
        app.post('/login', function (req, res) {
            login(req, res, db, session);
        });

        // pattern for sign up method
        app.post('/sign', function(req, res){
            sign(req, res, db, session);
        });

        // pre-build function to debug
        app.get('/report', function(req, res){
            if(session.pseudo === undefined) res.redirect('/log');
            else res.render('../server/views/report');
        });

        app.post('/postReport', upload.single('image'), function(req, res){
           report(req, res, db, session);
        });

        app.get('/disconnect', function(req, res){
            delete session._id;
            delete session.mail;
            delete session.pseudo;
            res.redirect('/');
        });
    }
});

//listen server port
app.listen('8080');
