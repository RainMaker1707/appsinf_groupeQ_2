let bcrypt = require('bcrypt');

module.exports = function login(req, res, db, session){
    if(session.pseudo !== undefined){
        res.redirect('/');
    }else {
        let dbo = db.db('olln');
        dbo.collection('users').findOne({'pseudo': req.body.pseudo}, (err, doc) => {
            if (err) throw err;
            if (doc === null) {
                res.render('../server/views/login', {userAlert: "User not registered"});
            } else {
                bcrypt.compare(req.body.password, doc.password, (err, check) => {
                    if (err) throw err;
                    if (!check) {
                        res.render('../server/views/login', {pwdAlert: "Wrong password"});
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