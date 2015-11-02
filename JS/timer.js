var returner = false;
var datar;
self.addEventListener('message', function(e) {
	returner = true;
	datar = e.data;
	setTimeout(function(){
		returner = true;
		postMessage(datar[1]);
	},(datar[1]*1000));
	if (returner == true){
	postMessage(datar[1]);
	}
});

