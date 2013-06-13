function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.main = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        top: "0dp",
        left: "0dp",
        layout: "vertical",
        zIndex: 0,
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "main",
        title: "MAIN"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    var __alloyId2 = [];
    $.__views.__alloyId3 = Alloy.createController("shopList", {
        id: "__alloyId3"
    });
    __alloyId2.push($.__views.__alloyId3.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId4 = Alloy.createController("postNode", {
        id: "__alloyId4"
    });
    __alloyId2.push($.__views.__alloyId4.getViewEx({
        recurse: true
    }));
    $.__views.scrollableView = Ti.UI.createScrollableView({
        views: __alloyId2,
        id: "scrollableView"
    });
    $.__views.main.add($.__views.scrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;