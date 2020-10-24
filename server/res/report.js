const multer = require('multer');
const upload = multer({});

module.exports = function report(req, res, db, session){
    if(session.pseudo === undefined) res.redirect('/log');
    else{

        let img;
        if(!req.file) img = 'images/report_no_pic.jpeg';
        else img = "data:image/jpeg;base64," + req.file.buffer.toString('base64');
        const months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
        let today = new Date();
        let date = today.getDate() + " " + months[today.getMonth()] + " " + today.getFullYear();
        let newReport = {
            "author": session.pseudo,
            "localisation": req.body.localisation,
            "description": req.body.accident,
            "date": date,
            "image": img
        };
        db.db('olln').collection('reports').insertOne(newReport, (err, doc)=>{
            if(err) throw err;
            else res.redirect('/');
        });
    }
};