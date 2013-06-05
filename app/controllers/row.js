var args = arguments[0] || {};

$.row.id = args.id;
if(Ti.Platform.osname === "android") $.row.title = args.title;

$.title.text = args.title;