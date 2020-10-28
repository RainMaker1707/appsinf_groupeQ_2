let bcrypt = require('bcrypt');
let login = require('./login.js');

module.exports = function sign(req, res, db){
    if(req.session.pseudo) res.redirect('/');
    else {
        let dbo = db.db('olln');
        dbo.collection('users').findOne({"mail": req.body.mail}, (err, doc) => {
            if (err) throw err;
            if (doc) res.render('../server/views/login', {mailAlert: "Email already registered"});
            else{
                dbo.collection('users').findOne({"pseudo": req.body.pseudo}, (err, doc)=>{
                    if(err) throw err;
                    else if(doc) res.render('../server/views/login', {pseudoAlert: "Pseudo already used"});
                    else if(req.body.password !== req.body.passwordConfirmation) res.render('../server/views/login', {passwordDontMatch: "Passwords don't match"})
                    else {
                        bcrypt.genSalt(10, (err, salt) => {
                            if (err) throw err;
                            bcrypt.hash(req.body.password, salt, (err, hash) => {
                                if (err) throw err;
                                let newUser = {
                                    "pseudo": req.body.pseudo,
                                    "mail": req.body.mail,
                                    "password": hash
                                };
                                dbo.collection('users').insertOne(newUser, (err) => {
                                    if (err) throw err;
                                    login(req, res, db);
                                });
                            })
                        });
                    }
                });
            }
        })
    }
};