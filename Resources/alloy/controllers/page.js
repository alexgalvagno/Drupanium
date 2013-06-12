function Controller() {
    function closePage() {
        $.pagina.close();
        $.image.image = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.pagina = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        top: "0dp",
        left: "0dp",
        layout: "vertical",
        zIndex: 0,
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "pagina"
    });
    $.__views.pagina && $.addTopLevelView($.__views.pagina);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator",
        message: "Loading ..."
    });
    $.__views.pagina.add($.__views.activityIndicator);
    $.__views.scrollView = Ti.UI.createScrollView({
        layout: "vertical",
        top: 0,
        id: "scrollView",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false"
    });
    $.__views.pagina.add($.__views.scrollView);
    $.__views.image = Ti.UI.createImageView({
        defaultImage: "/images/wait.png",
        height: Titanium.UI.SIZE,
        top: 0,
        id: "image"
    });
    $.__views.scrollView.add($.__views.image);
    $.__views.testo = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            font: {
                fontSize: "12dp"
            },
            color: "#000000",
            left: "10dp",
            right: "10dp",
            top: "10dp",
            touchEnabled: false
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "22dp"
            }
        });
        _.extend(o, {
            id: "testo"
        });
        return o;
    }());
    $.__views.scrollView.add($.__views.testo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/lib/config.js");
    var isAndroid = true;
    var args = arguments[0] || {};
    $.pagina.addEventListener("android:back", function() {
        $.pagina.close();
        $.image.image = null;
    });
    var xhr = Titanium.Network.createHTTPClient();
    xhr.open("GET", REST_PATH + "node/" + args.id + ".json");
    xhr.onload = function() {
        $.activityIndicator.show();
        if (200 == xhr.status) {
            var content = eval("(" + this.responseText + ")");
            alert(content.field_image);
            null != content.field_image && ($.image.image = IMG_PATH + content.field_image.und[0].filename);
            $.testo.text = content.body.und[0].value;
        } else {
            var dialog = Ti.UI.createAlertDialog({
                message: "Problemi di connessione!" + xhr.status,
                ok: "OK",
                title: "Error"
            });
            dialog.show();
        }
        $.activityIndicator.hide();
        $.pagina.remove($.activityIndicator);
    };
    xhr.onerror = function(e) {
        var dialog = Ti.UI.createAlertDialog({
            message: "Problemi di connessione!" + e.error,
            ok: "OK",
            title: "Error"
        });
        dialog.show();
    };
    xhr.send();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;