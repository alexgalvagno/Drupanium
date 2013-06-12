Ti.include("/lib/config.js");

exports.loadElenco = function(o) {
    var xhr = Titanium.Network.createHTTPClient({
        timeout: 6e4
    });
    xhr.open("GET", REST_PATH + "views/content.json");
    var data = [];
    xhr.onload = function(e) {
        if (200 === xhr.status) {
            var attivita = eval("(" + this.responseText + ")");
            if (null != attivita && 0 != attivita.title) for (var i = 0, j = attivita.length; j > i; i++) {
                var image = null;
                if (0 != attivita[i].field_image.length) var image = IMG_PATH + attivita[i].field_image.und[0].filename;
                data.push({
                    id: attivita[i].vid,
                    title: attivita[i].title,
                    img: image
                });
            } else data.push({
                id: 0,
                title: "Nessun elemento presente"
            });
        } else {
            var dialog = Ti.UI.createAlertDialog({
                message: "Problemi di connessione!" + xhr.status,
                ok: "OK",
                title: "Error"
            });
            dialog.show();
        }
        o.success && o.success(data);
    };
    xhr.onerror = function() {
        var dialog = Ti.UI.createAlertDialog({
            message: "Problemi di connessione!",
            ok: "OK",
            title: "Error"
        });
        dialog.show();
        o.error && o.error();
    };
    o.start && o.start();
    xhr.send();
};