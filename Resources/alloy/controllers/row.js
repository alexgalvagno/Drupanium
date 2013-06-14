function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        hasChild: true,
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.__alloyId5 = Ti.UI.createView({
        layout: "verical",
        id: "__alloyId5"
    });
    $.__views.row.add($.__views.__alloyId5);
    $.__views.title = Ti.UI.createLabel({
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14dp"
        },
        color: "#000000",
        left: "10dp",
        top: "5dp",
        touchEnabled: false,
        id: "title"
    });
    $.__views.__alloyId5.add($.__views.title);
    $.__views.image = Ti.UI.createImageView({
        defaultImage: "/images/wait.png",
        height: Titanium.UI.SIZE,
        top: "35dp",
        bottom: "10dp",
        id: "image"
    });
    $.__views.__alloyId5.add($.__views.image);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.row.id = args.id;
    "android" === Ti.Platform.osname && ($.row.title = args.title);
    null != args.img && ($.image.image = args.img);
    $.title.text = args.title;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;