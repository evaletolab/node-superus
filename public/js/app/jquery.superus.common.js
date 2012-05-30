
/**
 * this is the common javascript tools for the bioeditor application
 */


/**
 * define some global constants
 */
var BIOEDITOR			= '/';
var SOLR_URL			= 'http://dev-dbint:8983/solr/';
var SOLR_PARAMS			= '/select/?version=2.2&start=0&rows=10&indent=on&wt=json';
var SOLR_BIOOBJECT_URL	= 'http://dev-dbint:8983/solr/bioObjectCore/select/?version=2.2&start=0&rows=10&indent=on&wt=json';



/**
 * manage url fragment for javascript history
 */
$.buildUrl=function(params){
	var url = window.location.href;
	var newUrl = $.param.fragment(url, params);
	window.location.href = newUrl;	
};

$.buildUrlPush=function(k,v){
	var param={};
	param[k]=$.deparam.fragment()[k];
	if(!param[k] || typeof param[k] === 'string')param[k]=[];
	if (param[k].indexOf(v)>-1)
		return;
	param[k].push(v);			
	$.buildUrl(param);
};

$.buildUrlPop=function(k, v){
	var param={};
	param[k]=$.deparam.fragment()[k];	
	param[k].pop(v);
	$.buildUrl(param);
};

$.inputAttr=function(input){
	ls=[];
	function get(i,elem){
		ls.push({category:elem.attr("category"), accession:elem.attr("accession"), cvName:elem.text()})
	};
	if(input && input.length){
		$.each(input,function(){});
	}
};
/**
 * database services   
 */
$.findAnnotationByAc=function(ac, cb){
	$.getJSON(BIOEDITOR+"/annotations/"+ac+"?format=json",function(result){
		//
		// format the structure for a better template rendering
		var relations=[];
    	$.each(result.relations,function(k,v){
    		v.accession=k;
    		relations.push(v);
    	});
    	result.relations=relations;
		
		if(cb)cb(result);
	});
};

$.findBioObjectByUniqueName=function (uniqueName,cb){
	$.ajax({type: 'GET',url: BIOEDITOR+"/bioObjects/create/"+uniqueName,success:function(data){
		if(cb)cb(data);
	},dataType:"json"});
};

$.saveAnnotation=function(annotation, cb){
	$.ajax({type: 'GET',url: BIOEDITOR+"/annotations/update/"+annotation.accession,data: {json:JSON.stringify(annotation)},success:function(data){
		if(cb)cb(data);
	},dataType:"json"});	
};



/**
 * cross-browser drag && drop event
 */
(function(){
  if(!/*@cc_on!@*/0)return;var e = "abbr,article,aside,audio,canvas,datalist,details,eventsource,figure,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video".split(','),i=e.length;while (i--){document.createElement(e[i])}})();
  var addEvent = (function () {
  if (document.addEventListener) {
    return function (el, type, fn) {
      if (el && el.nodeName) {
        el.addEventListener(type, fn, false);
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  } else {
    return function (el, type, fn) {
      if (el && el.nodeName) {
        el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  }
})();

  
/**
 * basic idle time
 * $('.pouet').fadeIn().idle(1000).fadeOut('slow');
 * $('.pouet').animate({opacity: '+=0'}, 1000).fadeOut('slow');
 */
$.fn.idle = function(time){
    var o = $(this);
    o.queue(function()
    {
       setTimeout(function()
       {
          o.dequeue();
       }, time);
    });
    return this;             
};	  

/**
 * simple log router
 */
$.log = function () {
	if (window.console && $.isFunction(console.log))
		console.log.apply(this,arguments);
};
