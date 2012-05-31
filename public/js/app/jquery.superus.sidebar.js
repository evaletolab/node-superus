(function($) {
	$.fn.sidebarsearch = function(options) {
		var obj=new Object(), lastQ=null;
		obj.o = $.extend({
			hparam:'search',
			head:"thead"
				
		}, options);
		
		var me = $(this);

		$(".collapse").collapse()

		function _query(options){
			
			var params = {query: options.query};
			var newUrl = $.param.querystring(options.url, params);

			obj.search = params;
			
			$.getJSON(newUrl, function(data){
				me.trigger("on-search-result",[options.query, data]);
			});  
		};
		
		
		function parseHash() {
			var url = $.bbq.getState("url");
			var params = $.deparam.fragment();

			if(params.query !=null && lastQ!=params.query ){
				_query({url: "/feed/search/"+params.query, page: 1});
				$(document).trigger("search-update-field",[params.query]);
				lastQ=params.query;
			}
		}
		
		$(window).bind( "hashchange", function(e) {
			parseHash();
		});
		
		
		me.bind("search-query",function(who,q){
			$.buildUrl({query:q});
		});
		
		parseHash();
		obj.query=_query;
		return me;
	};
})(jQuery);
