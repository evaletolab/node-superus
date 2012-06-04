
/**
 * Module dependencies.
 *   cf: http://webpy.org/src/lecker
 *   cf: http://delicious.com/developers
 */

var express = require('express')
  , routes  = require('./routes')
  , jqtpl   = require("jqtpl")
  , fs = require('fs');

var app = module.exports = express.createServer();


var port = (process.env.PORT || 3000);
var host = (process.env.HOST || 'localhost');

if (process.env.VMC_APP_PORT && process.env.VMC_APP_HOST){
    port=process.env.VMC_APP_PORT;
    host=process.env.VMC_APP_HOST;
}

app.configure(function(){

  //
  // configure the view engine
  app.set('views', __dirname + '/views');
  app.set("view engine", "html");
  app.register(".html", jqtpl.express);
 

  
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/feed/get/:id', routes.feed);
app.get('/feed/search/:query', routes.feedsearch);

app.listen(process.env.PORT ,process.env.HOST , function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
