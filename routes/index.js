
/*
 * GET home page.
 */
var  services= require('../services/services.js');


exports.index = function(req, res){
    services.findAllFeedByName("",function(r){
        if(r.error){
            //
            //manage error here
            return false;
        }
        res.render('index', r);
    });

};

exports.feed = function(req,res){
    services.findFeedById(req.params.id, function(r){
        res.send(JSON.stringify(r));
    });
};

exports.feedsearch = function(req,res){
    services.findAllFeedByName(req.params.query,function(r){
        if(r.error){
            //
            //manage error here
            return false;
        }
        res.send(JSON.stringify(r));
    });
};