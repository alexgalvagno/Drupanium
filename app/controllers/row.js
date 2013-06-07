var args = arguments[0] || {};

$.row.id = args.id;
if(Ti.Platform.osname === "android") $.row.title = args.title;

if(content.field_image != null) $.image.image = IMG_PATH + content.field_image.und[0].filename;
$.title.text = args.title;