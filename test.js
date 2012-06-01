var xml2object = require('xml2object');
var request = require('request');
var assert = require('assert')
var FeedParser = require('feedparser')

var arg = process.argv.pop()


test2(arg)

function test3(url){
  var parser

	parser = new FeedParser();

	parser.on('article', function(article){
		  console.log('Got article: %s', JSON.stringify(article));
	});

	parser.parseFile(url);
	console.log("in work!")
}

function test2(url){
	var parser = new xml2object([ 'rss' ]);

	// Bind to the object event to work with the objects found in the XML file
	parser.on('object', function(name, obj) {
			console.log('Found an object: %s', name);
			console.log(JSON.stringify(obj));
	});

	// Bind to the file end event to tell when the file is done being streamed
	parser.on('end', function(name, obj) {
		  console.log('Finished parsing xml!');
	});

	// Pipe a request into the parser
	request.get(url).pipe(parser.saxStream);
	console.log("in work!")

}
 
function test (url) {
  require('./services/feedstream').get(url).on('post', function (post) {
    //console.error(post)
    console.log("on post")
    assert.ok(post.link)
    assert.ok(post.guid)
    assert.ok(post.rfc822)
    assert.ok(post.title)
    assert.ok(post.description)
    console.log('passed')
  })
}

