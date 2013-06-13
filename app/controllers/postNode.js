Ti.include("/lib/config.js");

/*var imageButton = Ti.UI.createButton({
title: "Image",
height: 20,
width: 100,
font: {
fontSize: 13,
},
top: 290
});

view.add(imageButton);
var data_to_send = {};
imageButton.addEventListener('click', function() {
Ti.Media.showCamera({
showControls:true,
mediaTypes:Ti.Media.MEDIA_TYPE_PHOTO,
autohide:true,
allowEditing:true,
success:function(event) {
var image = event.media;
var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'camera_photo.png');
f.write(image);
imageView.image = f.nativePath;
data_to_send.file = f.read();
data_to_send.name = 'camera_photo.png';
},
cancel:function() { },
error:function(error) {}
});
});
*/

function saveNode() {
	var xhr = Ti.Network.createHTTPClient({timeout: 60000});
	// Create a new node object
	var node = {
		node:{
			title: $.nodeTitleTf.value,
			type:'article',
			body: {
				und: [{ 
					value: $.nodeBodyTa.value,
					format: 'full_html'
				}]
			},
			/*
			field_image: {
			und: [
			{ filename: data_to_send.file,
			filemime: 'image/png'
			}
			]
			},
			*/
			uid: Alloy.Globals.userData.userUid,
		}
	};

	// Define the url
	// in this case, we'll connecting to http://example.com/api/rest/node
	var url = REST_PATH + 'node';
	
	xhr.onload = function() {
  		if(xhr.status === 200){
	    	var response = JSON.parse(xhr.responseText);
	    	alert(response.nid);
  		}else{
			var dialog = Ti.UI.createAlertDialog({
			    message: 'Problemi di connessione!' + xhr.status,
	   			ok: 'OK',
	   			title: 'Error'
			});
					
			dialog.show();
		}
  	}
  	
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
  	xhr.send(JSON.stringify(node));
}