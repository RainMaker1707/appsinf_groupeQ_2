//npm modules
let express = require('express');
let session = require('express-session');
let parser = require('body-parser');

// DIY modules
let loginTools = require('./res/login.js');


let app = express();

app.use(express.static('static'));
app.use(parser.urlencoded({extended: true}));

app.post('/login', function(req, res, next){
    console.log(req.body);// TODO remove debug log
    if(loginTools.login(req.body.pseudo, req.body.password).rep){
        res.redirect("/main.html");
    }else{
        res.redirect("/pages/login.html");
    }
});

app.post('/signin', function(req, res, next){
    console.log(req.query); // TODO remove debug log
    res.redirect("/main.html");
});

app.post('/report', function(req, res, next){
    console.log(req.query); // TODO remove debug log
    res.redirect("/main.html");
});

app.listen('443');
app.listen('8080');
