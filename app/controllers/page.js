Ti.include('/lib/config.js');

var isAndroid = (Ti.Platform.osname === "android") ? true : false;
var args = arguments[0] || {};


$.pagina.addEventListener('android:back',function(){    
    $.pagina.close();
    $.image.image = null;		
});

var xhr = Titanium.Network.createHTTPClient();	
xhr.open("GET", "node/" + args.id + ".json");
	
xhr.onload = function() {	
	$.activityIndicator.show();
		
	if(xhr.status == 200 ) { 
		var content = eval('('+this.responseText+')');
		
		$.image.image = IMG_PATH + content.field_image.und[0].filename; 
		$.testo.text = content.body.und[0].value;
	}else{
		var dialog = Ti.UI.createAlertDialog({
		    message: 'Problemi di connessione!' + xhr.status,
   			ok: 'OK',
   			title: 'Error'
		});
			
		dialog.show();
    }
    
    $.activityIndicator.hide();
    $.pagina.remove($.activityIndicator);
};
	
xhr.onerror = function(e) {
	var dialog = Ti.UI.createAlertDialog({
		message: 'Problemi di connessione!',
   		ok: 'OK',
   		title: 'Error'
	});
			
	dialog.show();
};

xhr.send();

function closePage () {
	$.pagina.close();
    $.image.image = null;
}