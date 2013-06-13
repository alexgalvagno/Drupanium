function Controller() {
    function saveNode() {
        var xhr = Ti.Network.createHTTPClient({
            timeout: 6e4
        });
        var node = {
            node: {
                title: $.nodeTitleTf.value,
                type: "article",
                body: {
                    und: [ {
                        value: $.nodeBodyTa.value,
                        format: "full_html"
                    } ]
                },
                uid: Alloy.Globals.userData.userUid
            }
        };
        var url = REST_PATH + "node";
        xhr.onload = function() {
            if (200 === xhr.status) {
                var response = JSON.parse(xhr.responseText);
                alert(response.nid);
            } else {
                var dialog = Ti.UI.createAlertDialog({
                    message: "Problemi di connessione!" + xhr.status,
                    ok: "OK",
                    title: "Error"
                });
                dialog.show();
            }
        };
        xhr.onerror = function(e) {
            var dialog = Ti.UI.createAlertDialog({
                message: "Problemi di connessione!" + e.error,
                ok: "OK",
                title: "Error"
            });
            dialog.show();
        };
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.send(JSON.stringify(node));
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.view2 = Ti.UI.createView({
        layout: "vertical",
        id: "view2",
        backgroundColor: "#ffffff"
    });
    $.__views.view2 && $.addTopLevelView($.__views.view2);
    $.__views.nodeTitleLb = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        left: "10dp",
        text: "Title:",
        id: "nodeTitleLb"
    });
    $.__views.view2.add($.__views.nodeTitleLb);
    $.__views.nodeTitleTf = Ti.UI.createTextField({
        left: "10dp",
        right: "10dp",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "nodeTitleTf"
    });
    $.__views.view2.add($.__views.nodeTitleTf);
    $.__views.nodeBodyLb = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        left: "10dp",
        text: "Body:",
        id: "nodeBodyLb"
    });
    $.__views.view2.add($.__views.nodeBodyLb);
    $.__views.nodeBodyTa = Ti.UI.createTextArea({
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
    __defers["$.__views.saveButton!click!saveNode"] && $.__views.saveButton.addEventListener("click", saveNode);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;