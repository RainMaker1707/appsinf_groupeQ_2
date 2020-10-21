let bcrypt = require('bcrypt');

module.exports = function login(req, res, db, session){
    if(session.pseudo !== undefined){
        console.log('Already connected as %s', session.pseudo);//TODO display message on html pages
        res.redirect('/');
    }else {
        let dbo = db.db('olln');
        dbo.collection('users').findOne({'pseudo': req.body.pseudo}, (err, doc) => {
            if (err) throw err;
            if (doc === null) {
                //TODO display 'not registered' message in login page
                console.log('User not registered');
                res.redirect('/pages/login.html');
            } else {
                bcrypt.compare(req.body.password, doc.password, (err, check) => {
                    if (err) throw err;
                    if (!check) {
                        //TODO display 'wrong password' message in login page
                        console.log('wrong password');
                        res.redirect('/pages/login.html');
                    } else {
                        console.log('connected as %s', req.body.pseudo);//TODO display message on html pages
                        session._id = doc._id;
                        session.mail = doc.mail;
                        session.pseudo = doc.pseudo;
                        res.redirect('/');
                    }
                });
            }
        });
    }
};