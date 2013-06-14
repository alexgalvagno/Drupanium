Ti.include("/lib/config.js");

var data_to_send = {};

$.cameraBtn.addEventListener('click', function(){
	Titanium.Media.showCamera({	
		success:function(event)
		{
			var cropRect = event.cropRect;
			var image = event.media;
			
			var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'camera_photo.png');
			f.write(image);
			imageView.image = f.nativePath;
			data_to_send.file = f.read();
			data_to_send.name = 'camera_photo.png';
			
			Ti.API.debug('Our type was: '+ event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
			{						
				img.image =	event.media;
			}else{
				alert("got the wrong type back ="+ event.mediaType);
			}
		},
		cancel:function()
		{
		},
		error:function(error)
		{
			// create alert
			var a = Titanium.UI.createAlertDialog({title:'Camera'});
			
			// set message
			if (error.code == Titanium.Media.NO_CAMERA)
			{
				a.setMessage('Please run this test on device');
			}else{
				a.setMessage('Unexpected error: ' + error.code);
			}
			
			// show alert
			a.show();
		},
		saveToPhotoGallery:true,
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
	});
});

$.galleryBtn.addEventListener('click', function(){
	Ti.Media.openPhotoGallery({
        success:function(event) {
            var image = event.media;
            img.image = image;
            
            var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'camera_photo.png');
			f.write(image);
			imageView.image = f.nativePath;
			data_to_send.file = f.read();
			data_to_send.name = 'camera_photo.png';
        },
        cancel:function() { alert('canceled');},
        error:function(error) {
            alert(error);
        },
		mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]		 
    });
});


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
			field_image: {
				und: [{
					filename: data_to_send.file,
					filemime: 'image/png'
				}]
			},
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