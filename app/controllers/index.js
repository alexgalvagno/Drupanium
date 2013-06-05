Ti.include('/lib/config.js');

function login() {
	var url = REST_PATH + "user/login/";
  	var xhr = Ti.Network.createHTTPClient({timeout: 60000});
  
  	xhr.onload = function() {
  		if(xhr.status === 200){
	    	var response = JSON.parse(xhr.responseText);
	    	alert(response.user.name + ' - ' + response.user.uid);
  		}else{
			var dialog = Ti.UI.createAlertDialog({
			    message: 'Problemi di connessione!' + xhr.status,
	   			ok: 'OK',
	   			title: 'Error'
			});
					
			dialog.show();
		}
  	}
  
  	userData = {
  		username: $.user.value,
  		password: $.pass.value
  	};
  	
  	xhr.onerror = function(e) {
		var dialog = Ti.UI.createAlertDialog({
		    message: 'Problemi di connessione!' + e.error,
   			ok: 'OK',
   			title: 'Error'
		});
				
		dialog.show();
	};
  
  	xhr.open("POST", url);
  	xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  	xhr.send(JSON.stringify(userData));
}

function logout() {
	var url = REST_PATH + "user/logout/";
	var xhr = Ti.Network.createHTTPClient({timeout: 60000});

	xhr.onload = function() {
		Ti.API.info("Status: " + xhr.status);
	    var response = JSON.parse(xhr.responseText);
	    alert(response);
	};

  	xhr.onerror = function(e) {
		var dialog = Ti.UI.createAlertDialog({
		    message: 'Problemi di connessione!' + e.error,
   			ok: 'OK',
   			title: 'Error'
		});
				
		dialog.show();
	};
	  
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	xhr.send();
}	

$.index.open();
