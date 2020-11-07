module.exports = function search(req, res, db){
    db.db('olln').collection('reports').find({$or:
            [{description: {$regex: req.body.search, $options: '$i'}},
            {date: {$regex: req.body.search, $options: '$i'}},
            {localisation: {$regex: req.body.search, $options: '$i'}},
            {author: {$regex: req.body.search, $options: '$i'}}
        ]}).toArray((err, doc)=>{
        if(err) throw err;
        else {
            res.render('../server/views/index.ejs', {reports: doc});
        }
    });
};