function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        backgroundImage: "/images/bg_row.png",
        height: "50dp",
        className: "itemRow",
        hasChild: "true",
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.__alloyId3 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId3"
    });
    $.__views.row.add($.__views.__alloyId3);
    $.__views.title = Ti.UI.createLabel({
        height: Titanium.UI.FILL,
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        color: "#000000",
        left: "10dp",
        top: "0",
        touchEnabled: false,
        id: "title"
    });
    $.__views.__alloyId3.add($.__views.title);
    $.__views.rate = Ti.UI.createView({
        id: "rate"
    });
    $.__views.__alloyId3.add($.__views.rate);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.row.id = args.id;
    $.row.title = args.title;
    $.title.text = args.title;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;