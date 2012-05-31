/**
 * Get data use static data only for tests
 */

var feeds=[
    {
        id:1,
        name:"Enerzine",
        url:"http://www.enerzine.com/rss2news.xml"
    },
    {
        id:2,
        name:"MAKE Magazine",
        url:"http://blog.makezine.com/index.xml"
    },
    {
        id:3,
        name:"Planet Gnome",
        url:"http://planet.gnome.org/atom.xml"
    },
];


exports.findStreamById = function(id, cb){
    require('./feedstream').get(feeds[id-1].url).on('post', function (post) {
        cb(post);
    });

    return ;
};


exports.findFeedById = function(id, cb){
    return cb(feeds[id-1]);
};


exports.findFeedByName = function(name, cb){
    for (var id in feeds){
        if(feeds[id].name.toLowerCase().indexOf(name.toLowerCase())>-1)
            cb(feeds[id]);
    }
    return;
};

exports.findAllFeedByName = function(name, cb){
    var ls=[];
    for (var id in feeds){
        if(feeds[id].name.toLowerCase().indexOf(name.toLowerCase())>-1)
            ls.push(feeds[id]);
    }
    
    return cb({feeds:ls,count:ls.length});
};