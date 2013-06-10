Ti.include('/lib/config.js');

exports.loadElenco = function(o) {
	var xhr = Titanium.Network.createHTTPClient({timeout: 60000});	
	xhr.open("GET", REST_PATH + "views/content.json");
	
	var data = [];
	
	xhr.onload = function(e) {
		if(xhr.status === 200){	
			var attivita = eval('('+this.responseText+')');
			if (attivita != null && attivita.title != 0)  { 
				
				for (var i = 0, j = attivita.length; i < j; i++)
				{
					var image = null;
					
					if(attivita[i].field_image.length != 0){
						alert(attivita[i].field_image.und[0].filename);
						var image = IMG_PATH + attivita[i].field_image.und[0].filename;	
					} 
					
					data.push({
						id: attivita[i].vid,
						title: attivita[i].title,
						img: image
					});
				}
			}else{
				data.push({
					id: 0,
					title: 'Nessun elemento presente'
				});
	        }
	   	}else{
			var dialog = Ti.UI.createAlertDialog({
			    message: 'Problemi di connessione!' + xhr.status,
	   			ok: 'OK',
	   			title: 'Error'
			});
					
			dialog.show();
		}
		
		if (o.success) { o.success(data); }
	};
	
	xhr.onerror = function(e) {
		var dialog = Ti.UI.createAlertDialog({
		    message: 'Problemi di connessione!',
   			ok: 'OK',
   			title: 'Error'
		});
				
		dialog.show();
		
		if (o.error) { o.error(); }
	};
	
	if (o.start) { o.start(); }
	
	xhr.send();	
};