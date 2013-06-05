Ti.include('/lib/config.js');

exports.loadElenco = function(o) {
	var xhr = Titanium.Network.createHTTPClient();	
	xhr.open("GEST", REST_PATH + "views/content.json");
	
	var data = [];
	
	xhr.onload = function(e) {	
		var attivita = eval('('+this.responseText+')');
		
		if (attivita != null && attivita.title != 0)  { 
			
			for (var i = 0, j = attivita.length; i < j; i++)
			{
				data.push({
					id: attivita[i].vid,
					title: attivita[i].title
				});
			}
		}else{
			data.push({
				id: 0,
				title: 'Nessun elemento presente'
			});
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