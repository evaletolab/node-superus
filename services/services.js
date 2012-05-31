/**
 * Get data
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

exports.findFeedById = function(id, cb){
    return cb(feeds[0]);
};

exports.findAllFeedByName = function(name, cb){
    var ls=[];
    for (var id in feeds){
        if(feeds[id].name.toLowerCase().indexOf(name.toLowerCase())>-1)
            ls.push(feeds[id]);
    }
    
    return cb({feeds:ls,count:ls.length});
};