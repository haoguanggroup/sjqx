;(function(window, undefined){
	var http = axios.create();

	var Utils = {
		post: function(url, data, success, fail){
			http.post(url, data).then(function(res){
				if ( res.status !== 200 ) {
					console.error(res.statusText);
					return;
				} 

				if ( res.data.code ) {
				    fail({
				    	code: res.data.code,
				    	message: res.data.message
				    });
				    return;
				} 

				success(res.data);

			}).catch(function (err) {
				console.error(err);
			});
		},
		parseQueryString: function (){  
		    var qs = window.location.search.substr(1),
		    	params = {},
		    	items = qs.length ? qs.split('&') : [],
		    	item = null,
		    	len = items.length;

		  	for (var i = 0; i < len; i++) {
			    item = items[i].split('=');
			    var name = decodeURIComponent( item[0] ),
			    	value = decodeURIComponent( item[1] );
			    if( name ) {
			      	params[name] = value;
			    }
		  	}
		  	
		  	return params;
		}
	}

	window.$$ = Utils;
})(window);



