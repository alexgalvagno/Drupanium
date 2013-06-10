var args = arguments[0] || {};

$.row.id = args.id;
if(Ti.Platform.osname === "android") $.row.title = args.title;

if(args.img != null) $.image.image = args.img;
$.title.text = args.title;