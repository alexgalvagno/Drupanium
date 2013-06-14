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
                field_image: {
                    und: [ {
                        filename: data_to_send.file,
                        filemime: "image/png"
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
        font: {
            fontSize: "12dp"
        },
        returnKeyType: Ti.UI.RETURNKEY_GO,
        textAlign: "left",
        left: "10dp",
        right: "10dp",
        height: "100dp",
        bottom: "10dp",
        id: "nodeBodyTa"
    });
    $.__views.view2.add($.__views.nodeBodyTa);
    $.__views.imageView = Ti.UI.createView({
        layout: "horizontal",
        height: "130dp",
        top: "10dp",
        id: "imageView"
    });
    $.__views.view2.add($.__views.imageView);
    $.__views.immagineBtnView = Ti.UI.createView({
        top: "10dp",
        layout: "vertical",
        height: "120dp",
        width: "50%",
        id: "immagineBtnView"
    });
    $.__views.imageView.add($.__views.immagineBtnView);
    $.__views.cameraBtn = Ti.UI.createButton({
        left: "10dp",
        title: "Camera",
        width: "70%",
        id: "cameraBtn"
    });
    $.__views.immagineBtnView.add($.__views.cameraBtn);
    $.__views.galleryBtn = Ti.UI.createButton({
        top: "5dp",
        left: "10dp",
        title: "Gallery",
        width: "70%",
        id: "galleryBtn"
    });
    $.__views.immagineBtnView.add($.__views.galleryBtn);
    $.__views.img = Ti.UI.createImageView({
        image: "/images/wait.png",
        width: "126dp",
        height: "126dp",
        borderWidth: 2,
        borderColor: "#bbb",
        borderRadius: 5,
        id: "img"
    });
    $.__views.imageView.add($.__views.img);
    $.__views.saveButton = Ti.UI.createButton({
        id: "saveButton",
        title: "Save"
    });
    $.__views.view2.add($.__views.saveButton);
    saveNode ? $.__views.saveButton.addEventListener("click", saveNode) : __defers["$.__views.saveButton!click!saveNode"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/lib/config.js");
    var data_to_send = {};
    $.cameraBtn.addEventListener("click", function() {
        Titanium.Media.showCamera({
            success: function(event) {
                event.cropRect;
                var image = event.media;
                var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "camera_photo.png");
                f.write(image);
                imageView.image = f.nativePath;
                data_to_send.file = f.read();
                data_to_send.name = "camera_photo.png";
                Ti.API.debug("Our type was: " + event.mediaType);
                event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO ? img.image = event.media : alert("got the wrong type back =" + event.mediaType);
            },
            cancel: function() {},
            error: function(error) {
                var a = Titanium.UI.createAlertDialog({
                    title: "Camera"
                });
                error.code == Titanium.Media.NO_CAMERA ? a.setMessage("Please run this test on device") : a.setMessage("Unexpected error: " + error.code);
                a.show();
            },
            saveToPhotoGallery: true,
            allowEditing: true,
            mediaTypes: [ Ti.Media.MEDIA_TYPE_VIDEO, Ti.Media.MEDIA_TYPE_PHOTO ]
        });
    });
    $.galleryBtn.addEventListener("click", function() {
        Ti.Media.openPhotoGallery({
            success: function(event) {
                var image = event.media;
                img.image = image;
                var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "camera_photo.png");
                f.write(image);
                imageView.image = f.nativePath;
                data_to_send.file = f.read();
                data_to_send.name = "camera_photo.png";
            },
            cancel: function() {
                alert("canceled");
            },
            error: function(error) {
                alert(error);
            },
            mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ]
        });
    });
    __defers["$.__views.saveButton!click!saveNode"] && $.__views.saveButton.addEventListener("click", saveNode);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;