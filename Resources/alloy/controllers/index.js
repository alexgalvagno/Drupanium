function Controller() {
    function login() {
        var url = REST_PATH + "user/login/";
        var xhr = Ti.Network.createHTTPClient({
            timeout: 6e4
        });
        xhr.onload = function() {
            if (200 === xhr.status) {
                var response = JSON.parse(xhr.responseText);
                alert(response.user.name + " - " + response.user.uid);
            } else {
                var dialog = Ti.UI.createAlertDialog({
                    message: "Problemi di connessione!" + xhr.status,
                    ok: "OK",
                    title: "Error"
                });
                dialog.show();
            }
        };
        userData = {
            username: $.user.value,
            password: $.pass.value
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
        xhr.send(JSON.stringify(userData));
    }
    function logout() {
        var url = REST_PATH + "user/logout/";
        var xhr = Ti.Network.createHTTPClient({
            timeout: 6e4
        });
        xhr.onload = function() {
            Ti.API.info("Status: " + xhr.status);
            var response = JSON.parse(xhr.responseText);
            alert(response);
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
        xhr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        top: "0dp",
        left: "0dp",
        layout: "vertical",
        zIndex: 0,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.userLb = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        left: "10dp",
        text: "Username:",
        id: "userLb"
    });
    $.__views.index.add($.__views.userLb);
    $.__views.user = Ti.UI.createTextField({
        left: "10dp",
        right: "10dp",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "user"
    });
    $.__views.index.add($.__views.user);
    $.__views.passLb = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        left: "10dp",
        text: "Password:",
        id: "passLb"
    });
    $.__views.index.add($.__views.passLb);
    $.__views.pass = Ti.UI.createTextField({
        left: "10dp",
        right: "10dp",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "pass"
    });
    $.__views.index.add($.__views.pass);
    $.__views.__alloyId1 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId1"
    });
    $.__views.index.add($.__views.__alloyId1);
    $.__views.login = Ti.UI.createButton({
        top: "20dp",
        width: "48%",
        height: "50dp",
        right: "10dp",
        id: "login",
        title: "Login"
    });
    $.__views.__alloyId1.add($.__views.login);
    login ? $.__views.login.addEventListener("click", login) : __defers["$.__views.login!click!login"] = true;
    $.__views.logout = Ti.UI.createButton({
        top: "20dp",
        width: "48%",
        height: "50dp",
        id: "logout",
        title: "Logout"
    });
    $.__views.__alloyId1.add($.__views.logout);
    logout ? $.__views.logout.addEventListener("click", logout) : __defers["$.__views.logout!click!logout"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/lib/config.js");
    $.index.open();
    __defers["$.__views.login!click!login"] && $.__views.login.addEventListener("click", login);
    __defers["$.__views.logout!click!logout"] && $.__views.logout.addEventListener("click", logout);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;