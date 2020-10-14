let express = require('express');
let consolidate = require('consolidate');
let loginTools = require('./login.js');

let app = express();

app.engine('html', consolidate.hogan);

app.get('/login', function(req, res, next){
    console.log(req.query);
    loginTools.login(req.query.pseudo, req.query.password);
    res.redirect("/main.html");
});

app.get('/signin', function(req, res, next){
    console.log(req.query);
    res.redirect("/main.html");
});

app.get('/report', function(req, res, next){
    console.log(req.query);
    res.redirect("/main.html");
});

app.use(express.static('static'));
app.listen('443');
app.listen('8080');
