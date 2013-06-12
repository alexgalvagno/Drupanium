function Controller() {
    function saveNode() {
        alert(Alloy.Globals.userData.userUid);
        var node = {
            node: {
                title: nodeTitleTf.value,
                type: "article",
                body: {
                    und: [ {
                        value: nodeBodyTa.value,
                        format: "full_html"
                    } ]
                },
                uid: Alloy.Globals.userData.userUid
            }
        };
        var url = REST_PATH + "node";
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(node),
            dataType: "json",
            contentType: "application/json",
            success: function(data) {
                alert("Content created with id " + data.nid);
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.postNode = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        top: "0dp",
        left: "0dp",
        layout: "vertical",
        zIndex: 0,
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "postNode",
        title: "POST NODE"
    });
    $.__views.postNode && $.addTopLevelView($.__views.postNode);
    $.__views.view2 = Ti.UI.createView({
        id: "view2",
        backgroundColor: "#ffffff"
    });
    $.__views.postNode.add($.__views.view2);
    $.__views.nodeTitleLb = Ti.UI.createLabel({
        text: "Title:",
        id: "nodeTitleLb"
    });
    $.__views.view2.add($.__views.nodeTitleLb);
    $.__views.nodeTitleTf = Ti.UI.createTextField({
        id: "nodeTitleTf"
    });
    $.__views.view2.add($.__views.nodeTitleTf);
    $.__views.nodeBodyLb = Ti.UI.createLabel({
        text: "Body:",
        id: "nodeBodyLb"
    });
    $.__views.view2.add($.__views.nodeBodyLb);
    $.__views.nodeBodyTa = Ti.UI.createTextField({
        id: "nodeBodyTa"
    });
    $.__views.view2.add($.__views.nodeBodyTa);
    $.__views.saveButton = Ti.UI.createButton({
        id: "saveButton",
        title: "Save"
    });
    $.__views.view2.add($.__views.saveButton);
    saveNode ? $.__views.saveButton.addEventListener("click", saveNode) : __defers["$.__views.saveButton!click!saveNode"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/lib/config.js");
    Ti.include("/lib/tiajax.js");
    $ = {};
    $.ajax = Titanium.Network.ajax;
    __defers["$.__views.saveButton!click!saveNode"] && $.__views.saveButton.addEventListener("click", saveNode);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;