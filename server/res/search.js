const regex = /[`@#$%^*()_+\-=[\]{};':"\\|,.<>\/?]/;

module.exports = function search(req, res, db){
    if(regex.test(req.body.search)) res.redirect('/');
    else {
        db.db('olln').collection('reports').find({
            $or:
                [
                    {description: {$regex: req.body.search, $options: '$i'}},
                    {date: {$regex: req.body.search, $options: '$i'}},
                    {localisation: {$regex: req.body.search, $options: '$i'}},
                    {author: {$regex: req.body.search, $options: '$i'}}
                ]
        }).toArray((err, doc) => {
            if (err) throw err;
            else {
                res.render('../server/views/index.ejs', {reports: doc});
            }
        });
    }
};