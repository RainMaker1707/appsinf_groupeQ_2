let bcrypt = require('bcrypt');

module.exports = function login(user, pwd, db, res){
    let dbo = db.db('olln');
    dbo.collection('users').findOne({'pseudo': user}, (err, doc) => {
        if(err) throw err;
        if(doc === null) {
            //TODO display 'not registered' message in login page
            console.log('User not registered');
            res.redirect('/pages/login.html');
        }
        else {
            bcrypt.compare(pwd, doc.password, (err, check) => {
                if(err) throw err;
                if (!check) {
                    //TODO display 'wrong password' message in login page
                    console.log('wrong password');
                    res.redirect('/pages/login.html');
                }else{
                    //TODO user session
                    console.log('connected as %s', user);
                    res.redirect('/');
                }
            });
        }
    });
};