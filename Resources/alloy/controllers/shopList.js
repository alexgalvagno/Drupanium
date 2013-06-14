function Controller() {
    function openPage(e) {
        var tabViewPage = Alloy.createController("page", {
            id: e.row.id,
            title: e.row.title
        }).getView();
        "android" === Ti.Platform.osname ? tabViewPage.open() : $.nav.open(tabViewPage, {
            animated: true
        });
    }
    function refreshPunti() {
        content.loadElenco({
            success: function(data) {
                var rows = [];
                _.each(data, function(item) {
                    rows.push(Alloy.createController("row", {
                        id: item.id,
                        title: item.title,
                        img: item.img
                    }).getView());
                });
                $.table.setData(rows);
                $.activityIndicator.hide();
                $.view1.remove($.activityIndicator);
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win2 = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        top: "0dp",
        left: "0dp",
        layout: "vertical",
        zIndex: 0,
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "win2",
        title: "SHOP LIST"
    });
    $.__views.view1 = Ti.UI.createView({
        id: "view1",
        backgroundColor: "#ffffff"
    });
    $.__views.win2.add($.__views.view1);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator",
        message: "Loading ..."
    });
    $.__views.view1.add($.__views.activityIndicator);
    $.__views.table = Ti.UI.createTableView({
        id: "table"
    });
    $.__views.view1.add($.__views.table);
    openPage ? $.__views.table.addEventListener("click", openPage) : __defers["$.__views.table!click!openPage"] = true;
    $.__views.nav = Ti.UI.iPhone.createNavigationGroup({
        window: $.__views.win2,
        id: "nav"
    });
    $.__views.nav && $.addTopLevelView($.__views.nav);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var content = require("getElenco");
    $.activityIndicator.show();
    refreshPunti();
    __defers["$.__views.table!click!openPage"] && $.__views.table.addEventListener("click", openPage);
    __defers["$.__views.table!click!openPage"] && $.__views.table.addEventListener("click", openPage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;