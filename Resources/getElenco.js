Ti.include("/lib/config.js");

exports.loadElenco = function(o) {
    var xhr = Titanium.Network.createHTTPClient();
    xhr.open("GET", REST_PATH + "views/content.json");
    var data = [];
    xhr.onload = function(e) {
        var attivita = eval("(" + this.responseText + ")");
        if (null != attivita && 0 != attivita.title) for (var i = 0, j = attivita.length; j > i; i++) data.push({
            id: attivita[i].vid,
            title: attivita[i].title
        }); else data.push({
            id: 0,
            title: "Nessun elemento presente"
        });
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