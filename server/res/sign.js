let bcrypt = require('bcrypt');
let login = require('./login.js');

module.exports = function sign(req, res, db, session){
    // console.log("function sign arg : %s, %s, %s", req.body.pseudo, req.body.mail, req.body.password);
    let dbo = db.db('olln');
    dbo.collection('users').findOne({"mail": req.body.mail}, (err, doc) =>{
        if(err) throw err;
        if(doc!==null) {
            console.log("user email already registered"); //TODO display message in html page
            res.redirect('/pages/login.html');
        }
        else {
            bcrypt.genSalt(10, (err, salt) => {
                if(err) throw err;
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if(err) throw err;
                    let newUser = {
                        "pseudo": req.body.pseudo,
                        "mail": req.body.mail,
                        "password": hash
                    };
                    dbo.collection('users').insertOne(newUser, (err, data) => {
                        if(err) throw err;
                        console.log('user %s now inserted');
                        login(req, res, db, session);
                    });
                })
            });
        }
    })
};