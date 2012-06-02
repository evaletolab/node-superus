/**
 * Get data use static data only for tests
 */

var xml2object= require('xml2object');
var request = require('request');

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
        name:"OWNI.fr",
        url:"http://owni.fr/feed/"
    },
];


exports.findStreamById = function(id, cb){
		
		var parser = new xml2object([ 'rss' ]);

		// Bind to the object event to work with the objects found in the XML file
		parser.on('object', function(name, post) {
				//console.log(JSON.stringify(post));
				cb(post);
		});

		// Bind to the file end event to tell when the file is done being streamed
		parser.on('end', function(name, obj) {
				//console.log('Finished parsing xml!');
		});

		// Pipe a request into the parser
		request.get(feeds[id-1].url).pipe(parser.saxStream);


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
