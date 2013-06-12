Ti.include("/lib/config.js");
// Include the tiajax.js library
Ti.include("/lib/tiajax.js");

$ = {};
$.ajax = Titanium.Network.ajax;

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
	alert(Alloy.Globals.userData.userUid);
	// Create a new node object
	var node = {
		node:{
			title: nodeTitleTf.value,
			type:'article',
			body: {
				und: [{ 
					value: nodeBodyTa.value,
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

	// Use $.ajax to create the node
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(node), // Stringify the node
		dataType: 'json',
		contentType: 'application/json',
		// On success do some processing like closing the window and show an alert
		success: function(data) {
			alert("Content created with id " + data.nid);
		},
	});
}